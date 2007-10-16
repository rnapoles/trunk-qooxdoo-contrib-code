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
qx.Class.define("inspector.menu.SettingsWindow", {
  
  extend : qx.ui.window.Window,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function(menu) {    
    this.base(arguments);
    // store the reference to the menu
    this._menu = menu;
    // set the zIndex to a higher one than the index of the find mode layer
    this.setZIndex(1e5 + 3)
    
    // initialize the window
    this.setCaption(inspector.Inspector.SETTINGS_CAPTION_TITLE);
    this.setWidth(400);
    this.setHeight("auto");
    this.setShowMinimize(false);
    this.setShowMaximize(false);
    
    var layout = new qx.ui.layout.VerticalBoxLayout();
    layout.setWidth("100%");
    this.add(layout);
    
    // add the groupboxes
    layout.add(this.__createApiGroupbox());
    layout.add(this.__createKeyGroupbox());
  }, 
  
  
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members: {
    /*
    *********************************
       ATTRIBUTES
    *********************************
    */    
    _menu: null,
    
    _apiGroup: null,
    _keyGroup: null,
    
    
    

    /*
    *********************************
       PUBLIC
    *********************************
    */
    /**
     * @internal
     * @return the components of the menu.
     */
    getComponents: function() {
      return [this];
    },
    
    
    /**
     * Enables the settings dialogs of the window. This should 
     * be used to disable the settings e.g. wehn no cookies can 
     * be found to edit. 
     * @param enabled {boolean} Enabled or disables the settings.
     */
    enableSettings: function(enabled) {
      this._apiGroup.setEnabled(enabled);
      this._keyGroup.setEnabled(enabled);
    },
    
    
    /*
    *********************************
       PRIVATE
    *********************************
    */
    __createApiGroupbox: function() {
      // create a group box
      this._apiGroup = new qx.ui.groupbox.GroupBox("API");
      // initialize the groupbox
      this._apiGroup.setWidth("100%");
      this._apiGroup.setHeight("auto");
      this._apiGroup.setPadding(2);
      
      // create a main layout which holds the setting rows
      var mainLayout = new qx.ui.layout.VerticalBoxLayout();
      // initialize the main layout
      mainLayout.setWidth("100%");
      mainLayout.setHeight("auto");
      mainLayout.setSpacing(5);
      // add the main layout to the groupbox
      this._apiGroup.add(mainLayout);
      
      // create a layout to hold the uri settings row
      var uriLayout = new qx.ui.layout.HorizontalBoxLayout();      
      uriLayout.setWidth("100%");
      uriLayout.setHeight("auto");
      // create the label for the uri
      var uriLabel = new qx.ui.basic.Label("API-Viewer URI:");
      uriLabel.setPadding(5);
      // create a combobox to hold the uri
      var uriBox = new qx.ui.form.ComboBox();
      uriBox.setWidth("1*");
      uriBox.setEditable(true);
      uriBox.setValue(qx.io.local.CookieApi.get("ApiViewerUri"));
      // add the two default values
      uriBox.add(new qx.ui.form.ListItem("http://demo.qooxdoo.org/current/apiviewer/"));
      uriBox.add(new qx.ui.form.ListItem("../api/index.html (if built locally)", null, "../api/index.html"));
      // add a listener to save the changed value to a cookie
      uriBox.addEventListener("changeValue", function(e) {
        qx.io.local.CookieApi.set("ApiViewerUri", this.getValue());
      }, uriBox);          
      // add the components for the uri together
      uriLayout.add(uriLabel, uriBox);      
      mainLayout.add(uriLayout);
      
      // create a layout for the dimension row
      var dimensionLayout = new qx.ui.layout.HorizontalBoxLayout();      
      dimensionLayout.setWidth("100%");
      dimensionLayout.setHeight("auto");
      // create the width label
      var widthLabel = new qx.ui.basic.Label("Width: ");
      widthLabel.setPadding(5);
      // create the height label
      var heightLabel = new qx.ui.basic.Label("Height: ");
      heightLabel.setPadding(5);
      // create the width textfield
      var widthTextField = new qx.ui.form.TextField(qx.io.local.CookieApi.get("ApiViewerWidth"));
      widthTextField.setWidth("1*");
      // add a listener to store the width in a cookie      
      widthTextField.addEventListener("changeValue", function(e) {
        qx.io.local.CookieApi.set("ApiViewerWidth", this.getComputedValue());
      }, widthTextField);
      // create the height textfield
      var heightTextField = new qx.ui.form.TextField(qx.io.local.CookieApi.get("ApiViewerHeight"));
      heightTextField.setWidth("1*");
      // add a listener to store the height in a cookie
      heightTextField.addEventListener("changeValue", function(e) {
        qx.io.local.CookieApi.set("ApiViewerHeight", this.getComputedValue());
      }, heightTextField);    
      // add the dimesion components together
      dimensionLayout.add(widthLabel, widthTextField, heightLabel, heightTextField);      
      mainLayout.add(dimensionLayout);
      
      return this._apiGroup;
    },
    


    __createKeyGroupbox: function() {
      // create a group box
      this._keyGroup = new qx.ui.groupbox.GroupBox("Shortcuts");
      // initialize the groupbox
      this._keyGroup.setWidth("100%");
      this._keyGroup.setHeight("auto");
      this._keyGroup.setPadding(2);
      
      // create a main layout which holds the setting rows
      var mainLayout = new qx.ui.layout.VerticalBoxLayout();
      // initialize the main layout
      mainLayout.setWidth("100%");
      mainLayout.setHeight("auto");
      mainLayout.setSpacing(5);
      // add the main layout to the groupbox
      this._keyGroup.add(mainLayout);
      
      // create the laouts which hold the cammand shortcut settings      
      mainLayout.add(this.__getShortcutLayout("Find: ", "Find", this._menu.changeFindShortcut));
      mainLayout.add(this.__getShortcutLayout("Highlight: ", "Highlight", this._menu.changeHighlightShortcut));      
      mainLayout.add(this.__getShortcutLayout("Hide All: ", "HideAll", this._menu.changeHideAllShortcut));
      mainLayout.add(this.__getShortcutLayout("Open All: ", "OpenAll", this._menu.changeOpenAllShortcut));      
      mainLayout.add(this.__getShortcutLayout("Open Console: ", "OpenConsole", this._menu.changeConsoleShortcut));
      mainLayout.add(this.__getShortcutLayout("Open Object: ", "OpenObject", this._menu.changeObjectShortcut));
      mainLayout.add(this.__getShortcutLayout("Open Widget: ", "OpenWidget", this._menu.changeWidgetShortcut));
      mainLayout.add(this.__getShortcutLayout("Open Property: ", "OpenProperty", this._menu.changePropertyShortcut));
      
      return this._keyGroup;      
    },
    
    __getShortcutLayout: function(label, cookiePrefix, changeFunction) {
      // create the layout for the find commmand settings
      var layout = new qx.ui.layout.HorizontalBoxLayout();      
      layout.setWidth("100%");
      layout.setHeight("auto");
      // create the label for the find shortcut 
      var findLabel = new qx.ui.basic.Label(label);
      findLabel.setPadding(5);
      findLabel.setWidth(90);
      // create the textfield for the find shortcur
      var findTextField = new qx.ui.form.TextField(qx.io.local.CookieApi.get(cookiePrefix + "Shortcut"));
      findTextField.setWidth("1*");
      
      // add the change listener for the find shortcut
      findTextField.addEventListener("changeValue", function(e) {
        // try to change the shortcut
        try {
          // change the shortcut
          // this._menu.changeShortcut(names[j], findTextField.getComputedValue());
          changeFunction.call(this._menu, findTextField.getComputedValue());
          // stor the new shortcut in the cookie
          qx.io.local.CookieApi.set(cookiePrefix + "Shortcut", findTextField.getComputedValue());
        } catch (e) {
          // alert the user if the change didnt work
          alert(e);
          // restore the former shortcut to the textfield
          findTextField.setValue(qx.io.local.CookieApi.get(cookiePrefix + "Shortcut"));
        }
      }, this);        
      // add the components to the layout
      layout.add(findLabel, findTextField);      
      return layout;  
    }

  }
});
