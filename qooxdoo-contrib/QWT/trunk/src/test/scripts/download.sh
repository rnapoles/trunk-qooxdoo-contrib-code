#/bin/sh
export DIR=tmp-download
export MAVEN_OPTS="-Xmx96m -client"
rm -rf $DIR
mkdir $DIR
cd $DIR
wget http://qooxdoo-contrib.svn.sourceforge.net/viewvc/*checkout*/qooxdoo-contrib/trunk/qooxdoo-contrib/QWT/trunk/src/download/pom.xml
mvn
mvn qwt:new -Dpackage=foo.bar
cd bar
mvn clean package

