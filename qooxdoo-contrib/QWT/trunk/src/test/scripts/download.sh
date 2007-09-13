#/bin/sh
export DIR=tmp-download
export MAVEN_OPTS="-Xmx96m -client"
rm -rf $DIR
mkdir $DIR
cd $DIR
# can't use wget, it's not available on all machines:
cp src/download/pom.xml .
mvn || exit 1
mvn qwt:new -Dpackage=foo.bar || exit 1
cd bar
mvn clean package || exit 1


