/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(custom/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "2627"
 */
qx.Class.define("custom.Application",
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

      var iframe = new qx.ui.embed.Iframe("http://web.de");
      iframe.addListener("load", function() {
        console.log("load");
      });
      this.getRoot().add(iframe, {left: 150, top: 10});
      
      var container = new qx.ui.container.Composite(new qx.ui.layout.Grow());
      this.getRoot().add(container, {left: 150, top: 150});
      
      var btn = new qx.ui.form.Button("move");
      btn.addListener("click", function() {
        container.add(iframe);
      });
      this.getRoot().add(btn, {left: 10, top: 10});
    }
  }
});
