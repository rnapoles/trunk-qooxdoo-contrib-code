#!/bin/sh

typeset -i DEBUG=1
typeset -i rc=0
typeset adminUrl=http://127.0.0.1:8000/admin/index.html
#typeset adminUrl=http://127.0.0.1:8000/source/index.html
typeset testUrl=http://127.0.0.1:8000/
typeset adminHost=127.0.0.1
typeset adminPort=8000
typeset pybin=python
typeset Browsers="firefox mozilla webkit safari"
typeset -i WebSvrWait=5

# -- Functions ------------

echo_ () { 
  echo " " $@ 
}

findBrowser () {
  typeset browser=""
  for name in $Browsers
  do
    browser=`which $name 2>/dev/null`
    if [ $? -eq 0 ]; then 
      echo $browser
      break
    fi
  done
}

startServer () {
  which $pybin >/dev/null 2>&1
  if [ $? -ne 0 ]; then
    echo_ There is no Python in your path; qxadmin cannot work without Python; aborting ...
    return -1
  fi
  if [ $DEBUG -eq 0 ]; then
    $pybin admin/bin/cgiserver.py >/dev/null 2>&1 &
  else
    xterm -e $pybin admin/bin/cgiserver.py &
  fi
  ServerPid=$!
}

shutDown () {
  echo_ Once you are finished working with qxadmin, press any key to terminate
  echo_ this application.
  read -n 1
  kill $ServerPid
  popd >/dev/null
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
    echo quit | (telnet 127.0.0.1 $adminPort 2>&1) | grep -i -q 'Connected'
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
  which wget >/dev/null 2>&1
  if [ $? -eq 0 ]; then
    meth=2
  else
    which telnet >/dev/null 2>&1
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

# -- Main ------------------

# change directory
echo_ Changing directory
pushd ../.. >/dev/null
[ -f Makefile ] || {
  echo_ Looks like the wrong directory _no Makefile_ - aborting ...
  rc=1
}

# start mini web server
echo_ Starting mini web server
startServer

# check server available
echo_ Waiting a few seconds for the web server
checkWebServer
if [ $? -ne 0 ]; then
  echo_ "Problems starting web server; aborting ..."
  echo_ Try invoking "python admin/bin/cgiserver.py"
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


