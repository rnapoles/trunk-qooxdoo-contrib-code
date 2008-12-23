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
/* ************************************************************************

#asset(inspector/*)
#resource(inspector.css:css)
#embed(inspector.css/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "inspector"
 */
qx.Class.define("inspector.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */
      
      
      this.__createToolbar();
            
      // create the iFrame
      this._iFrame = new qx.ui.embed.Iframe();
      this.getRoot().add(this._iFrame, {top: 29, left: 0, right: 0, bottom: 0});
      
      this._iFrame.addListener("load", function() {
        this._toolbar.setEnabled(true);
        this._loadedWindow = this._iFrame.getContentElement().getWindow();
        
        // check if the app is loaded correctly
        if (!this.__checkWorking()) {
          return;
        }
        
        // check for the selector
        if (!this._selector) {
          this._selector = new inspector.Selector(this._loadedWindow);
        } else {
          this._selector.setJSWindow(this._loadedWindow);        
        }
        
        // select the root app
        this._selector.addListener("changeSelection", this._changeSelection, this);
        this._selector.setSelection(this._loadedWindow.qx.core.Init.getApplication());
        
        // load the objects in the objects window
        this._objectWindow.load(this._loadedWindow);
        // load the widgets in the widgetsWindow
        this._widgetsWindow.load();        
        this._loading = false;
        // select the root of the new app
        this._selector.setSelection(this._loadedWindow.qx.core.Init.getApplication().getRoot());
      }, this);  

      this._loading = true;      
      this._iFrame.setSource(this._urlTextField.getValue());
    },
    
    
    __checkWorking: function() {
      // try to access the javascript objects in the iframe
      try {
        // also break if its undefined
        if (this._loadedWindow.qx === undefined) {
          throw new Error();
        }
        // reset the enabled properties of the toolbar stuf
        this._selectedWidgetLabel.resetEnabled();
        this._urlTextField.resetEnabled();
        return true;     
      } catch (e) {
        // signal that the inspector is not working
        this._toolbar.setEnabled(false);
        this._selectedWidgetLabel.setContent(
          "Can not access the javascript in the iframe!"
        );
        // enable the text to make it more visible
        this._selectedWidgetLabel.setEnabled(true);
        // enable the url field to give a chance to change the url
        this._urlTextField.setEnabled(true);
        return false;
      }
    },
    
    
    __createToolbar: function() {
      // create the toolbar itself
      this._toolbar = new qx.ui.toolbar.ToolBar();
      // TODO 
      this._toolbar._getLayout().setAlignY("middle");      
      this.getRoot().add(this._toolbar, {top: 0, left: 0, right: 0});
      
      // create the headline label
      var inspectorLabel = new qx.ui.basic.Label("qx inspector");
      inspectorLabel.setPaddingLeft(10);
      inspectorLabel.setPaddingRight(5);
      var font = new qx.bom.Font(12, ["Lucida Grande"])
      font.setBold(true);
      font.setItalic(true);
      inspectorLabel.setFont(font);
      this._toolbar.add(inspectorLabel);
      this._toolbar.setEnabled(false);
      
      // add a separator
      this._toolbar.add(new qx.ui.toolbar.Separator());
      
      // create the find button
      var findButton = new qx.ui.toolbar.Button("Find a widget");
      this._toolbar.add(findButton);
      findButton.addListener("execute", function() {
        this._selector.start();
      }, this);      
      
  
      // add the second separator
      this._toolbar.add(new qx.ui.toolbar.Separator());
  
      // Objects window
      this._objectWindow = new inspector.ObjectsWindow();
      this.getRoot().add(this._objectWindow);
      var objectsButton = new qx.ui.toolbar.CheckBox("Objects");
      this._toolbar.add(objectsButton);
      var objectsWindowWasOpen = false;
      objectsButton.addListener("changeChecked", function(e) {
        // move the window to a good start position
        if (!objectsWindowWasOpen) {
          this._objectWindow.moveTo(0, 29);
        }
        e.getData() ? this._objectWindow.open() : this._objectWindow.close();
        objectsWindowWasOpen = true;
      }, this);
      this._objectWindow.addListener("close", function() {
        objectsButton.setChecked(false);
      }, this);
      
      // Console window
      this._consoleWindow = new inspector.console.ConsoleWindow();
      this.getRoot().add(this._consoleWindow);
      var consoleButton = new qx.ui.toolbar.CheckBox("Console");
      this._toolbar.add(consoleButton);
      var consoleWindowWasOpen = false;
      consoleButton.addListener("changeChecked", function(e) {
        if (!consoleWindowWasOpen) {
          this._consoleWindow.moveTo(20, 49);
        }
        e.getData() ? this._consoleWindow.open() : this._consoleWindow.close();
        consoleWindowWasOpen = true;
      }, this);   
      this._consoleWindow.addListener("close", function() {
        consoleButton.setChecked(false);
      }, this);       
      
      // Widgets window
      this._widgetsWindow = new inspector.WidgetsWindow();
      this.getRoot().add(this._widgetsWindow);
      var widgetsButton = new qx.ui.toolbar.CheckBox("Widgets");
      this._toolbar.add(widgetsButton);
      var widgetsWindowWasOpen = false;
      widgetsButton.addListener("changeChecked", function(e) {
        if (!widgetsWindowWasOpen) {
          this._widgetsWindow.moveTo(40, 69);
        }
        e.getData() ? this._widgetsWindow.open() : this._widgetsWindow.close();
        widgetsWindowWasOpen = true;
      }, this);   
      this._widgetsWindow.addListener("close", function() {
        widgetsButton.setChecked(false);
      }, this);        
      
      // add the third separator
      this._toolbar.add(new qx.ui.toolbar.Separator());
      
      // Lable showing the selected widget
      this._selectedWidgetLabel = new qx.ui.basic.Label();
      this._toolbar.add(this._selectedWidgetLabel);            

      // add a spacer to seperate the url
      this._toolbar.addSpacer();

      // add the url textfield
      this._urlTextField = new qx.ui.form.TextField("../../../testWidgetSelect/source/index.html");
      this._urlTextField.setMarginRight(5);
      this._urlTextField.setWidth(300);
      this._toolbar.add(this._urlTextField);
      this._urlTextField.addListener("changeValue", function(e) {
        this._toolbar.setEnabled(false);
        this._loading = true;
        this._iFrame.setSource(this._urlTextField.getValue());
      }, this);      
      
      
    },
    
    
    _changeSelection: function(e) {
      this.select(e.getData(), this._selector);
    },
    
    
    getSelectedObject : function() {
      return this._selector.getSelection();
    },
    
    
    getIframeWindowObject : function() {
      return this._loadedWindow;
    },
    
    
    getExcludes: function() {
      return this._selector.getAddedWidgets();
    },
    
    
    setWidgetByHash : function(hash, initiator) {
      // check the initiator
      if (initiator == "console") {
        initiator = this._consoleWindow;
      }
      var object = qx.core.ObjectRegistry.fromHashCode(hash);
      this.select(object, initiator);
    },
    
    
    select: function(object, initiator) { 
      // if its currently loaiding, do nothing
      if (this._loading) {
        return;
      }     
      // show the selected widget in the inspector bar
      this._selectedWidgetLabel.setContent(object.toString());
      
      if (initiator != this._selector) {
        if (object !== this._selector.getSelection()) {
          this._selector.setSelection(object);                  
        }
      }
      
      if (initiator != this._objectWindow) {
        if (object != this._objectWindow.getSelection()) {
        this._objectWindow.select(object, true);          
        }
      }
      
      if (initiator != this._widgetsWindow) {
        if (object != this._widgetsWindow.getSelection()) {
          this._widgetsWindow.select(object, true);                  
        }
      }      
      
      this._selector.highlightFor(object, 1000);
    }
  },
  
  
  
  defer : function()
  {
    // Include CSS file
    qx.bom.Stylesheet.includeFile("inspector/css/consoleview.css");
  }
});