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

qx.Class.define("inspector.console.DomView", {
  
  extend : qx.ui.layout.VerticalBoxLayout,  
  implement : inspector.console.IView,

  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */  
  statics: {

  },
    
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function(console) {
    this.base(arguments);
    // sorte the reference to the console window
    this._console = console;
    
    this.add(new qx.ui.basic.Atom("Comming soon..."));
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
    _console: null,
   
    
    /*
    *********************************
       PUBLIC
    *********************************
    */  
    /**
     * @internal
     * @return The components of the console.
     */
    getComponents: function() {
      // TODO
    },
    
    setMainElementDeltaHeight: function(height) {
      // TODO
    },
    
    focus: function() {
      // TODO
    }    
        
    
    /*
    *********************************
       PROTECTED
    *********************************
    */    

  }     
});