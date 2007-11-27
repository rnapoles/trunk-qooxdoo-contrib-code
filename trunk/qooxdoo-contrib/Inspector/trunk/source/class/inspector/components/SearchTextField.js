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

    refreshTime: {
      init: 300,
      nullable: false
    },
    
    thisReference: {
      nullable: false
    },
    
    executionFunction: {
      nullable: false
    },
    
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
    _clickListener: function(e) {
      // select the whole text
      e.getTarget().setSelectionStart(0);
      e.getTarget().setSelectionLength(e.getTarget().getComputedValue().length);
      // remove the search term
      if (e.getTarget().getComputedValue() == this.getDefaultValue()) {
        e.getTarget().setValue("");
      }
    },  
    
    _focusOutListener: function(e) {
      // if the textfield is empty, add the search term
      if (this.getComputedValue() == "") {
        this.setValue(this.getDefaultValue());
      }
    }, 
    
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

  }
});