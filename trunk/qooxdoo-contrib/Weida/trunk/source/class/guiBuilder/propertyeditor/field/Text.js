
qx.Class.define("guiBuilder.propertyeditor.field.Text",
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
    this.add(this._textField);

    this._dialogTextEdit = new guiBuilder.popup.property.LongText("Edit");
    this._dialogTextEdit.setWidth(400);
    this._dialogTextEdit.setHeight(400);
    this._dialogTextEdit.setModal(true);
    this._dialogTextEdit.setCentered(true);
    this._dialogTextEdit.addToDocument();

    var buttonPopup = new qx.ui.form.Button("Change...");
    buttonPopup.setWidth("auto");
    buttonPopup.setHeight(20); 
    buttonPopup.addEventListener("execute", function(e)
      {      
      this._dialogTextEdit.applyResultHandling(this._textField, this);    
      this._dialogTextEdit.open();      
      }, this);    
    this.add(buttonPopup);     
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
      
      // do we want to ignore empty entries?
      var ignoreEmpty = false;     
      if (property.attributes['empty'] && property.attributes['empty'].value == 'ignore')
        ignoreEmpty = true;     
      
      if (value == '' && ignoreEmpty)
        if (!formObject._attr[propName] || formObject._attr[propName] == '')          
          return false;
                
      if (value == '' && ignoreEmpty)
      {
        formObject._attr[propName] = null;
        formObject.set(propName, null);
        this.debug(propName+" set to NULL!");
        return false;
      } else {
        formObject._attr[propName] = value;
      }  
      
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