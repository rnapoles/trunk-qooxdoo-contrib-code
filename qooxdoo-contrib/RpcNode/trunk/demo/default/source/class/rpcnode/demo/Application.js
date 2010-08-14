/* ************************************************************************

   Copyright:
     2009-2010 Christian Boulanger
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************
#asset(rpcnode/*)
************************************************************************ */

/**
 * An adapted RpcConsole demo
 */
qx.Class.define("rpcnode.demo.Application",
{
  extend : rpcconsole.Application,
  
  /*
  *****************************************************************************
     OVERRIDDEN PROPERTIES
  *****************************************************************************
  */
  properties :
  {
    serverUrl :
    {
      refine : true,
      init : "http://localhost:8888"
    },
    
    testDataUrl : 
    {
      refine : true,
      init  : "resource/rpcnode/demo/testData.js"
    }
  }
});