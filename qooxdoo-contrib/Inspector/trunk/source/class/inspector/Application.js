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
    
        this._loading = false;
        
        // save the url in a cookie
        inspector.CookieApi.set("url", this._iFrame.getSource());
        
        // select the root of the new app
        this._selector.setSelection(this._loadedWindow.qx.core.Init.getApplication().getRoot());
        
        // check for the cookies
        this.__checkCookies();        
      }, this);  

      this._loading = true;      
      this._iFrame.setSource(this._urlTextField.getValue());
    },
    
    
    __checkCookies: function() {
      // check if the objects window should be openend
      if (inspector.CookieApi.get("objectsOpen") == "true") {
        this._objectsButton.setChecked(true);
      }
      // check if the widgets window should be openend
      if (inspector.CookieApi.get("widgetsOpen") == "true") {
        this._widgetsButton.setChecked(true);        
      }     
      // check if the console should be opened
      if (inspector.CookieApi.get("consoleOpen") == "true") {
        this._consoleButton.setChecked(true);        
      }
      // check if the console should be opened
      if (inspector.CookieApi.get("bindingsOpen") == "true") {
        this._bindingsButton.setChecked(true);        
      }      
    },
    
    
    __checkWorking: function() {
      // try to access the javascript objects in the iframe
      try {
        // also break if its undefined
        if (this._loadedWindow.qx === undefined) {
          throw new Error("qooxdoo not found!");
        }
        // try to get the root element of the application
        this._loadedWindow.qx.core.Init.getApplication().getRoot();
        
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
      this.__createObjects();          
      // Widgets window
      this.__createWidgets();
      // Console window
      this.__createConsole();   
      // Bindings Window
      this.__createBindings();   
      
      // add the third separator
      this._toolbar.add(new qx.ui.toolbar.Separator());
      
      // Lable showing the selected widget
      this._selectedWidgetLabel = new qx.ui.basic.Label();
      this._toolbar.add(this._selectedWidgetLabel);            

      // add a spacer to seperate the url
      this._toolbar.addSpacer();

      // get the url out of a cookie
      var cookieUrl = inspector.CookieApi.get("url");
      if (cookieUrl == undefined || cookieUrl == "") {
        cookieUrl = "Please enter an url here!";
      }
      // add the url textfield
      this._urlTextField = new qx.ui.form.TextField(cookieUrl);
      this._urlTextField.setMarginRight(5);
      this._urlTextField.setWidth(300);
      this._toolbar.add(this._urlTextField);
      this._urlTextField.addListener("changeValue", function(e) {
        this._toolbar.setEnabled(false);
        this._loading = true;
        this._iFrame.setSource(this._urlTextField.getValue());
      }, this);      
      
      
    },
    
    
    __createBindings: function() {
      this._bindingsButton = new qx.ui.toolbar.CheckBox("Bindings");
      this._toolbar.add(this._bindingsButton);
      var bindingsWindowWasOpen = false;
      this._bindingsButton.addListener("changeChecked", function(e) {
        if (!bindingsWindowWasOpen) {
          // create and add an instance
          this._bindingsWindow = new inspector.bindings.BindingsWindow();
          this.getRoot().add(this._bindingsWindow);   
          // set the right starting position and size
          var left = qx.bom.Viewport.getWidth() - this._bindingsWindow.getWidth();
          var height = parseInt((qx.bom.Viewport.getHeight() - 30) / 3);
          this._bindingsWindow.moveTo(left, 30 + 2 * height);
          this._bindingsWindow.setHeight(height);
          // add a close listener
          this._bindingsWindow.addListener("close", function() {
            this._bindingsButton.setChecked(false);
          }, this);       
        }
        // open the window
        e.getData() ? this._bindingsWindow.open() : this._bindingsWindow.close();
        // load the data AFTER the window is open (TODO Bug?)
        qx.ui.core.queue.Manager.flush();
        if (!bindingsWindowWasOpen) {
          // load if possible
          if (this._loadedWindow != null) {
            this._bindingsWindow.load(this._loadedWindow);
          }          
        }

        bindingsWindowWasOpen = true;
        
        // store the open status in a cookie
        inspector.CookieApi.set("bindingsOpen", e.getData());
      }, this);      
    },
    
    
    __createObjects: function() {
      this._objectsButton = new qx.ui.toolbar.CheckBox("Objects");
      this._toolbar.add(this._objectsButton);
      var objectsWindowWasOpen = false;
      this._objectsButton.addListener("changeChecked", function(e) {
        if (!objectsWindowWasOpen) {
          // create and add an instance
          this._objectWindow = new inspector.objects.ObjectsWindow();
          this.getRoot().add(this._objectWindow);   
          // set the right starting position and size
          var left = qx.bom.Viewport.getWidth() - this._objectWindow.getWidth();
          var height = parseInt((qx.bom.Viewport.getHeight() - 30) / 3);
          this._objectWindow.moveTo(left, 30);
          this._objectWindow.setHeight(height);
          // add a close listener
          this._objectWindow.addListener("close", function() {
            this._objectsButton.setChecked(false);
          }, this);
          // load if possible
          if (this._loadedWindow != null) {
            this._objectWindow.load(this._loadedWindow);
          }          
        }
        e.getData() ? this._objectWindow.open() : this._objectWindow.close();
        objectsWindowWasOpen = true;
        
        // store the open status in a cookie
        inspector.CookieApi.set("objectsOpen", e.getData());
      }, this);
    },
    
    __createConsole: function() {
      this._consoleButton = new qx.ui.toolbar.CheckBox("Console");
      this._toolbar.add(this._consoleButton);
      var consoleWindowWasOpen = false;
      this._consoleButton.addListener("changeChecked", function(e) {
        if (!consoleWindowWasOpen) {
          // create and add an instance
          this._consoleWindow = new inspector.console.ConsoleWindow();
          this.getRoot().add(this._consoleWindow);
          // set the right size and position
          var width = qx.bom.Viewport.getWidth();
          var height = parseInt((qx.bom.Viewport.getHeight() - 30) / 3);
          this._consoleWindow.moveTo(0, 2 * height + 30);
          this._consoleWindow.setWidth(width - 300);
          this._consoleWindow.setHeight(height);
          // add a close listener
          this._consoleWindow.addListener("close", function() {
            this._consoleButton.setChecked(false);
          }, this);          
        }
        e.getData() ? this._consoleWindow.open() : this._consoleWindow.close();
        consoleWindowWasOpen = true;
        
        // store the open status in a cookie
        inspector.CookieApi.set("consoleOpen", e.getData());        
      }, this);      
    },
    
    
    __createWidgets: function() {
      this._widgetsButton = new qx.ui.toolbar.CheckBox("Widgets");
      this._toolbar.add(this._widgetsButton);
      var widgetsWindowWasOpen = false;
      this._widgetsButton.addListener("changeChecked", function(e) {
        if (!widgetsWindowWasOpen) {
          // create a instance and add it
          this._widgetsWindow = new inspector.widgets.WidgetsWindow();
          this.getRoot().add(this._widgetsWindow);
          // move the window to its starting position and size
          var left = qx.bom.Viewport.getWidth() - this._widgetsWindow.getWidth();
          var height = parseInt((qx.bom.Viewport.getHeight() - 30) / 3);
          this._widgetsWindow.moveTo(left, height + 30);
          this._widgetsWindow.setHeight(height);
          // add a listener for the close button
          this._widgetsWindow.addListener("close", function() {
            this._widgetsButton.setChecked(false);
          }, this);
          // invoke a load
          this._widgetsWindow.load();
        }
        e.getData() ? this._widgetsWindow.open() : this._widgetsWindow.close();
        widgetsWindowWasOpen = true;
        
        // store the open status in a cookie
        inspector.CookieApi.set("widgetsOpen", e.getData());        
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
        // tell the console to go to the default view
        this._consoleWindow.goToDefaultView();
      }
      var object = qx.core.ObjectRegistry.fromHashCode(hash);
      this.select(object, initiator);
    },
    

    inspectObjectByDomSelecet: function(index, key) {
      if (this._consoleWindow != null) {
          this._consoleWindow.inspectObjectByDomSelecet(index, key);
      }
    },
    
    
    inspectObjectByInternalId: function(id) {
      // if the console exists
      if (this._consoleWindow != null) {
        // tell the consol to do the rest
        this._consoleWindow.inspectObjectByInternalId(id);
      }
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
      
      if (this._objectWindow != null && initiator != this._objectWindow) {
        if (object != this._objectWindow.getSelection()) {
          this._objectWindow.select(object, true);          
        }
      }
      
      if (this._widgetsWindow != null && initiator != this._widgetsWindow) {
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
    qx.bom.Stylesheet.includeFile("inspector/css/domview.css");        
    qx.bom.Stylesheet.includeFile("inspector/css/consoleview.css");
    qx.bom.Stylesheet.includeFile("inspector/css/sourceview.css");
    qx.bom.Stylesheet.includeFile("inspector/css/propertylisthtml.css");
  }
});