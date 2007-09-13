#/bin/sh
svn up > svn.log || exit 1

export DIR=tmp-download
export MAVEN_OPTS="-Xmx64m -client"
mkdir $DIR
cd $DIR
wget http://qooxdoo-contrib.svn.sourceforge.net/viewvc/*checkout*/qooxdoo-contrib/trunk/qooxdoo-contrib/QWT/trunk/src/download/pom.xml
mvn
mvn qwt:new -Dpackage=foo.bar
cd bar
mvn clean package

