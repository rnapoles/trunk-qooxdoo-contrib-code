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
 * This class is the base class for all inspector windows.
 * 
 * It contains the construction of the basic structure of the inspector windows and
 * the handler functions for resizing the windows.
 */
qx.Class.define("inspector.components.AbstractWindow", {
  
  extend : qx.ui.window.Window,
  type : "abstract",   
    
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  /**
   * Base constructor which is used to initialize inspector windows.
   * @param main {inspector.Inspector} reference to the main inspector object.
   * @param name {String} Title of the window.
   */
  construct : function(main, name) {
    this.base(arguments);

    // save the reference to the inspector class
    this._inspector = main;
    
    // initialize window
    this.setCaption(name);
    this.setShowMinimize(false);
    this.setShowMaximize(true);    
    this.setAllowMaximize(true);
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
    
    // flag to signal if the zIndx will be currently changed
    _inChange: false,
    
    // maximization stuff
    _oldTop: null,
    _oldLeft: null,
    _oldWidth: null,
    _oldHeight: null,

    /*
    *********************************
       PUBLIC
    *********************************
    */
    /**
     * Return whether the window is on the screen or not.
     * @return {Boolean} True, if the window is on the screen
     */
    isOpen: function() {
      return this.getVisibility() && this.getDisplay();
    },
    
    
    /**
     * Sets the flag for signaling that the zIndex is currently changed. 
     * @param value {Boolean} True, if the change evenet of the zIndex should not be executed.
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
      // call a abstract function which should add some toolbar buttons
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
      
      // register the appear handler
      this.addEventListener("appear", function(e) {
        // store the dimensions of the window
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
     * Maximizes the window to the screen.
     */
    maximize: function() {
      // enable the resizing and moving of the maximized window
      this._disableResize = true;
      this.setMoveable(false);
      // change the maximize button to a restore button
      var maxButtonIndex = this._captionBar.indexOf(this._maximizeButton);
      this._captionBar.remove(this._maximizeButton);
      this._captionBar.addAt(this._restoreButton, maxButtonIndex);                
      // sets the focus to the window
      this.setActive(true);

      // save the position for restoring
      this._oldTop = this.getTop();
      this._oldLeft = this.getLeft();
      // save the dimensions for restoring 
      this._oldWidth = this.getWidth();
      this._oldHeight = this.getHeight();
      
      // move the window to the upper left corner
      this.setTop(0);
      this.setLeft(0);
      // maximize the dimensions of the window
      this.setWidth(qx.ui.core.ClientDocument.getInstance().getInnerWidth());
      this.setHeight(qx.ui.core.ClientDocument.getInstance().getInnerHeight());
      
      // save the old data in the cookie (so that on a reload the old values can be restored)
      qx.io.local.CookieApi.set(this.classname + "#Height", this._oldHeight);
      qx.io.local.CookieApi.set(this.classname + "#Width", this._oldWidth);
      qx.io.local.CookieApi.set(this.classname + "#Left", this._oldLeft);
      qx.io.local.CookieApi.set(this.classname + "#Top", this._oldTop);      
    },
    
    
    /**
     * Restores the window to its former position.
     */    
    restore: function() {
      // disable the resizing and moving of the maximized window
      this._disableResize = false;
      this.setMoveable(true);
      // change the restore button to a maximize button
      var restoreButtonIndex = this._captionBar.indexOf(this._restoreButton);
      this._captionBar.remove(this._restoreButton);
      this._captionBar.addAt(this._maximizeButton, restoreButtonIndex);
                
      // move the window to the former position
      this.setTop(this._oldTop);
      this.setLeft(this._oldLeft);
      // set the former dimensions
      this.setWidth(this._oldWidth);
      this.setHeight(this._oldHeight);  
    },
    
    
    /**
     * Maximizes the window or restores it if it is already
     * maximized.
     * @param e {qx.event.type.MouseEvent} Double click event.
     */
    _oncaptiondblblick : function(e) {
      // if the maximize is not allowed
      if (!this._maximizeButton.getEnabled()) {
        return;
      }
      // check if the window is maximized
      if (this._restoreButton.getParent() != null) {
        this.restore();
      } else {
        this.maximize();
      }
    },
    
    
    /**
     * Hides the window and tells the inspector hat the window 
     * has been closed so that the buttons of the menu can stay
     * in sync with the open/close status of the components.
     */
    hide: function() {
      // hide the window
      this.setVisibility(false);
      // inform the inspector
      this._inspector.componentClosed(this);
      // save that the window is closed
      qx.io.local.CookieApi.set(this.classname + "#Open", false);
    },
    
    
    /*
    *********************************
       ABSTRACT
    *********************************
    */   
    /**
     * Returns the components of the window which should not 
     * be in the widget finders hierarchy. 
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
     * Creates the main element of the window which can be
     * added to the main layout and appears between the toolbar
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
   },
  
  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */
  destruct : function() {
    // save the current visibility
    var formerVisisbility = this.getVisibility();
    // remove the console from the screen
    this.hide();
    // save that the window was hidden by the inspector, if it was opened
    qx.io.local.CookieApi.set(this.classname + "#Open", formerVisisbility);
    // dispose the fields
    this._disposeFields("_inspector", "_mainLayout", "_toolbar", "_statusbar");
  }
});
