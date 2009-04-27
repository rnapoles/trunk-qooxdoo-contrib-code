QxBuild - Complete qooxdoo library <http://qooxdoo.org>
=======================================================

This is complete qooxdoo and configuration needed to generate qooxdoo starting
at version 0.8.2 or SVN. Everything important can be found in config.json and 
manifest.json.

If you downloaded this package, it already contains qooxdoo build, so no
python tools or qooxdoo instalation is needed at all. But there are not 
contribs, if you are planning to use conributions to better customize 
qooxdoo features, you must build your own version of qxbuild.

Example
=======

Look at build directory for small example how to use qxbuild. See index.html 
and custom.js to play with qooxdoo. Path of qxbuild is also ScriptLoader that
can show progress bar when your files are loading.

Building
========

If you want to build your qooxdoo yourself, it's important to change paths 
is some files that's not hardcoded, but expects that you have qooxdoo from
subversion in path:
  ../qooxdoo-svn
  
I have this filesystem structure for the script:
${ROOT} (any directory)
${ROOT}/qxbuild (this package)
${ROOT}/qooxdoo-svn (qooxdoo from SVN repository)
${ROOT}/qooxdoo-contrib-svn (qooxdoo contributions from SVN repository)

So, if you have different and you want to build qooxdoo library yourself, make 
sure that you have correct these files:
${ROOT}/qxbuild/generate.py 
       - QOOXDOO_PATH = '../qooxdoo-svn'
${ROOT}/qxbuild/config.json 
       - "path" : "../qooxdoo-svn/tool/data/config/application.json"
       - "QOOXDOO_PATH" : "../qooxdoo-svn/framework",
   
Always replace ../qooxdoo-svn with your corresponding path

If you are done and you want to build qooxdoo library, type these commands to
command line:
generate.py compile-qx

Enjoy this build!
=================

For any informations send me email or send email directly to qooxdoo mailing list

- Petr Kobalicek <kobalicek.petr@gmail.com>

