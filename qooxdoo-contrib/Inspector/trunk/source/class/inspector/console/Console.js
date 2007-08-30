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
    // create the popup for the autocompletion
    this._autoCompletePopup = new inspector.console.AutoCompletePopup(this);  
    // initialize the this reference to the selected widget
    this._widget = qx.ui.core.ClientDocument.getInstance();

    // create a appende
    var appender = new inspector.console.Appender(this);
    // remove all appenders
    qx.log.Logger.ROOT_LOGGER.removeAllAppenders();
    // add the console appender
    qx.log.Logger.ROOT_LOGGER.addAppender(appender);
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
    _consoleLayout: null,
    _textField: null,
    _htmlEmbed: null,
    
    // buttons
    _clearButton: null,
    _helpButton: null,
    
    // history stuff
    _history: [],
    _historyCounter: -1,
    
    // auto complete stuff
    _ctrl: false,
    _autoCompletePopup: null,
    
    // the current widget
    _widget: null,
    _ans: null,
    
    
    /*
    *********************************
       PUBLIC
    *********************************
    */  
    /**
     * @return The components of the console.
     */
    getComponents: function() {
      return [this].concat(this._autoCompletePopup.getComponents());
    },    
    
    
    /**
     * Appends the given string to the textfield.
     * @param string {String} The string to append.
     */
    appendString: function(string) {
      if (string != null) {
        // append the given string to the textfield
        this._textField.setValue(this._textField.getValue() + string);
        // if there is a ( in the textfield
        if (this._textField.getComputedValue().lastIndexOf("(") != -1) {
          // mark the stuff in the ()
          var start = this._textField.getComputedValue().lastIndexOf("(") + 1;
          var end = this._textField.getComputedValue().length - 1;
          this._textField.selectFromTo(start, end);          
        }  
      }
    },
    
    
    /**
     * Set the widget which should be addressd with the this value in the console.
     * @param widget {qx.core.Object} The current selected object.
     */
    setWidget: function(widget) {
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
     * Invokes the selecting of the value currently selected in the 
     * autocomplete popup and appends it to the textfield.
     */
    chooseAutoCompleteValue: function() {
      // get the current value of the textfield
      var value = this._textField.getComputedValue();
      // get the value to add to the textfield
      var name = this._autoCompletePopup.getCurrentSelection();          
      // if something is selected
      if (name != "undefined") {
        // get the stuff after the dot in the textfield
        var afterDot = value.substring(value.lastIndexOf(".") + 1);
        // remove the characters which are already in the textfield
        name = name.substring(afterDot.length, name.length);
        // append the new selected string
        this.appendString(name);            
      }
      // hide the popup
      this._autoCompletePopup.hide(); 
      // focus the textfield
      if (!this._textField.getFocused()) {
        this._textField.focus();
      }
    },    
    
    
    /**
     * Prints out the help text on the console.     
     */
    printHelp: function() {        
        var helpText = "<strong>HELP:</strong><br>" +
                       "this = the current selected object<br>" + 
                       "ans = the last return value<br>" +
                       "Press the CTRL and space key together to get an auto complete"; 
        var label = this._getLabel("", helpText, "#666666");
        this._htmlEmbed.setHtml(this._htmlEmbed.getHtml() + label);
      // scroll to the end of the console 
      this._scrollToLastLine();
    },
    
    
    /**
     * Clears the whole console screen.
     */
    clear: function() {
      this._htmlEmbed.setHtml("");      
    },
    
    
    /**
     * Prints out an error to the console.
     * @param message {String} The error message.
     */    
    error: function(message) {           
      var label = this._getLabel("", message, "red", "error", "#FFFFE0");
      this._htmlEmbed.setHtml(this._htmlEmbed.getHtml() + label);
      // scroll to the end of the console 
      this._scrollToLastLine();         
    }, 
    
    
    /**
     * Prints out a warning message to the console.
     * @param message {String} The warning message to print out.
     */
    warn: function(message) {
      var label = this._getLabel("", message, "black", "warning", "#00FFFF");           
      this._htmlEmbed.setHtml(this._htmlEmbed.getHtml() + label);
      // scroll to the end of the console 
      this._scrollToLastLine();
    },
    
    
    /**
     * Prints aut an info message to the console.
     * @param message {String} The info message.
     */
    info: function(message) {
      var label = this._getLabel("", message, "black", "info");
      this._htmlEmbed.setHtml(this._htmlEmbed.getHtml() + label);
      // scroll to the end of the console 
      this._scrollToLastLine();
    }, 
    
    
    /**
     * Prints out an debug message to the console.
     * @param message {String} The debug message.
     */
    debug: function(message) {
      var label = this._getLabel("", message, "grey");        
      this._htmlEmbed.setHtml(this._htmlEmbed.getHtml() + label);
      // scroll to the end of the console 
      this._scrollToLastLine();
    },
    
    
    /*
    *********************************
       PROTECTED
    *********************************
    */
    /**
     * This function evaluates the given text and runs it a 
     * javascript code using the eval function. In subject to the 
     * return value the corresponding value will be printed to the console. 
     * @param text {String} The text to run as javascript code. 
     */
    _process: function(text) {
      // add the text to the embedded
      this._printText(text);      
      // try to run the code
      try {
        // run it and store the result in the global ans value
        this._ans = (function(text, ans){return eval(text)}).call(this._widget, text, this._ans);

        // if ans is defined
        if (this._ans != undefined) {
          // print put the return value
          this._printReturnValue(this._ans);                      
        }
      } catch (e) {
        // print out the exception
        this.error(e);
      }
    },
    
    
    /**
     * Scrolls the end of the main layout which holds the aoutput of the console.
     */
    _scrollToLastLine: function() { 			
      // flush the queues to ensure that the adding has been recognized
      qx.ui.core.Widget.flushGlobalQueues();      
			// wait until everything is done
			var self = this;
      window.setTimeout(function() {
	      // scroll to the bottom of the layout
				self._htmlEmbed.setScrollTop(self._htmlEmbed.getScrollHeight());				
			}, 0);
    },    
    
    /*
    *********************************
       Key handler
    *********************************
    */    
    /**
     * Keyhandler which handels the keydown event on the textfield. This
     * includes e.g. the historys function by using the up and down keys and 
     * much more.
     * @param e {Event} 
     */
    _keyDownHandler: function(e) {   
          
      // if the esc key is pressed
      if (e.getKeyIdentifier() == "Escape") {
        // hide the autocomplete popup
        this._autoCompletePopup.hide();
      }
                
      // if the enter button is pressed
      if (e.getKeyIdentifier() == "Enter") {
        if (!this._autoCompletePopup.isOnScreen()) {     
          // save the string in the history
          this._history.unshift(this._textField.getComputedValue());
          // process the input
          this._process(this._textField.getComputedValue());          
          // empty the textfield
          this._textField.setValue("");
          // rest the history counter
          this._historyCounter = -1;
          // if the history is biger than it should be
          if (this._history.length > inspector.console.Console.HISTORY_LENGTH) {
            // remove the last element
            this._history.pop();            
          }
          					
        // if the popup is on screen
        } else {
          this.chooseAutoCompleteValue();
        }
      }
      
      // if the up key is pressed      
      if (e.getKeyIdentifier() == "Up") {
        // prevent that the cursor is set to another position
        e.preventDefault();
        // if the popup is on screen
        if (!this._autoCompletePopup.isOnScreen()) {
          
          // if a value is in the history
          if (this._history[this._historyCounter + 1] != undefined) {
            // increase the counter
            this._historyCounter++;            
            // set the value to the textfield
            this._textField.setValue(this._history[this._historyCounter]);
          }
        }
      }        
          
      // if the down key is pressed
      if (e.getKeyIdentifier() == "Down") {
        // prevent that the cursor is set to another position
        e.preventDefault();
        // if the popup is nor on screen
        if (!this._autoCompletePopup.isOnScreen()) {
          // check if the counter is bigger than 0
          if (this._historyCounter > 0) {
            // if yes, decreas the cunter
            this._historyCounter--;
            // set the new value from the history
            this._textField.setValue(this._history[this._historyCounter]);
          }
        }
      }
          
      // if the controll key is pressed
      if (e.getKeyIdentifier() == "Control") {
        // mark that in a flag
        this._ctrl = true;
      }
      
      // if the space or tab is pressed
      if (e.getKeyIdentifier() == "Space" || e.getKeyIdentifier() == "Tab") {      
        // check if the control button is pressed
        if (this._ctrl || e.getKeyIdentifier() == "Tab") {
          // prevent the browser from leaving the textfield
          e.preventDefault();

          // do the autocomplete
          try {
            // get the position for the popup
            var left = qx.html.Location.getPageBoxLeft(this._textField.getElement());
            var top = qx.html.Location.getPageBoxTop(this._textField.getElement()) - this._autoCompletePopup.getHeight();
            // tell the popup to show itself            
            this._autoCompletePopup.open(this._textField.getComputedValue(), left, top);
          } catch (e) {
            // do nothing
            this.info(e);
          }
        }
      }
        
    },
    
    
    /**
     * Keyhandler to handle the keyup event. 
     * @param e {Event}
     */
    _keyUpHandler: function(e) {
      // if the control key will be released
      if (e.getKeyIdentifier() == "Control") {
        // remove the controll flag
        this._ctrl = false;
      }
    },
    
    
    /**
     * Keyhandler wich handels the keypress event. This is necessary to 
     * scrol threw the autocomplete popup by holding the up or down key.
     * @param e {Event} 
     */
    _keyPressHandler: function(e) {
      if (this._autoCompletePopup.isOnScreen()) {
        if (e.getKeyIdentifier() == "Down") {
          this._autoCompletePopup.selectionDown();
        } else if (e.getKeyIdentifier() == "Up") {
          this._autoCompletePopup.selectionUp();
        }
      }
    },
    
    
    /*
    *********************************
       Print functions
    *********************************
    */    
    /**
     * Pints out a return value to the console. This also includes a special 
     * treatment for qooxdoo objects and array.
     * @param returnValue {Object} The value to print.
     */
    _printReturnValue: function(returnValue) {			
      // check for qooxdoo objects
      if (returnValue instanceof qx.core.Object) {
        // print out the qooxdoo object
        this._printQxObject(returnValue);   
				
			// check for arrays
			} else if (returnValue instanceof Array) {
        // if yes, print out that it is one
        var label = this._getLabel("", "---- Array ----", "#00008B")
        this._htmlEmbed.setHtml(this._htmlEmbed.getHtml() + label);
        // go threw all elements and print them out
        for (var i = 0; i < returnValue.length; i++) {
          this._printReturnValue(returnValue[i]);
        }
        return;

			// check for objects
			} else if (returnValue instanceof Object) {				
        // if yes, print out that it is one
        var label = this._getLabel("", "---- " + returnValue + " (Object) ----", "#00008B")
        this._htmlEmbed.setHtml(this._htmlEmbed.getHtml() + label);
        // go threw all elements and print them out
        for (var i in returnValue) {
          this._printReturnValue(i + ": " + returnValue[i]);
        }
        return;
						         
		  // everything else
      } else {
        // print out the return value
        var label = this._getLabel("", returnValue, "#00008B");
        this._htmlEmbed.setHtml(this._htmlEmbed.getHtml() + label);
      }
      // scroll to the end of the console 
      this._scrollToLastLine();
    },
    
    
    /**
     * Prints out a qooxdoo object to the console including a link to set 
     * the object as the current selected object. 
     * @param object {qx.core.Object} The qooxdoo object to print.
     */
    _printQxObject: function(object) {
      // build the label string
      var label = this._getLabel("<u style='cursor: pointer;' " + 
                                 "onclick=\"inspector.Inspector.getInstance().setWidgetByDbKey(" + object.getDbKey() + ", 'console');\"" + 
                                 ";>", object.classname + " [" + object.toHashCode() + "]</u>", "#006400")
      // append the label string
      this._htmlEmbed.setHtml(this._htmlEmbed.getHtml() + label);      
      // scroll to the end of the console 
      this._scrollToLastLine();
    },
    
    /**
     * Prints out a standard text in black wit the leading ">> " to the console.
     * @param text {String} the text to print out.
     */
    _printText: function(text) {
      var label = this._getLabel(">>>&nbsp;", text, "blue");
      this._htmlEmbed.setHtml(this._htmlEmbed.getHtml() + label);
      // scroll to the end of the console 
      this._scrollToLastLine();
    },
    
    
    /*
    *********************************
       CREATE FUNCTIONS
    *********************************
    */
    _getLabel: function(prefix, text, color, icon, bgcolor) {
      // create the text of the label
      var text = "<font style='font-family: Courier New; font-size:11px; color:" + color + ";'>" + prefix + text + "</font>";      
      // handle the icon uri      
      if (icon == "info" || icon == "error" || icon == "warning") {
        var iconHtml = "<img src='" + qx.io.Alias.getInstance().resolve("inspector/image/shell/" + icon + "Icon.png") + "' style='vertical-align: middle;'>";
        text = iconHtml + "&nbsp;" + text;
      }
      // create the sourrounding div
      text = "<div width='100%' style='padding: 3px; border-bottom: 1px #CCCCCC solid; background-color:" + bgcolor + ";'>" + text + "</div>";
      
      // return the text String
      return text;      
    },
    
    
    /**
     * The function creates a Treminator as a line in the console.
     * @return {qx.ui.basic.Terminator} The created terminator.  
     */
    _getLine: function() {
      // start the exclusion so that the new element will not be in the list of objects
      this._inspector.beginExclusion();
      // create the new element
      var line = new qx.ui.basic.Terminator();
      // end the exclusion 
      this._inspector.endExclusion();    
      // set height and color of the label  
      line.setHeight(1);
      line.setBackgroundColor("#CCCCCC");
      return line;      
    },
   
   
    /*
    *********************************
       OVERWRITTEN PROTTECTED FUNCTIONS
    *********************************
    */
    /**
     * Overwrite the function to avoid creating a status bar.
     */
    _createStatusbar: function () {
      // do not create a statusbar
    }, 
    
    
    /**
     * Sets the height of the output layout.
     * @param delta {Number} The change value of the height.
     */
    _setMainElementHeight: function(delta) {
       this._htmlEmbed.setHeight(this._htmlEmbed.getHeight() + delta);        
    },
    
    
    /**
     * Sets the width of the output layout.
     * @param delta {Number} The change value of the width.
     */
    _setMainElementWidth: function(delta) {
      // do nothing
    },
    
    
    /**
     * Sets the start position of the window.
     */
    _setApearancePosition: function() {
      this.setWidth(qx.ui.core.ClientDocument.getInstance().getInnerWidth() - 355);
      this.setTop(qx.ui.core.ClientDocument.getInstance().getInnerHeight() - this.getInnerHeight());
    },
    
    
    /**
     * Creates the output layout and the textfield. Also register 
     * the handlers for the textfield.
     */
    _createMainElement: function() {
      // create and add a layout for the HTMLembedded and the textbox
      this._consoleLayout = new qx.ui.layout.VerticalBoxLayout();
      this._mainLayout.add(this._consoleLayout);
      
      this._htmlEmbed = new qx.ui.embed.HtmlEmbed();
      this._htmlEmbed.setBackgroundColor("white");
      this._htmlEmbed.setBorder("inset");
      this._htmlEmbed.setOverflow("scrollY");
      this._htmlEmbed.setWidth("100%");
      this._htmlEmbed.setHeight(150);
      this._consoleLayout.add(this._htmlEmbed);
  
      // create and add the textfield
      this._textField = new qx.ui.form.TextField();
      this._textField.setWidth("100%");
      // remove border because the layout will get the border
      this._textField.setBorder(null);
      this._textField.setFont(new qx.ui.core.Font(11, ["Courier New"]));  
      // needed to ensure that every line is processed
      this._textField.setLiveUpdate(true);
      
      // create another textfield for holding the leading >>>
      var leadingTextField = new qx.ui.form.TextField(">>>");
      leadingTextField.setFont(new qx.ui.core.Font(11, ["Courier New"]));
      leadingTextField.setTextColor("blue");  
      leadingTextField.setWidth(26);
      leadingTextField.setSelectable(false);
      leadingTextField.setBackgroundColor("white");
      leadingTextField.setReadOnly(true);
      leadingTextField.setBorder(null);
      
      // create a layout which holds the prefix textfield and the entering textfield
      var textFieldLayout = new qx.ui.layout.HorizontalBoxLayout();      
      textFieldLayout.setBorder("inset");      
      textFieldLayout.setBackgroundColor("white");      
      textFieldLayout.add(leadingTextField);  
      textFieldLayout.setHeight(20); 
      textFieldLayout.add(this._textField);
      this._consoleLayout.add(textFieldLayout);  
  
      // add the listener to the textfield
      this._textField.addEventListener("keydown", this._keyDownHandler, this);
      this._textField.addEventListener("keyup", this._keyUpHandler, this);
      this._textField.addEventListener("keypress", this._keyPressHandler, this);
      
      // add a event listener which updates the autoCompletion
      this._textField.addEventListener("changeValue", function(e) {
        // if the popup is on the screen
        if (this._autoCompletePopup.isOnScreen()) {
          // try to reload it with every hit to the keyboard
          try {
            // get the position for the popup
            var left = qx.html.Location.getPageBoxLeft(this._textField.getElement());
            var top = qx.html.Location.getPageBoxTop(this._textField.getElement()) - this._autoCompletePopup.getHeight();
            // tell the popup to show itself            
            this._autoCompletePopup.open(this._textField.getComputedValue(), left, top);
          } catch (e) {
            // close the popup
            this._autoCompletePopup.hide();
          }
        }
      }, this);
    },
    
    
    /**
     * Adds the buttons and the search textfield to the toolbar.
     */
    _addToolbarButtons: function() {
      // create and add a button to clear the view
      this._clearButton = new qx.ui.toolbar.Button("Clear");
      this._toolbar.add(this._clearButton);
      // register the clear event listener
      this._clearButton.addEventListener("click", this.clear, this);

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

      // add a spacer to keep the help button rigth
      this._toolbar.add(new qx.ui.basic.HorizontalSpacer());      

      // create and add a help button
      this._helpButton = new qx.ui.toolbar.Button("Help");
      this._toolbar.add(this._helpButton);
      // register a handlert to print out the help text on the console
      this._helpButton.addEventListener("click", this.printHelp, this);
    }
       
   }
});