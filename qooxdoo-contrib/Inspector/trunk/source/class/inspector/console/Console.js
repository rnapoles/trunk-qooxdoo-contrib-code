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
 * The console is one of the most powerful components of the inspector.
 * 
 * With the console and its including two views you can debug you application 
 * more easier. It is like using firebug only in every browser and with special 
 * functions for qooxdoo.
 */
qx.Class.define("inspector.console.Console", {
  
  extend : inspector.components.AbstractWindow,  

  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics: {
    /**
     * The default search term used in the search field.
     */
    SEARCH_TERM: "Search..."
  },
  
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  /**
   * Creates an instance of the consol window including all contained views.
   * @param main {inspector.Inspector} Reference to the inspector object.
   * @param name {String} The title of the window.
   */
  construct : function(main, name) {
    // call the constructor of the superclass
    this.base(arguments, main, name);

    // add the appender if everything is done
    var self = this;
    window.setTimeout(function() {
      // if there is a cookie stored that the appender need to be set
      if (qx.io.local.CookieApi.get("consoleAppender") == "true") {
        // check the appender button
        self._appenderButton.setChecked(true);
      }
    }, 0);
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
    // main elements
    _tabView: null,
    _currentView: null,
    _consoleView: null,
    _domView: null,

    // buttons
    _clearButton: null,
    _apiButton: null,
    _setButton: null,
    _appenderButton: null,
    _helpButton: null,
    _findField: null,
    
    // tooltips
    _clearTooltip: null,
    _apiTooltip: null,
    _setTooltip: null,
    _appenderTooltip: null,
    _helpTooltip: null,
    
    // tabview buttons
    _domButton: null,
    _consoleButton: null,
    
    // the current widget
    _widget: null,
    _ans: null,
    
    // appender
    _appender: null,
    
    
    /*
    *********************************
       PUBLIC
    *********************************
    */  
    /**
     * Returns the components of the console, which should not be in 
     * the widget finders document tree.
     * @internal
     * @return The components of the console.
     */
    getComponents: function() {
      return [this, this._clearTooltip, this._apiTooltip, this._setTooltip,
              this._appenderTooltip, this._helpTooltip].concat(this._consoleView.getComponents());
    },
    
    
    /**
     * Set the object which should be addressed with the this value in the console view.
     * @param qxObject {qx.core.Object} The current selected object.
     */
    setQxObject: function(qxObject) {
      // set the widget first!
      this._widget = qxObject;
      // show the console view
      this._consoleButton.setChecked(true);
      // set the title of the caption bar
      this.setCaption(inspector.Inspector.CONSOLE_CAPTION_TITLE + " (" +
                      this._consoleView.getCaptionMessage() + ")");
    },
    
    
    /**
     * Returns the object referenced as this in the console view.
     * @return The current selected object.
     */
    getQxObject: function() {
      return this._widget;
    },
    
    
    /**
     * Returns the return value of the last call on the console view.
     * @return The answer of the last call.  
     */
    getAns: function() {
      return this._ans;
    },
    
    
    /**
     * Sets the last Value of the call.
     * @internal
     * @param ans {Object} The last returned value.
     */
    setAns: function(ans) {
      this._ans = ans;
    },
  
  
    /**
     * Sets the given object in the dom view.
     * @param inputObject {qx.core.Object} The object to inspect.
     */
    inspectObject: function(inputObject) {
      // give the object to the dom view
      this._domView.setObject(inputObject.object, inputObject.name);
      // show the dom view
      this._domButton.setChecked(true);
      // change the title of the console window
      this.setCaption(inspector.Inspector.CONSOLE_CAPTION_TITLE + " (" + 
                      this._domView.getCaptionMessage() + ")");
    },
  
  
    /**
     * Fetches the object from the console view and tell the dom view to show 
     * the objects properties.
     * @internal
     * @param id {Number} Set the object associated with the given id.
     */
    inspectObjectByInternalId: function(id) {
      // get the object and the name
      var o = this._consoleView.getObjectById(id);
      // inspect the object
      this.inspectObject(o);
    },
  
  
    /**
     * Sets a object in the dom view represented in the value (key) of the object
     * stored in an internal array on the index position.
     * @internal
     * @param index {Number} The internal index of the object. 
     * @param key {String} The name of the value to select.
     */
    inspectObjectByDomSelecet: function(index, key) {
      // update the object in the domview
      this._domView.setObjectByIndex(index, key);
      // reset the search field
      this._findField.setValue(this._findField.getDefaultValue());
      // change the title of the console window
      this.setCaption(inspector.Inspector.CONSOLE_CAPTION_TITLE + " (" + 
                      this._domView.getCaptionMessage() + ")");
    },
  
    
   /**
    * Escape the html special character.
    * @internal
    * @param value {String} The text containing the html characters.
    */
    escapeHtml: function(value) {
      function replaceChars(ch) {
        switch(ch) {
          case "<":
            return "&lt;";

          case ">":
            return "&gt;";

          case "&":
            return "&amp;";

          case "'":
            return "&#39;";

          case '"':
            return "&quot;";
        }
        return "?";
      }
      return String(value).replace(/[<>&"']/g, replaceChars);
    },
    
    
    /*
    *********************************
       PROTECTED
    *********************************
    */
    /**
     * BETA!!! (TODO check for property groups)
     * This function generates a map of settings for the current 
     * selected object. Therefore only the settings set by the users
     * appear in the map.
     */
   _generateSettingsMap: function() {
      // the first superclass is the class of the selected widget
      var superclass = this.getQxObject();
      // create new properties array to store the property of a class
      var properties = [];
      // go threw the inheritance of the selected widget
      for (var i = 1; ; i++) {
        // store the properties and classnames in separate array
        var props = qx.Class.getByName(superclass.classname).$$properties;
        // go threw all properties of the current class
        for (var j in props) {
          properties.push(props[j]);
        }
        // go threw all classes to the qx.core.Object class
        if(qx.Class.getByName("qx.core.Object") == superclass) {
          break;  
        }       
        // set the new class
        superclass = qx.Class.getByName(superclass.classname).superclass;
      }      
      
      // create a temp object to hold all changed properties
      var props = {};
      
      // go threw all properties
      for (var i in properties) {
        // ignore the cached properties
        if (properties[i]._cached == true) {
          continue;
        }
        
        // read value
        var getterName = "get" + qx.lang.String.toFirstUp(properties[i].name);
        // try to read the value
        try {
          var value = this.getQxObject()[getterName].call(this.getQxObject());
          if (value instanceof Object) {
            continue;
          }
        } catch (e) {
          // continue the property
          continue;
        }
        
        // take care of the refined properties
        var clazz = qx.Class.getByName(this.getQxObject().classname);
        if (clazz.prototype["__init$" + properties[i].name] == value) {
          continue;
        }
            
        // check if the value is the init or default value 
        if (value != properties[i].defaultValue &&
            value != properties[i].init) {
           props[properties[i].name] = value;
        }        
      }
      
      // get the styles given by the theme
      var styles = qx.theme.manager.Appearance.getInstance().styleFrom(this.getQxObject().getAppearance(), {}); 
      
      // check for the theme properties
      for (var propertyName in props) {
        for (var stylePropertyName in styles) {
          if (propertyName == stylePropertyName) {
            if (props[propertyName] == styles[stylePropertyName]) {
              delete props[propertyName];
            }
          }
        }
      }
      
      // build the javascript set code
      var returnString = ".set({<br>"
      for (var i in props) {
        // if the property is a string
        if (typeof props[i] == "string") {
          // check for HTML code
          props[i] = props[i].replace(/</g,"&lt;");
          props[i] = props[i].replace(/>/g,"&gt;");
          props[i] = props[i].replace(/&/g,"&amp;");
        }
        returnString += (i + ": " + props[i] + ", <br>");        
      }
      returnString += "});";
            
      return returnString;
   },   
   
   
   /**
    * Clears the current view of the console.
    */
   _clearView: function() {
     // clear the current view
     this._currentView.clear();
   },


    /**
     * Enabled / disabled the buttons needed by the specified view. 
     * @param view {String} The name of the view (dom or console)
     */
    _enableButtons: function(view) {
      switch (view) {
        case "console":
          this._setButton.setEnabled(true);
          this._helpButton.setEnabled(true);
          break;
        case "dom":
          this._setButton.setEnabled(false);
          this._helpButton.setEnabled(false);
          break;
      }
    },

    /*
    *********************************
       OVERWRITTEN PROTTECTED FUNCTIONS
    *********************************
    */
    /**
     * Sets the height of the output layout.
     * @param delta {Number} The change value of the height.
     */
    _setMainElementHeight: function(delta) {
       this._consoleView.setMainElementDeltaHeight(delta);        
       this._domView.setMainElementDeltaHeight(delta);
    },
    
    
    /**
     * Sets the width of the output layout.
     * @param delta {Number} The change value of the width.
     */
    _setMainElementWidth: function(delta) {
      this._consoleView.setWidth(this._consoleView.getWidth() + delta);
      this._domView.setWidth(this._domView.getWidth() + delta);
    },
        
    
    /**
     * Sets the start position of the window.
     */
    _setApearancePosition: function() {
      // if the width is not set properly
      if (this.getWidth() == "auto") {
        // set the width to the full display width minus the width of the property editor
        this.setWidth(qx.ui.core.ClientDocument.getInstance().getInnerWidth() - 325);        
      }
      // set the top position only if no other top position is set
      if (this.getTop() == null) {
        this.setTop(qx.ui.core.ClientDocument.getInstance().getInnerHeight() - this.getInnerHeight());        
      }
    },
    
    
    /**
     * Creates the main tab view an the needed tabs.
     */
    _createMainElement: function() {   
      // create the tabview   
      this._tabView = new qx.ui.pageview.tabview.TabView();
      // tab view buttons
      this._consoleButton = new qx.ui.pageview.tabview.Button("Console");
      this._domButton = new qx.ui.pageview.tabview.Button("DOM");
      this._consoleButton.setChecked(true);
      this._tabView.getBar().add(this._consoleButton, this._domButton);      
      // tabview pages
      var consolePage = new qx.ui.pageview.tabview.Page(this._consoleButton);
      var domPage = new qx.ui.pageview.tabview.Page(this._domButton);
      // content of the pages    
      this._consoleView = new inspector.console.ConsoleView(this);
      this._domView = new inspector.console.DomView(this);
      // set the pane to the borders of the window
      this._tabView.getPane().setPadding(0);
      // add the content of the pages to the pages
      consolePage.add(this._consoleView);
      domPage.add(this._domView);
      // add the pages to the tabview 
      this._tabView.getPane().add(consolePage, domPage);
      // add the tabview to the window      
      this._mainLayout.add(this._tabView);
      // set the buttons to the default value
      this._enableButtons("console");

      // register the clear event listener
      this._clearButton.addEventListener("click", this._clearView, this);    
      // register a handler to print out the help text on the console
      this._helpButton.addEventListener("click", this._consoleView.printHelp, this._consoleView);
      // register a appear listener for the console view
      consolePage.addEventListener("appear", function() {
        // store that the console view is the current view
        this._currentView = this._consoleView;
        // set the title of the caption bar
        this.setCaption(inspector.Inspector.CONSOLE_CAPTION_TITLE + " (" + 
                        this._consoleView.getCaptionMessage() + ")");
        // set the focus to the right element in the view
        this._consoleView.focus();
        // enable the buttons
        this._enableButtons("console");
        // reset the value of the find textfield
        this._findField.setValue(this._consoleView.getFilter());        
      }, this);
      // register a appear listener for the dom view
      domPage.addEventListener("appear", function() {
        // store that the domview is the current view
        this._currentView = this._domView;
        // set the title of the caption bar
        this.setCaption(inspector.Inspector.CONSOLE_CAPTION_TITLE + " (" + 
                        this._domView.getCaptionMessage() + ")");
        // set the focus to the right element in the view
        this._domView.focus();
        // enable the buttons
        this._enableButtons("dom");
        // reset the value of the find textfield
        this._findField.setValue(this._domView.getFilter());        
      }, this);
    },
    
    
    /**
     * Adds the buttons and the search textfield to the toolbar.
     */
    _addToolbarButtons: function() {
      // create and add a button to clear the view
      this._clearButton = new qx.ui.toolbar.Button("Clear");
      this._toolbar.add(this._clearButton);      
      // add a tooltip to the clear button
      this._clearTooltip = new qx.ui.popup.ToolTip(inspector.Inspector.CLEAR_BUTTON_TOOLTIP_TEXT, null);
      this._clearButton.setToolTip(this._clearTooltip);  
      
      // create and add a button to clear the view
      this._apiButton = new qx.ui.toolbar.Button("API");
      this._toolbar.add(this._apiButton);
      // register the open listener
      this._apiButton.addEventListener("execute", function() {
        // get the current selected classname
        var classname = this._currentView.getCurrentSelectedClassname();
        // open the api window
        this._inspector.openApiWindow(classname);          
      }, this);
      // add a tooltip to the api button
      this._apiTooltip = new qx.ui.popup.ToolTip(inspector.Inspector.API_BUTTON_TOOLTIP_TEXT, null);
      this._apiButton.setToolTip(this._apiTooltip);        
            
      // seperator
      this._toolbar.add(new qx.ui.toolbar.Separator());

/*      
      var detailsButton = new qx.ui.toolbar.Button("Property Details");
      this._toolbar.add(detailsButton);
      detailsButton.addEventListener("execute", function() {
        var classname = this._inspector._propertyEditor.getSelectedProperty().getUserData("classname"); 
        var propertyName = this._inspector._propertyEditor.getSelectedProperty().getUserData("key");
        
        // get the properties array of the selected class
        var properties = qx.Class.getByName(classname).$$properties;
        // get the property array of the currently selected property
        var property = properties[propertyName];        

        var headline = "<strong>" + classname + "#" + propertyName + "</strong>";
        this._outputLayout.add(this._getLabel("", headline, "black"));
        
        for (var name in property) {
          this._printText(name + ": " + property[name]);        
        }  
              
        this._printLine();
      }, this);
*/      
      
      // create a button for the settings map
      this._setButton = new qx.ui.toolbar.Button("Settings-Map");
      this._toolbar.add(this._setButton);
      this._setButton.addEventListener("execute", function() {
        this._consoleView.printCode(this._generateSettingsMap());
      }, this);
      // add a tooltip to the clear button
      this._setTooltip = new qx.ui.popup.ToolTip(inspector.Inspector.SET_BUTTON_TOOLTIP_TEXT, null);
      this._setButton.setToolTip(this._setTooltip);        
      
      // separator
      this._toolbar.add(new qx.ui.toolbar.Separator());
      
      // create and add a button to make the consola a appender
      this._appenderButton = new qx.ui.toolbar.CheckBox("Logger");
      this._toolbar.add(this._appenderButton);
      // register the open listener
      this._appenderButton.addEventListener("changeChecked", function(e) {
        // if there is no logger for the console
        if (this._appender == null) {
          // create one
          this._appender = new inspector.console.Appender(this._consoleView);
        }
        // save the status of the appender in a cookie
        qx.io.local.CookieApi.set("consoleAppender", e.getValue());
        // if the button is pressed in
        if (e.getValue()) {
          // add the appender
          qx.log.Logger.ROOT_LOGGER.addAppender(this._appender);
          // signal that the console is a appender now
          this.debug("Console registered.");
        } else {
          // signal that the console is unregistered
          this.debug("Console unregistered.");          
          // otherwise, remove the appender
          qx.log.Logger.ROOT_LOGGER.removeAppender(this._appender);
        }
      }, this);
      // add a tooltip to the appender button
      this._appenderTooltip = new qx.ui.popup.ToolTip(inspector.Inspector.APPENDER_BUTTON_TOOLTIP_TEXT, null);
      this._appenderButton.setToolTip(this._appenderTooltip);

      // add a spacer to keep the help button rigth
      this._toolbar.add(new qx.ui.basic.HorizontalSpacer()); 
      
      // create and add a help button
      this._helpButton = new qx.ui.toolbar.Button("Help");
      this._toolbar.add(this._helpButton);
      // add a tooltip to the help button
      this._helpTooltip = new qx.ui.popup.ToolTip(inspector.Inspector.HELP_BUTTON_TOOLTIP_TEXT, null);
      this._helpButton.setToolTip(this._helpTooltip);

      // create and add a find textfield
      this._findField = new inspector.components.SearchTextField();
      // set the reference which is the this reference in the executed function
      this._findField.setContext(this);
      // set the default value for the search textfield
      this._findField.setDefaultValue(inspector.console.Console.SEARCH_TERM);
      // set the function, which should be executed on a input change
      this._findField.setExecutionFunction(function() {
        this._currentView.filter(this._findField.getComputedValue());
      });
      // add the findfield to the toolbar
      this._toolbar.add(this._findField);
    }
  
  },
  
  
  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */
  destruct : function() {
    // dispose all fields
    this._disposeFields("_clearButton", "_clearTooltip", "_apiButton", "_apiTooltip",
                        "_setButton", "_setTooltip", "_appenderButton", "_appenderTooltip", 
                        "_helpButton", "_helpTooltip", "_findField", "_tabView", 
                        "_consoleButton", "_domButton", "_consoleView", "_domView",
                        "_widget", "_currentView", "_ans", "_appender");
  } 
});