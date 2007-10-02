# Build Sushi, Toolkit, and examples.
# No dependencies on the Repository configuration - all you need is standard Ibiblio.

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

$MVN install:install-file -Dfile=src/org.eclipse-base-3.2.2.jar -DgroupId=org.eclipse -DartifactId=base -Dversion=3.2.2 -Dpackaging=jar || exit 1
build . -N
build sushi
cd toolkit
./install.sh || exit 1
cd ..
build examples
