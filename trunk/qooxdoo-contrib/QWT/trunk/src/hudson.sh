#/bin/sh
svn up > svn.log || exit 1
# grep -v revision svn.log | grep -v external | grep -v ^$
# if [ "$?" != "0" ]
# then
#   echo "no changes - skipped"
#   exit 0
# fi

export LC_ALL=C

# Slightly less memory what advertised in the install docs.
# Also force a client vm as normally used on customer machines.
export MAVEN_OPTS="-Xmx112m -client"

export INSTALL_OPTS="--batch-mode -Dall"
rm -rf $HOME/.m2/repository
./install.sh || exit 1
mvn site site:deploy --batch-mode || exit 1
mvn checkstyle:check --batch-mode || exit 1

