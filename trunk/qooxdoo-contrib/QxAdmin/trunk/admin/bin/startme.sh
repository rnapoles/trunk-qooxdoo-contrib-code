#!/bin/sh

DEBUG=0
rc=0
adminUrl=http://localhost:8000/admin/index.html
pybin=python
Browsers="firefox mozilla webkit safari"

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
  typeset pybin=python
  which $pybin >/dev/null 2>&1
  if [ $? -ne 0 ]; then
    echo_ There is no Python in your path; qxadmin cannot work without Python; aborting ...
    return -1
  fi
  if [ $DEBUG -eq 0 ]; then
    $pybin admin/bin/cgiserver.py >/dev/null 2>&1 &
  else
    xterm -c $pybin admin/bin/cgiserver.py &
  fi
  ServerPid=$!
}

shutDown () {
  kill $ServerPid
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
echo_ Once you are finished working with qxadmin, press any key to terminate
echo_ this application.
read -n 1
shutDown
popd >/dev/null


