qx.Class.define("guiBuilder.content.save.js.Tree",
{
  extend : guiBuilder.content.save.js.Generic,

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  
  members :
  {
    _parseChildren : function(formObject, appArea, mode)
    {
      var children = formObject.getItems(false, true);
      
      var jsCode = '';
      
      var a = null;
      for (i in children)
      {        
        /* getList contains also the parent itsels, if we don't skip it we go into an endless loop*/        
        if (formObject == children[i])  
          continue
      
        if (!children[i]._name)
          continue;
          
        var handler = this._controller._chooseHandler(children[i]);
        
        if (mode == 'CLASS')
          jsCode += handler.getClassCode(children[i], formObject, appArea);

        if (mode == 'SIMPLE')
          jsCode += handler.getCode(children[i], formObject, appArea);

        if (mode == 'PROP')
          jsCode += handler.getPropertiersCode(children[i], formObject, appArea);
      }      
      
      return jsCode;      
    }
  }
});