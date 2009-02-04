/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug1908/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug1908"
 */
qx.Class.define("bug1908.Application",
{
  extend : qx.application.Inline,



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

      var rootElement = document.getElementById("root");
      var inline = new qx.ui.root.Inline(rootElement, true, true);

      var myLabel = new qx.ui.basic.Label("MyLabel");
      var myToolTip = new qx.ui.tooltip.ToolTip("My Tooltip");
      myLabel.setToolTip(myToolTip);

      inline.add(myLabel);
    }
  }
});
