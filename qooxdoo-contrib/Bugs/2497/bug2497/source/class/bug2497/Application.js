/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2497/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2497"
 */
qx.Class.define("bug2497.Application",
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

      // Create a button
      var button1 = new qx.ui.form.Button("Start effect");

      qx.log.appender.Console.show();

      // Document is the application root
      var doc = this.getRoot();
			
      // Add button to document at fixed coordinates
      doc.add(button1, {left: 100, top: 50});


      var element = document.getElementById('testDiv');
      var effect = new qx.fx.effect.core.Move(element);
      effect.set({
        x : 100,
        y : 200
      });

      effect.addListener("finish", function(e){
        element.parentNode.removeChild(element);
        this.debug("Removed element.")
      });


      // Add an event listener
      button1.addListener("execute", function(e) {
        effect.start();
        this.debug("Effect started.");
        button1.setEnabled(false);
      });




    }
  }
});
