qx.Class.define("guiBuilder.content.save.JavaScript",
{
  extend : guiBuilder.content.save.Generic,
  
  members :
  {

    generate : function(appArea)
    {
      this._baseClassName = 'guiBuilder.content.save.js.'    
      this._handlerHolder = new Object();
    
      var children   = appArea.getChildren();
      var childCount = appArea.getChildrenLength();
      
      var jsCode = '';
      
      for (var i = 0; i < childCount; i++)
      {
        if (!children[i]._name)
          continue;
          
        var handler = this._chooseHandler(children[i]);
        jsCode += handler.getCode(children[i], appArea, appArea);
      }          
      
      return jsCode;
    }
    
  }
});