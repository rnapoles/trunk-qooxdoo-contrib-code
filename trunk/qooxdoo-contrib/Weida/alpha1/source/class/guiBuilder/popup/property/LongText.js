qx.Class.define("guiBuilder.popup.property.LongText",
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
	
	this._mainText = new qx.ui.form.TextArea();
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
	buttonCancel.addEventListener("execute", this.closePopup, this);
	hBox.add(buttonCancel);
	
	var buttonSave = new qx.ui.form.Button();
	buttonSave.setHeight("auto");
	buttonSave.setWidth("auto");
	buttonSave.setLabel("Save");
	buttonSave.setHorizontalAlign("right");
	buttonSave.setOverflow("hidden");
	buttonSave.setMarginLeft(10);
	buttonSave.addEventListener("execute", this.saveText, this);
	hBox.add(buttonSave);
    
  
  },
  
  members :
  {
    closePopup : function(e)    
    {
      this.close();
    },
    
    saveText : function(e)
    {
      this._textField.setValue(this._mainText.getValue()); 
      this._changeFunction.changeRowString(this._textField);

      this.close();
    },
    
    applyResultHandling : function(textField, changeFunction)
    {
      this._textField = textField;
                 
      this._changeFunction = changeFunction;
      this._mainText.setValue(textField.getValue());      
    }
  }
});