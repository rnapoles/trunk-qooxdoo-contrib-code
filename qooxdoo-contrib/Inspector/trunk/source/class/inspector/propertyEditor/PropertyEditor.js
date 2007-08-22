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

qx.Class.define("inspector.propertyEditor.PropertyEditor",
{
  extend : inspector.AbstractWindow,
  // implement : inspector.propertyEditor.PropertyListController,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function(main, name) {          
    // call the constructor of the superclass
    this.base(arguments, main, name);
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

    // the window components
    _propertyList: null,
      _propertyListFull: null,
      _propertyListHtmlTable: null,
  
      // find buttons
      _findButton: null,
      _findToolTip: null,
      // highlight button
      _highlightButton: null,
      _highlightToolTip: null,
      // reload buttons
      _reloadButton: null,
      _reloadToolTip: null,
      _autoReloadToolTip: null,
      // inherited button
      _inheritedButton: null,
      _inheritedTooltip: null,
      // view buttons
      _fullViewTooltip: null,
      _htmlViewTooltip: null,  
      // group button
      _groupButton: null,
			_groupToolTip: null,
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

    // the currently selected property
    _currentlySelectedProperty: null,
    // the currently selected widget
    _widget: null,
        
    // flag to signal that the inherited properties should be displayed
    _showInherited: true,

    // timer for the reload interval
    _reloadTimer: null,

    /*
    *********************************
       PUBLIC
    *********************************
    */        
    
    /**
     * Returns all the components of the property editor which should not
     * be shown in the document tree.
     * @return All components of the property editor.
     */
    getComponents: function() {
      return [this, this._findToolTip, this._highlightToolTip, this._groupToolTip,
              this._setNullTooltip, this._highlightCurrentPropertyTooltip, 
              this._gotoSelectedPropertyTooltip, this._setPropertyToDefaultTooltip,
              this._inheritedTooltip, this._fullViewTooltip, this._autoReloadToolTip, this._reloadToolTip,
              this._htmlViewTooltip].concat(this._propertyListFull.getComponents()).concat(this._propertyListHtmlTable.getComponents());
    },
    
    
    /**
     * Sets a new widget. This new widget is shown in the property editor.
     * @param widget {Widget} The new widget to set.
     */
    setWidget: function(widget) {		
      // save a referente to the current widget
      this._widget = widget; 
      // show a loading message in the toolbar
      this._statusbar.setLabel("Loading...");
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
        // set the status info in the status bar to the curren selected widget
        self._statusbar.setLabel(self._widget.classname + " [" + self._widget.toHashCode() + "]");
      }, 0);
    },
    
    
    /**
     * @return The currently selected widget. 
     */
    getWidget: function() {
      return this._widget;
    },
     
    
    /**
     * Ckecks or unchecks the highlihgt button in the property editor. 
     * This method is necessary if the highlight button is pressed in the 
     * docuemnt tree.
     * @param status {boolean} Value of the highlight button.
     */
    setHighlightButton: function(status) {
      this._highlightButton.setChecked(status);
    },
    
    
    /**
     * Ckecks or unchecks the find button in the property editor. 
     * This method is necessary if the find button is pressed in the 
     * docuemnt tree.
     * @param status {boolean} Value of the find button.
     */
    setFindButton: function(status) {
      this._findButton.setChecked(status);
    },    
    
    setSelectedProperty: function(layout) {
      this._currentlySelectedProperty = layout;
      this._switchPropertyButtons();      
    },
    
    getSelectedProperty: function() {
      return this._currentlySelectedProperty;
    },
    
    getInheritedStatus: function() {
      return this._showInherited;
    },
    
    getGroupStatus: function() {
      return this._groupButton.getChecked();  
    },
    
    gotoSelectedWidget: function() {
      this._gotoSelectedPropertyButtonEventListener();
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
          if (this._widget[getterName] == undefined) {
            // disabled all buttons
            this._setNullButton.setEnabled(false);
            this._setPropertyToDefaultButton.setEnabled(false);
            this._highlightCurrentPropertyButton.setEnabled(false);
            this._gotoSelectedPropertyButton.setEnabled(false);
            // return and ignore the call
            return;
          }          
          
          // get the current value
          var value = this._widget[getterName].call(this._widget);
          // if the check constraint is qidget or parent and the selected widget is noch the client document
          if ((property.check == "qx.ui.core.Widget" || property.check == "qx.ui.core.Parent")&& 
              (this._widget.classname != "qx.ui.core.ClientDocument") && (value != null)){
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
          this._currentlySelectedProperty.setBackgroundColor("red");
          // reset the current selected property
          this._currentlySelectedProperty = null;          
          this._highlightCurrentPropertyButton.setEnabled(false);
          this._gotoSelectedPropertyButton.setEnabled(false);
        }
      }
    },
    
    /**
     * Starts a timer which automaticly reloads the table every 200 ms 
     * if the window is on screen.
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
     * Stops the automati reload timer.
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
     * @param e {Event} 
     */
    _setNullButtonEventListener: function (e) {
      // get the corresponding classname of the currently selected property
      var classname = this._currentlySelectedProperty.getUserData("classname");
      // get the name of the property
      var key = this._currentlySelectedProperty.getUserData("key");
      // get the setter name
      var setterName = "set" + qx.lang.String.toFirstUp(key);
      // try to invoke the setter
      try {
        this._widget[setterName].call(this._widget, null);
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
     * @param e {Event} 
     */
    _setPropertyToDefaultButtonEventListener: function (e) {
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
        this._widget[setterName].call(this._widget, property.init);
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
     * Handler function to handle the execution of the "highlight property" #
     * buutton. The function reads the value of the property which is a 
     * widget and dedicates the highligting task to the inspector class.
     * @param e {Event} 
     */
    _highlightCurrentPropertyButtonEventListener: function(e) {
      // get the name of the property
      var key = this._currentlySelectedProperty.getUserData("key");
      // build the name of the getter
      var getterName = "get" + qx.lang.String.toFirstUp(key);
      try {
        // tell the document tree to highlight the new widget
        this._inspector.highlightWidget(this._widget[getterName].call(this._widget));
      } catch (e) {
        alert("Error during highlighting the currently selected property widget: " + e);
      }
    },
    
    
    /**
     * Handler function to handle the execution of the "goto property" button.
     * The function reads the value of the currently selected property which is
     * a widget and selects the new widget in the tree and in the property editor.
     * @param e {Event} 
     */
    _gotoSelectedPropertyButtonEventListener: function(e) {
      // go only to the parrent if the widget is not the client document (root)
      if (this._widget.classname != "qx.ui.core.ClientDocument") {
        
        // get the name of the property
        var key = this._currentlySelectedProperty.getUserData("key");
        // build the name of the getter function
        var getterName = "get" + qx.lang.String.toFirstUp(key);

        try {
          // tell the document tree to select the new widget
          this._inspector.setWidget(this._widget[getterName].call(this._widget), this);
          // reload the configuration for the property buttons
          this._switchPropertyButtons();            
        } catch (e) {
          alert("Errer during selecting the property widget: " + e);
        }
      }
    },
    
    
    /**
     * Handler function to handle the execution of the "find" button. The
     * function dedicates the finding of the widget to the inspector class.
     * @param e {Event} 
     */
    _findWidget: function(e) {
      // if the button is pressed in
      if (e.getCurrentTarget().getChecked()) {
        this._inspector.startFindMode();
      } else {
        // hide the catchClickLayer
        this._inspector.exitFindMode();
      }
    },  
    
    
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
     * Sets the height of the main element of the window.
     * @param {int} delta The change value of the height.
     */
    _setMainElementHeight: function(delta) {
      this._propertyListFull.setHeight(this._propertyListFull.getHeight() + delta);
      this._propertyListHtmlTable.setHeight(this._propertyListHtmlTable.getHeight() + delta);
    },
    
    /**
     * Sets the width of the main element of the window.
     * @param {Object} delta The change value of the width.
     */
    _setMainElementWidth: function(delta) {
      this._propertyListFull.setWidth(this._propertyListFull.getWidth() + delta);
      this._propertyListHtmlTable.setWidth(this._propertyListHtmlTable.getWidth() + delta);
    },
    
    /**
     * Sets the start position of the window.
     */
    _setApearancePosition: function() {
      this.setLeft(this.getParent().getOffsetWidth() - this._windowWidth);
      this.setTop(qx.ui.core.ClientDocument.getInstance().getInnerHeight() * 0.5);
      this.setHeight(qx.ui.core.ClientDocument.getInstance().getInnerHeight() * 0.5);
    },
    
    /**
     * Creates the main element e.g. a table or tree.
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
     * Creates and adds the toolbar buttons.
     */
    _addToolbarButtons: function() {
      // find button
      this._findButton = new qx.ui.toolbar.CheckBox(null, qx.io.Alias.getInstance().resolve("inspector/image/select.png"));
      this._toolbar.add(this._findButton);
      this._findToolTip = new qx.ui.popup.ToolTip(inspector.Inspector.FIND_BUTTON_TOOLTIP_TEXT, null);
      this._findButton.setToolTip(this._findToolTip);
      this._findButton.addEventListener("execute", this._findWidget, this);
      
      // highlight button
      this._highlightButton = new qx.ui.toolbar.CheckBox(null, qx.io.Alias.getInstance().resolve("inspector/image/highlight.png"));
      this._toolbar.add(this._highlightButton); 
      this._highlightToolTip = new qx.ui.popup.ToolTip(inspector.Inspector.HIGHLIGHT_BUTTON_TOOLTIP_TEXT, null);
      this._highlightButton.setToolTip(this._highlightToolTip);
      this._highlightButton.addEventListener("execute", this._inspector.highlightCurrentWidget, this._inspector);
      
      // add a seperator
      this._toolbar.add(new qx.ui.toolbar.Separator());
      
      // create and add the reload button
      this._reloadButton = new qx.ui.toolbar.Button(null, qx.io.Alias.getInstance().resolve("inspector/image/reload.png"));
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
      
      // create and add a autoreload button
      var autoReloadButton = new qx.ui.toolbar.CheckBox(null, qx.io.Alias.getInstance().resolve("inspector/image/autoreload.png"));
      this._toolbar.add(autoReloadButton);
      // add the change event listener
      autoReloadButton.addEventListener("changeChecked", function (e) {
        if (e.getData()) {
          this._enableAutoReload();
        } else {
          this._disableAutoReload();
        }
      },this);
      // add the tooltip to the autoreload button
      this._autoReloadToolTip = new qx.ui.popup.ToolTip(inspector.Inspector.AUTO_RELOAD_BUTTON_TOOLTIP_TEXT, null);      
      autoReloadButton.setToolTip(this._autoReloadToolTip);
      
      // add a seperator
      this._toolbar.add(new qx.ui.toolbar.Separator());

      // inherited button
      this._inheritedButton = new qx.ui.toolbar.CheckBox(null, qx.io.Alias.getInstance().resolve("inspector/image/inherited.png", true));
      this._toolbar.add(this._inheritedButton);   
      this._inheritedTooltip = new qx.ui.popup.ToolTip(inspector.Inspector.INHERITED_BUTTON_TOOLTIP_TEXT, null);
      this._inheritedButton.setToolTip(this._inheritedTooltip);
      this._inheritedButton.addEventListener("execute", this._switchInheritedStatus, this);            
     
		  
      // full view button
      var viewFullButton = new qx.ui.toolbar.RadioButton(null, qx.io.Alias.getInstance().resolve("inspector/image/fullview.png"));
      viewFullButton.setChecked(true);
      this._fullViewTooltip = new qx.ui.popup.ToolTip(inspector.Inspector.FULL_VIEW_TOOLTIP_TEXT, null);
      viewFullButton.setToolTip(this._fullViewTooltip);      
      this._toolbar.add(viewFullButton);
      viewFullButton.addEventListener("changeChecked", function(e) {
        // if the button is checked
        if (e.getData()) {
          // switch the property lists
          this._mainLayout.removeAt(1);
          this._propertyList = this._propertyListFull;
          // invoke a reload of the list if a widget is selected
          if (this._widget != null) {
            this.setWidget(this._widget);
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

      // table view button
      var viewTableButton = new qx.ui.toolbar.RadioButton(null, qx.io.Alias.getInstance().resolve("inspector/image/tableview.png"));
      this._htmlViewTooltip = new qx.ui.popup.ToolTip(inspector.Inspector.HTML_VIEW_TOOLTIP_TEXT, null);
      viewTableButton.setToolTip(this._htmlViewTooltip);  
      this._toolbar.add(viewTableButton);
      viewTableButton.addEventListener("changeChecked", function(e) {
        // if the button is checked
        if (e.getData()) {
          // switch the property lists
          this._mainLayout.removeAt(1);
          this._propertyList = this._propertyListHtmlTable;
          // invoke a reload of the list if a widget is selected
          if (this._widget != null) {
            this.setWidget(this._widget);
          }
          // add the new created list to the property editor
          this._mainLayout.addAt(this._propertyList, 1);
        // if the button is released
        } else {   
          // enable the second view    
          viewFullButton.setChecked(true);
        }      
      }, this);

      // radio manager for the view buttons      
      var viewRadioManager = new qx.ui.selection.RadioManager(null, [viewFullButton, viewTableButton]);
 
      // create and add a group button
      this._groupButton = new qx.ui.toolbar.CheckBox(null, qx.io.Alias.getInstance().resolve("inspector/image/group.png"));
			this._groupToolTip = new qx.ui.popup.ToolTip(inspector.Inspector.GROUP_BUTTON_TOOLTIP_TEXT, null);
			this._groupButton.setToolTip(this._groupToolTip);
      this._toolbar.add(this._groupButton);
      // add the event listener for the change of the group status
      this._groupButton.addEventListener("click", function(e) {
        if (this._widget != null) {
          // set the widget again so signal a clear reload with the new settings
          this.setWidget(this._widget);
        }
				// enable or disable the inheritance button
				this._inheritedButton.setEnabled(!e.getTarget().getChecked())
      }, this);

      // add a spacer to keep the property relevant buttons on the right
      this._toolbar.add(new qx.ui.basic.HorizontalSpacer());
     
      // set null button
      this._setNullButton = new qx.ui.toolbar.Button(null , qx.io.Alias.getInstance().resolve("inspector/image/setnull.png"));
      this._setNullButton.setEnabled(false);
      this._setNullTooltip = new qx.ui.popup.ToolTip(inspector.Inspector.SET_NULL_BUTTON_TOOLTIP_TEXT, null);
      this._setNullButton.setToolTip(this._setNullTooltip);
      this._toolbar.add(this._setNullButton);
      this._setNullButton.addEventListener("execute", this._setNullButtonEventListener, this);
  
      // set to initial value button
      this._setPropertyToDefaultButton = new qx.ui.toolbar.Button(null , qx.io.Alias.getInstance().resolve("inspector/image/setInit.png"));
      this._setPropertyToDefaultButton.setEnabled(false);
      this._setPropertyToDefaultTooltip = new qx.ui.popup.ToolTip(inspector.Inspector.SET_DEFAULT_BUTTON_TOOLTIP_TEXT, null);
      this._setPropertyToDefaultButton.setToolTip(this._setPropertyToDefaultTooltip);
      this._toolbar.add(this._setPropertyToDefaultButton);
      this._setPropertyToDefaultButton.addEventListener("execute", this._setPropertyToDefaultButtonEventListener, this);
  
      // highlight property button
      this._highlightCurrentPropertyButton = new qx.ui.toolbar.Button(null , qx.io.Alias.getInstance().resolve("inspector/image/highlightproperty.png"));
      this._highlightCurrentPropertyButton.setEnabled(false);
      this._highlightCurrentPropertyTooltip = new qx.ui.popup.ToolTip(inspector.Inspector.HIGHLIGHT_SELECTED_PROPERTY_BUTTON_TOOLTIP_TEXT, null);
      this._highlightCurrentPropertyButton.setToolTip(this._highlightCurrentPropertyTooltip);    
      this._toolbar.add(this._highlightCurrentPropertyButton);
      this._highlightCurrentPropertyButton.addEventListener("execute", this._highlightCurrentPropertyButtonEventListener, this);
  
      // goto property button
      this._gotoSelectedPropertyButton = new qx.ui.toolbar.Button(null , qx.io.Alias.getInstance().resolve("inspector/image/goto.png"));
      this._gotoSelectedPropertyButton.setEnabled(false);
      this._gotoSelectedPropertyTooltip = new qx.ui.popup.ToolTip(inspector.Inspector.GOTO_SELECTED_PROPERTY_BUTTON_TOOLTIP_TEXT, null);
      this._gotoSelectedPropertyButton.setToolTip(this._gotoSelectedPropertyTooltip);      
      this._toolbar.add(this._gotoSelectedPropertyButton);
      this._gotoSelectedPropertyButton.addEventListener("execute", this._gotoSelectedPropertyButtonEventListener, this);
    }
    
  }
});
