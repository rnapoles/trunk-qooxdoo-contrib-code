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
#embed(inspector.image/*)
************************************************************************ */

qx.Class.define("inspector.Inspector", {
  
  type : "singleton",
  extend: qx.core.Object,

  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics: {
    // Tooltip texts
    RELOAD_BUTTON_TOOLTIP_TEXT: "Reload the window.",
    AUTO_RELOAD_BUTTON_TOOLTIP_TEXT: "Update the window automaticly.",
    SHOW_API_BUTTON_TOOLTIP_TEXT: "Show the API of the selected object or property.",
		SET_NULL_BUTTON_TOOLTIP_TEXT: "Set the currently selected property to null.",
    SET_DEFAULT_BUTTON_TOOLTIP_TEXT: "Set the currently selected property to its initial value.",
    HIGHLIGHT_SELECTED_PROPERTY_BUTTON_TOOLTIP_TEXT: "Highlight the currently selected property.",
    GOTO_SELECTED_PROPERTY_BUTTON_TOOLTIP_TEXT: "Go to the currently selected property.",
    OBJECT_SUMMARY_BUTTON_TOOLTIP_TEXT: "Show a sommary of all objects.",
		
    API_VIEWER_URI: "../api/index.html"		
  },


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function() {
    // start the exclusion stategie
    this.beginExclusion();
    // create the inspector object
    qx.core.Object.call(this);
    // create the stuff needed for the find mode
    this._createCatchClickLayer();
    // create the stuff needed for the highlighting
    this._createHighlightStuff();
    // create the opener toolbar
    this._createOpenerToolBar();
    // end the exclusion startegie
    this.endExclusion(); 
    
    // Define alias for inspector resource path
    qx.io.Alias.getInstance().add("inspector", qx.core.Setting.get("inspector.resourceUri"));
		
		// initialize the this reference to the selected widget
    this.setWidget(qx.ui.core.ClientDocument.getInstance());
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
		    
		
   /*
    *********************************
        API STUFF
    *********************************
    */    
    /**
     * Opens an native window showing the API documentation.
     * If a widget is currently selected, the API viewer will
     * open the the documentataion of that class. Is in addition
     * a property is selected, the viewer automaticly jumps to 
     * the selected property. 
     */
    openApiWindow: function() {
        // if the API window is not created
        if (this._apiWindow == null) {
          // initialize the api window
          this._apiWindow = new qx.client.NativeWindow("", "qooxdoo API viewer");
          this._apiWindow.setWidth(900);
          this._apiWindow.setHeight(600);                    
        }        
        // define the URL to the apiview
        var urlString = inspector.Inspector.API_VIEWER_URI;
        // if there is a property editor
				if (this._propertyEditor != null) {
					// check if a property is selected
	        if (this._propertyEditor.getSelectedProperty() != null) {
	          // if yes, take the classname and the property name from the property
	          urlString = urlString + "#" + this._propertyEditor.getSelectedProperty().getUserData("classname");
	          urlString = urlString + "~" + this._propertyEditor.getSelectedProperty().getUserData("key");
	        
	        // if no property is selected but a object
	        } else if (this._propertyEditor.getWidget() != null) {
	          // only take the objects classname
	          urlString = urlString + "#" + this._propertyEditor.getWidget().classname;
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
     * Handler function for the highlight button. Enabled or 
     * diabled the highlight function.
     * @param e {event} The Event created by a ckeckbox.
     */
    highlightCurrentWidget: function(e) { 
      // only if the function has an event
      if (e != null) {
        // save the current state of the checkbox button
        this._highlightEnabled = e.getCurrentTarget().getChecked();        
      }      
      // if highlight is on
      if (this._highlightEnabled) {
        // if something is selected                 
        if (this._widget != null) {          
          // highlight the current selected      
          this._highlight(this._widget.getElement());    
        }        
      } else {
        // start the timer that removes the highligt border
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
     * Draws a red border aroud the given html element.
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
      // retunrn null if no element is given
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
      
      // highlight the currentlys selected widget again
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
     */
    setWidget: function(widget, ref) {    
      // set the widget in the inspector
      this._widget = widget;
			
			// signal the current Widget in the menu
			this._menu.setCurrentWidget(widget.classname + " [" + widget.toHashCode() + "]")
      
      // set the widget in the console
      if (this._console != null) {
        this._console.setWidget(widget);
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
          this._propertyEditor.setWidget(widget);        
        }
      } 
      // if it is realy a widget and not another qx object
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
   
      
    /*
    *********************************
       COMPONENTS STUFF
    *********************************
    */      
    /**
     * Return the components of the application.
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
     * Beginns the exclusions strategy with storing the current index
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
     * the created classes between beginn and end are in the 
     * range of the exclusion.  
     * @internal
     */
    endExclusion: function() {
      // flush the queues to get all changes
      qx.ui.core.Widget.flushGlobalQueues();
      // get the end index of the db
      var excludeEndIndex = qx.core.Object.getDb().length - 1;
      // do only if new elements were added and the beginnIndex is set
      if (this._excludeBeginIndex <= excludeEndIndex && this._excludeBeginIndex >= 0) {
        this._excludes.push({begin:this._excludeBeginIndex, end:excludeEndIndex});
      }
      // reset the beginn index
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
     * @return {Array} A list of objects containing two values
     *      begin - the beginn of the exclusion index
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
      // set the current widget if the editor is opend
      if (this._widget != null) {
        this._propertyEditor.setWidget(this._widget);
      }
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
        this._console.setWidget(this._widget);
      }
      this._console.open();
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
      // start the exclusion stategie
      this.beginExclusion();    
      // create the console
      this._console = new inspector.console.Console(this, "Console");
      // end the exclusion startegie
      this.endExclusion();
      
      // add the console window to the magnetic components for the toolbar          
      this._menu.addMagneticElement(this._console, "outer");
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
      // start the exclusion stategie
      this.beginExclusion();    
      // create the property editor window
      this._objectFinder = new inspector.objectFinder.ObjectFinder(this, "Object Finder");
      // end the exclusion startegie
      this.endExclusion();

      // add the object finder window to the magnetic components for the toolbar                  
      this._menu.addMagneticElement(this._objectFinder, "outer");  
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
      // start the exclusion stategie
      this.beginExclusion();    
      // create the widget finder window
      this._widgetFinder = new inspector.widgetFinder.WidgetFinder(this, "Widget Finder");
      // end the exclusion startegie
      this.endExclusion();
                  
      // add the widget finder window to the magnetic components for the toolbar                  
      this._menu.addMagneticElement(this._widgetFinder, "outer");            
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
      // start the exclusion stategie
      this.beginExclusion();    
      // create the property editor window
      this._propertyEditor = new inspector.propertyEditor.PropertyEditor(this, "Property Editor");
      // end the exclusion startegie
      this.endExclusion();

      // add the property editor window to the magnetic components for the toolbar                  
      this._menu.addMagneticElement(this._propertyEditor, "outer");  
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
      this._menu = new inspector.Menu(this);
      this._menu.addToDocument();    
			// add the document as magnetiv element      
      this._menu.addMagneticElement(qx.ui.core.ClientDocument.getInstance(), "inner");       
    },
    
    
    /*
    *********************************
       CREATE FIND MODE AND HIGHLIGHT FUNCTIONS
    *********************************
    */      
    /**
     * Create the atom which will be layed over the application to catch
     * the selections during the find mode. Also register the handlers which 
     * are responsible for handling the mousemoce and click events.
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
      this._catchClickLayer.setZIndex(1e5 - 1);
      this._catchClickLayer.hide();
      this._catchClickLayer.addToDocument();
      
      // register the handler to catch the clicks and select the clicked widget
      this._catchClickLayer.addEventListener("click", function(e) {
        // hide the layer that chatches the click
        this._catchClickLayer.hide();
        // disable the find button in the menu
        this._menu.resetFindButton();
        // get the curent mouse position
        var xPosition = e.getClientX();
        var yPosition = e.getClientY();
        // search the widget at the current position
        var clickedElement = this._searchWidget(qx.ui.core.ClientDocument.getInstance(), xPosition, yPosition);
        // select the widget with the given id in the tree
        this.setWidget(clickedElement, this);        
      }, this);
      
      // register the mousemove handler
      this._catchClickLayer.addEventListener("mousemove", function(e) {
        // get the curent mouse position
        var xPosition = e.getClientX();
        var yPosition = e.getClientY();
        // search the widget at the current position
        var element = this._searchWidget(qx.ui.core.ClientDocument.getInstance(), xPosition, yPosition, "");
        // highlight the widget unter the mouse
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
      this._highlightOverlay.setZIndex(1e5 - 2);
      this._highlightOverlay.hide();
      this._highlightOverlay.addToDocument();     
    }    
  },
  
  
  /*
  *****************************************************************************
     SETTINGS
  *****************************************************************************
  */
  settings : { "inspector.resourceUri" : "./resource" },
  
  
  /*
  *****************************************************************************
     DEFER
  *****************************************************************************
  */  
  /**
   * Function which is calld during creating the class. The creates a 
   * instance of the inspector when the application and the ui are ready.
   * @param {Object} statics
   * @param {Object} members
   */
  defer : function(statics, members) {    
    // start an interval that creates an instance if the app and the ui are ready
    members._startupTimer = window.setInterval(function() {
      if (qx.core.Init.getInstance().getApplication() &&
          qx.core.Init.getInstance().getApplication().getUiReady()) {
        statics.getInstance().debug("loaded");
        window.clearInterval(members._startupTimer);
      }      
    }, 500);    
  },  
  
  
  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */
  destruct : function() {
    // clear the timer if it is still running
    window.clearInterval(this.__startupTimer);
  }  
  
});
