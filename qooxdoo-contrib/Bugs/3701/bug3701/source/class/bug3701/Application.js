/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug3701/*)
#asset(qx/icon/Tango/16/apps/*)
#asset(qx/icon/Tango/22/apps/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug3701"
 */
qx.Class.define("bug3701.Application",
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

      //
      // Create buttons with (shared) tooltips
      //
      var button1 = new qx.ui.form.Button("First Button", "icon/22/apps/internet-web-browser.png").set({
        toolTipText : "This tool-tip should show an icon & text",
        toolTipIcon : "icon/16/apps/internet-web-browser.png"
      });
      
      var button2 = new qx.ui.form.Button("Second Button", "icon/22/apps/internet-mail.png").set({
        toolTipText : "",//"This tool-tip should only show an icon",
        toolTipIcon : "icon/16/apps/internet-mail.png"
      });
      
      var button3 = new qx.ui.form.Button("Second Button", "icon/22/apps/internet-blog.png").set({
        toolTipText : "This tool-tip should never show any icon",
        toolTipIcon : null
      });
            
      // Add buttons to document at fixed coordinates
      var doc = this.getRoot();
      doc.add(button1, {left : 100, top : 50 });
      doc.add(button2, {left : 100, top : 90 });
      doc.add(button3, {left : 100, top : 130 });
      
    }
  }
});
