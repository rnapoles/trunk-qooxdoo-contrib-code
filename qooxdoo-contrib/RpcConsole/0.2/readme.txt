RpcConsole
==========

   Copyright:
     2009-2010 Christian Boulanger
     
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
load test data from a given url. You can use this application to debug the backend 
of applications which live both on the same or on a different domain.

To change the default server url when loading the console, add 
  
  ?serverUrl=http://path/to/my/server/
  
to the URL of the demo application.

Manual requests
---------------

If you simply want to test an individual service class, enter all necessary
information in the "Service Info", "Service Data" and "Authentication" tabs.
Usually, you only need server Url, service name, service method and parameters,
but when using a server based on RpcPhp or backend http authentication, you 
might need to provide more information in the other tabs. To send the request,
send "Send". The result of the request is shown in the "Response" box. 
To abort a request that takes too long, press "Cancel". If you want to clear
all input elements (except the Server URL), press "Reset".
  
Running automated tests
------------------------

When running a test suite from test data (see below), the result of the tests will 
be reported in a table widget. You will see icons indicating success or failure of 
the test, and after all tests have finished, you can click on individual rows to 
see request and response. You can also re-run the individual test by clicking on 
"Send".


Test data file specifications
-----------------------------

The test data file populates the "Tests" menu. Example test data is loaded from 
resource/rpcconsole/demo/testData.js, but you can override this with adding
 
  ?testDataUrl=http://path/to/my/testData.js 

to the URL of the console.To automatically start a test after the test data has 
loaded, add
 
  ?runTest=nameOfTheTest
  
All of the GET parameters can be combined (using "&").

You can also load the test or edit data manually using the "Load/Edit Tests" Menu. 
Most conveniently, let the backend automatically create test data from the API
documentation of your backend classes. The qcl-php library is already implementing
this.

The test data has the following syntax:

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

