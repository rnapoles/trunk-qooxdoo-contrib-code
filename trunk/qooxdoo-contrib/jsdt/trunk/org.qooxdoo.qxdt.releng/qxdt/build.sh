#!/bin/sh

# configure paths
export launcher=`find ~/eclipse34 -name "org.eclipse.equinox.launcher_*.jar" | sort | tail -1`
export tmpdir=${WORKSPACE}/build
export homedir=`pwd`

# ensure we have X-Server for UI-tests
user=`whoami`
havex=`ps -u $user | grep tightvnc | wc -l`
if [ "$havex" = "0" ]; then
  vncserver :1
fi
export DISPLAY=:1

# nuke old output
test -d "$tmpdir" && rm -rf "$tmpdir"
test ! -d "$tmpdir" && mkdir "$tmpdir"

# build
cd "$homedir"
java -jar $launcher -application org.eclipse.pde.build.Build -Dhomedir=${homedir} -Dworkspace=${WORKSPACE}