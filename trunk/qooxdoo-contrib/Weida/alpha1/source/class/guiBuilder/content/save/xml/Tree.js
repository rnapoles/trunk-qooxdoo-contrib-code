qx.Class.define("guiBuilder.content.save.xml.Tree",
{
  extend : guiBuilder.content.save.xml.Generic,

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  
  members :
  {
    _parseChildren : function(formObject, appArea)
    {    
      var children = formObject.getItems(false, true);
      
      var xmlContent = '';
      
      var a = null;
      for (i in children)
      {        
        /* getList contains also the parent itsels, if we don't skip it we go into an endless loop*/        
        if (formObject == children[i])  
          continue
      
        if (!children[i]._name)
          continue;
          
        var handler = this._controller._chooseHandler(children[i]);
        
        xmlContent += handler.getXML(children[i], formObject, appArea);
      }      
      
      return xmlContent;      
    }
  }
});