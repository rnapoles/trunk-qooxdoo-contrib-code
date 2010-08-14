/* ************************************************************************

   Copyright:
     2009 Christian Boulanger
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/**
 * A demo of the RpcConsole. This is a scriptable test client for your JSON-RPC
 * backend. Example test data is loaded from script/rpcconsole.testData.js, but
 * you can override this with adding '?testDataUrl=http://path/to/my/testData.js' 
 * to the build or source URL of this app. To change the default server url,
 * add '?serverUrl=http://path/to/my/server/'. To automatically start a test after
 * the test data has loaded, add "?runTest=nameOfTheTest". All of the GET parameters
 * can be combined.
 */
qx.Class.define("rpcconsole.demo.Application",
{
  extend : rpcconsole.Application,

  /*
  *****************************************************************************
     REFINED PROPERTIES
  *****************************************************************************
  */
  properties :
  {
    /**
     * The url of the server,
     * @todo move to RpcPhp demo
     */
    serverUrl :
    {
      refine : true,
      init : "../../../../../RpcPhp/1.2.0/services/index.php"
    },
    
    /**
     * The url of the test data
     * @todo move to RpcPhp demo 
     */
    testDataUrl : 
    {
      refine : true,
      init  : "resource/rpcconsole/demo/testData.js"
    }
  }
});