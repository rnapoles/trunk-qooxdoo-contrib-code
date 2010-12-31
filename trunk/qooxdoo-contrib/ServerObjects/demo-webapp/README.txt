Qooxdoo Server Objects - Demo Web App (Tomcat)
==============================================

The SVN Location is:
	https://qooxdoo-contrib.svn.sourceforge.net/svnroot/qooxdoo-contrib/trunk/qooxdoo-contrib/ServerObjects

If you're looking for a downloadable webapp you can just deploy, you should download
the demo-webapp.war from the SourceForge SVN (see above).


Installing the QSO Demo Webapp in Eclipse
=========================================

1. Download QSO from SVN (see above) - you must download the entire tree, not just the "demo-webapp" folder

2. In Eclipse, choose "File" -> "Import" -> "Existing Projects" and select the "demo-webapp" folder you downloaded from SVN

3. In the "WebContent" folder of the new project, right click one of the linked folders (eg "arraytest") and choose
"Properties"; then the "Edit" button, then "Variables" then "New"; the new variable name is "QSO" and the folder
should be the root of the SVN download

4. Copy *.jar from the server/lib folder into the project's WebContent/WEB-INF/lib folder.

5. Download the latest Qooxdoo (1.1 should be supported too) and unpack it into the root folder of the SVN archive
and rename the folder from "qooxdoo-1.3-sdk" (for example) to "qooxdoo".  This folder will be ignored by SVN.

6. Add the project to an Apache Tomcat 6 server instance and start it up!


