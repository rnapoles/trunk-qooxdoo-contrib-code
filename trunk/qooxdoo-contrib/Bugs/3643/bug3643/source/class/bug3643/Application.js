/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug3643/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug3643"
 */
qx.Class.define("bug3643.Application",
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
     * 
     * @lint ignoreDeprecated(alert)
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
var list = new qx.ui.form.List();
list.setWidth(200);
list.setHeight(200);
list.setScrollbarY("on");



      // Document is the application root
      var doc = this.getRoot();
			
      // Add button to document at fixed coordinates
      doc.add(list, {left: 100, top: 50});

    }
  }
});
