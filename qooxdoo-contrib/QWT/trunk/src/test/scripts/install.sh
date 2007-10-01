#/bin/sh

export LC_ALL=C

# Slightly less memory what advertised in the install docs.
# Also force a client vm as normally used on customer machines.
export MAVEN_OPTS="-Xmx112m -client"

export INSTALL_OPTS="--batch-mode -Dall -Dfull"
rm -rf $HOME/.m2/repository
rm -rf toolkit/qooxdoo/src/framework
./install.sh || exit 1
mvn site site:deploy --batch-mode || exit 1
mvn checkstyle:check --batch-mode || exit 1
