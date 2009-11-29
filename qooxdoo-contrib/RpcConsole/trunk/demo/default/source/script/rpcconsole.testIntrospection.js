/**
 * Test service introspection
 */
qx.core.Init.getApplication().setTestData(
{  
  /**
   * Service introspection 
   */
  listMethods : {
    label : "Service introspection (trunk only): listMethods",
    requestData : {
      service : "qooxdoo.test",
      method : "listMethods"
    },
    callback : function( result )
    {
      this.getActiveConsole().setMethodListModel( new qx.data.Array(result) );
      var rqm = this.getActiveConsole().getRequestModel();
      var alertStr = "Service '" + rqm.getService() +" contains the following methods: \n";
      alertStr += result.join(", ");
      alert( alertStr );
    }
  },
  methodSignature : {
    label : "Service introspection (trunk only): methodSignature",
    requestData : {
      service : "qooxdoo.test",
      method : "methodSignature",
      params : ["methodSignature"]
    },
    callback : function( result )
    {
      var rqm = this.getActiveConsole().getRequestModel();
      var alertStr = "Service '" + rqm.getService() + "', method '" + rqm.getMethod() + "'"+
        " has the following signature: \n";
      var returnType = result.shift();
      while( result.length )
      {
        alertStr += "@param " + result.shift() + "\n";
      }
      alertStr += "@return " + returnType;
      alert( alertStr );
    }
  },
  methodHelp : {
    label : "Service introspection (trunk only): methodHelp",
    requestData : {
      service : "qooxdoo.test",
      method : "methodHelp",
      params : ["methodHelp"]
    },
    callback : function( result )
    {
      var rqm = this.getActiveConsole().getRequestModel();
      var alertStr = "Service '" + rqm.getService() + "', method '" + rqm.getMethod() + "':\n" + result;
      alert( alertStr );      
    }
  }
});