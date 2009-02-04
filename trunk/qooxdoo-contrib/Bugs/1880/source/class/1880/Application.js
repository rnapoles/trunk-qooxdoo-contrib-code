/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(1880/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "1880"
 */
qx.Class.define("1880.Application",
{
  extend : qx.application.Simple,



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

      this.debug("simple application started");
      this.debug("available handlers");
      this.debug(qx.event.Registration.__managers[0].__handlers);
    }
  }
});
