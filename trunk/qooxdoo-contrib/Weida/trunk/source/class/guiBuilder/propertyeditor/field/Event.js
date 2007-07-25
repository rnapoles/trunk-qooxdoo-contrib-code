
qx.Class.define("guiBuilder.propertyeditor.field.Event",
{
  extend : guiBuilder.propertyeditor.field.Generic,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(formObject, eventName) 
  {
    this.base(arguments);                                        
    this.init(formObject, eventName);
    
    var eventText = '';
    if (formObject._listener && formObject._listener[eventName])
      eventText = formObject._listener[eventName];
    
    this._textField = new qx.ui.form.TextField(eventText);
    this._textField.setWidth("1*"); 
    this._textField.setBorder(null);    
    this._textField.setEnabled(false);
    this.add(this._textField);

    this._buttonPopup = new qx.ui.form.Button("Edit...");
    this._buttonPopup.setWidth("auto");
    this._buttonPopup.setHeight(20);
    this._buttonPopup.addEventListener("execute", function(e)
      {
        var propertyEditor = this.getPropertyEditor();
        propertyEditor._eventPopup.setTextField(this._textField);
        propertyEditor._eventPopup.setEventName(eventName);
        propertyEditor._eventPopup.setFormObject(formObject);        
        propertyEditor._eventPopup.open();
      }, this);
    this.add(this._buttonPopup);
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {       

    init : function(formObject, event)
    {
      this.setHeight("auto");
      this.setWidth("100%");
      this.setSpacing(1);
              
      var labelName = new qx.ui.basic.Label(event);
      labelName.setBackgroundColor("window");
      labelName.setHeight(20);
      labelName.setWidth(100);
      labelName.setPadding(2);
      labelName.setPaddingLeft(10);                              
      
      this.setLabel(labelName);
      
      this.add(labelName);
    },

    setData : function(formObject, eventName)
    {
      this.setFormObject(formObject);
    
      var eventText = '';
      if (formObject._listener && formObject._listener[eventName])
        eventText = formObject._listener[eventName];
          
      this._textField.setValue(eventText);
    },
    
    resetData : function()
    {
      this._textField.setValue('');    
    },
    
    applyValue : function()
    {

    }            
    
  }  
    
});