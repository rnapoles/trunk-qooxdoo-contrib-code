#/bin/sh
# TODO: merge into existing directories
export REPO=$HOME/qooxdoo-repo

echo 
echo Transfer from Billy
echo

rsync -v -a --delete --rsh="ssh -l billy" billy@devel.schlund.de:public_html/repository/org/qooxdoo $REPO

echo 
echo Transfer to Sourceforge
echo

rsync -v -a --delete --rsh="ssh -l mlhartme" $REPO/ mlhartme@shell.sourceforge.net:/home/groups/q/qo/qooxdoo-contrib/htdocs/maven/repository/org/
