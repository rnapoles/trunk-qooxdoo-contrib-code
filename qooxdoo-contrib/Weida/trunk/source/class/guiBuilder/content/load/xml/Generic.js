qx.Class.define("guiBuilder.content.load.xml.Generic",
{
  extend : qx.core.Target,
  
  members :
  {
  
    buildComponent : function(content, parent, appArea)
    {
      var component = this._createComponent(content, parent, appArea);
     
      this._addEventHandler(content, component, parent, appArea);
  
      this._assignInitAttributes(content, component, parent, appArea);      
      this._assignAttributes(content, component, parent, appArea);      
      this._assignEvents(content, component, parent, appArea);      
      
      this._buildChildren(content, component, parent, appArea);
    },    
    
    _createComponent : function(content, parent, appArea)
    {
      this.debug(content.attributes['class'].value);
      
      var className = content.attributes['class'].value;
      
      var classConstructor = qx.Class.getByName(className);
      if (!classConstructor) {
        throw this._newError("constructor not found", { className : className });
      }

      var component = new classConstructor();      
      
      component._attr = new Object;  // we need to create this very early!
      component._listener = new Object; 
      component._name = content.attributes['name'].value;
      
      if (!this._controller._parsedComponentXML[className])
        return false;
      
      var componentXML = this._controller._parsedComponentXML[className];
      
      component._properties = componentXML['properties'];
      component._events = componentXML['events'];      
      if (componentXML['node'].attributes['icon'])
        component._icon       = componentXML['node'].attributes['icon'].value;
      if (componentXML['node'].attributes['iconTree'])
        component._iconTree   = componentXML['node'].attributes['iconTree'].value;        

      if (componentXML['node'].attributes['handler'])
        component._handler    = componentXML['node'].attributes['handler'].value;    

      if (componentXML['node'].attributes['handler'])
        component._handler    = componentXML['node'].attributes['handler'].value;   
      
      parent.add(component);
                  
      return component;
    },
    
    _addEventHandler : function(content, component, parent, appArea)
    {
      var className = content.attributes['class'].value;
      componentXML = this._controller._parsedComponentXML[className];

      var realAppArea = appArea._parentAppArea;
      component.addEventListener("click", realAppArea.formElementClicked, realAppArea);   
      
      if (!componentXML['node'])
        return false;    
 
            
      if (!componentXML['node'].attributes['parent'])   
        return;              
      component._parent = true;
      component.addEventListener("dragdrop", realAppArea.appAreaDrop, realAppArea);                  
      component.supportsDrop = realAppArea.supportDrop;
      component.setDropDataTypes(["qx.ui.tree.AbstractTreeElement"]);                 
    },
    
    _assignInitAttributes : function(content, component, parent, appArea)
    {
      var className = content.attributes['class'].value;
      componentXML = this._controller._parsedComponentXML[className];
      
      if (!componentXML['propertiesInit'])
        return false;
        
      
      for (var propertyName in componentXML['propertiesInit'])
      {
        if (componentXML['propertiesInit'][propertyName].attributes['set'])
          if (componentXML['propertiesInit'][propertyName].attributes['set'].value == "false")
            continue;
       
        value = componentXML['propertiesInit'][propertyName].attributes['value'].value;
         
        // is it a number ?
        var n = new Number(value);
        if (!isNaN(n)) 
        {
          value = n.valueOf();
        }  
                  
        // this is sometimes needed to overwrite attributes         
        if (value == '#NULL#') 
          value = null;
        
        this.setComponentProperties(component, propertyName, [ value] );
      }     
        
    },
    
    _assignAttributes : function(content, component, parent, appArea)
    {
      var propertiesNode = null;

      var i = 0;
      for (var i=0; i<content.childNodes.length; i++)
      {
        var node = content.childNodes[i];      

        if (node.nodeType != 1)        
          continue;
          
        if (node.tagName == 'properties')
          propertiesNode = node;
      }    
          
      if (propertiesNode == null)
        return false;
      
      var className = content.attributes['class'].value;
      var componentXML = this._controller._parsedComponentXML[className]; 
      
      var i = 0;
      for (var i=0; i<propertiesNode.childNodes.length; i++)
      {
        var node = propertiesNode.childNodes[i];      

        if (node.nodeType != 1)        
          continue;
          
        if (node.tagName != 'property')
          continue;
        
        var propName  = node.attributes['name'].value;        
        var propValue = node.textContent;        
         
        this.debug(propName+' = '+propValue);
     
        // is it a number ?
        var n = new Number(propValue);
        if (!isNaN(n)) 
        {
          propValue = n.valueOf();
        }  
                  
        // this is sometimes needed to overwrite attributes         
        if (propValue == '#NULL#')
          propValue = null;

        var propType = this._getTypeForProperty(propName, content);

        if (propType == 'boolean')
        {
          alert("X");
          if (propValue == 'true')
          {
            propValue = true;
          } else {
            propValue = false;
          }
        }
        
        this.setComponentProperties(component, propName, [ propValue] );
      }           
    },
    
    _assignEvents : function(content, component, parent, appArea)
    {
      component._listener = new Object();
    
      var eventsNode = null;

      var i = 0;
      for (var i=0; i<content.childNodes.length; i++)
      {
        var node = content.childNodes[i];      

        if (node.nodeType != 1)        
          continue;
          
        if (node.tagName == 'events')
          eventsNode = node;
      }    
          
      if (eventsNode == null)
        return false;
            
      var i = 0;
      for (var i=0; i<eventsNode.childNodes.length; i++)
      {
        var node = eventsNode.childNodes[i];      

        if (node.nodeType != 1)        
          continue;
          
        if (node.tagName != 'event')
          continue;
        
        var eventName  = node.attributes['name'].value;        
        var eventText = node.textContent;        
         
        this.debug(eventName+' = '+eventText);
             
        component._listener[eventName] = eventText;
      }           
    },

    _getTypeForProperty : function(propertyName, content)
    {      
      var className = content.attributes['class'].value;

      var componentXML = this._controller._parsedComponentXML[className]; 
      var properties = componentXML['properties'];      
      var property = properties[propertyName];
      
      return property.attributes['type'].value;                 
    },
    
    _buildChildren : function(content, component, parent, appArea)
    {
      var i = 0;
      for (var i=0; i<content.childNodes.length; i++)
      {
        var node = content.childNodes[i];      

        if (node.nodeType != 1)        
          continue;
          
        if (node.tagName != 'component')
          continue;
        
        var handler = this._controller._chooseHandler(node.attributes['class'].value);
        handler.buildComponent(node, component, appArea);
      }         
    },
    
    
    
    setComponentProperties : function(widget, name, value)
    {
      // TODO : find a cheaper way to find the setter
      // NOTE : the name is LOWERCASE - hence we iterate all properties of the widget
      //         to try and find a matching one
      var n = "set" + name.toLowerCase();

      for (var a in widget)
      {
        if (n == a.toLowerCase())
        {
          var setter = widget[a];
          break;
        }
      }

      if (!setter)
        return false;
      
      widget._attr[name] = value;     
      
      setter.apply(widget, value);
    }
    
  }
});