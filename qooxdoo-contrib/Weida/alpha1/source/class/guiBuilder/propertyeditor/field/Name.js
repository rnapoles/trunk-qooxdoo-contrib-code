
qx.Class.define("guiBuilder.propertyeditor.field.Name",
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

    this._textField = new qx.ui.form.TextField();
    this._textField.setWidth("1*"); 
    this._textField.setBorder(null);    
    this._textField.addEventListener("blur", function(e) {this.applyValue()}, this);
    this.add(this._textField);               
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
      this.setFormObject(formObject);
      this.setProperty(property);
          
      this._textField.setValue(formObject._name);
    },
    
    resetData : function()
    {
      this._textField.setValue('');    
    },
    
    applyValue : function()
    {
      var formObject = this.getFormObject();
      formObject._name = this._textField.getValue();
      
      if (formObject._treeItem)
        formObject._treeItem.setLabel(formObject._name);
      
      if (this.getPropertyEditor() != null)
        this.getPropertyEditor().dispatchComponentChange();
    }
    
  }  
    
});