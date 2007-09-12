#/bin/sh
mkdir tmp
cd tmp
wget -q http://qooxdoo-contrib.svn.sf.net/viewvc/*checkout*/qooxdoo-contrib/trunk/qooxdoo-contrib/QWT/trunk/src/download/pom.xml
mvn dependency:resolve
cd ..
rm -rf tmp

