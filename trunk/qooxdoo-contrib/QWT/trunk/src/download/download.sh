#/bin/sh
mkdir tmp-qwt || exit 1
cd tmp-qwt
wget -q http://qooxdoo-contrib.svn.sf.net/viewvc/*checkout*/qooxdoo-contrib/trunk/qooxdoo-contrib/QWT/trunk/src/download/pom.xml || exit 1
mvn || exit 1
mvn plugin:updateRegistry || exit 1
cd ..
rm -rf tmp-qwt

