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

************************************************************************ */

/**  
 * Marker interface for services that are dynamically loaded 
 * from the filesystem. This is to prevent malicious clients 
 * from trying to execute non-rpc service methods. 
 */
qx.Interface.define("rpcnode.IService",{}); 