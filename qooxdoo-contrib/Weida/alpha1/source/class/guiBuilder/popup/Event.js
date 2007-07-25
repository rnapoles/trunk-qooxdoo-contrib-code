qx.Class.define("guiBuilder.popup.Event",
{
  extend : qx.ui.window.Window,

  construct : function() {
    this.base(arguments);   

    this.setAllowMaximize(false);
    this.setAllowMinimize(false);    
	
	var vBox = new qx.ui.layout.VerticalBoxLayout();
	vBox.setHeight("100%");
	vBox.setWidth("100%");
	vBox.setBorder("outset");
	this.add(vBox);
	
	this._mainText = new guiBuilder.CodeEditor(false);
	this._mainText.setHeight("1*");
	this._mainText.setWidth("100%");
	vBox.add(this._mainText);
	
	var hBox = new qx.ui.layout.HorizontalBoxLayout();
	hBox.setHeight("auto");
	hBox.setWidth("100%");
	hBox.setBorder(null);
	hBox.setHorizontalChildrenAlign("right");
	hBox.setPaddingLeft(4);
	hBox.setPaddingRight(4);
	hBox.setPaddingBottom(4);
	hBox.setPaddingTop(4);
	hBox.setHorizontalAlign("right");
	hBox.setCursor("default");
	vBox.add(hBox);
	
	var buttonCancel = new qx.ui.form.Button();
	buttonCancel.setHeight("auto");
	buttonCancel.setWidth("auto");
	buttonCancel.setLabel("Cancel");
	buttonCancel.addEventListener("execute", function(e)	  
	  {
	    this.close();
	  }, this);
	hBox.add(buttonCancel);
	
	var buttonSave = new qx.ui.form.Button();
	buttonSave.setHeight("auto");
	buttonSave.setWidth("auto");
	buttonSave.setLabel("Save");
	buttonSave.setHorizontalAlign("right");
	buttonSave.setOverflow("hidden");
	buttonSave.setMarginLeft(10);
	buttonSave.addEventListener("execute", function(e) 
	  {
	    this.saveText();
        this.close();	    
	  }, this);
	hBox.add(buttonSave);
      
  },

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */
 
  properties : 
  { 

    textField :
    {
      check : "Object"
    },
  
    formObject :
    {
      check : "Object"
    },
    
    eventName : 
    {
      check : "String"
    },
    
    propertyEditor :
    {
      _legacy : true,
      type    : "object"
    }
  },
  
  members :
  {
    open : function() 
    {  
      var formObject = this.getFormObject();
      var eventName  = this.getEventName();
      
      if (formObject._listener && formObject._listener[eventName])
      {
        var eventText = formObject._listener[eventName];
        this._mainText.setValue(eventText);
      } else {
        this._mainText.setValue('');            
      } 
      
      this.base(arguments);         
    },
    
    saveText : function(e)
    {
      var formObject = this.getFormObject();
      var eventName  = this.getEventName();
      var eventText  = this._mainText.getValue();
      
      this.getTextField().setValue(eventText);
      formObject._listener[eventName] = eventText;     
      
      if (this.getPropertyEditor() != null)      
        this.getPropertyEditor().dispatchComponentChange();   
    }
    
  }
  
});