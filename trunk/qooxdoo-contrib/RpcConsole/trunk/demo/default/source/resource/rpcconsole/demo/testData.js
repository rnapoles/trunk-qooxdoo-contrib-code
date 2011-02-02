/**
 * Calls the setTestData() method of the rpcconsole.demo.Application app with
 * a map of test data from which the test menu will be populated. The map
 * must have the following structure:
 * <pre>
 * {
 *   testName : {
 *     label : "The label in the menu",
 *     icon : "path/to/the/optional-icon.png",
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
 *     callback : function( result ){
 *        // do something with the response, for example, change
 *        // the server data like here
 *        // "this" refers to the main application    
 *       this.getActiveConsole().getRequestModel().setServerData(
 *         foo : response.bar
 *       );
 *     },
 *     /**
 *      * Optional data to compare the result with an expected.
 *      * If the value is a function, this function must return
 *      * true if the result is correct, false, if the result is 
 *      * wrong. You can also return a string which is taken as
 *      * an error message.  
 *      * Alternatively, the data can be of any native data type
 *      * (boolean, null, string, array, object) and will be
 *      * compared verbatim to the result by jsonifying both 
 *      * values. "callback" and "checkResult" are mutually
 *      * exclusive. 
 *      * /
 *     checkResult : function( result )
 *     {
 *       if (result == "foo!")
 *       {
 *         return true;
 *       }
 *       return "Result is wrong!"; 
 *     }
 *   },
 *   
 *   testName2 : {
 *    // don't show a corresponding menu button 
 *    visible : false,
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
   * Run automated tests 
   */
  runAutomatedTests : {
    label : "Execute qooxdoo.test.* test suite",
    execute : function(){
      this.info( "Starting test suite ");
      this.runTests("qooxdoo.test.*");
    }
  },
  
  /**
   * Load introspection tests
   */
  loadIntrospectionTests : {
    label : "Load introspection tests (RpcPhp only)",
    execute : function(){
      this.loadTestData("resource/rpcconsole/demo/testIntrospection.js");
    }
  },  
  
  /**
   * qooxdoo.test test suite
   * powered by Derrell Lipman
   */
  "qooxdoo.test.getInteger" : 
  {
    visible : false,
    requestData : {
      service : "qooxdoo.test",
      method  : "getInteger",
      timeout : 10,
      params : []
    },
    checkResult : 1
  },
  
  "qooxdoo.test.getFloat" : 
  {
    visible : false,   
    requestData : {
      service : "qooxdoo.test",
      method  : "getFloat"
    },     
    checkResult : 1/3
  },
  
  "qooxdoo.test.getString" : 
  {
    visible : false,    
    requestData : {
      service : "qooxdoo.test",
      method  : "getString"
    },      
    checkResult : "Hello world"
  },
  
  "qooxdoo.test.getBadString": 
  {
    visible : false,   
    requestData : {
      service : "qooxdoo.test",
      method  : "getBadString"
    },               
    checkResult : "<!DOCTYPE HTML \"-//IETF//DTD HTML 2.0//EN\">"
  },
  
  "qooxdoo.test.getArrayInteger": 
  {
    visible : false,   
    requestData : {
      service : "qooxdoo.test",
      method  : "getArrayInteger"
    },  
    checkResult : [ 1, 2, 3, 4 ]
  },
  
  "qooxdoo.test.getArrayString" : 
  {
    visible : false,    
    requestData : {
      service : "qooxdoo.test",
      method  : "getArrayString"
    },  
    checkResult : [ "one", "two", "three", "four" ]
  },
  
  "qooxdoo.test.getObject" : 
  {
    visible : false,   
    requestData : {
      service : "qooxdoo.test",
      method  : "getObject"
    },               
    checkResult : {"use":0}
  },
  
  "qooxdoo.test.getTrue" : 
  {
    visible : false,    
    requestData : {
      service : "qooxdoo.test",
      method  : "getTrue"
    },              
    checkResult : true
  },
  
  "qooxdoo.test.getFalse" : 
  {
    visible : false,  
    requestData : {
      service : "qooxdoo.test",
      method  : "getFalse"
    },                
    checkResult : false
  },
  
  "qooxdoo.test.getNull" : 
  {
    visible : false,         
    requestData : {
      service : "qooxdoo.test",
      method  : "getNull"
    },
    checkResult : null
  },

  "qooxdoo.test.isInteger" : 
  {
    visible : false,  
    requestData : {
      service : "qooxdoo.test",
      method  : "isInteger",
      params : [ 1 ]
    },
    checkResult : true
  },
  
  "qooxdoo.test.isFloat" : 
  {
    visible : false,        
    requestData : {
      service : "qooxdoo.test",
      method  : "isFloat",
      params : [ 1/3 ]
    },
    checkResult : true
  },
  
  "qooxdoo.test.isString" : 
  {
    visible : false,        
    requestData : {
      service : "qooxdoo.test",
      method  : "isString",
      params : [ "Hello World!" ]
    },
    checkResult : true
  },
  
  "qooxdoo.test.isBoolean" : 
  {
    visible : false,        
    requestData : {
      service : "qooxdoo.test",
      method  : "isBoolean",
      params : [ true ]
    },
    checkResult : true
  },
  
  "qooxdoo.test.isArray" : 
  {
    visible : false,        
    requestData : {
      service : "qooxdoo.test",
      method  : "isArray",
      params : [ [1,2,3] ]
    },
    checkResult : true
  },
  
  "qooxdoo.test.isObject": 
  {
    visible : false,        
    requestData : {
      service : "qooxdoo.test",
      method  : "isObject",
      params : [ { "foo" : "bar" } ]
    },
    checkResult : true
  },
  
  "qooxdoo.test.isNull" : 
  {
    visible : false,        
    requestData : {
      service : "qooxdoo.test",
      method  : "isNull",
      params : [ null ]
    },
    checkResult : true
  },
  
  "qooxdoo.test.getParams" : 
  {
    visible : false,
    requestData : {
      service : "qooxdoo.test",
      method  : "getParams",
      params : [ null, false, 1, 2.3, "one", [ 1,2,4], { "foo" : "bar" } ]
    },
    checkResult : [ null, false, 1, 2.3, "one", [ 1,2,4], { "foo" : "bar" } ]
  },
  
  "qooxdoo.test.getParam": 
  {
    visible : false,        
    requestData : {
      service : "qooxdoo.test",
      method  : "getParam",
      params : [ { "foo" : "bar" } ]
    },
    checkResult : { "foo" : "bar" }
  },
  
  "qooxdoo.test.getError":{
    "visible":false,
    "requestData":{
      service : "qooxdoo.test",
      "method":"getError",
      params : []
    },
    checkError : function(error)
    {
      // There are two implementations that return different error codes.
      // Accept either.
      return (error.code == 23 || error.code == 42);
    }
  } 
});
