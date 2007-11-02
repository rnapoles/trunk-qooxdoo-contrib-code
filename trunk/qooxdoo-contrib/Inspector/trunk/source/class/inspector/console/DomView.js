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
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function(console) {    
    this.base(arguments);
    // sorte the reference to the console window
    this._console = console;
    // set the Layout to 100% width
    this.setWidth("100%");
    
    // create the HTML embed
    this._layout = new qx.ui.layout.VerticalBoxLayout();
    this._layout.setBackgroundColor("white");
    this._layout.setBorder("inset");
    this._layout.setOverflow("scrollY");
    this._layout.setWidth("100%");
    this._layout.setHeight(174);
    this.add(this._layout);
    
    this._analyse(qx);
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
   
    _layout: null,
    
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
    
    setMainElementDeltaHeight: function(delta) {
      this._layout.setHeight(this._layout.getHeight() + delta);
    },
    
    focus: function() {
      // TODO
    },       
	
	clear: function() {
	  // TODO
	},
    
    /*
    *********************************
       PROTECTED
    *********************************
    */    
    _analyse: function(analyseObject, layout, shift) {
      // if no layout is given, take the main layout
      if (layout == undefined) {
        layout = this._layout;
      }
      // if no  shift is given, set the shift to no shift
      if (shift == undefined) {
        shift = 0;
      }
      // appply the shift for the current layout
      layout.setPaddingLeft(shift);
      
      // go threw all values of the object
      for (var key in analyseObject) {
        // create a atom to show the values
        var keyAtom = new qx.ui.basic.Atom();
        keyAtom.setLabel("<b>" + key + "</b>");
        // if the value is null
        if (analyseObject[key] == null) {
          // show a specia null
          keyAtom.setLabel(keyAtom.getLabel() + " <span style='color: white; background-color: #999999; padding: 1px; border: 1px #666666 solid;'>" + analyseObject[key] + "</span>");
        } else {
          // show the value
          keyAtom.setLabel(keyAtom.getLabel() + " <span style='color: green;'>" + analyseObject[key] + "</span>");
        }
        // set the padding and add the value atom to the layout
        keyAtom.setPadding(3);
        layout.add(keyAtom);
        
        // add instantly a layout to every key
        var followingLayout = new qx.ui.layout.VerticalBoxLayout(); 
        followingLayout.setHeight("auto");
        followingLayout.setDisplay(false);
        layout.add(followingLayout);
        
        // if it is a object
        if (analyseObject[key] instanceof Object) {
          // add the incon used to expand / collapse
          keyAtom.setIcon(qx.io.Alias.getInstance().resolve("inspector/image/open.gif"));
          // create a set of parameters needed in the event listener        
          var inParameter = {layout: followingLayout, thiz: this, object: analyseObject[key], atom: keyAtom};        
          // add the click listener
          keyAtom.addEventListener("click", function(e) {
            // if the following will be shown
            if (!this.layout.getDisplay()) {
              // check if the values are loaded
              if (this.layout.getChildren().length == 0) {
                // load the stuff if not loaded
                this.thiz._analyse(this.object, this.layout, shift + 10);
              }
              // toggle the icon of the atom
              this.atom.setIcon(qx.io.Alias.getInstance().resolve("inspector/image/close.gif"));
            } else {
              // toggle the icon of the atom
              this.atom.setIcon(qx.io.Alias.getInstance().resolve("inspector/image/open.gif"));
            }
            this.layout.toggleDisplay();
          }, inParameter);
        } else {
          // if there is no icon in front of the key
          keyAtom.setPaddingLeft(25);
        }
      }
    }

  }     
});