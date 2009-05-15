/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2379/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2379"
 */
qx.Class.define("bug2379.Application",
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

      var button1 = new qx.ui.form.Button("resize");
      doc.add(button1, {left: 50, top: 50});
      button1.addListener("execute", function(e) {
        window.resizeTo(600, 800);
      });

      var textarea = new qx.ui.form.TextArea().set({
        width : 400,
        height : 100
      });
      doc.add(textarea, {left: 50, top: 100});

      var button2 = new qx.ui.form.Button("get dimensions");
      doc.add(button2, {left: 200, top: 50});
      button2.addListener("execute", function(e) {
        textarea.setValue(
          qx.bom.Document.getWidth() + " | " +
          qx.bom.Document.getHeight()
        );
      });


    }
  }
});
