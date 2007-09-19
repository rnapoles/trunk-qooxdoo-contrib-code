#/bin/sh
mkdir target
cd target || exit 1
export DIR=download
export MAVEN_OPTS="-Xmx62m -client"
rm -rf $HOME/.m2/repository
rm $HOME/.m2/settings.xml
rm -rf $DIR
mkdir $DIR || exit 1
# can't use wget, it's not available on all machines:
cp ../src/download/pom.xml $DIR
cd $DIR || exit 1
mvn --batch-mode || exit 1
mvn --batch-mode qwt:new -Dpackage=foo.bar || exit 1
cd bar
mvn --batch-mode clean package || exit 1


