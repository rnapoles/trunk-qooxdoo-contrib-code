 /**
  * qooxdoo.test test suite
  * designed by Derrell Lipman
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
   * Run automated tests 
   */
  runAutomatedTests : {
    label : "Execute qooxdoo.test.* test suite",
    execute : function(){
      this.info( "Starting test suite ");
      this.runTests("qooxdoo.test.*");
      this.runTests("nodetest.*");
    }
  },

  
  "qooxdoo.test.sleep" : 
  {
    visible : false,
    mode : "non-standard",
    requestData : {
      service : "qooxdoo.test",
      method  : "sleep",
      timeout : 10,
      params : [2]
    }
  }, 
  
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
    checkResult : {"foo":"bar"}
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
      params : [ null, false, 1, "one", [ 1,2,4], { "foo" : "bar" } ]
    },
    checkResult : [ null, false, 1, "one", [ 1,2,4], { "foo" : "bar" } ]    
  },
  
  "qooxdoo.test.getParam": 
  {
    visible : false,        
    requestData : {
      service : "qooxdoo.test",
      method  : "getParam",
      params : [ null, false, 1, "one", [ 1,2,4], { "foo" : "bar" } ]
    },
    checkResult : null
  },
  
  "qooxdoo.test.getCurrentTimestamp" :
  {
    visible : false,        
    requestData : {
      service : "qooxdoo.test",
      method  : "getCurrentTimestamp",
      params  : []
    },
    
    checkResult : function( result ) {
// @todo reenable response check
//      if ( qx.lang.Type.isDate( result ) )
//      {
//        return true;
//      }
//      return "Response is not a date!";
      return true;
    }
  },
  
  "qooxdoo.test.getError":{
    "visible":false,
    "requestData":{
      service : "qooxdoo.test",
      "method":"getError",
      "params" : []
    }
  },
  
  
  "nodetest.add" : 
  {
    visible : false,
    requestData : {
      service : "nodetest",
      method  : "add",
      params : [ 1,2 ]
    },
    checkResult : 3    
  },
  
 "nodetest.add" : 
  {
    visible : false,
    requestData : {
      service : "nodetest",
      method  : "note",
      params : [ "foo","bar" ]
    },
    checkResult : "foo:bar"
  },
  
  "nodetest.ls" : 
  {
    visible : false,
    requestData : {
      service : "nodetest",
      method  : "ls",
      params : []
    },
    checkResult : "Application.js\nservice\nstart-server.js\ntest\ntheme\n"
  },
  
  "nodetest.pwd" : 
  {
    visible : false,
    requestData : {
      service : "nodetest",
      method  : "pwd",
      params : []
    }
  },
  
  "nodetest.shell_echo" : 
  {
    visible : false,
    requestData : {
      service : "nodetest",
      method  : "shell_echo",
      params : ["hello world"]
    },
    checkResult : "hello world\n"
  },
  
  "nodetest.shell_error" : 
  {
    visible : false,
    requestData : {
      service : "nodetest",
      method  : "shell_error",
      params : []
    }
  }
});