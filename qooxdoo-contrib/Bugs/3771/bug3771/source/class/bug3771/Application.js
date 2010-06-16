/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug3771/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug3771"
 */
qx.Class.define("bug3771.Application",
{
  extend : qx.application.Native,



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
      
      var t1 = document.getElementById("t1");
      t1.value = "Default";
      var t2 = document.getElementById("t2");
            
      qx.bom.Element.addListener(t1, "focus", function(ev) {
        console.log("focus");
        this.value = "";
      });
      
      qx.bom.Element.addListener(t1, "blur", function(ev) {
        console.log("blur");
        this.value = "Default";
      });
            
    }
  }
});
