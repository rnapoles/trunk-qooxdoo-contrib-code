qx.Class.define("guiBuilder.content.save.xml.Generic",
{
  extend : qx.core.Target,

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  
  members :
  {
    
    getXML : function(formObject, parent, appArea)
    {
        
      var xmlContent = '<component class="'+formObject.classname+'" '+
                                  'name="'+formObject._name+'">'+"\n";    

      if (formObject._attr)
        xmlContent += this._getAttributes(formObject);

      if (formObject._listener)
        xmlContent += this._getEvents(formObject);

      if (formObject.getChildren)
      {        
        var xmlContentChildren = this._parseChildren(formObject, appArea);           
        xmlContent += '  '+xmlContentChildren.replace(new RegExp("\\n", "g"), "\n  ");
      }

      xmlContent += '</component>'+"\n";

      return xmlContent;                                                
    },
    
    _getAttributes : function(formObject)
    {     
      var className = formObject.classname;
      
      var xmlContent = '  <properties>'+"\n";
      for ( keyVar in formObject._attr ) 
      {
        valueVar = formObject._attr[keyVar];          
        nameVar = keyVar;
        
        var allowEmptry = "allow";
        if (this._controller._parsedComponentXML[className]['node'].attributes['empty'])
          allowEmptry = this._controller._parsedComponentXML[className]['node'].attributes['empty'].value
        
        if (allowEmptry == 'ignore' && (valueVar == null || valueVar == ''))
          continue;
          
        if (valueVar == null)
          valueVar = '#NULL#';
                          
        xmlContent += '    <property name="'+nameVar+'">'+valueVar+'</property>'+"\n";  
      }
      xmlContent += '  </properties>'+"\n";
      
      return xmlContent;
    },
    
    _getEvents : function(formObject)
    {
      var xmlContent = '  <events>'+"\n";
      for ( eventName in formObject._listener ) 
      {
        eventText = qx.lang.String.trim(formObject._listener[eventName]);          
                                 
        if (eventText != '')                         
          xmlContent += '    <event name="'+eventName+'"><![CDATA['+eventText+']]></event>'+"\n";  
      }
      xmlContent += '  </events>'+"\n";
      
      return xmlContent;      
    },
    
    _parseChildren : function(formObject, appArea)
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