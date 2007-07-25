
qx.Class.define("guiBuilder.propertyeditor.field.Special",
{
  extend : guiBuilder.propertyeditor.field.Generic,
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(formObject, property) 
  {    
    this.base(arguments);     
    this.init(formObject, property);        

    this._buttonPopup = new qx.ui.form.Button("Edit...");
    this._buttonPopup.setWidth("1*");
    this._buttonPopup.setHeight(20);
    this._buttonPopup.addEventListener("execute", this._openSpecial, this);
    this.add(this._buttonPopup);
          
    var className = property.attributes['handler'].value;      
    var classConstructor = qx.Class.getByName(className);
    if (!classConstructor) {
      this.debug("constructor not found "+className);
      return false;
    }    
       
    this._handlerComp = new classConstructor();
    this._handlerComp.setRelatedComponent(formObject);
    this._handlerComp.setRelatedProperties(property);
    this._handlerComp.initData();
    this._handlerComp.addToDocument();
  
  },
    
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {       

    setData : function(formObject, property)
    {
      this._handlerComp.setAppArea(this.getAppArea());    
    },
    
    resetData : function()
    {
    },

    _openSpecial : function(e)
    {
      this._handlerComp.open();            
    }

    
  }  
    
});