qx.Class.define("guiBuilder.content.openFile",
{  
  extend : qx.core.Target,

  properties : 
  { 
 
    projectName : 
    { 
      check    : "String"
    },
 
    fileName : 
    { 
      check    : "String"
    },

    fullFileName : 
    { 
      check    : "String"
    },
 
    modified : 
    { 
      check    : "Boolean",
      init : false
    }
    
  }, 
  
  members : 
  {
  
    
  }
      
});