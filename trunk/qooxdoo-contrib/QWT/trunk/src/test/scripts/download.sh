#/bin/sh
mkdir target
cd target || exit 1
export DIR=download
export MAVEN_OPTS="-Xmx62m -client"
rm -rf $HOME/.m2/repository
rm $HOME/.m2/settings.xml   # failure is ok!
cp $HOME/.m2/initial-settings.xml $HOME/.m2/settings.xml  # failure is ok!
rm -rf $DIR
mkdir $DIR || exit 1
# can't use wget, it's not available on all machines:
cp ../src/download/pom.xml $DIR
cd $DIR || exit 1
mvn --batch-mode || exit 1
mvn --batch-mode qx:new -Dpackage=foo.bar || exit 1
cd bar
mvn --batch-mode clean package || exit 1
mvn --batch-mode qx:uninstall || exit 1
mvn --batch-mode qx:help && exit 1

