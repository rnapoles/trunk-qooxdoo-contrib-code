qx.Class.define("guiBuilder.content.save.js.SplitPane",
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
      var jsCode = '';
      jsCode += 'var splitPaneFirst = '+formObject._name+'.getFirstArea();'+"\n";         
      var firstPane = formObject.getFirstArea();
      firstPane._name = 'splitPaneFirst';        
      jsCode += this._subParseChildren(firstPane, appArea, mode);      
      delete firstPane._name;

      jsCode += 'var splitPaneSecond = '+formObject._name+'.getSecondArea();'+"\n";         
      var secondPane = formObject.getSecondArea();
      secondPane._name = 'splitPaneSecond';        
      jsCode += this._subParseChildren(secondPane, appArea, mode);      
      delete secondPane._name;
      
      return jsCode;
    },
    
    _subParseChildren : function(formObject, appArea, mode)
    {
      var children   = formObject.getChildren();
      var childCount = formObject.getChildrenLength();
      
      var jsCode = '';
      
      for (var i = 0; i < childCount; i++)
      {
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