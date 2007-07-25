qx.Class.define("guiBuilder.content.save.js.Generic",
{
  extend : qx.core.Target,

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  
  members :
  {
    
    getCode : function(formObject, parent, appArea)
    {
      return this._getCode(formObject, parent, appArea, 'SIMPLE');       
    },

    getClassCode : function(formObject, parent, appArea)
    {
      return this._getCode(formObject, parent, appArea, 'CLASS');
    },

    getPropertiersCode : function(formObject, parent, appArea)
    {
      var propCode = '';
      
      propCode += formObject._name+" : \n";
      propCode += "{ \n";      
      propCode += '  check  : "'+formObject.classname+'"'+"\n";            
      propCode += "},\n";      
      

      
      propCode += this._parseChildren(formObject, appArea, 'PROP');
      
      return propCode;
    },
    
    _getCode : function(formObject, parent, appArea, mode)
    {
      var cName  = formObject._name;
      var cClass = formObject.classname; 
      
      var jsCode = 'var '+cName+' = new '+cClass+'();'+"\n";
      
      if (formObject._attr)
        jsCode += this._getAttributes(formObject);

      if (formObject._listener)
        jsCode += this._getEvents(formObject);
        
      if (parent != null)
        jsCode += this._addToParent(formObject, parent, mode);
      
      jsCode += "\n";
      
      if (formObject.getChildren)
        jsCode += this._parseChildren(formObject, appArea, mode);            
              
      return jsCode;        
    },
    
    _getAttributes : function(formObject)
    {
      var cName  = formObject._name;
      var cClass = formObject.classname;     
    
      var jsCode = '';
    
      for ( keyVar in formObject._attr ) 
      {
        valueVar = formObject._attr[keyVar];
          
        nameVar = keyVar.substr(0, 1).toUpperCase() + keyVar.substr(1);
          
        if (valueVar == null)
          continue;
          
        if (parseInt(valueVar) != valueVar)          
        {
          if (valueVar.replace)
            valueVar = valueVar.replace(new RegExp("\\n", "g"), '\\'+'n');
               
          jsCode += cName+'.set'+nameVar+'("'+valueVar+'");'+"\n";          
        } else {
          jsCode += cName+'.set'+nameVar+'('+valueVar+");"+"\n";
        }  
      }    
      
      return jsCode;
    },

    _getEvents : function(formObject)
    {    
      var cName  = formObject._name;    
    
      var jsCode = '';    
      for ( eventName in formObject._listener ) 
      {
        eventText = formObject._listener[eventName];
         
        jsCode += cName+'.addEventListener("'+eventName+'", function(e) {'+
                  eventText+'}, this);'+"\n";
      }    
      
      return jsCode;
    },
    
    _addToParent : function(formObject, parent, mode)
    {
      var cName  = formObject._name;
      var pName  = parent._name;
      var cClass = formObject.classname;     
    
      var jsCode = '';    
      
      if (parent._isAppSpace)
      {
        if (mode == 'CLASS')
        {
          jsCode += "this.add("+cName+');'+"\n";
        } else {
          jsCode += cName+'.addToDocument();'+"\n";
        }
      } else {
        jsCode += pName+'.add('+cName+');'+"\n";
      }        
      
      if (mode != 'CLASS')      
        return jsCode;      

      var componentNameFirst = cName.substr(0, 1);
      componentNameFirst = componentNameFirst.toUpperCase();
      componentNameProp = componentNameFirst+cName.substr(1);
          
      jsCode += 'this.set'+componentNameProp+'('+cName+');'+"\n";
      
      return jsCode;              
    },
    
    _parseChildren : function(formObject, appArea, mode)
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