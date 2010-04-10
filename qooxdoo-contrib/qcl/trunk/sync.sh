#! /bin/sh

./generate.py api
rsync -a -e ssh api cboulanger@frs.sourceforge.net:userweb/htdocs/qooxdoo-contrib/qcl/trunk

cd demo/access
./generate.py build
rsync -a -e ssh build services contrib cboulanger@frs.sourceforge.net:userweb/htdocs/qooxdoo-contrib/qcl/trunk/demo/access

