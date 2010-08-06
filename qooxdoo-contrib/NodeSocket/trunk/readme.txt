Node.js/Socket.io Wrapper
=========================

This contribution wraps the Socket.IO event transport for use in qooxdoo.

See http://socket.io/

Of course, you can use Socket.IO directly without this wrapper. What this
contribution does is to integrate the Socket.IO events into the qooxdoo
message bus so that there is a uniform message passing system that bridges
the server-client gap. This also means that the underlying implementation
can be easily switched without any code change.  

See the demo for your usual chat application. 

Installation:
=============

- Install the node.js server as instructed at http://www.nodejs.org/
- Currently, all files from the Socket.IO project are shipped with the contrib.
  since they have to be slightly patched to work with qooxdoo. 
- If you plan to do "source" development, make a symlink to the 
  qooxdoo sdk inside the top-level release version folder (for example,
  "0.1" or "trunk". The reason is that the shipped 
  node.js-server doesn't serve files outside this folder.
    
Run the demo:
============
- If you just want to run the demo, adapt the config.json file
  and point the QOOXDOO_PATH constant to the path of the qooxdoo sdk.
- Run ./generate.py build 
- Go to demo/default/server/ and start the server with 'node server.js'
- Load http://localhost:8088/demo/default/build/index.html in several
  browser windows.
- Chat with yourself ;-)

Known Issues/To Do
==================

- The demo has only been tested with the latest Safari and Chrome, which both
  support web sockets. Is is currently not working with Firefox because of some
  issues with the WebSocket Flash applet.
- The static file server is fast, but inefficient because it doesn't do any caching.
  There are several static file servers for node.js which should be integrated
  to make it more efficient.  
  
