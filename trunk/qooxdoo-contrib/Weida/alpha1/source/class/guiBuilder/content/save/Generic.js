qx.Class.define("guiBuilder.content.save.Generic",
{
  extend : qx.core.Target,
  
  members :
  {
       
    _chooseHandler : function(formObject)
    {
      var className = formObject.classname;
      
      if (this._parsedComponentXML[className] && this._parsedComponentXML[className]['node'].attributes['saveHandler'])
      {

        var saveHandlerClassName = this._parsedComponentXML[className]['node'].attributes['saveHandler'].value
        saveHandlerClassName = this._baseClassName+saveHandlerClassName;      

        if (this._handlerHolder[className])
        {
          var handler = this._handlerHolder[className];
        } else {
          var classConstructor = qx.Class.getByName(saveHandlerClassName);
          if (!classConstructor) {
            throw this._newError("constructor not found", { saveHandlerClassName : saveHandlerClassName });
          }
          
          var handler = new classConstructor();
          this._handlerHolder[className] = handler;
        }

      } else {
        
        var handlerName = 'Generic';
        if (className == 'guiBuilder.NonVisualComp') 
          handlerName = 'NonVisual';
        
        if (this._handlerHolder[handlerName])
        {
          var handler = this._handlerHolder[handlerName];
        } else  {
                
          var classNameGeneric = this._baseClassName+handlerName;
          var classConstructor = qx.Class.getByName(classNameGeneric);          
          if (!classConstructor) {
            throw this._newError("constructor not found", { saveHandlerClassName : saveHandlerClassName });
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