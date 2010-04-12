/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug1862/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug1862"
 */
qx.Class.define("bug1862.Application",
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

  // create scroll container
  var scroll = new qx.ui.container.Scroll().set({
    width: 300,
    height: 200
  });

  w = new qx.ui.core.Widget().set({
    width: 200,
    minWidth: 200,
    height: 400,
    minHeight : 400,
    maxHeight : 400,
    backgroundColor : "lime"
  });
  // add a widget which is larger than the container

scroll.add(w);

      var doc = this.getRoot();
			
      doc.add(scroll, {left: 100, top: 50});

      var btn = new qx.ui.form.Button("toggle size");
      btn.addListener("execute", function(){
        var h = (w.getHeight() <= 400 ? 600 : 400);
        w.set({
          height: h,
          minHeight : h,
          maxHeight : h
        });
      }, this);

      doc.add(btn, {left: 100, top: 10});
    }
  }
});
