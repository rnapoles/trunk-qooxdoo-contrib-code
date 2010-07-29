== Contrib Demobrowser ==

This application is a facade for qooxdoo's demobrowser. 

It is able to build and display the demos of all libraries in a repository 
(e.g. qooxdoo-contrib) that meet certain criteria. Namely, the library's 
structure must correspond to that of a contrib skeleton and have a valid 
Manifest file. In addition to these prerequisites, specific libraries can 
be selected by editing config.demo.json.


= Requirements =

Make sure the "demjson" Python module is installed. If not, execute the 
following command in your shell:

easy_install demjson

For more info about easy_install see
http://packages.python.org/distribute/easy_install.html

Make sure you have all the qooxdoo versions, that you like to build the
contribution demos against, properly referenced from within the qooxdoo/
folder of your qooxdoo-contrib trunk checkout. See the readme file in the 
qooxdoo/ folder for info about how to set up symbolic links to the individual 
framework versions.


= Usage =

In the contribDemobrowser/ folder execute the typical commands to build the
demobrowser, e.g. for the source version:

generate.py source

Afterwards open source/index.html in your web browser.
 