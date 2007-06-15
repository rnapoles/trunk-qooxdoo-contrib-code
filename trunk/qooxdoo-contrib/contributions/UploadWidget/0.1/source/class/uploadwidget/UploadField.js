/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007 Visionet GmbH, http://www.visionet.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Dietrich Streifert (level420)

************************************************************************ */

/* ************************************************************************

#module(ui_io)

************************************************************************ */

/**
 * UploadField: A textfield which holds the filename of the file which
 * should be uploaded and a button which allows selecting the file via the native
 * file selector 
 *
 */
qx.Class.define("uploadwidget.UploadField",
{
  extend : qx.ui.layout.CanvasLayout,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(name, text, icon, iconHeight, flash)
  {
    this.base(arguments);

    this.setHeight("auto");
    this.setOverflow("hidden");
    
  	this._text = new qx.ui.form.TextField();
  	this._text.set({readOnly:true,left:0,marginTop:3});
  	this.add(this._text);

  	this._button = new uploadwidget.UploadButton(name, text, icon, iconHeight, flash);
  	this._button.setRight(0);
  	this.add(this._button);

  

  	if(name) {
      this.setName(name);
    }

    this._button.addEventListener("changeValue", this._onChangeValue, this );

  	this._button.addEventListener("appear", this._recomputeTextFieldRightPos, this);
  },

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /**
     * The name which is assigned to the form
     */
    name :
    {
      init : "",
      apply : "_applyName",
      nullable : false
    },

    /**
     * The value which is assigned to the form
     */
    value :
    {
      init : "",
      apply : "_applyValue",
      event : "changeValue",
      nullable : false
    }
  }, 

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    
    /*
    ---------------------------------------------------------------------------
      MODIFIERS
    ---------------------------------------------------------------------------
    */
    
    /**
     * Value modifier. Sets the value of both the text field and
     * the UploadButton. The setValue modifier of UploadButton
     * throws an exception if the value is not an empty string.
     *
     * @type member
     * @param value {var} Current value
     * @param old {var} Previous value
     */
    _applyValue : function(value, old) {
      this._button.setValue(value);
      this._text.setValue(value);
    },


    /**
     * Upload parameter value modifier. Sets the name attribute of the
     * the hidden input type=file element in UploadButton which should.
     * This name is the form submission parameter name.
     *
     * @type member
     * @param value {var} Current value
     * @param old {var} Previous value
     */
    _applyName : function(value, old) {
      this._button.setName(value);
    },

    /*
    ---------------------------------------------------------------------------
      EVENT HANDLER
    ---------------------------------------------------------------------------
    */
    
    /**
     * Appear event handler for the button widget. After the button appeared
     * the right pos of the text widget is calculated and set.
     *
     * @type member
     * @param e {Event} appear event data
     * @return {void}
     */
    _recomputeTextFieldRightPos : function(e) {
  	  this._text.setRight(this._button.getInnerWidth() + 14);
    },
    
    /**
     * If the user select a file by clicking the button, the value of
     * the input type=file tag of the UploadButton changes and
     * the text field is set with the value of the selected filename.
     *
     * @type member
     * @param e {Event} change value event data
     * @return {void}
     */
    _onChangeValue : function(e) {
      var value = e.getData();
      this._text.setValue(value);
      this.setValue(value);
    }
  },    

  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    this._disposeObjects("_button", "_text");
  }
});  
