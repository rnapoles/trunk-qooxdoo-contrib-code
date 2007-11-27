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

qx.Class.define("inspector.console.Console", {
  
  extend : inspector.AbstractWindow,  


  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */  
  statics: {
    // the therm which is in the search textfield by default
    SEARCH_TERM: "Search..."
  },

    
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function(main, name) {
    // call the constructor of the superclass
    this.base(arguments, main, name);

    // create a appende
    var appender = new inspector.console.Appender(this._consoleView);
    // remove all appenders
    // qx.log.Logger.ROOT_LOGGER.removeAllAppenders();
    // add the console appender
    // qx.log.Logger.ROOT_LOGGER.addAppender(appender);
    
    // add a event listener if the console cahnged active
    this.addEventListener("changeActive", function(e) {
      // if the console is selected
      if (e.getValue()) {
        // set a timeout to focus the textfield after everything is done
        var consoleView = this._consoleView;
        window.setTimeout(function() {
          // TODO if visible
          // set the focus to the textfield
          consoleView.focus();      
        }, 0);
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
    // main elements
    _consoleView: null,
    _domView: null,
    _tabView: null,
  

    // buttons
    _clearButton: null,
    _helpButton: null,
    _setButton: null,
    _findField: null,
    // tabview buttons
    _domButton: null,
    _consoleButton: null,
    
    // the current widget
    _widget: null,
    _ans: null,
    
    // timers    
    _searchTimer: null,
    
    /*
    *********************************
       PUBLIC
    *********************************
    */  
    /**
     * @internal
     * @return The components of the console.
     */
    getComponents: function() {
      return [this].concat(this._consoleView.getComponents());
    },    
   
    
    /**
     * Set the widget which should be addressd with the this value in the console.
     * @param widget {qx.core.Object} The current selected object.
     */
    setWidget: function(widget) {
      // set the widget first!
      this._widget = widget;
      // show the console view
      this._consoleButton.setChecked(true);
      // enabled / disable the buttons
      this._enableButtons("console");
      // set the name of the selected widget in the caption bar
      this.setCaption(inspector.Inspector.CONSOLE_CAPTION_TITLE + " (" + 
                      this._consoleView.getCaptionMessage() + ")");      
    },
    
    
    /**
     * @return The current selected object.
     */
    getWidget: function() {
      return this._widget;
    },
    
    
    /**
     * @return The answer of the last call.  
     */
    getAns: function() {
      return this._ans;
    },
    
    
    /**
     * Sets the last Value of the call.
     * @internal
     * @param ans {Object} The las returned value.
     */
    setAns: function(ans) {
      this._ans = ans;
    },
  
  
    /**
     * Sets the given object in the dom view.
     * @param inputObject {Object} The object to inspect.
     */
    inspectObject: function(inputObject) {
      // pase the object to the dom view
      this._domView.setObject(inputObject.object, inputObject.name);
      // show the dom view
      this._domButton.setChecked(true);
      // enabled / disable the buttons
      this._enableButtons("dom");      
      // change the title of the console window
      this.setCaption(inspector.Inspector.CONSOLE_CAPTION_TITLE + " (" + 
                      this._domView.getCaptionMessage() + ")");    
    },
  
  
    /**
     * Fetches the object from the console view and tells the dom view to show 
     * the objects properties.
     * @internal
     * @param id {Number} Set the object assosiated with the given id.
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
          // reset the filter
          this._findField.setValue(inspector.console.Console.SEARCH_TERM);
          // update the object in the domview
          this._domView.setObjectByIndex(index, key);
          
          // update the caption bar title
          this.setCaption(inspector.Inspector.CONSOLE_CAPTION_TITLE + " (" + 
                          this._domView.getCaptionMessage() + ")");        
    },
  
    
    /**
     * Escape the html special character.
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
   _generateSettingsMap: function() {
      // the first superclass is the class of the selected widget
      var superclass = this.getWidget();
      // create new properties array to store the propertey of a class
      var properties = [];
      // go threw the inheritance of the selected widget
      for (var i = 1; ; i++) {
        // store the properties and classnames in seperate array
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
        // ignore the cahced properties
        if (properties[i]._cached == true) {
          continue;
        }
        
        // read value
        var getterName = "get" + qx.lang.String.toFirstUp(properties[i].name);
        // try to read the value
        try {
          var value = this.getWidget()[getterName].call(this.getWidget());
          if (value instanceof Object) {
            continue;
          }
        } catch (e) {
          // continue the property
          continue;
        }
        
        // take care of the refined properties
        var clazz = qx.Class.getByName(this.getWidget().classname);
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
      var styles = qx.theme.manager.Appearance.getInstance().styleFrom(this.getWidget().getAppearance(), {}); 
      
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
      // if the console view is on the screen
     if (this._consoleButton.getChecked()) {
        // clear the console view screen
       this._consoleView.clear();
     // if the dom view is on the screen       
     } else if (this._domButton.getChecked()) {
        // clear the dom view screen
       this._domView.clear();
     }     
   },


    /**
     * Enabled / disabled the buttons needed by the specified view. 
     * @param view {String} The name of the view (dom or console)
     */
    _enableButtons: function(view) {
      switch (view) {
        case "console":
          // this._clearButton.setEnabled(true);
          this._setButton.setEnabled(true);
          this._helpButton.setEnabled(true);
          // this._findField.setEnabled(true);      
          break;
        case "dom":
          // this._clearButton.setEnabled(true);
          this._setButton.setEnabled(false);
          this._helpButton.setEnabled(false);
          // this._findField.setEnabled(true);
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
     * Creates the man tab view an the needed tabs.
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
      this._domView = new inspector.console.DomViewHtml(this);
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
      // register a handlert to print out the help text on the console
      this._helpButton.addEventListener("click", this._consoleView.printHelp, this._consoleView);
      
      // click listener for changing the caption bar title of the window
      this._consoleButton.addEventListener("click", function() {
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
      
      this._domButton.addEventListener("click", function() {
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

      this._setButton = new qx.ui.toolbar.Button("Settings-Map");
      this._toolbar.add(this._setButton);
      this._setButton.addEventListener("execute", function() {
        this._consoleView.printCode(this._generateSettingsMap());
      }, this);
        
      // add a spacer to keep the help button rigth
      this._toolbar.add(new qx.ui.basic.HorizontalSpacer()); 
      
      // create and add a help button
      this._helpButton = new qx.ui.toolbar.Button("Help");
      this._toolbar.add(this._helpButton);

      // create and add a find textfield
      this._findField = new qx.ui.form.TextField(inspector.console.Console.SEARCH_TERM);
      this._toolbar.add(this._findField);
      // add a click event listener for removing the search text and selecting the containing text
      this._findField.addEventListener("click", function (e) {
        // select the whole text
        e.getTarget().setSelectionStart(0);
        e.getTarget().setSelectionLength(e.getTarget().getComputedValue().length);
        // remove the search term
        if (e.getTarget().getComputedValue() == inspector.objectFinder.ObjectFinder.SEARCH_TERM) {
          e.getTarget().setValue("");
        }
      });
      
      // add a listener which adds the search test if the focus is lost and the textfield ist empty
      this._findField.addEventListener("focusout", function (e) {
        // if the textfield is empty, add the search term
        if (this.getComputedValue() == "") {
          this.setValue(inspector.console.Console.SEARCH_TERM);
        }
      }, this._findField);
      
      // add the filter function to the search field
      this._findField.addEventListener("input", function(e) {
        // if a search timer is set
        if (this._searchTimer) {
          // remove the old search timer
          window.clearTimeout(this._searchTimer);
        }
        // get the value of the textfield
        var filterText = e.getData();
        // store the this reference for the timeout        
        var self = this;        
        this._searchTimer = window.setTimeout(function() {          
          // if the console view is on the screen
          if (self._consoleButton.getChecked()) {
            self._consoleView.filter(filterText);
          // if the dom view is on the screen       
          } else if (self._domButton.getChecked()) {
            self._domView.filter(filterText);
          }
        }, 300);
      }, this);
    }
       
   }
});