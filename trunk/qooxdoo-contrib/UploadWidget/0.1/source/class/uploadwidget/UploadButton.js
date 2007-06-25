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
 * An upload button which allows selection of a file through the browser fileselector.
 *
 */
qx.Class.define("uploadwidget.UploadButton",
{
  extend : qx.ui.form.Button,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(name, text, icon, iconWidth, iconHeight, flash)
  {
    this.base(arguments, text, icon, iconWidth, iconHeight, flash);

  	if(name != null) {
      this.setName(name);
    }
 
    this._value = '';
    
  	this.addEventListener("appear", this._createInputFileTag);
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
     * Modifies the value property of the hidden input type=file element.
     * Only an empty string is accepted for clearing out the value of the
     * selected file.
     * 
     * As a special case for IE the hidden input element is recreated because
     * setting the value is generally not allowed in IE.
     *
     * @type member
     * @param value {var} Current value
     * @param old {var} Previous value
     */
    _applyValue : function(value, old) {
      if(this._valueInputOnChange) {
        delete this._valueInputOnChange;
      }
      else {
        if (!value || value == '') {
          if (qx.core.Variant.isSet("qx.client", "mshtml")) {
            this._createInputFileTag();
          }
          else {
            this._input.value = '';
          }
        }
        else {
          throw new error("Unable to set value to non null or non empty!");
        }
      }
    },


    /**
     * Modifies the name property of the hidden input type=file element.
     *
     * @type member
     * @param value {var} Current value
     * @param old {var} Previous value
     */
    _applyName : function(value, old) {
      if(this._input) {
        this._input.name = propValue;
      }
    },


    /*
    ---------------------------------------------------------------------------
      EVENT-HANDLER
    ---------------------------------------------------------------------------
    */
    
 
    /**
     * Create an input type=file element, and set the onchange event handler which
     * fires if the user selected a file with the fileselector.
     *
     * @type member
     * @param e {Event|null} appear event
     * @return {void}
     */
    _createInputFileTag : function(e) {
      if(this._input) {
        this._input.name += "_tmp_";
        this._input.parentNode.removeChild(this._input);
        this._input = null;
      }
    
    	var input = this._input = document.createElement("input");
    	input.type = "file";
    	input.name	= this.getName();
    	input.style.position = "absolute";
    	input.style.left 		= "-860px";
    	input.style.height		= "27px";
    	input.style.fontSize = "60px";
    	input.style.clip	= "rect(auto, " + 860 + this.getWidthValue() + "px, auto, 860px)";
    	input.style.zIndex 	= "100";
    	input.style.cursor 	= "hand";
    	input.style.cursor 	= "pointer";
    	input.style.filter 	= "alpha(opacity=0)";
    	input.style.opacity 	= "0";
    	input.style.MozOutlinestyle 	= "none";
    	input.style.hidefocus 				= "true";
    
    	var _this = this;
    	input.onchange = function(ev) { return _this._onchange(ev); };
    
    	this.getElement().appendChild(input);
    },

    
    /**
     * Handle the onchange event of the hidden input type=file element
     *
     * @type member
     * @param e {Event} TODOC
     * @return {void}
     */
    _onchange : function(e) {
      this._valueInputOnChange = true;
      this.setValue(this._input.value);
    }
  },
    


  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    this.removeEventListener("mouseover", this._onmouseover);
    this.removeEventListener("mouseout", this._onmouseout);
    this.removeEventListener("mousedown", this._onmousedown);
    this.removeEventListener("mouseup", this._onmouseup);
  	this.removeEventListener("appear", this._createInputFileTag);
  
    if(this._input) {
      this._input.parentNode.removeChild(this._input);
      this._input.onchange = null;
      this._input = null;
    } 
  }
});  
