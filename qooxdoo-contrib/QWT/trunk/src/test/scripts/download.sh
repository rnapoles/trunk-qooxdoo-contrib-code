#/bin/sh
cd target
export DIR=download
export MAVEN_OPTS="-Xmx96m -client"
rm -rf $HOME/.m2/repository
rm -rf $DIR
mkdir $DIR || exit 1
# can't use wget, it's not available on all machines:
cp ../src/download/pom.xml $DIR
cd $DIR || exit 1
mvn || exit 1
mvn qwt:new -Dpackage=foo.bar || exit 1
cd bar
mvn clean package || exit 1


