qx.Class.define("guiBuilder.content.save.xml.SplitPane",
{
  extend : guiBuilder.content.save.xml.Generic,

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  
  members :
  {
    _parseChildren : function(formObject, appArea, mode)
    {
      var xmlContent = '';
      
      xmlContent += '<first>'+"\n";               
      var xmlContentSub = this._subParseChildren(formObject.getFirstArea(), appArea, mode);      
      xmlContent += '  '+xmlContentSub.replace(new RegExp("\\n", "g"), "\n  ");      
      xmlContent += '</first>'+"\n";         

      xmlContent += '<second>'+"\n";         
      xmlContentSub = this._subParseChildren(formObject.getSecondArea(), appArea, mode);      
      xmlContent += '  '+xmlContentSub.replace(new RegExp("\\n", "g"), "\n  ");      
      xmlContent += '</second>'+"\n";         
      
      return xmlContent;
    },
    
    _subParseChildren : function(formObject, appArea, mode)
    {        
      var children   = formObject.getChildren();
      var childCount = formObject.getChildrenLength();
      
      var xmlContent = '';
      
      for (var i = 0; i < childCount; i++)
      {
        if (!children[i]._name)
          continue;
          
        var handler = this._controller._chooseHandler(children[i]);
        
        xmlContent += handler.getXML(children[i], formObject, appArea);
      }      
      
      return xmlContent;   
    }
  }
});