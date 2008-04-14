#!/bin/sh

# configure paths
export launcher=`find ~/eclipse -name "org.eclipse.equinox.launcher_*.jar" | sort | tail -1`
export tmpdir=~/.hudson/jobs/qxdt/workspace/build
export homedir=~/qxdt
export maps_location=https://qooxdoo-contrib.svn.sourceforge.net/svnroot/qooxdoo-contrib/trunk/qooxdoo-contrib/jsdt/trunk/org.qooxdoo.qxdt.releng/maps
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
cd "$tmpdir"
#svn co $maps_location
cp -r ~/build-workspace/org.qooxdoo.qxdt.releng/maps $tmpdir
cd "$homedir"
java -jar $launcher -application org.eclipse.pde.build.Build
