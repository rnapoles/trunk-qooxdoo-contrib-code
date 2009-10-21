/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug1909/*)
#asset(qx/icon/Tango/48/places/*)
#asset(qx/icon/Tango/64/places/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug1909"
 */
qx.Class.define("bug1909.Application",
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

      // Create a button
      var button1 = new qx.ui.form.Button("Crash IE", "qx/icon/Tango/48/places/user-home.png");
      var button2 = new qx.ui.form.Button("Crash IE/FF", "qx/icon/Tango/48/places/user-desktop.png");
      doc.add(button1, {left: 100, top: 50});
      doc.add(button2, {left: 300, top: 50});

       button1.addListener("execute", function(e) {
         //THIS WILL MAKE IE7 CRASH
         iePic.setSource("qx/icon/Tango/64/places/folder.png");
       });

       button2.addListener("execute", function(e) {
         //THIS WILL MAKE FF CRASH
         ffPic.setSource("qx/static/blank.gif");
       });

       var iePic = new qx.ui.basic.Image('qx/icon/Tango/64/places/folder.png');
       doc.add(iePic, {left: 100, top: 150});

       var ffPic = new qx.ui.basic.Image('qx/icon/Tango/64/places/network-server.png');
       ffPic.set({
         width: 30,
         height: 30
       });
       ffPic.addListener("changeSource", function(e) { this.debug("load event fired"); });
       doc.add(ffPic, {left: 200, top: 150});
    }
  }
});
