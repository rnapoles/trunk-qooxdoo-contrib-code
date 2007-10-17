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

qx.Class.define("inspector.AbstractWindow", {
  
  extend : qx.ui.window.Window,
  type : "abstract",   
    
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function(main, name) {
    this.base(arguments);

    // save the reference to the inspector class
    this._inspector = main;
    
    // initialize window
    this.setCaption(name);
    this.setShowMinimize(false);
    this.setShowMaximize(false);    
    this.setAllowMaximize(false);
    this.setWidth("auto");
    this.setHeight("auto");
    this.setMinHeight(130);
    this.setMinWidth(250);
    this.addToDocument();
    
    // initialize the inner layout    
    this._mainLayout = new qx.ui.layout.VerticalBoxLayout();
    this._mainLayout.setWidth("100%");
    this._mainLayout.setHeight("100%");
    this.add(this._mainLayout);
    
    // initialize toolbar
    this._createToolbar();
    
    // initialize main element
    this._createMainElement();
    
    // register the resize handler for the window
    this._registerResizeHandler();
    
    // register the opacity handler
    // this._registerOpacityHandler();
    
    // register the windows as one of the inspector
    this._inspector.registerWindow(this);    
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
    // window components
    _mainLayout: null,
    _toolbar: null,
    _statusbar: null,
    
    // window dimensions
    _windowWidth: null,
    _windowHeight: null,
    
    // creating inspector reference
    _inspector: null,
    
    // flatg to signal if the zIndx will be currently changed
    _inChange: false,

    /*
    *********************************
       PUBLIC
    *********************************
    */
		/**
		 * Return wether the window is on the creen or not.
		 * @return {Boolean} true, if the window is on the screen
		 */
		isOpen: function() {
			return this.getVisibility() && this.getDisplay();
		},
    
    
    /**
     * Sets the flag for signaling that the zIndex is currently changed. 
     * @param value {Boolean} true, if the changeevenet of the zIndex sould not be executed
     * @internal
     */
    setInChange: function(value) {
      this._inChange = value;
    },

	 
    /*
    *********************************
       CONSTRUCTOR HELPERS
    *********************************
    */
    /**
     * Creates a blank toolbar.
     */
    _createToolbar: function() {
      this._toolbar = new qx.ui.toolbar.ToolBar();
      this._toolbar.setWidth("100%");
      this._mainLayout.add(this._toolbar);
      // call a abstract function which sholuld add some toolbar buttons
      this._addToolbarButtons();
    }, 
    
    
    /**
     * Registers three handler functions to control the starting position
     * and the resize behavior of the window.
     */
    _registerResizeHandler: function() {
			
			// register the height handler
      this.addEventListener("changeHeight", function(e) {
        // get the change of the height
				var delta = e.getValue() - this._windowHeight;
				// save the new height local
        this._windowHeight = e.getValue();
				// save the height in a cookie
        qx.io.local.CookieApi.set(this.classname + "#Height", this._windowHeight);
        // set the new height as delta
        this._setMainElementHeight(delta, true);
      }, this);
			
			// register the width handler
      this.addEventListener("changeWidth", function(e) {
				// get the change of the width
        var delta = e.getValue() - this._windowWidth;
				// save the new width local
        this._windowWidth = e.getValue();
				// save the width in a cookie
        qx.io.local.CookieApi.set(this.classname + "#Width", this._windowWidth);
				// set the new width
        this._setMainElementWidth(delta);
      }, this);
			
			// register the appera handler
      this.addEventListener("appear", function(e) {
				// store the diemensions of the window
        this._windowWidth = this.getOffsetWidth();
        this._windowHeight = this.getOffsetHeight();

        // check for the top coordinate set in a cookie
        if (qx.io.local.CookieApi.get(this.classname + "#Top")) {
					// set the stored top coordinate
          this.setTop(parseInt(qx.io.local.CookieApi.get(this.classname + "#Top")));
					// mark that top has been set
					var setTop = true;
        }
        // check for the left coordinate set in a cookie
        if (qx.io.local.CookieApi.get(this.classname + "#Left")) {
					// set the left coordinate
          this.setLeft(parseInt(qx.io.local.CookieApi.get(this.classname + "#Left")));
					// mark that left has been set
          var setLeft = true;
        }
				// check for the height set in a cookie
        if (qx.io.local.CookieApi.get(this.classname + "#Height")) {
          // set the left coordinate
         this.setHeight(parseInt(qx.io.local.CookieApi.get(this.classname + "#Height")));
          // mark that left has been set
          var setHeight = true;
        }
        // check for the height set in a cookie
        if (qx.io.local.CookieApi.get(this.classname + "#Width")) {
          // set the left coordinate
          this.setWidth(parseInt(qx.io.local.CookieApi.get(this.classname + "#Width")));
          // mark that left has been set
          var setWidth = true;
        }
				// if left, top, height or width has not been set
				if (!setTop || !setLeft || !setHeight || !setWidth) {
					// tell the application to choose the appereance position
					this._setApearancePosition();					
				}
      }, this);
		
		  // register the left position handler
	    this.addEventListener("changeLeft", function(e) {
	      qx.io.local.CookieApi.set(this.classname + "#Left", e.getValue());
	    }, this);
	    // register the top position handler
	    this.addEventListener("changeTop", function(e) {
	      qx.io.local.CookieApi.set(this.classname + "#Top", e.getValue());
	    }, this);			
    },
    
    
    /**
     * Registers a focus handler which sets the opacity to 100% 
     * if the window is in focus. Otherwise the opacity will be reduced.
     */
    _registerOpacityHandler: function() {
      this.addEventListener("changeActive", function (e) {
        if (e.getValue()) {
          this.setOpacity(1.0);
        } else {
          this.setOpacity(0.9);
        }
      }, this); 
    },
    
    /*
    *********************************
       OVERRIDDEN
    *********************************
    */
    /**
     * Hides the window and tells the inspector hat the window 
     * has been closed so that the buttons of the menu can stay
     * in sync with the open/close status of the components.
     */
    hide: function() {
      this.setVisibility(false);
      this._inspector.componentClosed(this);
      // save that the finder is closed
      qx.io.local.CookieApi.set(this.classname + "#Open", false);			
    },
    
    /*
    *********************************
       ABSTRACT
    *********************************
    */   
    /**
     * Returns the components of the window which should not 
     * be in the widget hierarchy. 
     * @internal
     */       
    getComponents: function() {
      // throw an exception if the method is called on the abstract class
      throw new Error("Abstract method call (getComponents) in 'AbstractDebugerWindow'!");
    },
   
   
    /**
     * Sets the height of the main element of the window.
     * @param delta {Number} The change value of the height.
     */
    _setMainElementHeight: function(delta) {
      // throw an exception if the method is called on the abstract class
      throw new Error("Abstract method call (_setMainElementHeight) in 'AbstractDebugerWindow'!");
    },
    
    
    /**
     * Sets the width of the main element of the window.
     * @param delta {Number} The change value of the width.
     */
    _setMainElementWidth: function(delta) {
      // throw an exception if the method is called on the abstract class
      throw new Error("Abstract method call (_setMainElementWidth) in 'AbstractDebugerWindow'!");
    },
    
    
    /**
     * Sets the start position of the window.
     */
    _setApearancePosition: function() {
      // throw an exception if the method is called on the abstract class
      throw new Error("Abstract method call (_setApearancePosition) in 'AbstractDebugerWindow'!");
    },
    
    
    /**
     * Creates the main element of the window which cann be
     * added to the main layout and apears between the toolbar
     * and the statusbar.
     */
    _createMainElement: function() {
      // throw an exception if the method is called on the abstract class
      throw new Error("Abstract method call (_createMainElement) in 'AbstractDebugerWindow'!");
    },


    /**
     * Adds the buttons to the toolbar. If no toolbar buttons
     * are needed, do not implement this method.
     */
    _addToolbarButtons: function() {
      // do not add a button at all
    }
   }
});
