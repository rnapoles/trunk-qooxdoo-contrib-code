#/bin/sh
# TODO: merge into existing directories
export REPO=$HOME/qooxdoo-repo
mkdir $REPO/eclipse

echo 
echo Transfer from Billy
echo

rsync -v -a --delete --rsh="ssh -l billy" billy@devel.schlund.de:public_html/repository/org/qooxdoo $REPO || exit 1
rsync -v -a --delete --rsh="ssh -l billy" billy@devel.schlund.de:public_html/repository/org/eclipse/base $REPO/eclipse || exit 1

echo Done. 
echo Press return to continue.
read

echo 
echo Transfer to Sourceforge
echo

rsync -v -a --delete --rsh="ssh -l mlhartme" $REPO/ mlhartme@shell.sourceforge.net:/home/groups/q/qo/qooxdoo-contrib/htdocs/maven/repository/org/
