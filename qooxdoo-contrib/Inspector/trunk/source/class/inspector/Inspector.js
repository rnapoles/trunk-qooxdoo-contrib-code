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
/* ************************************************************************
#resource(inspector.image:image)
#resource(inspector.css:css)
#embed(inspector.image/*)
#embed(inspector.css/*)
************************************************************************ */
/**
 * This class is the main part of the inspector.
 * 
 * It is a singleton and can be initialized in one line of code.
 * 
 * <pre class='javascript'>
 * inspector.Inspector.init();
 * </pre>
 */
qx.Class.define("inspector.Inspector", {

  type : "singleton",
  extend: qx.core.Object,

  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics:
  {
    /**
     * Creates a instance of the inspector.
     */
    init : function() {
      inspector.Inspector.getInstance();
    },

    // Tooltip texts
    RELOAD_BUTTON_TOOLTIP_TEXT: "Reload the window.",
    AUTO_RELOAD_BUTTON_TOOLTIP_TEXT: "Update the window automatically.",
    SHOW_API_BUTTON_TOOLTIP_TEXT: "Show the API of the selected object or property.",
    SET_NULL_BUTTON_TOOLTIP_TEXT: "Set the currently selected property to null.",
    SET_DEFAULT_BUTTON_TOOLTIP_TEXT: "Set the currently selected property to its initial value.",
    HIGHLIGHT_SELECTED_PROPERTY_BUTTON_TOOLTIP_TEXT: "Highlight the currently selected property.",
    GOTO_SELECTED_PROPERTY_BUTTON_TOOLTIP_TEXT: "Go to the currently selected property.",
    OBJECT_SUMMARY_BUTTON_TOOLTIP_TEXT: "Show a summary of all objects.",
    POLLUTION_BUTTON_TOOLTIP_TEXT: "Show the pollution of the global window object.",
    FIND_BUTTON_TOOLTIP_TEXT: "Select a widget with your mouse.",
    HIGHLIGHT_BUTTON_TOOLTIP_TEXT: "Keep the selected widget surrounded with a red boarder.",
    OPEN_ALL_BUTTON_TOOLTIP_TEXT: "Open all four inspector windows.",
    CLEAR_BUTTON_TOOLTIP_TEXT: "Clear the current view.",
    API_BUTTON_TOOLTIP_TEXT: "Show the API of the corresponding object if possible.",
    SET_BUTTON_TOOLTIP_TEXT: "<b style='color:red;'>BETA!</b> Generate a settings map for the current selected object.",
    APPENDER_BUTTON_TOOLTIP_TEXT: "Show all log messages in the console.",
    HELP_BUTTON_TOOLTIP_TEXT: "Prints out a help message to the console.",

    CONSOLE_CAPTION_TITLE: "Console",
    OBJECT_CAPTION_TITLE: "Objects",
    WIDGET_CAPTION_TITLE: "Widgets",
    PROPERTY_CAPTION_TITLE: "Properties",
    SETTINGS_CAPTION_TITLE: "Settings",

    API_VIEWER_URI: "http://demo.qooxdoo.org/current/apiviewer/",

    DISPOSE_QUESTION: "Do you really want to dispose the application?"
  },


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function() {
    // Create the queue for the inspector windows
    this._windowQueue = [];

    // start the exclusion stategy
    this.beginExclusion();
    // create the inspector object
    qx.core.Object.call(this);
    // create the stuff needed for the find mode
    this._createCatchClickLayer();
    // create the stuff needed for the highlighting
    this._createHighlightStuff();
    // create the opener toolbar
    this._createOpenerToolBar();
    // end the exclusion startegy
    this.endExclusion();

    // initialize the this reference to the selected widget
    this.setWidget(qx.ui.core.ClientDocument.getInstance());

    // react on the theme change
    qx.theme.manager.Meta.getInstance().addEventListener("changeTheme", function() {
      // if a property editor exists
      if (this._propertyEditor != null) {
        // tell the property editor to recalculate if everything else is done
        var self = this;
        window.setTimeout(function() {
          self._propertyEditor.recalculateLayout();
        }, 0);
      }
    }, this);

    // initialize the cookies
    this.__initializeCookies();

    // reopen the windows if they were former opened
    this.__reopenWindows();

    //////////////////////////
    // PATCH FOR 0.7.1
    if (qx.core.Object.prototype.getDbKey == undefined) {
      this.debug("Patch of qx.core.Object: add getDbKey()");
      qx.core.Object.prototype.getDbKey = function() {
        return this.__dbKey;
      }
    }
    //////////////////////////

    //////////////////////////
    // PATCH FOR A QOOXDOO BUG IN THE LOGGER
    this.debug("qx.log.Logger.removeAppender patched");
    qx.log.Logger.prototype.removeAppender = function(appender) {
      if (this._appenderArr != null) {
        for(var i = 0; i < this._appenderArr.length; i++){
          if(appender == this._appenderArr[i]) {
            this._appenderArr.splice(i, 1);
          }
        }
      }
    }
    //////////////////////////

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
    // references to the components
    _widgetFinder: null,
    _objectFinder: null,
    _propertyEditor: null,
    _console: null,
    _menu: null,

    // excludes
    _excludes: [],
    _excludeBeginIndex: -1,

    // startup timer reference
    _startupTimer: null,

    // objects used to frame the selected widget
    _highlightBorder: null,
    _highlightOverlay: null,
    _highlightTimer: null,
    _highlightEnabled: false,

    // overlay used to select a widget
    _catchClickLayer: null,

    // the current widget
    _widget: null,

    // the native window for the api viewer
    _apiWindow: null,

    // the queue of the inspector windows
    _windowQueue: null,


   /*
    *********************************
        FOCUS HANDLING FOR THE INSPECTOR WINDOWS
    *********************************
    */
   /**
    * Registers the given windows as a inspector window. This
    * will put the given window always at a higher zIndex than 1e6.
    * @param window {qx.ui.window.Window} The window to add.
    * @internal
    */
   registerWindow: function(window) {
     // add the registered window to the queue as first element
     this._windowQueue.unshift(window);
     // add a changeActive eventlistener to the window
     window.addEventListener("changeActive", function(e) {
       // tell the manager to that a new window is selected
       this._inspector.windowSelected(this);
     }, window);
     // add a changeZIndex listener to keep the windows up to date even if a non inspector window is selected
     window.addEventListener("changeZIndex", function(e) {
       // prevent recursive calls
       if (!this._inChange) {
         // set the zIndex to the inspector classes
         this._inspector.windowSelected();
       }
     }, window);
   },


   /**
    * Set the zIndex in all registered Windows corresponding to their last selections.
    * The given window will get the highest zIndex.
    * @param window {qx.ui.window.Window} The window with the highest zIndex.
    * @internal
    */
   windowSelected: function(window) {
     // go threw all registered windows
     for (var i = 0; i < this._windowQueue.length; i++) {
       // if the current windows is found
       if (this._windowQueue[i] == window) {
         // delete the window in the queue
         this._windowQueue.splice(i, 1);
       }
     }
     // if a window is given
     if (window != null) {
       // push the window to the first place
       this._windowQueue.unshift(window);
     }

     // go threw all windows again
     for (var i = 0; i < this._windowQueue.length; i++) {
       // mark that the zIndex will be changed
       this._windowQueue[i].setInChange(true);
       // change the zIndex
       this._windowQueue[i].setZIndex(1e6 + (this._windowQueue.length - i));
       // unmark that the zIndex will be changed
       this._windowQueue[i].setInChange(false);
     }
   },


   /*
    *********************************
        RESET PERSPECTIVE
    *********************************
    */
    /**
     * Sets the dimensions and the position of all windows to a predefined value.
     */
    resetPerspective: function() {
      // reset the console, if existent
      if (this._console) {
        this._console.setWidth(qx.ui.core.ClientDocument.getInstance().getInnerWidth() - 350);
        this._console.setHeight(180);
        this._console.setLeft(0);
        this._console.setTop(qx.ui.core.ClientDocument.getInstance().getInnerHeight() - 180);
      }
      // reset the object finder, if existent
      if (this._objectFinder) {
        this._objectFinder.setWidth(350);
        this._objectFinder.setHeight(qx.ui.core.ClientDocument.getInstance().getInnerHeight() * 0.25);
        this._objectFinder.setLeft(qx.ui.core.ClientDocument.getInstance().getInnerWidth() - 350);
        this._objectFinder.setTop(0);
      }
      // reset the widget finder, if existent
      if (this._widgetFinder) {
        this._widgetFinder.setWidth(350);
        this._widgetFinder.setHeight(qx.ui.core.ClientDocument.getInstance().getInnerHeight() * 0.25);
        this._widgetFinder.setLeft(qx.ui.core.ClientDocument.getInstance().getInnerWidth() - 350);
        this._widgetFinder.setTop(qx.ui.core.ClientDocument.getInstance().getInnerHeight() * 0.25);
      }
      // reset the property editor, if existent
      if (this._propertyEditor) {
        this._propertyEditor.setWidth(350);
        this._propertyEditor.setHeight(qx.ui.core.ClientDocument.getInstance().getInnerHeight() * 0.5);
        this._propertyEditor.setLeft(qx.ui.core.ClientDocument.getInstance().getInnerWidth() - 350);
        this._propertyEditor.setTop(qx.ui.core.ClientDocument.getInstance().getInnerHeight() * 0.5);
      }
    },

   /*
    *********************************
        API STUFF
    *********************************
    */
    /**
     * Opens an native window showing the API documentation. If a classname is
     * given, the API documentation to the given class will be shown. If
     * additionally a property name is given, the API to that property
     * will be shown.
     * @param classname {String} The classname of the class.
     * @param propertyname {String} The name of the property.
     */
    openApiWindow: function(classname, propertyname) {
        // if the API window is not created
        if (this._apiWindow == null) {
          // initialize the api window
          this._apiWindow = new qx.client.NativeWindow("", "qooxdoo API viewer");
        }
        // try to get the dimensions of the window
        try {
          // set the dimension of the window from the cookie
          this._apiWindow.setWidth(parseInt(qx.io.local.CookieApi.get("ApiViewerWidth")));
          this._apiWindow.setHeight(parseInt(qx.io.local.CookieApi.get("ApiViewerHeight")));
        } catch (e) {
          // set the standard value
          this._apiWindow.setWidth(900);
          this._apiWindow.setHeight(600);
        }
        // define the URL to the apiview
        var urlString = qx.io.local.CookieApi.get("ApiViewerUri");
        if (!urlString) {
          urlString = inspector.Inspector.API_VIEWER_URI;
        }

        // if a classname is given
        if (classname != null) {
          urlString = urlString + "#" + classname;
          // if a property name is given
          if (propertyname != null) {
            urlString = urlString + "~" + propertyname;
          }
        }

        // set the uri in the window
        this._apiWindow.setUrl(urlString);

        // if the window is not open
        if (!this._apiWindow.isOpen()) {
          // open the window
          this._apiWindow.open();
        } else {
          // otherwise just focus it
          this._apiWindow.focus();
        }
    },


   /*
    *********************************
        HIGHLIGHT STUFF
    *********************************
    */
    /**
     * Enable or disable the highlight function.
     * @param on {Boolean} The bool value whether the highlight function should be on or of.
     */
    highlightCurrentWidget: function(on) {
      // save the current state of the checkbox button
      this._highlightEnabled = on;
      // if highlight is on
      if (this._highlightEnabled) {
        // if something is selected
        if (this._widget != null) {
          // highlight the current selected
          this._highlight(this._widget.getElement());
        }
      } else {
        // start the timer that removes the highlight border
        this._clearHighlight(0);
      }
    },


    /**
     * Highlight the given widget for a second.
     * @param widget {qx.ui.core.Widget} The widget to highlight.
     */
    highlightWidget: function(widget) {
      // tell the highlight function to highlight the element of the widget
      this._highlight(widget.getElement());
      // set the timer to clear the highlight border after 1 sec
      this._clearHighlight(1000);
    },


    /**
     * Draws a red border around the given html element.
     * @param element {Element} The element to highlight.
     */
    _highlight: function(element) {
      // do not highlight if the element is not shown on the screen
      if (element == null) {
        this._highlightOverlay.hide();
        return;
      }

      // get the coordinates
      var coordinates = this._getCoordinates(element);
      var left = coordinates.left - 2;
      var right = coordinates.right + 2;
      var top = coordinates.top - 2;
      var bottom = coordinates.bottom + 2;

      // set the values to the selected object
      this._highlightOverlay.setLeft(left);
      this._highlightOverlay.setTop(top);
      this._highlightOverlay.setWidth(right - left);
      this._highlightOverlay.setHeight(bottom - top);
      this._highlightOverlay.show();
    },


    /**
     * Starts a timer with the given time that removes the highlight border.
     * If no time is given, the border will be removed immediately.
     * @param time {Number} The time to remove the highlight border.
     */
    _clearHighlight: function(time) {
      // check that the parameter is a integer
      if (time < 0) {
        time = 0;
      }
      // clear the timeout if a timeout has already been started
      if (this._highlightTimer != null) {
        window.clearTimeout(this._highlightTimer);
      }

      // start the timeout which hides the highlight border
      var self = this;
      this._highlightTimer = window.setTimeout(function() {
        self._highlightTimer = null;
        // if the highlight button is enabled
        if (self._highlightEnabled) {
          // if something is selected
          if (self._widget != null) {
            // highlight the current selected
            self._highlight(self._widget.getElement());
          }
        } else {
          self._highlightOverlay.hide();
        }
      }, time);
    },


    /**
     * Returns the coordinates of the given element as a map.
     * @param element {Element} The element of which the coordinates are needed.
     * @return {Map} Map containing the coordinates e.g. "right"
     */
    _getCoordinates: function(element) {
      // return null if no element is given
      if (element == null) {
        return null;
      }
      var returnObject = {};
      returnObject.left = qx.html.Location.getPageBoxLeft(element);
      returnObject.right = qx.html.Location.getPageBoxRight(element);
      returnObject.top = qx.html.Location.getPageBoxTop(element);
      returnObject.bottom = qx.html.Location.getPageBoxBottom(element);
      return returnObject;
    },


    /*
    *********************************
        FIND MODE STUFF
    *********************************
    */
    /**
     * Function that enabled the 'find mode'.
     */
    startFindMode: function() {
      // show the catchClickLayer
      this._catchClickLayer.show();
    },


    /**
     * Exits the 'find mode'.
     */
    exitFindMode: function() {
      // hide the catchClickLayer and the highlightAtom
      this._catchClickLayer.hide();
      this._highlightOverlay.hide();

      // highlight the currently selected widget again
      if (this._highlightEnabled) {
        // if something is selected
        if (this._widget != null) {
          // highlight the current selected
          this._highlight(this._widget.getElement());
        }
      }
    },


    /**
     * This function returns the deepest matching child widget of the given
     * widget at the point x and y.
     * @param widget {qx.ui.core.Widget} The widget to search in for matching child widgets.
     * @param x {Number} The x position to search a widget.
     * @param y {Number} The y position to search a widget.
     * @return {qx.ui.core.Widget} The found widget.
     */
    _searchWidget: function(widget, x, y) {
      var returnWidget = widget;
      // visit all children
      for (var i = 0; i < widget.getChildrenLength(); i++) {
        // get the current child
        var childWidget = widget.getChildren()[i];
        // ignore the catchClickLayer and highlightOverlay atom
        if (childWidget == this._catchClickLayer || childWidget == this._highlightOverlay) {
          continue;
        }
        // get the coordinates of the current widget
        var coordinates = this._getCoordinates(childWidget.getElement());
        // if the element is visible
        if (coordinates != null) {
          // if the element is under the mouse position
          if (coordinates.right >= x && coordinates.left <= x &&
              coordinates.bottom >= y && coordinates.top <= y) {
            returnWidget = this._searchWidget(childWidget, x, y);
          }
        }
      }
      return returnWidget;
    },


    /*
    *********************************
        WIDGET STUFF
    *********************************
    */
    /**
     * Return the current selected widget.
     * @return {qx.core.Object} The current selected widget or object.
     */
    getWidget: function() {
      return this._widget;
    },


    /**
     * Set the given widget in all components of the inspector.
     * @param widget {qx.core.Object} Any qooxdoo object
     * @param ref {inspector.AbstractWindow} A reference to the component which sets the widget.
     * If the widget is not set from a component of the inspector, the value can be null.
     */
    setWidget: function(widget, ref) {
      // set the widget in the inspector
      this._widget = widget;

      // set the widget in the console
      if (this._console != null) {
        this._console.setQxObject(widget);
      }
      // set the widget in the object finder
      if (this._objectFinder != null) {
        if (ref != this._objectFinder) {
          if (widget.toHashCode() != this._objectFinder.getSelectedWidgetHash()) {
            this._objectFinder.selectObject(widget);
          }
        }
      }
      // set the widget in the widget finder
      if (this._widgetFinder != null) {
        if (ref != this._widgetFinder) {
          if (widget.toHashCode() != this._widgetFinder.getSelectedWidgetHash()) {
            this._widgetFinder.selectWidget(widget);
          }
        }
      }
      // set the widget in the property editor
      if (this._propertyEditor != null) {
        // tell the property editor that a new widget has been selected
        if (this._propertyEditor.getDisplay() && this._propertyEditor.getVisibility()) {
          this._propertyEditor.setQxObject(widget);
        }
      }
      // if it is really a widget and not another qx object
      if (widget instanceof qx.ui.core.Widget) {
        // highlight the selected widget
        this._highlight(widget.getElement());
        this._clearHighlight(1000);
      }
    },


    /**
     * Sets the current widget by the reference in the objects db.
     * @internal
     * @param dbKey {Integer} The key in the objects db.
     * @param refName {String} The Name of the reference class either
     *    "console", "objectFinder", "widgetFinder", "propertyEditor"
     */
    setWidgetByDbKey: function(dbKey, refName) {
      // get the real reference
      switch (refName) {
        case "console":
          var ref = this._console;
          break;
        case "objectFinder":
          var ref = this._objectFinder;
          break;
        case "widgetFinder":
          var ref = this._widgetFinder;
          break;
        case "propertyEditor":
          var ref = this._propertyEditor;
          break;
        default:
          var ref = null;
      }
      // set the widget
      this.setWidget(qx.core.Object.getDb()[dbKey], ref);
    },


    /**
     * Tells the console to show the object associated with the id in the dom view.
     * @internal
     * @param id {Number} The given id.
     */
    inspectObjectByInternalId: function(id) {
      // if the console exists
      if (this._console != null) {
        // tell the consol to do the rest
        this._console.inspectObjectByInternalId(id);
      }
    },


    /**
     * Selects the object represented by the internal index an the value of
     * this objects named key.
     * @internal
     * @param index {Number} The index in the internal array structure.
     * @param key {String} The name of the value so select the object.
     */
    inspectObjectByDomSelecet: function(index, key) {
      if (this._console != null) {
          this._console.inspectObjectByDomSelecet(index, key);
      }
    },


    /**
     * @internal
     * @param key {String} The name of the property in the current selected widget.
     * @param value {String} the value to set the property.
     * @param type {String} The type of the value.
     */
    updateWidgetProperty: function(key, value, type) {
      // if there is a widget
      if (this._widget != null) {
        // try to set the given value
        try {
          // get the name of the setter
          var setterName = "set" + qx.lang.String.toFirstUp(key);
          // store the converted value in here
          var trueValue;
          // if it is a number of something
          if (type == "Integer" || type == "Float" || type == "Double" || type == "Number") {
            // parse the value
            trueValue = parseFloat(value);
          // if it is something which can be handled as a string
          } else if (type == "String" || type == "NonEmptyString" || type == "Label" || type == "Color" || type instanceof Array) {
            // just take the value
            trueValue = value;
          // if it is a boolean
          } else if (type == "Boolean") {
            // check for true
            if (value == "true") {
              trueValue = true;
            // check for false
            } else if (value == "false") {
              trueValue = false;
            // otherwise, its not a boolean
            } else {
              alert("Value is not a boolean.");
              return false;
            }
          } else {
            alert("Unknown type to change.");
            return false;
          }
          // set the new value
          this._widget[setterName].call(this._widget, trueValue);
          return true;
        } catch (e) {
          alert(e);
          return false;
        }
      }
    },


    /*
    *********************************
       COMPONENTS STUFF
    *********************************
    */
    /**
     * Return the components of the application.
     * @internal
     */
    getComponents: function() {
      // create all components arrays
      var propertyEditorComponents = [];
      var widgetFinderComponents = [];
      var objectFinderComponents = [];
      var consoleComponents = [];
      var menuComponents = [];
      // try to fill these arrays
      try {
        if (this._propertyEditor != null) {
          propertyEditorComponents = this._propertyEditor.getComponents();
        }
        if (this._widgetFinder != null) {
          widgetFinderComponents = this._widgetFinder.getComponents();
        }
        if (this._objectFinder != null) {
          objectFinderComponents = this._objectFinder.getComponents();
        }
        if (this._console != null) {
          consoleComponents = this._console.getComponents();
        }
        // create a array of the Inspector objects
        var ownObjects = [this, this._catchClickLayer, this._highlightBorder, this._highlightOverlay, this._menu];
        // get the menu components
        var menuComponents = this._menu.getComponents();
        // merge the arrays
        return propertyEditorComponents.concat(consoleComponents).concat(widgetFinderComponents).concat(objectFinderComponents).concat(ownObjects).concat(menuComponents);
      } catch (e) {
        // if that doesnt work, return a blank array
        return [];
      }
    },


    /*
    *********************************
       EXCLUDES
    *********************************
    */
    /**
     * Begins the exclusions strategy with storing the current index
     * of the object db in an member.
     * @internal
     */
    beginExclusion: function() {
      // get the current index of the db and store it
      this._excludeBeginIndex = qx.core.Object.getDb().length;
    },


    /**
     * Ends the exclusion strategy with saving the begin and end
     * index of the object db in an exclusion array. All indices
     * the created classes between begin and end are in the
     * range of the exclusion.
     * @internal
     */
    endExclusion: function() {
      // flush the queues to get all changes
      qx.ui.core.Widget.flushGlobalQueues();
      // get the end index of the db
      var excludeEndIndex = qx.core.Object.getDb().length - 1;
      // do only if new elements were added and the beginIndex is set
      if (this._excludeBeginIndex <= excludeEndIndex && this._excludeBeginIndex >= 0) {
        this._excludes.push({begin:this._excludeBeginIndex, end:excludeEndIndex});
      }
      // reset the begin index
      this._excludeBeginIndex = -1;
    },


    /**
     * Returns the exclusion array.
     *
     * Structure: The array is an array of objects which contain
     * two values, begin and end.
     *
     * Example: a.getExcludes()[0].end
     *
     * @internal
     *
     * @return {Map} A list of objects containing two values
     *      begin - the begin of the exclusion index
     *      end   - the end of the exclusion index
     */
    getExcludes: function() {
      return this._excludes;
    },


    /*
    *********************************
       OPENER
    *********************************
    */
    /**
     * Opens and if necessary creates the widget finder window.
     */
    openWidgetFinder: function() {
      // create the widget finder if not already created
      if (this._widgetFinder == null) {
        this._createWidgetFinder();
      }
      this._widgetFinder.open();
      // save that the finder is open
      qx.io.local.CookieApi.set(this._widgetFinder.classname + "#Open", true);
    },


    /**
     * Opens and if necessary creates the object finder window.
     */
    openObjectFinder: function() {
      // create the object finder if not already created
      if (this._objectFinder == null) {
        this._createObjectFinder();
      }
      this._objectFinder.open();
      // save that the finder is open
      qx.io.local.CookieApi.set(this._objectFinder.classname + "#Open", true);
    },


    /**
     * Opens and if necessary creates the property editor window.
     */
    openPropertyEditor: function() {
      // create the property editor if not already created
      if (this._propertyEditor == null) {
        this._createPropertyEditor();
      }
      this._propertyEditor.open();
      // set the current widget if the editor is opened
      if (this._widget != null) {
        this._propertyEditor.setQxObject(this._widget);
      }
      // save that the editor is open
      qx.io.local.CookieApi.set(this._propertyEditor.classname + "#Open", true);
    },


    /**
     * Opens and if necessary creates the console window.
     */
    openConsole: function() {
      // create the console if it is not already created
      if (this._console == null) {
        this._createConsole();
      }
      // if already a widget is selected
      if (this._widget != null) {
        // also select it in the console
        this._console.setQxObject(this._widget);
      }
      this._console.open();
      // save that the console is open
      qx.io.local.CookieApi.set(this._console.classname + "#Open", true);
    },


    /**
     * Returns the state of the console window.
     * @return {Boolean} true, if the console is open.
     */
    isConsoleOpen: function() {
      if (this._console) {
        return this._console.isOpen();
      }
      return false;
    },


    /**
     * Returns the state of the object finder window.
     * @return {Boolean} true, if the object finder is open.
     */
    isObjectFinderOpen: function() {
      if (this._objectFinder) {
        return this._objectFinder.isOpen();
      }
      return false;
    },


    /**
     * Returns the state of the widget finder window.
     * @return {Boolean} true, if the widget finder is open.
     */
    isWidgetFinderOpen: function() {
      if (this._widgetFinder) {
        return this._widgetFinder.isOpen();
      }
      return false;
    },


    /**
     * Returns the state of the property editor window.
     * @return {Boolean} true, if the property editor is open.
     */
    isPropertyEditorOpen: function() {
      if (this._propertyEditor) {
        return this._propertyEditor.isOpen();
      }
      return false;
    },


    /*
    *********************************
       HIDER
    *********************************
    */
    /**
     * Hides the widget finder window.
     */
    hideWidgetFinder: function() {
      // create the widget finder if not already created
      if (this._widgetFinder != null) {
        this._widgetFinder.hide();
      }
    },


    /**
     * Hides the object finder window.
     */
    hideObjectFinder: function() {
      // create the object finder if not already created
      if (this._objectFinder != null) {
        this._objectFinder.hide();
      }
    },


    /**
     * Hides the property editor window.
     */
    hidePropertyEditor: function() {
      // create the property editor if not already created
      if (this._propertyEditor != null) {
        this._propertyEditor.hide();
      }
    },


    /**
     * Hides the console window.
     */
    hideConsole: function() {
      // create the console if it is not already created
      if (this._console != null) {
        this._console.hide();
      }
    },


    /**
     * Signals the menu that one of the components hast been closed.
     * @internal
     * @param component {inspector.AbstractWindow} The componente which has benn closed
     */
    componentClosed: function(component) {
      if (component == this._console) {
        this._menu.resetConsoleButton();
      } else if (component == this._widgetFinder) {
        this._menu.resetWidgetButton();
      } else if (component == this._objectFinder) {
        this._menu.resetObjectButton();
      } else if (component == this._propertyEditor) {
        this._menu.resetPropertyButton();
      }
    },


    /*
    *********************************
       CREATE COMPONENTS FUNCTIONS
    *********************************
    */
    /**
     * Creates the console component. This includes adding the created
     * object ids to the excludes array and setting the default values.
     */
    _createConsole: function() {
      // start the exclusion stategy
      this.beginExclusion();
      // create the console
      this._console = new inspector.console.Console(this, inspector.Inspector.CONSOLE_CAPTION_TITLE);
      // end the exclusion startegie
      this.endExclusion();

      // set the windows enabled to avoid disabling by the client document
      this._console.setEnabled(true);
      // set the text color to black in case that the text color of the client document will be changed
      this._console.setTextColor("black");
    },


    /**
     * Creates the object finder component. This includes adding the created
     * object ids to the excludes array and setting the default values.
     */
    _createObjectFinder: function() {
      // start the exclusion stategy
      this.beginExclusion();
      // create the property editor window
      this._objectFinder = new inspector.objectFinder.ObjectFinder(this, inspector.Inspector.OBJECT_CAPTION_TITLE);
      // end the exclusion startegie
      this.endExclusion();

      // set the windows enabled to avoid disabling by the client document
      this._objectFinder.setEnabled(true);
      // set the text color to black in case that the text color of the client document will be changed
      this._objectFinder.setTextColor("black");
    },


    /**
     * Creates the widget finder component. This includes adding the created
     * object ids to the excludes array and setting the default values.
     */
    _createWidgetFinder: function() {
      // start the exclusion stategy
      this.beginExclusion();
      // create the widget finder window
      this._widgetFinder = new inspector.widgetFinder.WidgetFinder(this, inspector.Inspector.WIDGET_CAPTION_TITLE);
      // end the exclusion startegie
      this.endExclusion();

      // set the windows enabled to avoid disabling by the client document
      this._widgetFinder.setEnabled(true);
      // set the text color to black in case that the text color of the client document will be changed
      this._widgetFinder.setTextColor("black");
    },


    /**
     * Creates the property editor component. This includes adding the created
     * object ids to the excludes array and setting the default values.
     */
    _createPropertyEditor: function() {
      // start the exclusion stategy
      this.beginExclusion();
      // create the property editor window
      this._propertyEditor = new inspector.propertyEditor.PropertyEditor(this, inspector.Inspector.PROPERTY_CAPTION_TITLE);
      // end the exclusion startegie
      this.endExclusion();

      // set the windows enabled to avoid disabling by the client document
      this._propertyEditor.setEnabled(true);
      // set the text color to black in case that the text color of the client document will be changed
      this._propertyEditor.setTextColor("black");
    },


    /**
     * Creates the toolbar which will hold the inspector menu and
     * the buttons to open the components.
     */
    _createOpenerToolBar: function() {
      // create and add the menu
      this._menu = new inspector.menu.Menu(this);
      this._menu.addToDocument();
    },


    /*
    *********************************
       CREATE FIND MODE AND HIGHLIGHT FUNCTIONS
    *********************************
    */
    /**
     * Create the atom which will be placed above the application to catch
     * the selections during the find mode. Also register the handlers which
     * are responsible for handling the mousemove and click events.
     */
    _createCatchClickLayer: function() {
      // initialize the layer to catch the clicks
      this._catchClickLayer = new qx.ui.basic.Terminator();
      this._catchClickLayer.setLeft(0);
      this._catchClickLayer.setTop(0);
      this._catchClickLayer.setWidth("100%");
      this._catchClickLayer.setHeight("100%");
      this._catchClickLayer.setBackgroundColor("black");
      this._catchClickLayer.setOpacity(0.1);
      this._catchClickLayer.setZIndex(1e6 - 1);
      this._catchClickLayer.hide();
      this._catchClickLayer.addToDocument();

      // register the handler to catch the clicks and select the clicked widget
      this._catchClickLayer.addEventListener("click", function(e) {
        // hide the layer that catches the click
        this._catchClickLayer.hide();
        // disable the find button in the menu
        this._menu.resetFindButton();
        // get the current mouse position
        var xPosition = e.getClientX();
        var yPosition = e.getClientY();
        // search the widget at the current position
        var clickedElement = this._searchWidget(qx.ui.core.ClientDocument.getInstance(), xPosition, yPosition);
        // select the widget with the given id in the tree
        this.setWidget(clickedElement, this);
      }, this);

      // register the mousemove handler
      this._catchClickLayer.addEventListener("mousemove", function(e) {
        // get the current mouse position
        var xPosition = e.getClientX();
        var yPosition = e.getClientY();
        // search the widget at the current position
        var element = this._searchWidget(qx.ui.core.ClientDocument.getInstance(), xPosition, yPosition, "");
        // highlight the widget under the mouse pointer
        this._highlight(element.getElement());
      }, this);
    },


    /**
     * Create the border and atom needed to draw a red border around
     * the current selected widget.
     */
    _createHighlightStuff: function() {
      // create the border used to highlight the widgets
      this._highlightBorder = new qx.ui.core.Border(2, "solid", "red");

      // create a new overlay atom object
      this._highlightOverlay = new qx.ui.basic.Atom();
      this._highlightOverlay.setBorder(this._highlightBorder);
      this._highlightOverlay.setZIndex(1e6 - 2);
      this._highlightOverlay.hide();
      this._highlightOverlay.addToDocument();
    },


    /*
    *********************************
       INIT COOKIES
    *********************************
    */
    /**
     * Initializes the cookies. In the case a cookie setting is not set,
     * this function sets the cookie to the default value.
     */
    __initializeCookies: function() {
      // set the default url of the api viewer if it is not set
      if (!qx.io.local.CookieApi.get("ApiViewerUri")) {
        qx.io.local.CookieApi.set("ApiViewerUri", inspector.Inspector.API_VIEWER_URI);
      }
      // set the default width of the api viewer if it is not set
      if (!qx.io.local.CookieApi.get("ApiViewerWidth")) {
        qx.io.local.CookieApi.set("ApiViewerWidth", 900);
      }
      // set the default height of the api viewer if it is not set
      if (!qx.io.local.CookieApi.get("ApiViewerHeight")) {
        qx.io.local.CookieApi.set("ApiViewerHeight", 600);
      }

      // set the default shortcuts if they are not set
      if (!qx.io.local.CookieApi.get("FindShortcut")) {
        qx.io.local.CookieApi.set("FindShortcut", "CTRL+SHIFT+F");
      }
      if (!qx.io.local.CookieApi.get("HighlightShortcut")) {
        qx.io.local.CookieApi.set("HighlightShortcut", "CTRL+SHIFT+I");
      }
      if (!qx.io.local.CookieApi.get("HideAllShortcut")) {
        qx.io.local.CookieApi.set("HideAllShortcut", "CTRL+SHIFT+H");
      }
      if (!qx.io.local.CookieApi.get("OpenAllShortcut")) {
        qx.io.local.CookieApi.set("OpenAllShortcut", "CTRL+SHIFT+F11");
      }
      if (!qx.io.local.CookieApi.get("OpenConsoleShortcut")) {
        qx.io.local.CookieApi.set("OpenConsoleShortcut", "CTRL+SHIFT+F1");
      }
      if (!qx.io.local.CookieApi.get("OpenObjectShortcut")) {
        qx.io.local.CookieApi.set("OpenObjectShortcut", "CTRL+SHIFT+F2");
      }
      if (!qx.io.local.CookieApi.get("OpenWidgetShortcut")) {
        qx.io.local.CookieApi.set("OpenWidgetShortcut", "CTRL+SHIFT+F3");
      }
      if (!qx.io.local.CookieApi.get("OpenPropertyShortcut")) {
        qx.io.local.CookieApi.set("OpenPropertyShortcut", "CTRL+SHIFT+F4");
      }
    },


    /**
     * Checks for the cookies which store the state of the opened or closed windows.
     * If a window was opened on reload, the function opens that window.
     */
    __reopenWindows: function() {
      // check if there is a cookie stored that the console was opened
      if (qx.io.local.CookieApi.get("inspector.console.Console#Open") == "true") {
        this.openConsole();
      }
      // check if there is a cookie stored that the object finder was opened
      if (qx.io.local.CookieApi.get("inspector.objectFinder.ObjectFinder#Open") == "true") {
        this.openObjectFinder();
      }
      // check if there is a cookie stored that the property editor was opened
      if (qx.io.local.CookieApi.get("inspector.propertyEditor.PropertyEditor#Open") == "true") {
        // open the properties window in a delay cause of a layout bug
        var self = this;
        window.setTimeout(function() {
          self.openPropertyEditor();          
        }, 100);
      }
      // check if there is a cookie stored that the widget finder was opened
      if (qx.io.local.CookieApi.get("inspector.widgetFinder.WidgetFinder#Open") == "true") {
        this.openWidgetFinder();
      }
    }

  },


  /*
  *****************************************************************************
     SETTINGS
  *****************************************************************************
  */

  settings : {
    "inspector.resourceUri" : "./resource"
  },




  /*
  *****************************************************************************
    DEFER
  *****************************************************************************
  */

  defer : function(statics)
  {
    // Define alias for inspector resource path
    qx.io.Alias.getInstance().add("inspector", qx.core.Setting.get("inspector.resourceUri"));

    // include the CSS file used for the source view
    qx.html.StyleSheet.includeFile(qx.io.Alias.getInstance().resolve("inspector/css/sourceview.css"));
    // include the css used for the dom view
    qx.html.StyleSheet.includeFile(qx.io.Alias.getInstance().resolve("inspector/css/domview.css"));
    // include the css used for the console view
    qx.html.StyleSheet.includeFile(qx.io.Alias.getInstance().resolve("inspector/css/consoleview.css"));
    // include the css used for the html table of the property editor
    qx.html.StyleSheet.includeFile(qx.io.Alias.getInstance().resolve("inspector/css/propertylisthtml.css"));
  },



  /*
  *****************************************************************************
    DESTRUCTOR
  *****************************************************************************
  */
  destruct : function() {
    // clear the timer if it is still running
    window.clearInterval(this.__startupTimer);
    this._disposeFields("_windowQueue", "_catchClickLayer", "_highlightBorder", "_highlightOverlay",
                        "_widget", "_menu", "_console", "_widgetFinder", "_objectFinder",
                        "_propertyEditor", "_apiWindow");
  }

});
