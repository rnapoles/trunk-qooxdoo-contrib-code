#/bin/sh

# TODO
#   eclipse-base deployen
#   wget ersetzen  -> stattdessen pom manuell runterladen? dann muss man dieses script manuell machen
#   robuster
#      version kann sich aendernt
#      download kann aendern
#   metadata files generieren
#      kann maven das?
#      als "qooxdoo-contrib"?
#   qwt:help ersetzen?
#      qwt:check koennte config prueffen

mkdir tmp-qwt || exit 1
cd tmp-qwt
wget -q http://qooxdoo-contrib.svn.sf.net/viewvc/*checkout*/qooxdoo-contrib/trunk/qooxdoo-contrib/QWT/trunk/src/download/pom.xml || exit 1
mvn || exit 1
cd ..
rm -rf tmp-qwt

