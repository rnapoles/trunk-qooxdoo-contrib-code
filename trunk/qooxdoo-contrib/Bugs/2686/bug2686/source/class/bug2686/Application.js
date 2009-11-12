/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2686/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2686"
 */
qx.Class.define("bug2686.Application",
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

      // Document is the application root
      var doc = this.getRoot();
			




      var menu = new qx.ui.menu.Menu;

      var site1 = new qx.ui.menu.Button("Website 1");
      var site2 = new qx.ui.menu.Button("Website 2");
      var site3 = new qx.ui.menu.Button("Website 3");

      menu.setMinWidth(120);

      menu.add(site1);
      menu.add(site2);
      menu.add(site3);

      // Create opener button
      var button = new qx.ui.form.SplitButton("->", "", menu);

      // Add button to document at fixed coordinates
      doc.add(button,
      {
        left : 100,
        top  : 50
      });

      // Add an event listener
      button.addListener("execute", function(e) {
        menu.exclude();
      });


      menu.addListener("disappear", function(e) {
        alert("disappeared!");
      });





    }
  }
});
