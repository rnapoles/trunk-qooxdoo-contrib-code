
qx.Class.define("guiBuilder.propertyeditor.field.Integer",
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
    
      var propName = property.attributes['name'].value;      
      var value = formObject.get(propName);    

      this._textField.setValue(value);      
    },
    
    resetData : function()
    {
      this._textField.setValue('');    
    },      

    applyValue : function()
    {
      var property   = this.getProperty();
      var formObject = this.getFormObject();
      
      var propName = property.attributes['name'].value;
      var value = this._textField.getValue();

      if (formObject._attr[propName] == value)          
        return false;            
      
      // is it a number ?      
      if (value == '' && formObject._attr[propName] != '')      
      {
        value = 0;
        this._textField.setValue('0');
      }
     
      var value = new Number(value);
      if (isNaN(value)) 
      { 
        alert("'"+value+"' is not a number!");
        return false;
      }
      
      formObject._attr[propName] = value;
      
      try 
      {
        formObject.set(propName, value);
        if (formObject._realComp)
          formObject._realComp.set(propName, value);
      } catch (err) {
        alert('Could not set '+propName+' to '+value);
      }    
      
      if (this.getPropertyEditor() != null)      
        this.getPropertyEditor().dispatchComponentChange();            
    }    
    
  }  
    
});