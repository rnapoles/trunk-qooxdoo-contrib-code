qx.Class.define("guiBuilder.content.load.xml.NonVisual",
{
  extend : guiBuilder.content.load.xml.Generic,

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  
  members :
  {

    buildComponent : function(content, parent, appArea)
    {   
      var component = this._createComponent(content, parent, appArea);
    
      this._addEventHandler(content, component, parent, appArea);

      var realComp = component.getChildComponent();
      this._assignInitAttributes(content, realComp, parent, appArea);      
      this._assignAttributes(content, realComp, parent, appArea);      
      this._buildChildren(content, realComp, parent, appArea);     
    },    
    
    _createComponent : function(content, parent, appArea)
    {      
      var nonVisual = new guiBuilder.NonVisualComp();

      nonVisual._nonvisual = 'true';
      appArea._appNonVisualSpace.add(nonVisual);
     
      var className = content.attributes['class'].value;           
      
      var classConstructor = qx.Class.getByName(className);
      if (!classConstructor) {
        throw this._newError("constructor not found", { className : className });
      }

      var component = new classConstructor();      
      
      component._attr = new Object;  // we need to create this very early!      
      component._listener = new Object; 
      component._name = content.attributes['name'].value;
      
      nonVisual.setLabel(component._name);
      nonVisual.setChildComponent(component);     


      if (!this._controller._parsedComponentXML[className])
        return false;     
      var componentXML = this._controller._parsedComponentXML[className];

      var iconName = "icon/32/actions/system-run.png";
      if (componentXML['node'] && componentXML['node'].attributes['icon'])
        iconName = componentXML['node'] && componentXML['node'].attributes['icon'].value;        
      nonVisual.setIcon(iconName)
      

      
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
                  
      return nonVisual;
    }


  }
});