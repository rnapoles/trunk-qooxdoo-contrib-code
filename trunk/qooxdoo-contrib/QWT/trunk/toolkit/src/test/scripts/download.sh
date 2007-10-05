#/bin/sh
export SCRIPTS=`pwd`
echo scripts: $SCRIPTS

export DIR=/tmp/download
export MAVEN_OPTS="-Xmx56m -client"
export FIX="--batch-mode -s $SCRIPTS/download-settings.xml"
rm -rf $HOME/.m2/qwt-download-repository  # failure is ok
rm -rf $DIR
mkdir $DIR || exit 1
# can't use wget, it's not available on all machines:
cp $SCRIPTS/../../download/pom.xml $DIR || exit 1
cd $DIR || exit 1
mvn $FIX || exit 1
rm pom.xml
mvn $FIX qx:new -Dpackage=foo.bar || exit 1
cd bar
# run 'package', not 'compile -- to test memory consumption
mvn $FIX clean package || exit 1
mvn $FIX qx:uninstall || exit 1
cd ..
mvn $FIX && exit 1
exit 0

