qx.Class.define("guiBuilder.content.save.JavaScriptClass",
{
  extend : guiBuilder.content.save.Generic,
  
  members :
  {
    generate : function(appArea)
    {
      this._baseClassName = 'guiBuilder.content.save.js.'    
      this._handlerHolder = new Object();
    
      var javaScriptCode = this.getJSCode(appArea);
      var propertiesCode = this.getPropertiesCode(appArea);;
      
      /* Add the needed empty spaces left of a line */       
      javaScriptCode = '    '+javaScriptCode.replace(new RegExp("\\n", "g"), "\n    ");
      propertiesCode = '    '+propertiesCode.replace(new RegExp("\\n", "g"), "\n    ");
      
      jsClass  = 'qx.Class.define("#CLASSNAME#",'+"\n";
      jsClass += "{  \n";
      jsClass += "  extend : qx.ui.layout.CanvasLayout,\n";

      jsClass += "  construct: function() { \n";      
      jsClass += "    this.base(arguments);\n";        
      jsClass +=      javaScriptCode;
      jsClass += "  }, \n";

      jsClass += " \n";      
      jsClass += "  properties : \n";
      jsClass += "  { \n";
      jsClass += " \n";   
      jsClass +=      propertiesCode;
      jsClass += " \n";      
      jsClass += "  } \n\n";            
           
      jsClass += "});";    
            
      return jsClass;
    },
    
    getJSCode : function(appArea)
    {
      var children   = appArea.getChildren();
      var childCount = appArea.getChildrenLength();
      
      var jsCode = '';
      
      for (var i = 0; i < childCount; i++)
      {
        if (!children[i]._name)
          continue;
          
        var handler = this._chooseHandler(children[i]);
        
        jsCode += handler.getClassCode(children[i], appArea, appArea);
      }          
      
      return jsCode;
    },

    getPropertiesCode : function(appArea)
    {
      var children   = appArea.getChildren();
      var childCount = appArea.getChildrenLength();
      
      var propCode = '';
      
      for (var i = 0; i < childCount; i++)
      {
        if (!children[i]._name)
          continue;
          
        var handler = this._chooseHandler(children[i]);
                
        propCode += handler.getPropertiersCode(children[i], appArea, appArea);
      }          
      
      propCode = propCode.substr(0, propCode.length-2);
      
      return propCode;
    }
    
  }
});