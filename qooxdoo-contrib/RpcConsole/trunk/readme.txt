RpcConsole
==========

   Copyright:
     2009 Christian Boulanger
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)

This contribution is a scriptable test client for your JSON-RPC backend. 

It contains an embeddable widget which allows the user to input request data
and see the response returned by the client (rpccconsole.RpcConsole), and a
demo application (rpcconsole.demo.Application), which can be used run tests
manually or by user-supplied scripts. 

The demo allows to open multiple windows with independent consoles, and to 
load test data from a given url. You can this application to debug the backend 
of applications which live both on the same or on a different domain.

Example test data is loaded from script/rpcconsole.testData.js, but
you can override this with adding '?testDataUrl=http://path/to/my/testData.js' 
to the build or source URL of this app. To change the default server url,
add '?serverUrl=http://path/to/my/server/'. To automatically start a test after
the test data has loaded, add "?runTest=nameOfTheTest". All of the GET parameters
can be combined.

The test data file populates the "Tests" menu and  must look like this:

qx.core.Init.getApplication().setTestData(
{
  testName : {
    label : "The label in the menu",
    icon : "path/to/the/optional-icon.png",
    /**
     * Optional initialization function called when the 
     * button is created. If the function returns boolean false,
     * the button is not attached to the menu.
     * The menu button and the name of test are passed as arguments. 
    */
    init : function( button, testName ){
     // "this" refers to the main application
     return true;
    },
    /**
     * Optional function called when the menu button is executed.
     * If the function returns boolean false, the request is not
     * send. The name of the test is passed as argument.
     */
    execute : function( testName )
    {
       // "this" refers to the main application
       return true;
    },
    /**
     * The request model data. Each value overrides an existing
     * property. Other properties are kept.
     */ 
    requestData : {
      url     : "http://", 
      service : "my.service.name",
      method : "myMethodName",
      params : ["arg1", "arg2", [ "arg", 3] ]
    },
    /**
     * Optional callback function called after the result of the
     * request has returned from the server.
     */
    callback : function( result ){
       // do something with the response, for example, change
       // the server data like here
       // "this" refers to the main application    
      this.getActiveConsole().getRequestModel().setServerData(
        foo : response.bar
      );
    },
    /**
     * Optional data to compare the result with an expected.
     * If the value is a function, this function must return
     * true if the result is correct, false, if the result is 
     * wrong. You can also return a string which is taken as
     * an error message.  
     * Alternatively, the data can be of any native data type
     * (boolean, null, string, array, object) and will be
     * compared verbatim to the result by jsonifying both 
     * values. "callback" and "checkResult" are mutually
     * exclusive. 
     */
    checkResult : function( result )
    {
      if (result == "foo!")
      {
        return true;
      }
      return "Result is wrong!"; 
    }
  },
  
  testName2 : {
    // don't show a corresponding menu button 
    visible : false,  
   ...
  },
  
  testName3 : {
   ...
  }
  ...
});

You can combine several jobs by the following code

testName1 :
{
  label : "Combine Jobs 2 and 3",  
  execute: function()
  {
    this.runTest( "testName2", function(result)
    {
      this.runTest( "testName3", function(result)
      {
        this.info("Tests completed.");
      });
    });
  }
}

or run all test or a selection of tests by the runTests() method. 

Todo:
----
- test cross-domain requests
- save service name and method in the comboboxes' list for easy access.