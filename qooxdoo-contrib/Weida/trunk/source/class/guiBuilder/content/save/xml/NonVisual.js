qx.Class.define("guiBuilder.content.save.xml.NonVisual",
{
  extend : guiBuilder.content.save.xml.Generic,

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  
  members :
  {
    getXML : function(formObject, parent, appArea)
    {
      var useObject = formObject.getChildComponent();
        
      var xmlContent = '<component class="'+useObject.classname+'" '+
                                  'name="'+useObject._name+'">'+"\n";    
                                              
      if (useObject._attr)
        xmlContent += this._getAttributes(useObject);
           
      xmlContent += '</component>'+"\n";

      xmlContent = '  '+xmlContent.replace(new RegExp("\\n", "g"), "\n    ");
      
      return xmlContent;    
    }
  }
});