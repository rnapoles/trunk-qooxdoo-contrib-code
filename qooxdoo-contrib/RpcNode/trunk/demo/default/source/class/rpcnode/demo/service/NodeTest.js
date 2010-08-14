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
 * RPC-Methods
 */ 
qx.Class.define("rpcnode.demo.service.NodeTest",
{
  extend : qx.core.Object,
  implement : [ rpcnode.IService ],
  
  members:
  {
    
    add : function(a, b) 
    {
      return a + b;
    },
    
    note : function(a, b)
    {
      nodejs.sys.debug("notification " + a + " - " + b);
    },
    
    // async call
    ls : function() 
    {
      //return nodejs.sys.exec("ls .");
    },
    
    // async call
    pwd : function() 
    {
      //return nodejs.sys.exec("pwd");
    }    
  }
});
