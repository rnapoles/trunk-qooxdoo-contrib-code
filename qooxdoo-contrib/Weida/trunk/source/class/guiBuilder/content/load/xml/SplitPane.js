qx.Class.define("guiBuilder.content.load.xml.SplitPane",
{
  extend : guiBuilder.content.load.xml.Generic,
  
  members :
  {
    
    _buildChildren : function(content, component, parent, appArea)
    {
      this._subBuildChildren('first', content, component.getFirstArea(), parent, appArea);
      this._subBuildChildren('second', content, component.getSecondArea(), parent, appArea);      
    },
    
    _subBuildChildren : function(nodeName, content, component, parent, appArea)    
    {
      var componentNode = null;

      var i = 0;
      for (var i=0; i<content.childNodes.length; i++)
      {
        var node = content.childNodes[i];      

        if (node.nodeType != 1)        
          continue;
          
        if (node.tagName == nodeName)
          componentNode = node;
      }          
    
      if (componentNode == null)
        return false;
    
      var i = 0;
      for (var i=0; i<componentNode.childNodes.length; i++)
      {
        var node = componentNode.childNodes[i];      

        if (node.nodeType != 1)        
          continue;
          
        if (node.tagName != 'component')
          continue;
        
        var handler = this._controller._chooseHandler(node.attributes['class'].value);
        handler.buildComponent(node, component, appArea);
      }         
    }        
    
  }
});