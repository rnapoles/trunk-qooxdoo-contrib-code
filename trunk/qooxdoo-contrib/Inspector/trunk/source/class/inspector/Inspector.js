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
    FIND_BUTTON_TOOLTIP_TEXT: "Select a widget with the mouse.",
    HIGHLIGHT_BUTTON_TOOLTIP_TEXT: "Highlight the current selected widget.",
    RELOAD_BUTTON_TOOLTIP_TEXT: "Reload the window.",
    AUTO_RELOAD_BUTTON_TOOLTIP_TEXT: "Update the window automaticly.",
    INHERITED_BUTTON_TOOLTIP_TEXT: "Show the inherited properties.",
    SET_NULL_BUTTON_TOOLTIP_TEXT: "Set the currently selected property to null.",
    SET_DEFAULT_BUTTON_TOOLTIP_TEXT: "Set the currently selected property to its initial value.",
    HIGHLIGHT_SELECTED_PROPERTY_BUTTON_TOOLTIP_TEXT: "Highlight the currently selected property.",
    GOTO_SELECTED_PROPERTY_BUTTON_TOOLTIP_TEXT: "Go to the currently selected property.",
    FULL_VIEW_TOOLTIP_TEXT: "Switch to the editable full view.",
    HTML_VIEW_TOOLTIP_TEXT: "Switch to the 'read only' view.",
    OBJECT_SUMMARY_BUTTON_TOOLTIP_TEXT: "Show a sommary of all objects.",
    GROUP_BUTTON_TOOLTIP_TEXT: "Show the properties in groups."
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
    // create commands
    this._createCommands();
    // create the opener toolbar
    this._createOpenerToolBar();
    // end the exclusion startegie
    this.endExclusion(); 
    
    // Define alias for inspector resource path
    qx.io.Alias.getInstance().add("inspector", qx.core.Setting.get("inspector.resourceUri"));    
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
    _toolbar: null, 
    
    // commands
    _openPropertyEditorCommand: null,
    _openWidgetFinderCommand: null,
    _openObjectFinderCommand: null,
    _openConsoleCommand: null,
    _openAllCommand: null,
    
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
      // set the buttons to the current status
      this._setHighlightButton(this._highlightEnabled);
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
    
    
    /**
     * Sets or resets the highlight button in the property editor 
     * and widget finder.
     * @param status {boolean} The value to set the button.
     */
    _setHighlightButton: function(status) {
      if (this._propertyEditor != null) {
        this._propertyEditor.setHighlightButton(status);        
      }
      if (this._widgetFinder != null) {
        this._widgetFinder.setHighlightButton(status);        
      }
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
      // check both find buttons
      this._setFindButton(true);
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
    
    
    /**
     * Sets or resets the find button in the property editor 
     * and widget finder.
     * @param status {boolean} The value to set the button.
     */
    _setFindButton: function(status) {
      if (this._propertyEditor != null) {
        this._propertyEditor.setFindButton(status);       
      }
      if (this._widgetFinder != null) {
        this._widgetFinder.setFindButton(status);       
      }
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
        var ownObjects = [this, this._catchClickLayer, this._highlightBorder, this._highlightOverlay, this._toolbar];        
        // merge the arrays
        return propertyEditorComponents.concat(consoleComponents).concat(widgetFinderComponents).concat(objectFinderComponents).concat(ownObjects);         
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
      this._toolbar.addMagneticElement(this._console, "outer");
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
      this._toolbar.addMagneticElement(this._objectFinder, "outer");  
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
      this._toolbar.addMagneticElement(this._widgetFinder, "outer");            
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
      this._toolbar.addMagneticElement(this._propertyEditor, "outer");  
      // set the windows enabled to avoid disabling by the client document
      this._propertyEditor.setEnabled(true);
      // set the text color to black in case that the text color of the client document will be changed
      this._propertyEditor.setTextColor("black");
    },
    
    
    /**
     * Create the commands that open the windows.
     */
    _createCommands: function() {
      // create the open all command
      this._openAllCommand = new qx.client.Command("CTRL+SHIFT+F11");
      this._openAllCommand.addEventListener("execute", function(e) {        
        this.openConsole();
        this.openObjectFinder();
        this.openWidgetFinder();
        this.openPropertyEditor();
      }, this);
      // create the open console command
      this._openConsoleCommand = new qx.client.Command("CTRL+SHIFT+F1");
      this._openConsoleCommand.addEventListener("execute", function(e) {
        this.openConsole();
      }, this);
      // create the open object finder command
      this._openObjectFinderCommand = new qx.client.Command("CTRL+SHIFT+F2");
      this._openObjectFinderCommand.addEventListener("execute", function(e) {
        this.openObjectFinder();
      }, this);
      // create the opne widget finder command
      this._openWidgetFinderCommand = new qx.client.Command("CTRL+SHIFT+F3");
      this._openWidgetFinderCommand.addEventListener("execute", function(e) {
        this.openWidgetFinder();
      }, this);
      // create the open property editor command
      this._openPropertyEditorCommand = new qx.client.Command("CTRL+SHIFT+F4");
      this._openPropertyEditorCommand.addEventListener("execute", function(e) {
        this.openPropertyEditor();
      }, this);
    },
    
    
    _createOpenerToolBar: function() {
      this._toolbar = new inspector.FlyingToolBar();      
      this._toolbar.addMagneticElement(qx.ui.core.ClientDocument.getInstance(), "inner");          
      this._toolbar.addToDocument();

      var openAllButton = new qx.ui.toolbar.Button("All");
      openAllButton.setCommand(this._openAllCommand);
      this._toolbar.add(openAllButton);
      
      this._toolbar.add(new qx.ui.toolbar.Separator());
      
      var openConsoleButton = new qx.ui.toolbar.Button("Console");
      openConsoleButton.setCommand(this._openConsoleCommand);
      this._toolbar.add(openConsoleButton);
      
      var openObjectFinderButton = new qx.ui.toolbar.Button("Objects");
      openObjectFinderButton.setCommand(this._openObjectFinderCommand);
      this._toolbar.add(openObjectFinderButton);
      
      var openWidgetFinderButton = new qx.ui.toolbar.Button("Widgets");
      openWidgetFinderButton.setCommand(this._openWidgetFinderCommand);
      this._toolbar.add(openWidgetFinderButton);
      
      var openPropertyEditorButton = new qx.ui.toolbar.Button("Properties");
      openPropertyEditorButton.setCommand(this._openPropertyEditorCommand);
      this._toolbar.add(openPropertyEditorButton);      
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
        // disable all find buttons
        this._setFindButton(false);
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
