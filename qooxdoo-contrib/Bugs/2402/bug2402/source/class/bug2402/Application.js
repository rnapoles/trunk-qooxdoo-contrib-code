/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2402/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2402"
 */
qx.Class.define("bug2402.Application",
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
			
			qx.log.appender.Console.show();

      var textarea = new qx.ui.form.TextArea;
      textarea.addListener("keydown", function(e){ this.debug("keydown: " + e)  }, this)
      textarea.addListener("keyup", function(e){ this.debug("keyup: " + e) },  this)
      textarea.addListener("keypress", function(e){ this.debug("keypress: " +  e) }, this)

      doc.add(textarea, {left: 100, top: 50});

    }
  }
});
