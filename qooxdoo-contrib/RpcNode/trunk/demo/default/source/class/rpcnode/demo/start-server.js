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

/*
 * imports
 */
libpath  = "../../../../../../";
require( libpath + 'source/class/rpcnode/Server' );
require( "./service/NodeTest" );
require( "./service/RpcTest" );

/*
 * create new server on port 8888
 */
var server = new rpcnode.Server(8888);

/*
 * add anonymous services (strict 1.0/2.0):
 * only the method names will be used in figuring out the service 
 * method
 */
//console.log(nodejs.sys.inspect(rpcnode));
server.addService( new rpcnode.demo.service.NodeTest() );
server.addService( new rpcnode.demo.service.RpcTest() );

/*
 * add named services (non-standard json-rpc, maybe version 2.1)
 */
server.addService( new rpcnode.demo.service.NodeTest, "nodetest" );
server.addService( new rpcnode.demo.service.RpcTest, "qooxdoo.test" );

/*
 * start the server
 */
server.start();
  