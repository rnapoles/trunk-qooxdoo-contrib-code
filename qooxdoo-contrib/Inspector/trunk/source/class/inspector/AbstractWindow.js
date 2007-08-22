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
     * Martin Wittemann (martin_wittemann)

************************************************************************ */

qx.Class.define("inspector.AbstractWindow",
{
  extend : qx.ui.window.Window,
  type : "abstract",  
  
  
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
  construct : function(main, name) {
    // save the reference to the inspector class
    this._inspector = main;
    
    // initialize window
    qx.ui.window.Window.call(this);
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
    
    // initialite the statusbar
    this._createStatusbar();
    
    // register the resize handler for the window
    this._registerResizeHandler();
    
    // register the opacity handler
//    this._registerOpacityHandler();

  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
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
	
    
    /*
    *********************************
       PROTECTED
    *********************************
    */
   
   
    /*
    *********************************
       CONSTRUCTOR HELPERS
    *********************************
    */
    /**
     * Creates a blnk toolbar.
     */
    _createToolbar: function() {
      this._toolbar = new qx.ui.toolbar.ToolBar();
      this._toolbar.setWidth("100%");
      this._mainLayout.add(this._toolbar);
      this._addToolbarButtons();
    }, 
    
    /**
     * Creates a standard statusbar.
     */
    _createStatusbar: function () {
      this._statusbar = new qx.ui.basic.Atom();
      this._statusbar.setHorizontalChildrenAlign("left");
      this._statusbar.setPadding(2, 4);
      this._statusbar.setBorder("inset");
      this._statusbar.setWidth("100%");
      this._statusbar.setLabel("Please select an object...");
      this._mainLayout.add(this._statusbar);
    },
    
    /**
     * Registers three handler functions to control the starting position
     * and the resize of the window.
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
       ABSTRACT
    *********************************
    */
   
    /**
     * Returns the components of the window.
     */       
    getComponents: function() {
      // throw an exception if the method is caled on the abstract class
      throw new Error("Abstract method call (getComponents) in 'AbstractDebugerWindow'!");
    },
   
    /**
     * Sets the height of the main element of the window.
     * @param {int} delta The change value of the height.
     */
    _setMainElementHeight: function(delta) {
      // throw an exception if the method is caled on the abstract class
      throw new Error("Abstract method call (_setMainElementHeight) in 'AbstractDebugerWindow'!");
    },
    
    /**
     * Sets the width of the main element of the window.
     * @param {Object} delta The change value of the width.
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
     * Creates the main element e.g. a table or tree.
     */
    _createMainElement: function() {
      // throw an exception if the method is caled on the abstract class
      throw new Error("Abstract method call (_createMainElement) in 'AbstractDebugerWindow'!");
    },
        
    /**
     * Adds the buttons to the toolbar.
     */
    _addToolbarButtons: function() {
      // do not add a button at all
    }

   }
});
