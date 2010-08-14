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
 * Base class for user-generated exceptions
 */
qx.Class.define("rpcnode.RpcException",
{
  extend : qx.core.Object,
  properties :
  {
    code :
    {
      check : "Integer",
      init  : -32700
    },
    
    message :
    {
      check : "String",
      init  : "RPC Error"
    },
    
    httpCode :
    {
      check : "Integer",
      init  : 500
    }
  },
  
  construct : function( message, code, httpCode )
  {
    if ( message) this.setMessage( message );
    if ( code ) this.setCode( code );
    if ( httpCode ) this.setHttpCode( httpCode );
  },
  
  members:
  {
    toString : function()
    {
      return this.getMessage();
    }
  }
});

/**  
 * Invalid RPC Request arguments
 */
qx.Class.define("rpcnode.InvalidParameterException",
{
  extend : rpcnode.RpcException,
  properties :
  {
    code :
    {
      refine : "Integer",
      init : -32602
    },
    
    message :
    {
      refine : true,
      init   : "Invalid request parameters"
    }
  }
});