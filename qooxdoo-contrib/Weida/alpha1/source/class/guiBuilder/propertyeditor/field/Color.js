
qx.Class.define("guiBuilder.propertyeditor.field.Color",
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

    this._colorField = new qx.ui.basic.Terminator();
    this._colorField.setHeight(19);
    this._colorField.setWidth(24);          
    this.add(this._colorField);

    this._textField = new qx.ui.form.TextField();
    this._textField.setWidth("1*"); 
    this._textField.setBorder(null);    
    this._textField.addEventListener("blur", function(e) {this.applyValue()}, this);
    this.add(this._textField);

    var mytables =
	{
	  core : {
	    label : "Basic Colors",
	    values : [ "#000", "#333", "#666", "#999", "#CCC", "#FFF", "red", "green", "blue", "yellow", "teal", "maroon" ]
	  },
	
	  recent : {
	    label : "Recent Colors",
	
	    values : []
	  }
    }

	this._colorPopup = new qx.ui.component.ColorPopup(mytables);
	this._colorPopup.setCentered(true);
	this._colorPopup.setValue("#23F3C1");
	this._colorPopup.addEventListener("changeValue", function(e)
	  {
        var value = e.getData();	  
	    this._textField.setValue(value);
	    this.applyValue();
	  }, this);
	this._colorPopup.addToDocument();  


    this._buttonPopup = new qx.ui.form.Button("Choose...");
    this._buttonPopup.setWidth("auto");
    this._buttonPopup.setHeight(20);
    this._buttonPopup.addEventListener("execute", function(e) 
      {
        this._colorPopup.show();
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

    setData : function(formObject, property)
    {
      this.setFormObject(formObject);
      this.setProperty(property);    
    
      var propName = property.attributes['name'].value;      
      var value = formObject.get(propName);    

      this._colorField.setBackgroundColor(value);

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
      
      // is it a number ?      
      if (value != '')
      {
        var n = new Number(value);
        if (!isNaN(n)) 
          value = n.valueOf();
      }          
      
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