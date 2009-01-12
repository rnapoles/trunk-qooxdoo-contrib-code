/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug1831/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug1831"
 */
qx.Class.define("bug1831.Application",
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

      var scrollContainer = new qx.ui.container.Scroll();
      scrollContainer.set({
        width: 200,
        height: 200
      });
      
      scrollContainer.add(this.generateBox());

      var doc = this.getRoot();
      doc.add(scrollContainer, {left: 100, top: 50});
    },

    generateBox : function()
    {
      var box = new qx.ui.basic.Label("Content size: 300x300").set({
        width: 300,
        height: 300,
        allowShrinkX: false,
        allowShrinkY: false,
        backgroundColor: "brown",
        textColor: "white",
        padding: 10
      });
      return box;
    }
  }
});
