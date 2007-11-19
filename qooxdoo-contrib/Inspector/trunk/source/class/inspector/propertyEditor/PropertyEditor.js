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

qx.Class.define("inspector.propertyEditor.PropertyEditor", {
  
  extend : inspector.AbstractWindow,
  implement : inspector.propertyEditor.IPropertyListController,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function(main, name) {          
    // call the constructor of the superclass
    this.base(arguments, main, name);
    // create the Filter for sorting 
    this._filter = new inspector.propertyEditor.Filter();		
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
    // the window components
    _propertyList: null,
    _propertyListFull: null,
    _propertyListHtmlTable: null,
  
    // reload buttons
    _reloadButton: null,
    _reloadToolTip: null,
    // api buttion
    _apiButtonToolTip: null,
    // set null button
    _setNullButton: null,
    _setNullTooltip: null,
    // init button
    _setPropertyToDefaultButton: null,
    _setPropertyToDefaultTooltip: null,
    // highlight currenty property button
    _highlightCurrentPropertyButton: null,
    _highlightCurrentPropertyTooltip: null,
    // goto selected property button
    _gotoSelectedPropertyButton: null,
    _gotoSelectedPropertyTooltip: null,
    
    _menu: null,

    // the currently selected property
    _currentlySelectedProperty: null,
    // the currently selected qooxdoo object
    _qxObject: null,
        
    // flag to signal that the inherited properties should be displayed
    _showInherited: true,

    // timer for the reload interval
    _reloadTimer: null,
		
		// filter to sort the properties into groups
		_filter: null,


    /*
    *********************************
       PUBLIC
    *********************************
    */        
    /**
     * Returns all the components of the property editor which should not
     * be shown in the widget finder.
     * @internal
     * @return {Array} All components of the property editor.
     */
    getComponents: function() {
      return [this, this._groupToolTip, this._menu, this._apiButtonToolTip,
              this._setNullTooltip, this._highlightCurrentPropertyTooltip, 
              this._gotoSelectedPropertyTooltip, this._setPropertyToDefaultTooltip,
              this._reloadToolTip].concat(this._propertyListFull.getComponents()).concat(this._propertyListHtmlTable.getComponents());
    },
    
    
    /**
     * Sets a new widget. This new object is shown in the property editor.
     * @param qxObject {qx.core.Object} The new qooxdoo object to set.
     */
    setWidget: function(qxObject) {
      // only set the widget if it is a new one
      if (this._qxObject == qxObject) {
        return;
      }
      
      // save a referente to the current widget
      this._qxObject = qxObject; 
      // show a loading message in the titel bar      
      this.setCaption(inspector.Inspector.PROPERTY_CAPTION_TITLE + " (Loading...)");
      // save the this reference for the timeout function
      var self = this;
      // to the reload of the list after a timeout (after the loading is shown)
      window.setTimeout(function() {
        // initialize the reload of the properties  
        self._inspector.beginExclusion();
        self._propertyList.build();
        self._inspector.endExclusion();
        // reload the button configuration for the property buttons
        if (self._currentlySelectedProperty != null) {
          // get the key and classname of the former selected property
          var key = self._currentlySelectedProperty.getUserData("key");
          var classname = self._currentlySelectedProperty.getUserData("classname");          
          // if the property does exist in the new selected widget
          if (self._propertyList.containsProperty(key, classname)) {
            // reload the button configuration
            self._switchPropertyButtons();              
          } else {
            // reset the current selected property
            self._currentlySelectedProperty = null;
            // enable all buttons
            self._setNullButton.setEnabled(false);
            self._setPropertyToDefaultButton.setEnabled(false);
            self._highlightCurrentPropertyButton.setEnabled(false);
            self._gotoSelectedPropertyButton.setEnabled(false);
          }
        }            
        // reset the loading message in the title bar
        self.setCaption(inspector.Inspector.PROPERTY_CAPTION_TITLE + " (" + 
				                self._qxObject.classname + " [" + self._qxObject.toHashCode() + "])");
      }, 0);
    },
    
    
    /**
     * @return The currently selected object. 
     */
    getWidget: function() {
      return this._qxObject;
    },
         
    
    /**
     * Sets the selected property.
     * @internal
     * @param layout {qx.ui.layout.HorizontalBoxLayout} The layout containing the property. 
     */
    setSelectedProperty: function(layout) {
      this._currentlySelectedProperty = layout;
      this._switchPropertyButtons();      
    },
    
    
    /**
     * @internal
     * @return {qx.ui.layout.HorizontalBoxLayout} The selected property.
     */
    getSelectedProperty: function() {
      return this._currentlySelectedProperty;
    },
    
    
    /**
     * @return {boolean} The status of the inheritance.
     */
    getInheritedStatus: function() {
      return this._showInherited;
    },
    
    
    /**
     * @return The status of the group button.
     */
    getGroupStatus: function() {
      return this._groupButton.getChecked();  
    },
    
    
    /**
     * Invokes a selection of the current selected property as a object.
     */
    gotoSelectedWidget: function() {
      this._gotoSelectedPropertyButtonEventListener();
    },
		
		
		/**
		 * Returns the Filter used for grouping the properties. 
		 */
		getFilter: function() {
			return this._filter;
		},
    
    
    /**
     * Tells the property list that something hase changed in the layout
     * and that the calculations based on font size or something else 
     * has to be recalculated. 
     */
    recalculateLayout: function() {
      this._propertyList.recalculateLayout();
    },
    
    
    /*
    *********************************
       PROTECTED
    *********************************
    */
    /**
     * This method is responsible for enabling and disabling the property 
     * relevant buttons like "set null". 
     */
    _switchPropertyButtons: function() {
      // check if a property is set
      if (this._currentlySelectedProperty == null) {
        // disabled all buttons
        this._setNullButton.setEnabled(false);
        this._setPropertyToDefaultButton.setEnabled(false);
        this._highlightCurrentPropertyButton.setEnabled(false);
        this._gotoSelectedPropertyButton.setEnabled(false);
        // end the function
        return;
      }
      // get the classname of the currently selected property
      var classname = this._currentlySelectedProperty.getUserData("classname");
      // get the name of the currently selected property
      var key = this._currentlySelectedProperty.getUserData("key");
      // get the properties array of the selected class
      var properties = qx.Class.getByName(classname).$$properties;
      // get the property array of the currently selected property
      var property = properties[key];
      
      // handle the null button
      if (property.nullable) {
        this._setNullButton.setEnabled(true);
      } else {
        this._setNullButton.setEnabled(false);
      }
      
      // handle the init button
      if (property.init) {
        this._setPropertyToDefaultButton.setEnabled(true);        
      } else {
        this._setPropertyToDefaultButton.setEnabled(false);
      }
      
      // handle the goto and highlight buttons
      if (key != undefined) {
        try {
          // create the getter name for the property
          var getterName = "get" + qx.lang.String.toFirstUp(key);
          
          // if the function is not available an the object          
          if (this._qxObject[getterName] == undefined) {
            // disabled all buttons
            this._setNullButton.setEnabled(false);
            this._setPropertyToDefaultButton.setEnabled(false);
            this._highlightCurrentPropertyButton.setEnabled(false);
            this._gotoSelectedPropertyButton.setEnabled(false);
            // return and ignore the call
            return;
          }          
          
          // get the current value
          var value = this._qxObject[getterName].call(this._qxObject);
          // if the check constraint is qidget or parent and the selected widget is noch the client document
          if ((property.check == "qx.ui.core.Widget" || property.check == "qx.ui.core.Parent")&& 
              (this._qxObject.classname != "qx.ui.core.ClientDocument") && (value != null)){
            this._highlightCurrentPropertyButton.setEnabled(true);
            this._gotoSelectedPropertyButton.setEnabled(true);
          } else {
            this._highlightCurrentPropertyButton.setEnabled(false);
            this._gotoSelectedPropertyButton.setEnabled(false);
          }
        } catch (e) {
          // signal the user that somneting went wrong
          alert("Error during reading the selecteds Property: " + e);
          // mark the property that something went wrong while reading
          this._currentlySelectedProperty.setBackgroundColor(null);
          // reset the current selected property
          this._currentlySelectedProperty = null;          
          this._highlightCurrentPropertyButton.setEnabled(false);
          this._gotoSelectedPropertyButton.setEnabled(false);
        }
      }
    },
    
    
    /*
    *********************************
       AUTORELOAD STUFF
    *********************************
    */       
    /**
     * Starts a timer which automaticly reloads the table every 200 ms 
     * if the property editor is on screen.
     */
    _enableAutoReload: function() {
      // disable the reload button
      this._reloadButton.setEnabled(false);
      // set the timer to reload the objects
      var self = this;    
      this._reloadTimer = window.setInterval(function() {
        if (self.getDisplay() && self.getVisibility()) {
          self._inspector.beginExclusion();
          self._propertyList.build();
          self._inspector.endExclusion();
          // self._readObjects.call(self);
        }
      }, 200);   
    },
    
    
    /**
     * Stops the automatic reload timer.
     */
    _disableAutoReload: function () {
      // enable the reload button
      this._reloadButton.setEnabled(true);
      // switch off the reload timer 
      window.clearTimeout(this._reloadTimer);
    },    
    
    
    /*
    *********************************
       BUTTON HANDLERS
    *********************************
    */    
    /**
     * Handler function to handle the execution on the "set null" button. 
     * The function tries to set the current selected property of the widget 
     * to null. If that fails, an alert shows the exception message.
     */
    _setNullButtonEventListener: function () {
      // get the corresponding classname of the currently selected property
      var classname = this._currentlySelectedProperty.getUserData("classname");
      // get the name of the property
      var key = this._currentlySelectedProperty.getUserData("key");
      // get the setter name
      var setterName = "set" + qx.lang.String.toFirstUp(key);
      // try to invoke the setter
      try {
        this._qxObject[setterName].call(this._qxObject, null);
        // relaod the property view of the current column
        var classname = this._currentlySelectedProperty.getUserData("classname");
        var key = this._currentlySelectedProperty.getUserData("key");
        this._propertyList.update(key, classname);
        this._switchPropertyButtons();
      } catch (e) {
        // alert the user if the sett could not be executed
        alert(e);
      }
    },
    
    
    /**
     * Handler function to handle the execution of the "init" button. The 
     * function resets the selected property to its initial value given in 
     * the property declaration. If that fails, the exception message will
     * be shown to the user in an alert.
     */
    _setPropertyToDefaultButtonEventListener: function () {
      // get the corresponding classname of the currently selected property
      var classname = this._currentlySelectedProperty.getUserData("classname");
      // get the name of the property
      var key = this._currentlySelectedProperty.getUserData("key");
      // get the property array of the selected property
      var properties = qx.Class.getByName(classname).$$properties;
      var property = properties[key];            
      // get the setter name
      var setterName = "set" + qx.lang.String.toFirstUp(key);
      // try to invoke the setter
      try {
        this._qxObject[setterName].call(this._qxObject, property.init);
        // relaod the property view of the current column
        var classname = this._currentlySelectedProperty.getUserData("classname");
        var key = this._currentlySelectedProperty.getUserData("key");
        this._propertyList.update(key, classname);
      } catch (e) {
        // alert the user if the sett could not be executed
        alert(e);
      }
    },
    
    
    /**
     * Handler function to handle the execution of the "highlight property" 
     * button. The function reads the value of the property which is a 
     * widget and dedicates the highligting task to the inspector class.
     */
    _highlightCurrentPropertyButtonEventListener: function() {
      // get the name of the property
      var key = this._currentlySelectedProperty.getUserData("key");
      // build the name of the getter
      var getterName = "get" + qx.lang.String.toFirstUp(key);
      try {
        // tell the document tree to highlight the new widget
        this._inspector.highlightWidget(this._qxObject[getterName].call(this._qxObject));
      } catch (e) {
        alert("Error during highlighting the currently selected property widget: " + e);
      }
    },
    
    
    /**
     * Handler function to handle the execution of the "goto property" button.
     * The function reads the value of the currently selected property which is
     * a widget and selects the new widget.
     */
    _gotoSelectedPropertyButtonEventListener: function() {
      // go only to the parrent if the widget is not the client document (root)
      if (this._qxObject.classname != "qx.ui.core.ClientDocument") {
        // get the name of the property
        var key = this._currentlySelectedProperty.getUserData("key");
        // build the name of the getter function
        var getterName = "get" + qx.lang.String.toFirstUp(key);

        try {
          // tell the document tree to select the new widget
          this._inspector.setWidget(this._qxObject[getterName].call(this._qxObject), this);
          // reload the configuration for the property buttons
          this._switchPropertyButtons();            
        } catch (e) {
          alert("Errer during selecting the property widget: " + e);
        }
      }
    },
    
    
    /**
     * Handler function to handle the execution of the inherited button.
     * @param e {Event} Event created by a chackbox.
     */
    _switchInheritedStatus: function(e) {
      this._showInherited = e.getCurrentTarget().getChecked();
      this._propertyList.switchInheritedStatus(this._showInherited);
    },

    
    /*
    *********************************
       OVERWRITTEN PROTTECTED FUNCTIONS
    *********************************
    */
    /**
     * Sets the height of the property lists.
     * @param delta {Number} The change value of the height.
     */
    _setMainElementHeight: function(delta) {
      this._propertyListFull.setHeight(this._propertyListFull.getHeight() + delta);
      this._propertyListHtmlTable.setHeight(this._propertyListHtmlTable.getHeight() + delta);
    },
    
    
    /**
     * Sets the width of the property lists.
     * @param delta {Number} The change value of the width.
     */
    _setMainElementWidth: function(delta) {
      this._propertyListFull.setWidth(this._propertyListFull.getWidth() + delta);
      this._propertyListHtmlTable.setWidth(this._propertyListHtmlTable.getWidth() + delta);
    },
    
    
    /**
     * Sets the start position of the window.
     */
    _setApearancePosition: function() {
      // if left is not set
			if (this.getLeft() == null) {
				// set the window an the right border of the document
        this.setLeft(this.getParent().getOffsetWidth() - this._windowWidth);      
			}
			// if the top is not set
      if (this.getTop() == null) {
				// set the window beginning at the half of the document
				this.setTop(qx.ui.core.ClientDocument.getInstance().getInnerHeight() * 0.5);
			}
			// if the height is not set propertly
      if (this.getHeight() == "auto") {
				// set the height to the half of the documents height
				this.setHeight(qx.ui.core.ClientDocument.getInstance().getInnerHeight() * 0.5);
			}
    },
	
    
    /**
     * Creates the two views for the editor and adds the full view as default view.
     */
    _createMainElement: function() {
      // create the inner layouts to hold the property lists
      this._propertyListFull = new inspector.propertyEditor.PropertyListFull(this);
      this._propertyListHtmlTable = new inspector.propertyEditor.PropertyListHtmlTable(this);
    
      this._propertyList = this._propertyListFull;
      // add the list to the layout
      this._mainLayout.add(this._propertyList);  
    },
      
    
    /**
     * Creates the view menu including ths buttons and handlers
     * for the menu.
     */
    _createMenu: function() {
      // create the menu
      this._menu = new qx.ui.menu.Menu();
      this._menu.addToDocument();
      
      // auto reload
      var autoReloadButton = new qx.ui.menu.CheckBox("Auto-Reload")
      var autoReloadCommand = new qx.client.Command("");
      autoReloadButton.setCommand(autoReloadCommand);      
      autoReloadCommand.addEventListener("execute", function (e) {
        if (e.getData().getChecked()) {
          this._enableAutoReload();          
        } else {
          this._disableAutoReload();          
        }
      }, this);            
      this._menu.add(autoReloadButton);
      
      // seperator
      this._menu.add(new qx.ui.menu.Separator());
      
      // inherited checkbox
      this._inheritedButton = new qx.ui.menu.CheckBox("Show Inherited Porperties", null, true);
      this._menu.add(this._inheritedButton);
      this._inheritedButton.addEventListener("execute", this._switchInheritedStatus, this);
      
      // seperator
      this._menu.add(new qx.ui.menu.Separator());			
			
			// non group radio button
			var nonGroupButton = new qx.ui.menu.RadioButton("Group by inheritance", null, true);
			nonGroupButton.addEventListener("execute", function(e) {
        if (this._qxObject != null) {
          // reload the view          
          this._propertyList.build();
        }
        // enable the inheritance button
        this._inheritedButton.setEnabled(true); 
			}, this);
			this._menu.add(nonGroupButton);
      // group radiobutton
      this._groupButton = new qx.ui.menu.RadioButton("Group by category");
      this._groupButton.addEventListener("execute", function(e) {
        if (this._qxObject != null) {
          // reload the view          
					this._propertyList.build();
        }
        // disable the inheritance button
        this._inheritedButton.setEnabled(false);
      }, this);      
      this._menu.add(this._groupButton);
      // group radio manager
      new qx.ui.selection.RadioManager(null, [nonGroupButton, this._groupButton]);

      // seperator
      this._menu.add(new qx.ui.menu.Separator());
      
      // edit view button
      var editViewButton = new qx.ui.menu.RadioButton("Edit View", null, true);
      editViewButton.addEventListener("execute", function(e) {
        // if the button is checked
        if (e.getCurrentTarget().getChecked()) {
          // switch the property lists
          this._mainLayout.removeAt(1);
          this._propertyList = this._propertyListFull;
          // invoke a reload of the list if a widget is selected
          if (this._qxObject != null) {
	          // reload the view          
	          this._propertyList.build();
          }
          // set the rigth inhrerited status
          this._propertyList.switchInheritedStatus();
          // add the new created list to the property editor
          this._mainLayout.addAt(this._propertyList, 1);          
        // if the button is released
        } else {   
          // enable the second view     
          viewTableButton.setChecked(true);
        }
      }, this);      
      this._menu.add(editViewButton);

      // table view button
      var tableViewButton = new qx.ui.menu.RadioButton("Table View")
      tableViewButton.addEventListener("execute", function(e) {
        // if the button is checked
        if (e.getCurrentTarget().getChecked()) {
          // switch the property lists
          this._mainLayout.removeAt(1);
          this._propertyList = this._propertyListHtmlTable;
          // invoke a reload of the list if a widget is selected
          if (this._qxObject != null) {
	          // reload the view          
	          this._propertyList.build();
          }
          // add the new created list to the property editor
          this._mainLayout.addAt(this._propertyList, 1);
        // if the button is released
        } else {   
          // enable the second view    
          viewFullButton.setChecked(true);
        }      
      }, this);
      this._menu.add(tableViewButton); 
      
      // radio manager for the view buttons      
      var viewRadioManager = new qx.ui.selection.RadioManager(null, [editViewButton, tableViewButton]);     
    },
    
    
    /**
     * Creates and adds the toolbar buttons.
     */
    _addToolbarButtons: function() {
      // create the menu
      this._createMenu();
      // add the menu button
      var menuButton = new qx.ui.toolbar.MenuButton("View", this._menu, qx.io.Alias.getInstance().resolve("inspector/image/menuarrow.png"));
      menuButton.setIconPosition("right");
      this._toolbar.add(menuButton);
	  
	  // add a click listener so that the menu is always on front of the property editor window
	  menuButton.addEventListener("click", function() {
	  	// move the menu in front
	  	this._menu.setZIndex(this.getZIndex() + 1);
	  }, this);
      
      // add a seperator
      this._toolbar.add(new qx.ui.toolbar.Separator());
      
      // create and add the reload button
      this._reloadButton = new qx.ui.toolbar.Button(null, qx.io.Alias.getInstance().resolve("inspector/image/icons/reload.png"));
      this._toolbar.add(this._reloadButton);
      // add the event listener for the reload
      this._reloadButton.addEventListener("click", function() {
        this._inspector.beginExclusion();
        this._propertyList.build();
        this._inspector.beginExclusion();
      }, this);
      // set the tooltip to the reload button
      this._reloadToolTip = new qx.ui.popup.ToolTip(inspector.Inspector.RELOAD_BUTTON_TOOLTIP_TEXT, null);
      this._reloadButton.setToolTip(this._reloadToolTip);

      // add a seperator
      this._toolbar.add(new qx.ui.toolbar.Separator());

      // create the API button      
      var apiButton = new qx.ui.toolbar.Button(null, qx.io.Alias.getInstance().resolve("inspector/image/icons/api.png"));
      this._toolbar.add(apiButton);
      apiButton.addEventListener("execute", this._inspector.openApiWindow, this._inspector);
      this._apiButtonToolTip = new qx.ui.popup.ToolTip(inspector.Inspector.SHOW_API_BUTTON_TOOLTIP_TEXT, null);
      apiButton.setToolTip(this._apiButtonToolTip);

      // add a spacer to keep the property relevant buttons on the right
      this._toolbar.add(new qx.ui.basic.HorizontalSpacer());
     
      // set null button
      this._setNullButton = new qx.ui.toolbar.Button(null , qx.io.Alias.getInstance().resolve("inspector/image/icons/setnull.png"));
      this._setNullButton.setEnabled(false);
      this._setNullTooltip = new qx.ui.popup.ToolTip(inspector.Inspector.SET_NULL_BUTTON_TOOLTIP_TEXT, null);
      this._setNullButton.setToolTip(this._setNullTooltip);
      this._toolbar.add(this._setNullButton);
      this._setNullButton.addEventListener("execute", this._setNullButtonEventListener, this);
  
      // set to initial value button
      this._setPropertyToDefaultButton = new qx.ui.toolbar.Button(null , qx.io.Alias.getInstance().resolve("inspector/image/icons/setInit.png"));
      this._setPropertyToDefaultButton.setEnabled(false);
      this._setPropertyToDefaultTooltip = new qx.ui.popup.ToolTip(inspector.Inspector.SET_DEFAULT_BUTTON_TOOLTIP_TEXT, null);
      this._setPropertyToDefaultButton.setToolTip(this._setPropertyToDefaultTooltip);
      this._toolbar.add(this._setPropertyToDefaultButton);
      this._setPropertyToDefaultButton.addEventListener("execute", this._setPropertyToDefaultButtonEventListener, this);
  
      // highlight property button
      this._highlightCurrentPropertyButton = new qx.ui.toolbar.Button(null , qx.io.Alias.getInstance().resolve("inspector/image/icons/highlight.png"));
      this._highlightCurrentPropertyButton.setEnabled(false);
      this._highlightCurrentPropertyTooltip = new qx.ui.popup.ToolTip(inspector.Inspector.HIGHLIGHT_SELECTED_PROPERTY_BUTTON_TOOLTIP_TEXT, null);
      this._highlightCurrentPropertyButton.setToolTip(this._highlightCurrentPropertyTooltip);    
      this._toolbar.add(this._highlightCurrentPropertyButton);
      this._highlightCurrentPropertyButton.addEventListener("execute", this._highlightCurrentPropertyButtonEventListener, this);
  
      // goto property button
      this._gotoSelectedPropertyButton = new qx.ui.toolbar.Button(null , qx.io.Alias.getInstance().resolve("inspector/image/icons/goto.png"));
      this._gotoSelectedPropertyButton.setEnabled(false);
      this._gotoSelectedPropertyTooltip = new qx.ui.popup.ToolTip(inspector.Inspector.GOTO_SELECTED_PROPERTY_BUTTON_TOOLTIP_TEXT, null);
      this._gotoSelectedPropertyButton.setToolTip(this._gotoSelectedPropertyTooltip);      
      this._toolbar.add(this._gotoSelectedPropertyButton);
      this._gotoSelectedPropertyButton.addEventListener("execute", this._gotoSelectedPropertyButtonEventListener, this);
    }
  },  
  
  
  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */
  destruct : function() {
		// reset the buttons
    this._inheritedButton = null;
		this._groupButton = null;
  }  
});
