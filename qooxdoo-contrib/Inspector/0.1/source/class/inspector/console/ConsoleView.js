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
 * This class represents a plugin for the console window.
 * 
 * Its functionality is analog to the functionality of the mozilla firebug console.
 * It can run javascript code and it can also be used as appender for the 
 * qooxdoo logging system.
 */
qx.Class.define("inspector.console.ConsoleView", {
  
  extend : qx.ui.layout.VerticalBoxLayout,  
  implement : inspector.console.IView,

  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */  
  statics: {
    /**
     * The length of the history in the console.
     */
    HISTORY_LENGTH: 20
  },
    
    
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  /**
   * Creates a new instance of a console view.
   * @param console {inspector.console.Console} Reference to the console object.
   */
  construct : function(console) {
    this.base(arguments);
    // store the reference to the console window
    this._console = console;
    // set the dimensions
    this.setWidth("100%");
    this.setHeight("100%");
    
    // initialize the object folder
    this._objectFolder = [];
    
    // create the popup for the auto completion
    this._autoCompletePopup = new inspector.console.AutoCompletePopup(this);  
    
    // initialize the htmlEmbed
    this._htmlEmbed = new qx.ui.embed.HtmlEmbed();
    this._htmlEmbed.setBackgroundColor("white");
    this._htmlEmbed.setBorder("inset");
    this._htmlEmbed.setOverflow("scrollY");
    this._htmlEmbed.setWidth("100%");
    this._htmlEmbed.setHeight(155);
    this._htmlEmbed.setHtmlProperty("id", "consoleViewHtmlEmbed");
    this.add(this._htmlEmbed);
    
    // create and add the textfield
    this._textField = new qx.ui.form.TextField();
    this._textField.setWidth("1*");
    // remove border because the layout will get the border
    this._textField.setBorder(null);
    this._textField.setFont(new qx.ui.core.Font(11, ["Courier New"]));  
    // needed to ensure that every line is processed
    this._textField.setLiveUpdate(true);

    // create a label to hold the leading >>>
    var leadingLabel = new qx.ui.basic.Label(">>>");
    leadingLabel.setTextColor("blue");
    leadingLabel.setBackgroundColor("white");

    // create a layout which holds the prefix and the entering textfield
    var textFieldLayout = new qx.ui.layout.HorizontalBoxLayout();      
    textFieldLayout.setBorder("inset");      
    textFieldLayout.setBackgroundColor("white");      
    textFieldLayout.add(leadingLabel);  
    textFieldLayout.setHeight(20); 
    textFieldLayout.add(this._textField);
    this.add(textFieldLayout);  
  
    // add the listener to the textfield
    this._textField.addEventListener("keydown", this._keyDownHandler, this);
    this._textField.addEventListener("keyup", this._keyUpHandler, this);
    this._textField.addEventListener("keypress", this._keyPressHandler, this);
      
    // add a event listener which updates the auto completion
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
    // the console 
    _console: null,
    
    // main elements
    _textField: null,
    _htmlEmbed: null,
        
    // history stuff
    _history: [],
    _historyCounter: -1,
    
    // auto complete stuff
    _ctrl: false,
    _autoCompletePopup: null,
    
    // reference arrays used to store the objects shown on the console view
    _objectFolder: null,
    _objectFolderIndex: 0,
    
    // search stuff
    _filter: "",
    
    
    /*
    *********************************
       PUBLIC
    *********************************
    */
    /**
     * Returns the object with the given index.
     * @internal 
     * @param id {Number} The id of the object.
     * @return {Object} The object in the console view. 
     */
    getObjectById: function(id) {
      return this._objectFolder[id];
    },
    
    
    /**
     * Returns the current set object.
     * @internal
     * @return {qx.core.Object} The current selected object. 
     */
    getQxObject: function() {
      return this._console.getQxObject();
    },
    
    
    /**
     * Returns the last return value.
     * @internal
     * @return {Object} The last return Value
     */
    getAns: function() {
      return this._console.getAns();
    },
    
    
    /**
     * Returns the zIndex of the console window.
     * It is used to set the auto complete popup to a higher zIndex.
     * @internal
     * @return {Number} zIndex of the console window.
     */
    getZIndexOfWindow: function() {
      return this._console.getZIndex();
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
     * Invokes the selecting of the value currently selected in the 
     * auto complete popup and appends it to the textfield.
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
                       "Press the CTRL and space key together (or tab) to get auto complete"; 
        var label = this._getLabel(helpText, "ins_console_help");
        this._htmlEmbed.setHtml(this._htmlEmbed.getHtml() + label);
      // scroll to the end of the console 
      this._scrollToLastLine();
    },    
    
    
    /**
     * Prints out a code snippet in withe with black background to the console.
     * @param code {String} The code to print out.
     */
    printCode: function(code) {
      var label = this._getLabel(code, "ins_console_return_code");
      this._htmlEmbed.setHtml(this._htmlEmbed.getHtml() + label);
      // scroll to the end of the console 
      this._scrollToLastLine();
    },     
    
    
    /*
    *********************************
       APPENDER IMPLEMENTATIONS
    *********************************
    */        
    /**
     * Prints out an error to the console.
     * @param message {String} The error message.
     */    
    error: function(message) {
      // open the console if it is not opened
      if (!this._console.isOpen()) {
        this._console.open();
      }
      var label = this._getLabel(message, "ins_console_error", "error");
      this._htmlEmbed.setHtml(this._htmlEmbed.getHtml() + label);
      // scroll to the end of the console 
      this._scrollToLastLine();         
    }, 
    
    
    /**
     * Prints out a warning message to the console.
     * @param message {String} The warning message to print out.
     */
    warn: function(message) {
      // open the console if it is not opened
      if (!this._console.isOpen()) {
        this._console.open();
      }
      var label = this._getLabel(message, "ins_console_warn", "warning");           
      this._htmlEmbed.setHtml(this._htmlEmbed.getHtml() + label);
      // scroll to the end of the console 
      this._scrollToLastLine();
    },
    
    
    /**
     * Prints out an info message to the console.
     * @param message {String} The info message.
     */
    info: function(message) {
      // open the console if it is not opened
      if (!this._console.isOpen()) {
        this._console.open();
      }
      var label = this._getLabel(message, "ins_console_info", "info");
      this._htmlEmbed.setHtml(this._htmlEmbed.getHtml() + label);
      // scroll to the end of the console 
      this._scrollToLastLine();
    }, 
    
    
    /**
     * Prints out an debug message to the console.
     * @param message {String} The debug message.
     */
    debug: function(message) {
      // open the console if it is not opened
      if (!this._console.isOpen()) {
        this._console.open();
      }            
      var label = this._getLabel(message, "ins_console_debug");        
      this._htmlEmbed.setHtml(this._htmlEmbed.getHtml() + label);
      // scroll to the end of the console 
      this._scrollToLastLine();
    },   
    
    
    /*
    *********************************
       IVIEW IMPLEMENTATIONS
    *********************************
    */   
    /**
     * Returns the elements of the ConsoleView which should not appear in
     * the widget finder document tree.
     * @internal
     * @return The components of the console.
     */
    getComponents: function() {
      return [this].concat(this._autoCompletePopup.getComponents());
    },  
    
    
    /**
     * Sets the height of the htmlEmbedded element showing the messages.
     * @internal
     * @param delta {Number} The delta of the height.
     */
    setMainElementDeltaHeight: function(delta) {
      this._htmlEmbed.setHeight(this._htmlEmbed.getHeight() + delta);
    },
                
    
    /**
     * Focuses the textfield. It is used by the console when activating
     * the console window.
     * @internal
     */
    focus: function() {
      this._textField.focus();
    },
    

    /**
     * Clears the whole console view.
     */
    clear: function() {
      // reset the view
      this._htmlEmbed.setHtml("");
      // reset the storage used for referencing the printed objects
      this._objectFolder = [];
      this._objectFolderIndex = 0;
    },      
    
    
    /**
     * Returns the string which should be shown in the caption bar 
     * of the console window if the console view is visible.
     * @internal
     * @return {String}Information string.
     */
    getCaptionMessage: function() {
      // if a object is selected
      if (this._console.getQxObject()) {
        // return the classname an the Hashcode
        return this._console.getQxObject().classname + " [" + this._console.getQxObject().toHashCode() + "]";      
      }
      // otherwise return that nothing is selected
      return "nothing selected";
    },
    
    
    /**
     * Filters the current content of the console view. All elements 
     * which do not match the filter string will be hidden.
     * @param filter {String} A string used to filter the content.
     */
    filter: function(filter) {
      // store the new filter
      this._filter = filter;
      
      // check for the browser variants
      if (qx.core.Variant.isSet("qx.client", "gecko")) {
        // get all children in a gecko browser
        var children = document.getElementById("consoleViewHtmlEmbed").childNodes;
      } else if (qx.core.Variant.isSet("qx.client", "opera|webkit|mshtml")) {
        // get all children in opera, ie and safari
        var children = document.getElementById("consoleViewHtmlEmbed").childNodes[0].childNodes;
      } else {
        // dont do anything because the browser is not known
        return;
      }
      
      // try to filter
      try {
        // create a regexp object for filtering
        var regExp = new RegExp(this._filter);  
        // go threw all children      
        for (var i = 0; i < children.length; i++) {
          // if the browser is a ie
          if (qx.core.Variant.isSet("qx.client", "mshtml")) {
            // take the innerText as content
            var content = children[i].innerText;
          }  else {
            // for all others, take the textContent as content
            var content = children[i].textContent;
          }  
          
          // test if the current content fits the filter
          if (regExp.test(content)) {
            // if there is a style attribute
            if (children[i].style != undefined) {
              // set the current child visible
              children[i].style.display = "";
            }
          } else {
            // if the child has a style attribute
            if (children[i].style != undefined) {
              // hide the current child
              children[i].style.display = "none";
            }
          }
        }  
      } catch (e) {
        // if that doesnt work, tell the user why
        alert("Unable to filter: " + e);
      }      
    },
    
    
    /**
     * Returns the string used to filter or if no string is set the default message.
     * @internal
     * @return {String} The string used to filter
     */
    getFilter: function() {
      // if no filter is set
      if (this._filter == "") {
        // return the default search string
        return inspector.console.Console.SEARCH_TERM;
      } else {
        // otherwise, return the filter string
        return this._filter;
      }
    },
    
    
    /**
     * Returns the classname of the current this reference in the 
     * console view.
     * @internal
     * @return {String | null} The name of the class.
     */
    getCurrentSelectedClassname: function() {
      // if there is a object set
      if (this._console.getQxObject() != null) {
        // return the classname
        return this._console.getQxObject().classname;
      }
      // otherwise, return null
      return null;
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
      this._printText(this._console.escapeHtml(text));
      // try to run the code
      try {        
        // run it and store the result in the global ans value
        this._console.setAns(
          (function(text, ans) {
            return eval(text)
          }).call(this._console.getQxObject(), text, this._console.getAns()));

        // if ans is defined
        if (this._console.getAns() != undefined) {      

          // store the object in the local reference folder
          this._objectFolder[this._objectFolderIndex] = {name: text, object: this._console.getAns()};  
          // print put the return value
          this._printReturnValue(this._console.getAns());
          // invoke the addition to the index after the objects has been printed to the screen
          this._objectFolderIndex++;
        }
      } catch (e) {
        // print out the exception
        this.error(e);
      }
    },
    
    
    /**
     * Scrolls the end of the main layout which holds the output of the console.
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
     * includes e.g. the history function by using the up and down keys and 
     * much more.
     * @param e {Event} The event cuased by keydown.
     */
    _keyDownHandler: function(e) {   
          
      // if the esc key is pressed
      if (e.getKeyIdentifier() == "Escape") {
        // hide the auto complete popup
        this._autoCompletePopup.hide();
      }
                
      // if the enter button is pressed
      if (e.getKeyIdentifier() == "Enter") {
        // if the auto complete popup is not on the screen
        if (!this._autoCompletePopup.isOnScreen()) {
          // save the string in the history
          this._history.unshift(this._textField.getComputedValue());
          // process the input
          this._process(this._textField.getComputedValue());
          // empty the textfield
          this._textField.setValue("");
          // rest the history counter
          this._historyCounter = -1;
          // if the history is bigger than it should be
          if (this._history.length > inspector.console.ConsoleView.HISTORY_LENGTH) {
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
            // if yes, decreass the counter
            this._historyCounter--;
            // set the new value from the history
            this._textField.setValue(this._history[this._historyCounter]);
          }
        }
      }
          
      // if the control key is pressed
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
          
          // if tab is the pressed key
          if (e.getKeyIdentifier() == "Tab") {
            var self = this;
            // remove the selection of the text
            window.setTimeout(function() {
              var length = self._textField.getComputedValue().length;
              self._textField.selectFromTo(length, length);
            }, 0);            
          }

          // do the auto complete
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
     * @param e {Event} The event cuased by keyup.
     */
    _keyUpHandler: function(e) {
      // if the control key will be released
      if (e.getKeyIdentifier() == "Control") {
        // remove the control flag
        this._ctrl = false;
      }
    },
    
    
    /**
     * Keyhandler which handels the keypress event. This is necessary to 
     * scroll threw the auto complete popup by holding the up or down key.
     * @param e {Event} The event cuased by the keypress.
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
       PRINT FUNCTIONS
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
        // initiate a string to represent the array
        var arrayRepresentation = "";
        // if the array is a huge one (more than 2 elements)
        if (returnValue.length > 2) {
          // take the first tow elements and show how much are not shown
          arrayRepresentation = returnValue[0] + ", " + returnValue[1] + ", ..." +
                                    (returnValue.length - 2) + " more";
        // if the length is exactly 2
        } else if (returnValue.length == 2) {
          // print out those two elements
          arrayRepresentation = returnValue[0] + ", " + returnValue[1];
        // if the array has only the length of one
        } else if (returnValue.length == 1) {
          // show only this one element
          arrayRepresentation = returnValue[0]; 
        }
        
        // if yes, print out that it is one
        var label = this._getLabel("<span class='ins_console_link' onclick='" + 
                                   "inspector.Inspector.getInstance().inspectObjectByInternalId(" + this._objectFolderIndex + ")" +
                                   "'>[" + arrayRepresentation + "]</span>", "ins_console_return_array");
        this._htmlEmbed.setHtml(this._htmlEmbed.getHtml() + label);
        return;

      // check for objects
      } else if (returnValue instanceof Object) {        
        // if yes, print out that it is one
        var label = this._getLabel("<span class='ins_console_link' onclick='" + 
                                   "inspector.Inspector.getInstance().inspectObjectByInternalId(" + this._objectFolderIndex + ")" +
                                   "'>" + returnValue + " </span>", "ins_console_return_object");
        this._htmlEmbed.setHtml(this._htmlEmbed.getHtml() + label);
        
        return;
                     
      // everything else
      } else {
        // print out the return value
        var label = this._getLabel(returnValue, "ins_console_return_primitive");
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
      var label = this._getLabel("<span class='ins_console_link' " + 
                                 "onclick=\"inspector.Inspector.getInstance().setWidgetByDbKey(" + object.getDbKey() + ", 'console');\"" + 
                                 ";> " + object.classname + " [" + object.toHashCode() + "]</span> " + 
                                 "<span class='ins_console_dom_link' onclick='" + 
                                       "inspector.Inspector.getInstance().inspectObjectByInternalId(" + this._objectFolderIndex + ")" +
                                       "'>inspect Object</span>"                                 
                                 , "ins_console_return_qxobject")
      // append the label string
      this._htmlEmbed.setHtml(this._htmlEmbed.getHtml() + label);      
      // scroll to the end of the console 
      this._scrollToLastLine();
    },
    
    
    /**
     * Prints out a standard text in black with the leading ">>> " to the console.
     * @param text {String} The text to print out.
     */
    _printText: function(text) {
      var label = this._getLabel(">>>&nbsp;" + text, "ins_console_text");
      this._htmlEmbed.setHtml(this._htmlEmbed.getHtml() + label);
      // scroll to the end of the console 
      this._scrollToLastLine();
    },
    
    
    /*
    *********************************
       CREATE FUNCTIONS
    *********************************
    */
    /**
     * Creates a String containing a div corresponding to the given values.
     * @param text {String} The text of the label.
     * @param clazz {String} the css class of the div. 
     * @param icon {String} The icon to show.
     */
    _getLabel: function(text, clazz, icon) {
      // create the text of the label
      var text = text;
      // handle the icon uri      
      if (icon == "info" || icon == "error" || icon == "warning") {
        var iconHtml = "<img src='" + qx.io.Alias.getInstance().resolve("inspector/image/shell/" + 
                       icon + "Icon.png") + "' class='ins_console_icon'>";
        text = iconHtml + "&nbsp;" + text;
      }
      // create the surrounding div
      text = "<div class='ins_console_common'><div class='" + clazz + "'>" + text + "</div></div>";
      // return the text String
      return text;      
    }
  
  },
   
  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */
  destruct : function() {
    this._disposeFields("_console", "_objectFolder", "_autoCompletePopup", "_htmlEmbed", "_textField");
  }
});