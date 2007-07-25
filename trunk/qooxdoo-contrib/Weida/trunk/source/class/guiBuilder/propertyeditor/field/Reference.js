
qx.Class.define("guiBuilder.propertyeditor.field.Reference",
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

    this._comboField = new qx.ui.form.ComboBox(); 
    this._comboField.setWidth("1*"); 
    this._comboField.setHeight(20); 
    this._comboField.setBorder(null);
    this._comboField.addEventListener("changeValue", function(e) {this.applyValue();}, this);    
    this.add(this._comboField);   
    
    this._ignoreChangeValue = false;       
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
      var accepted = property.attributes['accept'].value;  
      
      var oList = this.getAppArea().getAllComponentsByClassName(accepted);
      
      var item = new qx.ui.form.ListItem("---- none ----");
      item._reference = null;
      this._comboField.add(item); 

      var i = 0;
      for (i = 0; i < oList.length; i++)
      {
        var newEntry = oList[i];
        
        if (newEntry.classname == 'guiBuilder.NonVisualComp')
        {        
          var item = new qx.ui.form.ListItem(newEntry.getChildComponent()._name);
        } else {
          var item = new qx.ui.form.ListItem(newEntry._name);
        }  
        item._reference = newEntry;
        this._comboField.add(item);                     
      }        
      
      if (value != null && value._name)
        this._comboField.setValue(value._name);

      this._ignoreChangeValue = false;             
    },
    
    resetData : function()
    { 
      this._ignoreChangeValue = true;       
    
      this._comboField.setValue('');
      var comboList = this._comboField.getList().removeAll(); 
      
      this._ignoreChangeValue = false;         
    },
    
    applyValue : function()
    {
      if (this._ignoreChangeValue === true)
        return false;    
    
      var property   = this.getProperty();
      var formObject = this.getFormObject();
      
      var propName = property.attributes['name'].value;
      var value = this._comboField.getValue();
            
      var selected = this._comboField.getSelected();      
      selected = selected._reference;
      
      if (selected.classname == 'guiBuilder.NonVisualComp')
      {      
        formObject._attr[propName] = selected.getChildComponent();            
        formObject.set(propName, selected.getChildComponent());
        if (formObject._realComp)
        {
          formObject.realComp._attr[propName] = selected.getChildComponent();            
          formObject.realComp.set(propName, selected.getChildComponent());        
        }        
      } else {
        formObject._attr[propName] = selected;            
        formObject.set(propName, selected);
        if (formObject._realComp)
        {
          formObject.realComp._attr[propName] = selected;            
          formObject.realComp.set(propName, selected);        
        }
      }    
      
      if (this.getPropertyEditor() != null)      
        this.getPropertyEditor().dispatchComponentChange();            
    }
    
  }  
    
});