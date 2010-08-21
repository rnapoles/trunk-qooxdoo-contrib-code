This is a wrapper for the cometd javascript library. 
See http://cometdproject.dojotoolkit.org/

######################################################################
This project is discontinued. Use the server-push solutions based on
the node.js server instead, for example the Node/Socket contribution. 
######################################################################

Prerequisites:
-------------
- You need a working cometd server (http://cometd.org/documentation/cometd).
  I have been successful only with the Java/Jetty implementation, neither
  the python/twisted nor the perl server worked for me (on Mac OS X 10.5).
- You need to make sure that the cometd server listens on the same domain and port
  as the http server that serves the javascript files, otherwise it won't work
  (because of the dame-domain security policy). This might require that you 
  add a redirection to the Apache server (for example, in my case, I had to use
  "ProxyPass /cometd http://localhost:8090/cometd-demo-1.0.0rc0/cometd"
  to redirect the requests to /cometd on the Apache instance to the Jetty
  server instance, which is running the cometd server.
  
Getting started..
-----------------
The best place to start is the chat demo shipped with this contribution. The other
demos provided with the dojo implementation have not been ported yet. The demo
has to be generated before it can be used.

Project State
-------------
09/10/04 First proof-of-concept release
10/01/03 0.1 release

Todo
----
- The contribution still depends on the dojo base library, this needs to be ported
  to work with the qooxdoo transport API.
- At the moment, the required libraries need to be manually imported in index.html.
  Need to find a way to programmatically load them at load time.  
 