/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug3273/*)
#asset(qx/icon/Tango/22/apps/internet-web-browser.png)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug3273"
 */
qx.Class.define("bug3273.Application",
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

      var img1 = new qx.ui.basic.Image("icon/22/apps/internet-web-browser.png").set({
                   width: 25,
		   height: 25,
		   decorator: "pane"
		 });

      var img2 = new qx.ui.basic.Image("icon/22/apps/internet-web-browser.png").set({
		  width: 25,
		  height: 25,
		  decorator: "pane",
		  scale: true
		});

      var doc = this.getRoot();

      doc.add(img1, { left : 100, top  : 50 });
      doc.add(img2, { left : 150, top  : 50 });

    }
  }
});
