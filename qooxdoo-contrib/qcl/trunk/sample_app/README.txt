
qooxdoo component library (qcl) sample application
--------------------------------------------------

This is a application skeleton with user authentication and GUI
access control already built in. You can export it to a different
directory and start extending it into a full-fledged application.

The application is built with qooxdoo 0.7, qxtransformer, and qcl,
for the client application, and PHP4 (PHP5 should work) with PEAR::DB
and MySQL for the server side, which means that you will need all these 
prerequisites before you can use the application. You will also need
a full qooxdoo build environment:

http://qooxdoo.org/documentation/0.7/checking_out_from_svn

and check out the needed libraries from svn in the and the following 
folder structure: 

|-- qooxdoo-0.7-sdk/  (svn co https://qooxdoo.svn.sourceforge.net/svnroot/qooxdoo/branches/legacy_0_7_x/qooxdoo qooxdoo-0.7-sdk)
|-- qooxdoo-contrib/ 
|   `-- qcl         	(svn co https://qooxdoo-contrib.svn.sourceforge.net/svnroot/qooxdoo-contrib/trunk/qooxdoo-contrib/qcl)
|-- qxtransformer-sdk (svn co https://qxtransformer.svn.sourceforge.net/svnroot/qxtransformer/trunk/apps/qxtransformer-skeleton qxtransformer-sdk)

If you use a different folder structure, you'll need to adapt the
Makefile int qcl/frontend.

Once you have all components, go to qcl/frontend and do "make transform" to
convert the xml files into javascript and then "make source"
or "make build" to build the sample app. 

Before you can use the application, you need to create a MySQL database
called "sample_app" and create tables using the 
sample_app/backend/php/services/sample_app/sql/sample_app.sql
file. You will also need to adapt the file
sample_app/backend/php/services/sample_app/service.ini.php
and edit the database DSN to match your local configuration.

Using the sample application as the basis of your own application
-----------------------------------------------------------------

To start working on your own project using the sample application
as a skeleton, export the sample application to your own folder and 
adapt the TOP_FOLDER_PATH variable in the Makefile. 
