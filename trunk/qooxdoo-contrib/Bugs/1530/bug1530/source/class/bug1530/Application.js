/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug1530/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug1530"
 */
qx.Class.define("bug1530.Application",
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
			
      var  l1 = new qx.ui.basic.Label("Test default");
      l1.setSelectable(true);

      var  l2 = new qx.ui.basic.Label("Test rich");
      l2.setRich(true);
      l2.setSelectable(true);

      var  l3 = new qx.ui.basic.Label("Test rich");
      l3.setSelectable(true);
      l3.setRich(true);
      l3.setSelectable(false);



      // Add button to document at fixed coordinates
      doc.add(l1, {left: 100, top: 50});
      doc.add(l2, {left: 100, top: 100});
      doc.add(l3, {left: 100, top: 150});

    }
  }
});
