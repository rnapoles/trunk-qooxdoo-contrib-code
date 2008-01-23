#/bin/sh
mvn --batch-mode clean install || exit 1
mvn --batch-mode qx:dist -N || exit 2
scp -q target/*.zip mlhartme@shell.sf.net:/home/groups/q/qo/qooxdoo-contrib/htdocs/distributions/qwt/nightly || exit 3
echo done



