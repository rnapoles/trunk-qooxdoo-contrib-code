qx.Class.define("guiBuilder.content.load.XML",
{
  extend : qx.core.Target,
  
  members :
  {
    load : function(content, appArea)
    {      
      this._baseClassName = 'guiBuilder.content.load.xml.'   
      this._handlerHolder = new Object();
    
      content = content.childNodes[0];       
      
      var i = 0;
      for (var i=0; i<content.childNodes.length; i++)
      {
        var node = content.childNodes[i];      

        if (node.nodeType != 1)        
          continue;
        
        if (node.tagName != 'component')
          continue;
        
        className = node.attributes['class'].value;
        
        var handler = this._chooseHandler(className);
        handler.buildComponent(node, appArea, appArea);                   
      }
      
      
      var nonVisualNode = false;
      var i = 0;
      for (var i=0; i<content.childNodes.length; i++)
      {
        var node = content.childNodes[i];      

        if (node.nodeType == 1 && node.tagName == 'nonvisual')        
          nonVisualNode = node;                  
      }
      

      var i = 0;
      for (var i=0; i<nonVisualNode.childNodes.length; i++)
      {
        var node = nonVisualNode.childNodes[i];      

        if (node.nodeType != 1)        
          continue;
        
        if (node.tagName != 'component')
          continue;
        
        className = node.attributes['class'].value;

        var handler = this._chooseHandler(className);
        handler.buildComponent(node, appArea, appArea);                   
      }
      
      
    },

    loadSingle : function(content, parent, appArea)
    {      
      this._baseClassName = 'guiBuilder.content.load.xml.'   
      this._handlerHolder = new Object();
    
      content = content.childNodes[0];       

      className = content.attributes['class'].value;
      
      var handler = this._chooseHandler(className);
      handler.buildComponent(content, parent, appArea);                   
    },

    _chooseHandler : function(className)
    {
      
      if (this._parsedComponentXML[className] && this._parsedComponentXML[className]['node'].attributes['loadHandler'])
      {
        
        var loadHandlerClassName = this._parsedComponentXML[className]['node'].attributes['loadHandler'].value
        loadHandlerClassName = this._baseClassName+loadHandlerClassName;      

        if (this._handlerHolder[className])
        {
          var handler = this._handlerHolder[className];
        } else {
          var classConstructor = qx.Class.getByName(loadHandlerClassName);
          if (!classConstructor) {
            throw this._newError("constructor not found", { loadHandlerClassName : loadHandlerClassName });
          }
          
          var handler = new classConstructor();
          this._handlerHolder[className] = handler;
        }

      } else {

        var handlerName = 'Generic';
        if (this._parsedComponentXML[className] && this._parsedComponentXML[className]['node'].attributes['nonvisual'])
          handlerName = 'NonVisual';

        if (this._handlerHolder[handlerName])
        {
          var handler = this._handlerHolder[handlerName];
        } else  {
                
          var classNameGeneric = this._baseClassName+handlerName;
          var classConstructor = qx.Class.getByName(classNameGeneric);          
          if (!classConstructor) {
            throw this._newError("constructor not found", { loadHandlerClassName : loadHandlerClassName });
          }          
          var handler = new classConstructor();          
          this._handlerHolder[handlerName] = handler;
        }  

      }

      handler._controller = this;
      return handler;
    }
    
  }
});