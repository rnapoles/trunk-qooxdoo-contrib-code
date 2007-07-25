qx.Class.define("guiBuilder.Config",
{
  extend : qx.core.Target,
  type : "singleton",

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    backendURL : 
    {
      check: "String"
    },
    
    projectURL : 
    {
      check : "String"
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    
    load : function()
    {
      var url = '../config/config.xml';      
      var req = new qx.io.remote.Request(url, "GET", qx.util.Mime.XML);
      
      req.setAsynchronous(false);
      req.addEventListener("completed", function(e)
        {
   
          var content = e.getData().getContent();    
          
          var subContent = content.getElementsByTagName('backendURL').item(0);
          var backendURL = qx.lang.String.trim(subContent.textContent);
          this.setBackendURL(backendURL);
          
          var subContent = content.getElementsByTagName('projectURL').item(0);
          var projectURL = qx.lang.String.trim(subContent.textContent);
          this.setProjectURL(projectURL);
             
        }, this); 

      req.send();       

    }
    
  }  

});