/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2412/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2412"
 */
qx.Class.define("bug2412.Application",
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


var container = new qx.ui.container.Composite(new qx.ui.layout.Canvas()).set({width : 400, maxHeight : 0});

// stretch vertically with 10 pixel distance to the parent's top
// and bottom border
container.add(new qx.ui.core.Widget().set({backgroundColor : "blue"}), {top: 10, left: 10, bottom: 10});

// percent positioning and size
container.add(new qx.ui.core.Widget().set({backgroundColor : "green"}), {left: "50%", top: "50%", width: "25%", height: "40%"});


      // Document is the application root
      var doc = this.getRoot();
			
      // Add button to document at fixed coordinates
      doc.add(container, {left: 100, top: 50});
    }
  }
});
