qx.Class.define("guiBuilder.content.save.XML",
{
  extend : guiBuilder.content.save.Generic,
  
  members :
  {
    generate : function(appArea)
    {
      this._baseClassName = 'guiBuilder.content.save.xml.'
      this._handlerHolder = new Object();
      
      /* First the appspace itself */
    
      var children = appArea.getChildren();
      var childCount = appArea.getChildrenLength();
      
      var xmlContent = '<form>'+"\n";
      
      for (var i = 0; i < childCount; i++)
      {
        if (!children[i]._name)
          continue;
          
        var handler = this._chooseHandler(children[i]);
        xmlContent += handler.getXML(children[i], appArea, appArea);
      }        
     
      /* And now the non visual comp space*/
            
      var children = appArea._appNonVisualSpace.getChildren();
      var childCount = appArea._appNonVisualSpace.getChildrenLength();

      xmlContent += '  <nonvisual>'+"\n";
                        
      for (var i = 0; i < childCount; i++)
      {      
        var handler = this._chooseHandler(children[i]);
        xmlContent += handler.getXML(children[i], appArea, appArea);
      }        

      xmlContent += '  </nonvisual>'+"\n";
      
      xmlContent += '</form>'+"\n";
      
      return xmlContent;
    },
    
    generateSingle : function(formObject, appArea)
    {
      this._baseClassName = 'guiBuilder.content.save.xml.'
      this._handlerHolder = new Object();
      
      var handler = this._chooseHandler(formObject);
      xmlContent = handler.getXML(formObject, appArea, appArea);
            
      return xmlContent;    
    }
            
  }
});