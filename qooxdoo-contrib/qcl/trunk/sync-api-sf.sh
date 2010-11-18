#! /bin/sh

source=api
target=cboulanger@:/home/logbuch/public_html/logbuch

rsync -av \
  --delete \
  $source/api \
  $target