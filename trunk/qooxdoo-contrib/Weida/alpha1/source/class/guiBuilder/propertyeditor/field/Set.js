
qx.Class.define("guiBuilder.propertyeditor.field.Set",
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
    this._comboField.setHeight(19); 
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

      var  setTag = false;      
      if (property.childNodes)
      {
        var i = 0;
        for (var i=0; i<property.childNodes.length; i++)
        {
          var node = property.childNodes[i];

          if (node.nodeType == 1) 
            if (node.tagName == 'set')              
              setTag = node;
        }        
      }      
      
      if (setTag && setTag.childNodes)
      {
        var i = 0;
        for (var i=0; i<setTag.childNodes.length; i++)
        {          
          var node = setTag.childNodes[i];
          
          if (node.nodeType == 1) 
          {
            item = new qx.ui.form.ListItem(node.textContent);
            this._comboField.add(item);       
          }  
        }  
      }
      
      if (value && value.classname)
      {
        this.debug("ERROR in addRowSet: could not set value to combobox of type"+value.classname);
      } else { 
       this._comboField.setValue(value);
      }      
      
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
      
      // is it a number ?
      var n = new Number(value);
      if (!isNaN(n)) 
      {
        value = n.valueOf();
      }        
      
      if (value == "NULL")
        value = null;
        
      formObject._attr[propName] = value;            
      formObject.set(propName, value);
      if (formObject._realComp)
      {
        formObject._realComp._attr[propName] = value;                   
        formObject._realComp.set(propName, value);
      }            
      
      if (this.getPropertyEditor() != null)      
        this.getPropertyEditor().dispatchComponentChange();            
    }    
    
  }  
    
});