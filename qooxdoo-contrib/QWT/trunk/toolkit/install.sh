# TODO
# i'd love to replace this script by simpliy running "mvn clean install",
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

build . -N
build compiler
build plugin
build runtime
build qooxdoo
build server
