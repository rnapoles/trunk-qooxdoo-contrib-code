/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */
/**
 * This class is a text field including the functions to call a function
 * after an amount of time after the content of the text field has changed. Additionally
 * a reset button is included so the search can easily resetted.
 */
qx.Class.define("inspector.components.SearchTextField", {
  
  extend : qx.ui.layout.HorizontalBoxLayout,
    
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  /**
   * Creates a new instance of a search text field.
   * @param value {String} The start value to set to the text field.
   */
  construct : function(value) {
    this.base(arguments);
    
    // initialize the boxlayout
    this.setBorder("inset");
    this.setWidth("auto");
    this.setBackgroundColor("white");
    this.setHeight("auto");
    
    // initialize the textfield
    this.__textField = new qx.ui.form.TextField(value);
    this.__textField.setBorder(null);
    
    // initialize the button (image)
    this.__image = new qx.ui.basic.Image(qx.io.Alias.getInstance().resolve("inspector/image/remove.png"));
    this.__image.setWidth(18);
    
    // link the parts together
    this.add(this.__textField);
    this.add(this.__image);
    
    // register the listener which removes the search term on a image click
    this.__image.addEventListener("click", function(e) {
      // disable the remove image
      this.__image.setEnabled(false);      
      // set the default value to the search textfield
      this.__textField.setValue(this.getDefaultValue());
      // show all stuff
      this.getExecutionFunction().call(this.getContext());
    }, this);
    
    // if there is no value given
    if (value == null) {
      // set the default value
      this.__textField.setValue(this.getDefaultValue());
      // enable the remove button
      this.__image.setEnabled(false);
    }
    
    // add a click event listener for removing the search text and selecting the containing text
    this.__textField.addEventListener("click", this._clickListener);
    // add a listener which adds the search test if the focus is lost and the textfield is empty
    this.__textField.addEventListener("focusout", this._focusOutListener, this);  
    // add the filter function to the search field
    this.__textField.addEventListener("input", this._inputListener, this);    
  },


  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */
  properties: {

    /**
     * The time in ms between a change of the value in the 
     * textfield and the execution of the executionFunction.
     */
    refreshTime: {
      init: 300,
      nullable: false
    },
    
    /**
     * This is the context which will be used by the executionFunction.
     */
    context: {
      nullable: false
    },
    
    
    /**
     * The function executed on a change of the value in the textfield with a delay.
     */
    executionFunction: {
      nullable: false
    },
    
    
    /**
     * The default value which will be added to the textfield if it is empty and 
     * removed if a user wants to enter a new search term.
     */
    defaultValue: {
      init: "Search..."
    }
    
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members : {
    /*
    *********************************
       ATTRIBUTES
    *********************************
    */        
    __searchTimer: null,
 
    __textField: null,
    __image: null,
    
    
    /*
    *********************************
       PUBLIC
    *********************************
    */
    /**
     * Returns the computed value of the textfield, if it is different from 
     * the default search term. If it is the default search term, an empty string 
     * will be returned.
     * @return {String} The value of the textfield.
     */
    getComputedValue: function() {
      // if the default value is set
      if (this.__textField.getComputedValue() == this.getDefaultValue()) {
        // act like no value is set
        return "";
      }
      // otherwise, return the value of the textfield
      return this.__textField.getComputedValue();
    },
    
    
    /**
     * Sets the given value in the textfield.
     * If the value is different from the default search term, the 
     * clear button will be enabled.
     * @param value {String} The sting to set in the textfield.
     */
    setValue: function(value) {
      // set the value of the textfield
      this.__textField.setValue(value);
      // enable / disable the clear button
      this.__image.setEnabled(value != this.getDefaultValue());
    },
    
    
    /*
    *********************************
       PROTECTED
    *********************************
    */
    /**
     * The listener which removes the default search value form the textfield.
     * @param e {qx.event.type.MouseEvent} ClickEvent
     */
    _clickListener: function(e) {
      // select the whole text
      e.getTarget().setSelectionStart(0);
      e.getTarget().setSelectionLength(e.getTarget().getComputedValue().length);
      // remove the search term
      if (e.getTarget().getComputedValue() == this.getParent().getDefaultValue()) {
        e.getTarget().setValue("");
      }
    },  
    
    
    /**
     * Adds the default search term to the textfield if the value
     * is not set by the user. 
     * @param e {Event} The focus event.
     */
    _focusOutListener: function(e) {
      // if the textfield is empty, add the search term
      if (this.getComputedValue() == "") {
        this.setValue(this.getDefaultValue());
      }
    }, 
    
    
    /**
     * Executes the given function with the given context after 
     * the input of the textfield has changed an the given time is over.
     * @param e {Event} The input event.
     */
    _inputListener: function(e) {
      // enabled / disable the clear button
      this.__image.setEnabled(this.getComputedValue() != "");
      // if a search timer is set
      if (this.__searchTimer) {
        // remove the old search timer
        window.clearTimeout(this.__searchTimer);
      }
      // store the this reference for the timeout
      var self = this;
      this.__searchTimer = window.setTimeout(function() {
        self.getExecutionFunction().call(self.getContext());
      }, this.getRefreshTime());
    }

  },
  
  
  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */
  destruct : function() {
    // remove the context
    this.setContext("");
    // dispoe the fields
    this._disposeFields("__textField", "__image");
  }
});