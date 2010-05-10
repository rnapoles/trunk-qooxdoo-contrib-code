

QSO - Getting Started
======================

This guide assumes you are using Eclipse 3.4 and that you are familiar with creating
Dynamic Web Projects and deploying them to a test Apache Tomcat 6 Server.

Any problems please contact me through the Qooxdoo mailing list, although feel free
to CC me at john.spackman@zenesis.com to make sure I don't miss your mail.


1. Get Qooxdoo and add it to the demo project
---------------------------------------------
Because Qooxdoo is a large download it is not included in the QSO .zip file and you have
to add it yourself; download Qooxdoo v1.0.1 (or the latest version) and unpack it into
a folder called qooxdoo in the same place you unpacked QSO.

For example, if you unpacked to "d:\dev\qso" your directory structure should now look 
like this:

  D:\
    dev\
      qso\
        src\
        qooxdoo\
        WebContent\
        .classpath
        .project
        LICENSE.txt
        README.bat
        zip.bat


2. Import the project
---------------------
In Eclipse, choose "File" -> "Import..", then "Existing Projects into Workspace"; set the 
root directory to the folder you unzipped to (E.G. d:\dev\qso) and click finish.


3. Configure directories
------------------------
If you unpacked into d:\dev\qso (I.E. the example folder layout above) you can skip this
step and go to step 4.

Eclipse will automatically publish everything in the WebContent folder to your virtual
Tomcat Server and you need your qooxdoo folder and your application folder to be part of the 
WebContent folder, but this has two disadvantages during development: 

a) refreshing the code or changing directory structure etc causes Eclipse to recopy the 
entire tree and that takes a while for the qooxdoo folder to be copied; 

b) when you edit a JS file you have to wait for Eclipse to "catch up" and finish replicating
changes to the virtual server before you can refresh your browser.

To work around these problems there is a custom URL filter included that intercepts URLs
from the browser and redirects them to your code - EG, a request for "demoapp/source/index.html"
is mapped to "D:\dev\qso\WebContent\demoapp\source\index.html".

Open the file WebContent\WEB-INF\web.xml and change the three <init-param> entries to
refer to your path instead of "D:/dev/qso".  **NOTE** You must use Unix-style paths even on
Windows, I.E. use forward slashes instead of back slashes.

Open the file WebContent\WEB-INF\demoapp\config.json and change line 35 that sets the "CACHE"
variable to something suitable, E.G. inside your Qooxdoo installation.


4. Build the demo app
---------------------
In a command prompt cd to "D:\dev\qso\WebContent\demoapp" and type ".\generate source" and/or
".\generate build" and hit return.

When the generator has finished, go back to Eclipse and right click the project and choose
"Refresh" and then add your imported project into an instance of Apache Tomcat 6 server, and 
then start the server.


5. Run the demo app
-------------------
You should now be able to browse to http://localhost/demoapp/source/index.html or to
http://localhost/demoapp/build/index.html depending on which generator function you 
chose and you should get an alert box pop up which says "All tests passed!"




