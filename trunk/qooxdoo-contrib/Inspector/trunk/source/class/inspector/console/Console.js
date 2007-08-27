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
    _outputLayout: null,
    
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
		
		printHelp: function(e) {        
        var helpText = "<strong>HELP:</strong><br>" +
                       "this = the current selected object<br>" + 
                       "ans = the last return value<br>" +
                       "Press the CTRL and space key together to get an auto complete"; 
        this._outputLayout.add(this._getLabel("", helpText, "grey"));
        this._outputLayout.add(this._getLine());			
		},
		
		clear: function() {
			this._outputLayout.removeAll();
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
//      ans = eval(text.replace(/\bthis\b/g, "this._widget"));

        // if ans is defined
        if (this._ans != undefined) {
          // print put the return value
          this._printReturnValue(this._ans);                      
        } else {
          // print out that the return value was undefined
          this._printText("undefined");
        }
      } catch (e) {
        // print out the exception
        this._printError(e);
      }      
      // add a line to seperate two calls
      this._printLine();
    },
    
    
    /**
     * Scrolls the end of the main layout which holds the aoutput of the console.
     */
    _scrollToLastLine: function() {
      // flush the queues to ensure that the adding has been recognized
      qx.ui.core.Widget.flushGlobalQueues();
      // scroll to the bottom of the layout
      this._outputLayout.setScrollTop(this._outputLayout.getScrollHeight());
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
      // check the arrays      
      if (returnValue instanceof Array) {
        // if yes, print out that it is one
        this._outputLayout.add(this._getLabel("---- ", "Array ----", "blue"));
        // go threw all elements and print them out
        for (var i in returnValue) {
          this._printReturnValue(returnValue[i]);
        }
        return;
      }
      //check for qooxdoo objects
      if (returnValue instanceof qx.core.Object) {
        // print out the qooxdoo object
        this._printQxObject(returnValue);            
      } else {
        // print out the return value
        this._outputLayout.add(this._getLabel("<< ", returnValue, "blue"));
      }      
    },
    
    
    /**
     * Prints out a qooxdoo object to the console including a link to set 
     * the object as the current selected object. 
     * @param object {qx.core.Object} The qooxdoo object to print.
     */
    _printQxObject: function(object) {
      // build the label string
      var label = this._getLabel("<< <u>", object.classname + " [" + object.toHashCode() + "]</u>", "blue")
      // set the link to set the object as current object
      label.setStyleProperty("cursor", "pointer");
      label.addEventListener("click", function() {
        this._inspector.setWidget(object, this);
      }, this);
      this._outputLayout.add(label);
    },
    
    /**
     * Prints out a standard text in black wit the leading ">> " to the console.
     * @param text {String} the text to print out.
     */
    _printText: function(text) {
      this._outputLayout.add(this._getLabel(">> ", text, "black"));
    },
 
    
    /**
     * Print out an error message to the console. This message begins with
     * ">> " and is red.
     * @param error {String} The error message.
     */
    _printError: function(error) {
      this._outputLayout.add(this._getLabel(">> ", error, "red"));
    },
 
 
    /**
     * Print out a line to seperate two calls. This also invokes a scrolling 
     * to the bottom of the console. 
     */
    _printLine: function() {
      this._outputLayout.add(this._getLine());
      this._scrollToLastLine();
    },
    
    
    /*
    *********************************
       Creater functions
    *********************************
    */
    /**
     * This function creates a label and tells the inspector that the label 
     * is a object of the inspector classes.
     * @param prefix {String} The prefix will be added infront of the text. 
     * @param text {String} The text which should be in the label.
     * @param color {String | Color} The color of the font.
     * @return {qx.ui.basic.Label} the created label.
     */
    _getLabel: function(prefix, text, color) {
      // start the exclusion so that the new element will not be in the list of objects
      this._inspector.beginExclusion();
      // create the new element
      var label = new qx.ui.basic.Label(prefix + text);
      // end the exclusion 
      this._inspector.endExclusion();
      // set the color of the label
      label.setTextColor(color);
      // set the padding
      label.setPadding(2);      
      return label;      
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
       this._outputLayout.setHeight(this._outputLayout.getHeight() + delta);
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
      
      this._outputLayout = new qx.ui.layout.VerticalBoxLayout();
      this._outputLayout.setBackgroundColor("white");
      this._outputLayout.setBorder("inset");
      this._outputLayout.setOverflow("auto");
      this._outputLayout.setWidth("100%");
      this._outputLayout.setHeight(150);
      this._consoleLayout.add(this._outputLayout);
  
      // create and add the textfield
      this._textField = new qx.ui.form.TextField();
      this._textField.setWidth("100%");
      this._consoleLayout.add(this._textField);
      // needed to ensure that every line is processed
      this._textField.setLiveUpdate(true);
  
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