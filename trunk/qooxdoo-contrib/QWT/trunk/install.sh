# TODO
# i'd love to replay this script by simpliy running "mvn clean install",
# but the various modules have plugin dependencies on the Toolkit Maven Plugin ...

export MVN="mvn $INSTALL_OPTS"

build() {
  echo
  echo Building $1
  echo
  back=`pwd`
  cd $1
  $MVN clean install $2
  if [ "$?" != "0" ]
  then
    echo "build failed"
    exit 1
  fi
  cd $back
}

$MVN install:install-file -Dfile=toolkit/org.eclipse-base-3.2.2.jar -DgroupId=org.eclipse -DartifactId=base -Dversion=3.2.2 -Dpackaging=jar
if [ "$?" != "0" ]
then
  echo "build failed"
  exit 1
fi
 
build . -N
build sushi
build toolkit -N
build toolkit/compiler
build toolkit/plugin
build toolkit/runtime
build toolkit/qooxdoo
build toolkit/server
build application
