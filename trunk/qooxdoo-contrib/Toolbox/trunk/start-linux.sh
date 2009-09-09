#!/bin/bash
################################################################################
#
#  qooxdoo - the new era of web development
#
#  http://qooxdoo.org
#
#  Copyright:
#    2006-2009 1&1 Internet AG, Germany, http://www.1und1.de
#
#  License:
#    LGPL: http://www.gnu.org/licenses/lgpl.html
#    EPL: http://www.eclipse.org/org/documents/epl-v10.php
#    See the LICENSE file in the project's top-level directory for details.
#
#  Authors:
#    * Thomas Herchenroeder (thron7)
#    * Andreas Ecker (ecker)
#
################################################################################

##
# NAME
#  start-linux.sh -- start script for qooxdoo Toolbox on Unix-like systems
#
# DESCRIPTION
#  This script starts the qooxdoo Toolbox, a web application to control the
#  build process of skeleton-based applications.
#
#  It has two basic functions, (a) to start a small Python-based web server, 
#  and (b) to launch an URL on that web server with the default web browser. 
#  The URL will open the Toolbox (itself a qooxdoo application), which in 
#  turn will interact with the web server to perform various actions like 
#  saving configuraton settings and invoking build processes.
#
# CAVEATS
#  - Port 8000 for the web server is hard-coded; if this port is occupied on
#    your machine, you have to change it here and in the GUI Javascript source
#    code (which implies you need a source version of this app).
#  - The whole application is intentionally restricted to local usage 
#    (although it uses network connections); don't try it from a remote host
#
##

typeset -i DEBUG=0  # don't use this on Mac OS X
typeset -i WebSvrWait=5
typeset websrvPath=component/toolbox/tool/bin/cgiserver.py
typeset -i rc=0

typeset adminHost=127.0.0.1
typeset adminPort=8000
typeset adminPath=component/toolbox/source/index.html
typeset adminUrl=http://${adminHost}:${adminPort}/${adminPath}
typeset testUrl=http://${adminHost}:${adminPort}/

typeset pybin=python
typeset Browsers="firefox mozilla opera webkit safari"

# -- Functions ------------

echo_ () { 
  echo " " $@ 
}




# ORIG ########################################################################


checkWhich () {
  # check behaviour of the 'which' command (important for MacX)
  typeset unknownCommand="unknownCommand$$"
  typeset -i err1 err2
  type which
  if [ $? -eq 0 ]; then
    which $unknownCommand  # should produce $?=1
    err1=$?
    which which  # should produce $?=0
    err2=$?
    if [ $err1 -eq $err2 ]; then  # this which is unusable
      return 1
    else
      return 0
    fi
  fi
}

checkBin () {
  # looks for the existence of a binary
  #typeset tresult=`type $1|grep "$1 is"`
  #typeset result=${tresult#$1 is}
  type -p $1
  return $?
}

findBrowser () {
  typeset browser=""
  platf=`uname 2>/dev/null`
  if [ $platf = "Darwin" ]; then  # MacOS special
    echo "open"
  else
    for name in $Browsers
    do
      browser=`checkBin $name 2>/dev/null`
      if [ $? -eq 0 ]; then 
        echo $browser
        break
      fi
    done
  fi
}

startServer () {
  if [ $DEBUG -eq 0 ]; then
    $pybin $websrvPath >/dev/null 2>&1 &
  else
    if is_darwin ; then
      # this doesn't work yet, just for docu
      /Applications/Utilities/Terminal.app/Contents/MacOS/Terminal &
    else
      xterm -e "$pybin $websrvPath" &
    fi
  fi
  ServerPid=$!
}

shutDown () {
  echo_ Once you are finished working with the Toolbox, press any key to terminate
  echo_ this application.
  read -n 1
  kill $ServerPid
  popd >/dev/null 2>&1
}

sleepDot () {
  typeset -i limit=$1
  typeset -i x

  for ((x=0; x<=limit; x += 1)); do
    echo -n "."
    sleep 1
  done
  echo
}

