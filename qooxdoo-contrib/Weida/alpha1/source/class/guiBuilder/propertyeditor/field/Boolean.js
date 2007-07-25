
qx.Class.define("guiBuilder.propertyeditor.field.Boolean",
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

    this._radioManager = new qx.ui.selection.RadioManager();
      
    this._radioTrue = new qx.ui.form.RadioButton("True", "true", "radioTrue");
    this._radioTrue.setWidth("1*");
    this._radioTrue.setManager(this._radioManager);
    this.add(this._radioTrue);
      
    this._radioFalse = new qx.ui.form.RadioButton("False", "false", "radioFalse");
    this._radioFalse.setWidth("1*");
    this._radioFalse.setManager(this._radioManager);
    this.add(this._radioFalse);      
    
    
    this._radioManager.addEventListener("changeSelected", function(e) {this.applyValue();}, this);           
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
      this._ignoreChangeValue = true;    
    
      this.setFormObject(formObject);
      this.setProperty(property);    
    
      var propName = property.attributes['name'].value;      
      var value = formObject.get(propName);    
      
      if (value == true)
        this._radioTrue.setChecked(true);
      if (value == false)       
        this._radioFalse.setChecked(true);  
       
      this._ignoreChangeValue = false;       
    },
    
    resetData : function()
    {
    },
    
    applyValue : function()
    {
      if (this._ignoreChangeValue === true)
        return false;
        
      var property   = this.getProperty();
      var formObject = this.getFormObject();
      
      var propName = property.attributes['name'].value;
            
      selected = this._radioManager.getSelected();     
      
      var setValue = true;
      if (selected.getValue() == "false")
        setValue = false;
      
      formObject._attr[propName] = setValue;            
      formObject.set(propName, setValue);    
      if (formObject._realComp)
      {
        formObject._realComp._attr[propName] = setValue;            
        formObject._realComp.set(propName, setValue);
      }           
      
      if (this.getPropertyEditor() != null)
        this.getPropertyEditor().dispatchComponentChange();             
    }
           
    
  }  
    
});