
qx.Class.define("guiBuilder.propertyeditor.field.Generic",
{
  extend : qx.ui.layout.HorizontalBoxLayout,
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /*
    ---------------------------------------------------------------------------
      PROPERTIES
    ---------------------------------------------------------------------------
    */

    formObject :
    {
      _legacy : true,
      type    : "object"
    },

    property :
    {
      _legacy : true,
      type    : "object"
    },

    appArea :
    {
      _legacy : true,
      type    : "object",
      instance  : "guiBuilder.AppArea"
    },

    propertyEditor :
    {
      _legacy : true,
      type    : "object"
    },
    
    label :
    {
      _legacy : true,
      type    : "object"
    }    
        
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {      
    
    init : function(formObject, property)
    {
      this.setHeight("auto");
      this.setWidth("100%");
      this.setSpacing(1);
        
      if (property == null)
      {
        var propName = 'name';
      }else {
        var propName = property.attributes['name'].value; 
      }
      
      var labelName = new qx.ui.basic.Label(propName);
      labelName.setBackgroundColor("window");
      labelName.setHeight(20);
      labelName.setWidth(100);
      labelName.setPadding(2);
      labelName.setPaddingLeft(10);                              
      
      this.setLabel(labelName);
      
      this.add(labelName);
    }  
  }
  
});