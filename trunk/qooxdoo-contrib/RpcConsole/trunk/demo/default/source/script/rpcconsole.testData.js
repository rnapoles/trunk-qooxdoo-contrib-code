/**
 * Calls the setTestData() method of the rpcconsole.demo.Application app with
 * a map of test data from which the test menu will be populated. The map
 * must have the following structure:
 * <pre>
 * {
 *   testName : {
 *     label : "The label in the menu",
 *     /**
 *      * Optional initialization function called when the 
 *      * button is created. If the function returns boolean false,
 *      * the button is not attached to the menu.
 *      * The menu button and the name of test are passed as arguments. 
 *      * /
 *     init : function( button, testName ){
 *      // "this" refers to the main application
 *      return true;
 *     },
 *     /**
 *      * Optional function called when the menu button is executed.
 *      * If the function returns boolean false, the request is not
 *      * send. The name of the test is passed as argument.
 *      * /
 *     execute : function( testName )
 *     {
 *        // "this" refers to the main application
 *        return true;
 *     },
 *     /**
 *      * The request model data. Each value overrides an existing
 *      * property. Other properties are kept.
 *      * / 
 *     requestData : {
 *       url     : "http://", 
 *       service : "my.service.name",
 *       method : "myMethodName",
 *       params : ["arg1", "arg2", [ "arg", 3] ]
 *     },
 *     /**
 *      * Optional callback function called after the result of the
 *      * request has returned from the server.
 *      * /
 *     callback : function( response ){
 *       this.getActiveConsole().getRequestModel().setServerData(
 *        // do something with the response, for example, change
 *        // the server data like here
 *        // "this" refers to the main application
 *       );
 *     }
 *   },
 *   
 *   testName2 : {
 *    ...
 *   },
 *   
 *   testName3 : {
 *    ...
 *   }
 *   ...
 * }
 * </pre>
 */
qx.core.Init.getApplication().setTestData(
{  
  
   /**
   * Call echo service
   * @type 
   */
  qooxdooTestEcho : {
    label       : "qooxdoo.test.echo - Send a simple 'hello world' message to be echoed by the server.",
    init        : function( button, testName )
    {
      var data = this.getTestData( testName );
      this.info( "Intializing " + testName + ", calling " + data.requestData.service );
    },
    requestData : {
      service : "qooxdoo.test",
      method : "echo",
      params : ["Hello World!"],
      serverData : {
        authentication : {
          username : "Foo",
          password : "Bar"
        }
      }
    }
  },   
  
  /**
   * Use the trunk server
   */
  useTrunk : {
    label : "Use RpcPhp trunk server ",
    requestData : {
      url : "../../../../../RpcPhp/trunk/services/index.php"
    }
  },
  
  /**
   * Use the stable server
   * @type 
   */
  useStable : {
    label : "Use RpcPhp stable (1.0.1) server ",
    requestData : {
      url : "../../../../../RpcPhp/1.0.1/services/index.php"
    }
  },  
  
  /**
   * Demo showing how to connect several test data items.
   * @type 
   */
  combineJobs :
  {
    label : "Test Combined Jobs",  
    execute: function()
    {
      this.info("First call.");
      this.runTest( "qooxdooTestEcho", function(result)
      {
        this.info("Second call.")
        this.runTest( "qooxdooTestEcho", function(result)
        {
          this.info("Test completed.");
        });
      });
    }
  },  
  
  /**
   * load test data from file
   */
  loadTestData : {
    label : "Load test data from file",
    init : function(){
      this.info("Test data ready.")
    },
    execute : function(){
      var testDataUrl = prompt("Enter Test Data URL:");
      if ( ! testDataUrl ) return;
      try 
      {
        qx.util.Validate.url()(testDataUrl); 
        this.loadTestData( testDataUrl );  
      }
      catch(e)
      {
        alert("Please enter a valid URL");
      }
    }
  }
});