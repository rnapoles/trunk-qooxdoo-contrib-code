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

qx.Class.define("inspector.components.SearchTextField", {
  
  extend : qx.ui.form.TextField,
    
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function(value) {
    // call the cunstructor of the superclass
    this.base(arguments, value);
    // if there is no value given
    if (value == null) {
      // set the dafault value
      this.setValue(this.getDefaultValue());
    }
    
    // add a click event listener for removing the search text and selecting the containing text
    this.addEventListener("click", this._clickListener);
    // add a listener which adds the search test if the focus is lost and the textfield ist empty
    this.addEventListener("focusout", this._focusOutListener, this);  
    // add the filter function to the search field
    this.addEventListener("input", this._inputListener, this);    
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
     * This is the this reference in which will be used the executionFunction.
     */
    thisReference: {
      nullable: false
    },
    
    
    /**
     * The function executed on a change of the value in the textfield with a delay.
     */
    executionFunction: {
      nullable: false
    },
    
    
    /**
     * The defaut value which pill be added to the textfield if it is empty and 
     * removed if a user ants to enter a new search term.
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
    _searchTimer: null,
 
   
    /*
    *********************************
       PROTECTED
    *********************************
    */
		/**
		 * The listener which removes the default search value form the textfield.
		 * @param e {Event} ClickEvent
		 */
    _clickListener: function(e) {
      // select the whole text
      e.getTarget().setSelectionStart(0);
      e.getTarget().setSelectionLength(e.getTarget().getComputedValue().length);
      // remove the search term
      if (e.getTarget().getComputedValue() == this.getDefaultValue()) {
        e.getTarget().setValue("");
      }
    },  
    
		
		/**
		 * Adds the default search value to the textfield if the valus is not set by the user. 
		 * @param e {Event}
		 */
    _focusOutListener: function(e) {
      // if the textfield is empty, add the search term
      if (this.getComputedValue() == "") {
        this.setValue(this.getDefaultValue());
      }
    }, 
    
		
		/**
		 * Executes the given function with the given this reference after 
		 * the input of the textfield has changed an thi given time is over.
		 * @param e {Event}
		 */
    _inputListener: function(e) {      
      // if a search timer is set
      if (this._searchTimer) {
        // remove the old search timer
        window.clearTimeout(this._searchTimer);
      }
      // store the this reference for the timeout        
      var self = this;
      this._searchTimer = window.setTimeout(function() {          
        self.getExecutionFunction().call(self.getThisReference());
      }, this.getRefreshTime());
    }

  },
  
  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */
  destruct : function() {
    this.setThisReference("");
  }
});