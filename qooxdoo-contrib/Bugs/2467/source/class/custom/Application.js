/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(custom/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "2467"
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

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */

      var __MCont = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({
        padding : 10,
        backgroundColor : "white"
      });
      this.getRoot().add(__MCont, {edge : 0});

      var __lay = new qx.ui.layout.Grid();
      __lay.setRowFlex(0, 1);
      
      var group1 = new qx.ui.groupbox.GroupBox("test");
      group1.setLayout(__lay);
      
      __MCont.add(group1);
      var pg_scont = new qx.ui.form.CheckBox(this.tr("Allow backup.<br>\
      <font color=‘#888’>This is a test with a lot of words in order to test the display and to see the bug with the allowGrowX property.</font>")).set({rich:true, allowGrowX: true});
      group1.add(pg_scont, {row: 0, column : 0});

      
    }
  }
});