testWeb () {
  typeset -i meth=$1

  if [ $meth -eq 1 ]; then
    echo quit | (telnet 127.0.0.1 $adminPort 2>&1) > /tmp/qx$$
    grep -i -q 'Connected' /tmp/qx$$  # temp. file due to intermittend Mac hangup
    if [ $? -eq 0 ]; then
      return 0
    else
      return 1
    fi
  elif [ $meth -eq 2 ]; then
    wget --spider --quiet $testUrl
    if [ $? -eq 0 ]; then
      return 0
    else
      return 1
    fi
  else
    echo_ Internal Error: testWeb: unknown method $meth
    return 2
  fi
}
    
checkWebServer () {
  # meth=0 no testing, just wait and return success
  # meth=1 use telnet for testing
  # meth=2 use wget for testing
  typeset -i meth i

  # find a way to check the web server
  checkBin wget >/dev/null 2>&1
  if [ $? -eq 0 ]; then
    meth=2
  else
    checkBin telnet >/dev/null 2>&1
    if [ $? -eq 0 ]; then
      meth=1
    else
      meth=0
    fi
  fi

  # apply appropriate method
  if [ $meth -eq 0 ]; then
    # just sleep
    sleepDot $WebSvrWait
    # since we do not really test, let's hope it is running
    return 0
  else
    # do proper testing
    for ((i=0; i<=$WebSvrWait; i += 1)); do
      testWeb $meth
      if [ $? -eq 0 ]; then
        echo
        return 0
      else
        echo -n "."
        sleep 1
      fi
    done
  fi
  echo
  return -1
}

setPlatform () {
  typeset platf=`uname 2>/dev/null`
  if [ $platf = "Darwin" ];then
    isDarwin=true
  else
    isDefault=true
  fi
}

is_darwin () {
  typeset platf=`uname 2>/dev/null`
  if [ $platf = "Darwin" ]; then
    return 0
  else
    return 1
  fi
}

checkDir () {
  [ -f Makefile ] || {
    echo_ Changing directory
    pushd ../.. >/dev/null
    [ -f Makefile ] || {
      echo_ Looks like the wrong directory _no Makefile_ - aborting ...
      exit 1
    }
  }
}

# -- Main ------------------

unusedTODO () {
# possibly change directory
checkDir

# start mini web server
echo_ Starting mini web server
startServer

# check server available
echo_ Waiting a few seconds for the web server
checkWebServer
if [ $? -ne 0 ]; then
  echo_ "Problems starting web server; aborting ..."
  echo_ "Try invoking \"python $websrvPath\". If that works,"
  echo_ "open the URL $adminUrl in your web browser."
  shutDown
  exit 3
fi

# load admin url in browser
echo_ Locating your browser
browser=`findBrowser`
if [ -n "$browser" ]; then
  echo_ Launching admin url in browser
  $browser $adminUrl
else
  echo_ "I couldn't find your browser. Please open up the URL"
  echo_ "$adminUrl in your browser."
fi

echo
shutDown
}

echo Welcome to qooxdoo
echo


#------------------------------------------------------------------------------
# Find native Python installation
#------------------------------------------------------------------------------

echo Trying to find Python installation ...

checkBin $pybin >/dev/null 2>&1
if [ $? -ne 0 ]; then
  # no python - giving up
  echo_ Could not find python in your environment - aborting ...

  browser=`findBrowser`
  if [ -n "$browser" ]; then
    $browser component/toolbox/error.html
  fi
  exit -1
fi

#------------------------------------------------------------------------------
# Start mini web server
#------------------------------------------------------------------------------

echo
echo Starting mini web server ...
startServer

echo_ ... waiting for the web server to start up ...
checkWebServer
if [ $? -ne 0 ]; then
  echo_ "Problems starting web server; aborting ..."
  echo_ "Try invoking \"python $websrvPath\". If that works,"
  echo_ "open the URL $adminUrl in your web browser."
  shutDown
  exit 3
fi

# load admin url in browser
echo_ Locating your browser
browser=`findBrowser`
if [ -n "$browser" ]; then
  echo_ Launching Toolbox in your web browser
  $browser $adminUrl
else
  echo_ "I couldn't find a web browser. Please open up the URL"
  echo_ "$adminUrl in your browser."
fi

echo
shutDown
