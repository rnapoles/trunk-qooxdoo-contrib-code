/* ************************************************************************

   JSON-RPC 1.0 and 2.0 implementation running on node.js
   
   Copyright:
     2010 The autors
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (original implementation)
     * Christian Boulanger (port to qooxdoo-contrib & to qooxdoo-rpc )
   
   Dependencies:
     * node-promise (http://github.com/kriszyp/node-promise)

************************************************************************ */

var 
  jsonrpc  = require('./jsonrpc');
  service1 = require('./services/service1');
  
var server = new jsonrpc.Server(8888);
server.addService( service1 );
server.addService( service1, "test" );
server.start();



  