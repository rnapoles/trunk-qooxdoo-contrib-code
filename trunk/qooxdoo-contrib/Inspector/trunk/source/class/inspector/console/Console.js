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
    // the length of the history in the console
    HISTORY_LENGTH: 20
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

    // buttons
    _clearButton: null,
    _helpButton: null,
    
    // the current widget
    _widget: null,
    _ans: null,
    
    
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
      this.setCaption(inspector.Inspector.CONSOLE_CAPTION_TITLE + ": " + 
                      widget.classname + " [" + widget.toHashCode() + "]");
      this._widget = widget;
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

    
    /*
    *********************************
       PROTECTED
    *********************************
    */
   _generateSettingsMap: function() {
      // the first superclass is the class of the selected widget
      var superclass = this._console.getWidget();
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
          var value = this._console.getWidget()[getterName].call(this._console.getWidget());
          if (value instanceof Object) {
            continue;
          }
        } catch (e) {
          // continue the property
          continue;
        }
        
        // take care of the refined properties
        var clazz = qx.Class.getByName(this._console.getWidget().classname);
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
      var styles = qx.theme.manager.Appearance.getInstance().styleFrom(this._console.getWidget().getAppearance(), {}); 
      
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
    },
    
    
    /**
     * Sets the width of the output layout.
     * @param delta {Number} The change value of the width.
     */
    _setMainElementWidth: function(delta) {
      this._consoleView.setWidth(this._consoleView.getWidth() + delta)
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
    
    
    _createMainElement: function() {      
      var tabView = new qx.ui.pageview.tabview.TabView();
      // tabView.setEdge(20);

      // tab view buttons
      var consoleButton = new qx.ui.pageview.tabview.Button("Concole");
      consoleButton.setChecked(true);
      var domButton = new qx.ui.pageview.tabview.Button("DOM");
      tabView.getBar().add(consoleButton, domButton);
      
      var consolePage = new qx.ui.pageview.tabview.Page(consoleButton);
      var domPage = new qx.ui.pageview.tabview.Page(domButton);
    
      // create and add a layout for the HTMLembedded and the textbox
      this._consoleView = new inspector.console.ConsoleView(this);
      this._domView = new inspector.console.DomView(this);

      this._consoleView.setWidth(500);
      
      tabView.getPane().setPadding(0);

      // this._mainLayout.add(this._consoleView);
      consolePage.add(this._consoleView);
      domPage.add(this._domView);
            
      tabView.getPane().add(consolePage, domPage);
      
      
      this._mainLayout.add(tabView);
      
      
      
      
      
      // register the clear event listener
      this._clearButton.addEventListener("click", this._consoleView.clear, this._consoleView);    
      // register a handlert to print out the help text on the console
      this._helpButton.addEventListener("click", this._consoleView.printHelp, this._consoleView);
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

      var setButton = new qx.ui.toolbar.Button("Settings-Map");
      this._toolbar.add(setButton);
      setButton.addEventListener("execute", function() {
        this._consoleView.printCode(this._generateSettingsMap());
      }, this);
        
      // add a spacer to keep the help button rigth
      this._toolbar.add(new qx.ui.basic.HorizontalSpacer());      

      // create and add a help button
      this._helpButton = new qx.ui.toolbar.Button("Help");
      this._toolbar.add(this._helpButton);
    }
       
   }
});