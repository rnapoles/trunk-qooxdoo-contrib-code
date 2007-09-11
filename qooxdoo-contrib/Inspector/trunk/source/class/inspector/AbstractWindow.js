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
//    this._registerOpacityHandler();

    // register a listener to kep the inspector windows alwasy on top
    this.addEventListener("changeZIndex", function(e) {
			if (e.getValue() != 1e6) {
				this.setZIndex(1e6);
			}
		}, this); 
		
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
      this.addEventListener("changeHeight", function(e) {
        var delta = e.getData() - this._windowHeight;
        this._windowHeight = e.getData();
        this._setMainElementHeight(delta);
      }, this);
      this.addEventListener("changeWidth", function(e) {
        var delta = e.getData() - this._windowWidth;
        this._windowWidth = e.getData();
        this._setMainElementWidth(delta);
      }, this);    
      this.addEventListener("appear", function(e) {
        this._windowWidth = this.getOffsetWidth();
        this._windowHeight = this.getOffsetHeight();
        this._setApearancePosition();
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
      // throw an exception if the method is caled on the abstract class
      throw new Error("Abstract method call (getComponents) in 'AbstractDebugerWindow'!");
    },
   
   
    /**
     * Sets the height of the main element of the window.
     * @param delta {Number} The change value of the height.
     */
    _setMainElementHeight: function(delta) {
      // throw an exception if the method is caled on the abstract class
      throw new Error("Abstract method call (_setMainElementHeight) in 'AbstractDebugerWindow'!");
    },
    
    
    /**
     * Sets the width of the main element of the window.
     * @param delta {Number} The change value of the width.
     */
    _setMainElementWidth: function(delta) {
      // throw an exception if the method is caled on the abstract class
      throw new Error("Abstract method call (_setMainElementWidth) in 'AbstractDebugerWindow'!");
    },
    
    
    /**
     * Sets the start position of the window.
     */
    _setApearancePosition: function() {
      // throw an exception if the method is caled on the abstract class
      throw new Error("Abstract method call (_setApearancePosition) in 'AbstractDebugerWindow'!");
    },
    
    
    /**
     * Creates the main element of the window which cann be
     * added to the main layout and apears between the toolbar
     * and the statusbar.
     */
    _createMainElement: function() {
      // throw an exception if the method is caled on the abstract class
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
