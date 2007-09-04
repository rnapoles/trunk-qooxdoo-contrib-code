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
  construct : function() {    
    this.base(arguments);
    // set the zIndex to a higher one than the index of the find mode layer
    this.setZIndex(1e5 + 2);

    
    // initialize the window
    this.setCaption(inspector.Inspector.SETTINGS_CAPTION_TITLE);
    this.setWidth(400);
    this.setHeight("auto");  
    this.setModal(true);  
    
    
    this.add(this.__createApiUrlGroupbox());
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

    

    /*
    *********************************
       PUBLIC
    *********************************
    */
    /**
     * @return the components of the menu.
     */
    getComponents: function() {
      return [this];
    },
    
    
    
    /*
    *********************************
       PRIVATE
    *********************************
    */
    __createApiUrlGroupbox: function() {
      // create a group box
      var groupBox = new qx.ui.groupbox.GroupBox("API");
      // initialize the groupbox
      groupBox.setWidth("100%");
      groupBox.setHeight("auto");
      groupBox.setPadding(2);
      
      // create a main layout which holds the setting rows
      var mainLayout = new qx.ui.layout.VerticalBoxLayout();
      // initialize the main layout
      mainLayout.setWidth("100%");
      mainLayout.setHeight("auto");
      mainLayout.setSpacing(5);
      // add the main layout to the groupbox
      groupBox.add(mainLayout);
      
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
      uriBox.add(new qx.ui.form.ListItem("../api/index.html"));
      uriBox.add(new qx.ui.form.ListItem("http://demo.qooxdoo.org/current/apiviewer/"));
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
      
      return groupBox;
    }
    


  }
});
