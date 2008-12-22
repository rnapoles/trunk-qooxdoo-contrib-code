/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */
qx.Class.define("inspector.ConsoleWindow", 
{
  extend : inspector.AbstractWindow,


  construct : function()
  {
    this.base(arguments, "Console");
    
    // history stuff
    this._history = [];
    this._historyCounter = -1;
    
    // object folder
    this._objectFolder = [];
    this._objectFolderIndex = 0;
    
    // toolbar
    this._toolbar = new qx.ui.toolbar.ToolBar();
    this.add(this._toolbar);
    this._clearButton = new qx.ui.toolbar.Button("Clear");
    this._toolbar.add(this._clearButton);
    this._clearButton.addListener("execute", function() {
      this._content.setHtml("");
    }, this);
    
    // html embed
    this._content = new qx.ui.embed.Html("");
    this._content.setOverflowY("scroll");
    this.add(this._content, {flex: 1});
    
    // inputfield
    var inputComposite = new qx.ui.container.Composite();
    inputComposite.setDecorator("input");
    var layout = new qx.ui.layout.HBox();
    layout.setAlignY("middle");
    inputComposite.setLayout(layout);
    this.add(inputComposite);
    var leadingLabel = new qx.ui.basic.Label(">>>");
    var font = new qx.bom.Font(12, ["Courier New"]);
    // TODO Blue arrows at the beginning
    leadingLabel.setFont(font);
    inputComposite.add(leadingLabel);
    this._inputTextField = new qx.ui.form.TextField();
    this._inputTextField.setDecorator(null);
    this._inputTextField.setFont(font);
    inputComposite.add(this._inputTextField, {flex: 1});
    
    // add the listener to the textfield
    this._inputTextField.addListener("keydown", this._keyDownHandler, this);
    this._inputTextField.addListener("keyup", this._keyUpHandler, this);
    this._inputTextField.addListener("keypress", this._keyPressHandler, this);    
  },
  
  properties : {
    ans : {
      init: null,
      nullable: true
      // TODO allow undefined
    }
  },

  members :
  {
    
    
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
    
    
    _process: function(text) {
      // add the text to the embedded
      this._printText(this.escapeHtml(text));
      // try to run the code
      try {        
        // run it and store the result in the global ans value
        this.setAns(
          (function(text, ans) {
            return eval(text)
          }).call(qx.core.Init.getApplication().getSelectedObject(), text, this.getAns()));

        // if ans is defined
        if (this.getAns() != null) {      

          // store the object in the local reference folder
          this._objectFolder[this._objectFolderIndex] = {name: text, object: this.getAns()};  
          // print put the return value
          this._printReturnValue(this.getAns());
          // invoke the addition to the index after the objects has been printed to the screen
          this._objectFolderIndex++;
        }
      } catch (e) {
        // print out the exception
        this.error(e);
      }
    },    
    
    
    
    _keyDownHandler: function(e) {   
                
      // if the enter button is pressed
      if (e.getKeyIdentifier() == "Enter") {
        // save the string in the history
        this._history.unshift(this._inputTextField.getValue());
        // process the input
        this._process(this._inputTextField.getValue());
        // empty the textfield
        this._inputTextField.setValue("");
        // rest the history counter
        this._historyCounter = -1;
        // if the history is bigger than it should be
        if (this._history.length > 20) {
          // remove the last element
          this._history.pop();
        }
      }
      
      // if the up key is pressed
      if (e.getKeyIdentifier() == "Up") {
        // prevent that the cursor is set to another position
        e.preventDefault();
        // if a value is in the history
        if (this._history[this._historyCounter + 1] != undefined) {
          // increase the counter
          this._historyCounter++;            
          // set the value to the textfield
          this._inputTextField.setValue(this._history[this._historyCounter]);
        }
      }        
          
      // if the down key is pressed
      if (e.getKeyIdentifier() == "Down") {
        // prevent that the cursor is set to another position
        e.preventDefault();
        // check if the counter is bigger than 0
        if (this._historyCounter > 0) {
          // if yes, decreass the counter
          this._historyCounter--;
          // set the new value from the history
          this._inputTextField.setValue(this._history[this._historyCounter]);
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
              var length = self._inputTextField.getValue().length;
              self._inputTextField.setSelection(length, length);
            }, 0);            
          }

          // do the auto complete
          // try {
          //   // get the position for the popup
          //   var left = qx.html.Location.getPageBoxLeft(this._textField.getElement());
          //   var top = qx.html.Location.getPageBoxTop(this._textField.getElement()) - this._autoCompletePopup.getHeight();
          //   // tell the popup to show itself            
          //   this._autoCompletePopup.open(this._textField.getComputedValue(), left, top);
          // } catch (e) {
          //   // do nothing
          //   this.info(e);
          // }
        }
      }
    },
    

    _keyUpHandler: function(e) {
      // if the control key will be released
      if (e.getKeyIdentifier() == "Control") {
        // remove the control flag
        this._ctrl = false;
      }
    },
    
    

    _keyPressHandler: function(e) {
      // if (this._autoCompletePopup.isOnScreen()) {
      //   if (e.getKeyIdentifier() == "Down") {
      //     this._autoCompletePopup.selectionDown();
      //   } else if (e.getKeyIdentifier() == "Up") {
      //     this._autoCompletePopup.selectionUp();
      //   }
      // }
    },
    
    
    _scrollToLastLine: function() {
      // TODO Scroll does not work
      // flush the queues to ensure that the adding has been recognized
      qx.ui.core.queue.Manager.flush();      
      // wait until everything is done
      var self = this;
      window.setTimeout(function() {
        // scroll to the bottom of the layout
        var element = self._content.getContentElement();
        element.scrollToY(qx.bom.element.Dimension.getHeight(element));
      }, 0);
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
      var iFrameWindow = qx.core.Init.getApplication().getIframeWindowObject();
          
      // check for qooxdoo objects
      if (iFrameWindow && returnValue instanceof iFrameWindow.qx.core.Object) {
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
        var label = this._getLabel("<span class='ins_console_link'" +
                                   "'>[" + arrayRepresentation + "]</span>", "ins_console_return_array");
        this._content.setHtml(this._content.getHtml() + label);
        return;

      // check for objects
      } else if (iFrameWindow && returnValue instanceof iFrameWindow.Object) {        
        // if yes, print out that it is one
        var label = this._getLabel("<span class='ins_console_link' onclick='" + 
                                   "inspector.Inspector.getInstance().inspectObjectByInternalId(" + this._objectFolderIndex + ")" +
                                   "'>" + returnValue + " </span>", "ins_console_return_object");
        this._content.setHtml(this._content.getHtml() + label);
        
        return;
                     
      // everything else
      } else {
        // print out the return value
        var label = this._getLabel(returnValue, "ins_console_return_primitive");
        this._content.setHtml(this._content.getHtml() + label);
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
      var label = this._getLabel(
        "<span class='ins_console_link' onclick=" 
        + "\"qx.core.Init.getApplication().setWidgetByHash('"
        + object.toHashCode() + "', 'console');\"> " + object.classname 
        + " [" + object.toHashCode() + "]</span> ", 
        "ins_console_return_qxobject");
      // append the label string
      this._content.setHtml(this._content.getHtml() + label);      
      // scroll to the end of the console 
      this._scrollToLastLine();
    },
    
    
    /**
     * Prints out a standard text in black with the leading ">>> " to the console.
     * @param text {String} The text to print out.
     */
    _printText: function(text) {
      var label = this._getLabel(">>>&nbsp;" + text, "ins_console_text");
      this._content.setHtml(this._content.getHtml() + label);
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
  }
});
