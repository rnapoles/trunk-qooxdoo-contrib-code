#/bin/sh

./generate.py source

# Workaround: The qooxdoo generator doesn't allow to set the script prefixes
# -> We have to replace them after the script was created
#cp source/script/mamba-0.js ../resources/pustefix/htdocs/script/mamba-source.js
cat source/script/mamba-0.js | sed -e 's#"../../../../../../qooxdoo-0.8.1-sdk/framework/source/class/#"scripts-mamba/qooxdoo/#g' -e 's#"../source/class/mamba/#"scripts-mamba/mamba/#g' > ../resources/pustefix/htdocs/script/mamba-source.js

# Create symlinks to the included source files
ln -sf ../../../../qooxdoo/source/class/mamba ../resources/pustefix/htdocs/script/
ln -sf ../../../../../../../../qooxdoo-0.8.1-sdk/framework/source/class ../resources/pustefix/htdocs/script/qooxdoo
