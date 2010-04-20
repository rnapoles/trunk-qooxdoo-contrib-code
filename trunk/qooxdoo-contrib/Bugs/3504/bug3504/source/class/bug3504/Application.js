/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug3504/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug3504"
 */
qx.Class.define("bug3504.Application",
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

      if (qx.bom.client.Platform.MAC) {
        this.__selectAllShortcut = new qx.ui.core.Command("Meta+A"); 
      } else {
        this.__selectAllShortcut = new qx.ui.core.Command("Control+A"); 
      }
      
      
      this.__selectAllShortcut.addListener("execute", function(e){
        console.info(e);
      }, this); 







    }
  }
});
