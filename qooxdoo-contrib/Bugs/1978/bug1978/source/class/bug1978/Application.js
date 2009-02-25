/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug1978/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug1978"
 */
qx.Class.define("bug1978.Application",
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

      var doc = this.getRoot();

      var lb = new qx.ui.form.List();
      doc.add(lb,
      {
          left : 100,
          top  : 50
      });


      for (var i = 0; i < 100; i++) {
        lb.add(new qx.ui.form.ListItem("Test " + i, null, "" + i));
      }



      // Add button to document at fixed coordinates
      doc.add(button1, {left: 100, top: 50});
    }
  }
});
