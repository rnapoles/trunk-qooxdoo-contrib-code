#/bin/sh

# Mirrors Billy parts to Qooxdoo-devel
#
# All Qwt distributions, deployments, go to billy;
# the qooxdoo-devel repository is a mirror of the respective billy parts.
# Advanteges:
# o we have backups
# o we can deploy sites automatically - without firewall problems.
 
export ROOT=$HOME/mirror
export REPO=$ROOT/repository
export SITE=$ROOT/site

mkdir $ROOT
mkdir $REPO
mkdir $REPO/eclipse
mkdir $SITE

echo 
echo Transfer from Billy
echo

rsync -v -a --delete --rsh="ssh -l billy" billy@devel.schlund.de:public_html/sites/qooxdoo $SITE || exit 1
rsync -v -a --delete --rsh="ssh -l billy" billy@devel.schlund.de:public_html/repository/org/qooxdoo $REPO || exit 1
rsync -v -a --delete --rsh="ssh -l billy" billy@devel.schlund.de:public_html/repository/org/eclipse/base $REPO/eclipse || exit 1

echo Done. 
echo Press return to continue.
read

echo 
echo Transfer to Sourceforge
echo

rsync -v -a --delete --rsh="ssh -l mlhartme" $SITE/qooxdoo/ mlhartme@shell.sourceforge.net:/home/groups/q/qo/qooxdoo-contrib/htdocs/maven/sites/qooxdoo/
rsync -v -a --delete --rsh="ssh -l mlhartme" $REPO/ mlhartme@shell.sourceforge.net:/home/groups/q/qo/qooxdoo-contrib/htdocs/maven/repository/org/

