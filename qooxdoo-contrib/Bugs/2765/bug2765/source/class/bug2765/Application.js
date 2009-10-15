/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2765/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2765"
 */
qx.Class.define("bug2765.Application",
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

      var container = new qx.ui.container.Scroll().set({
         width: 400,
         height: 300
       });

      this.getRoot().add(container, {left: 50, top: 10});

      var content = new qx.ui.container.Composite().set({
        backgroundColor : "lime",
        minHeight: 310,
        maxHeight: 310,
        minWidth : 400,
        maxWidth : 400
      });

      container.add(content);

    }
  }
});
