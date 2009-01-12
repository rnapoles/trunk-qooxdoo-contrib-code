/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(custom/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "Bug1408"
 */
qx.Class.define("custom.Application",
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
      // Create the demo window
      var win = new qx.ui.window.Window("Demo1", "icon/16/apps/internet-web-browser.png");

      // Create the TextField with a label
      var lable1 = new qx.ui.basic.Label("Text1:");
      var textField = new qx.ui.form.TextField("TextField");

      // Create the ComboBox with a label
      var lable2 = new qx.ui.basic.Label("Text2:");
      var comboBox = new qx.ui.form.ComboBox();

      // Create the SelectBox with a label
      var lable3 = new qx.ui.basic.Label("Text3:");
      var selectBox = new qx.ui.form.SelectBox();

      // Create first GroupBoxwith a label
      var groupBox1 = new qx.ui.groupbox.GroupBox("Group1", 				"icon/16/apps/internet-messenger.png");

      // Create second GroupBoxwith a label
      var groupBox2 = new qx.ui.groupbox.GroupBox("Group2", 					"icon/16/apps/preferences-users.png");

      // Create Button
      var button = new qx.ui.form.Button("Reset");

      // Create Grid Layout
      var layout = new qx.ui.layout.Grid(8, 8);
      win.setLayout(layout);

      /* 
       * When this is not set the Grid layout 
       * can't calculate the correct size.
       */
      //layout.setColumnWidth(1, 100); 
      layout.setColumnFlex(1, 1);

      // Add the Widgets to the layout
      win.add(lable1, {row: 0, column: 0});
      win.add(textField, {row: 0, column: 1, colSpan: 2});
      win.add(lable2, {row: 1, column: 0});
      win.add(comboBox, {row: 1, column: 1, colSpan: 2});
      win.add(lable3, {row: 2, column: 0});
      win.add(selectBox, {row: 2, column: 1, colSpan: 2});
      win.add(groupBox1, {row: 3, column: 0, colSpan: 3});
      win.add(groupBox2, {row: 4, column: 0, colSpan: 3});
      win.add(button, {row: 5, column: 2});

      // Open Window
      win.open();
      this.getRoot().add(win, {left: 20, top: 20});
    }
  }
});
