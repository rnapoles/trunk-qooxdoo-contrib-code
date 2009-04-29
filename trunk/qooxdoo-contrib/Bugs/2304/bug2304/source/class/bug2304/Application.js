/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2304/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2304"
 */
qx.Class.define("bug2304.Application",
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

      qx.log.appender.Console.show();

      // Document is the application root
      var doc = this.getRoot();
      
      var textarea = new qx.ui.form.TextArea();
			
      var textfield = new qx.ui.form.TextField();
			
      doc.add(textarea, {left: 10, top: 10});

      doc.add(textfield, {left: 10, top: 90});

      textarea.addListener("input", this.__logEvent, this);
      textfield.addListener("input", this.__logEvent, this);
    },
    
    __logEvent : function(e) {
      this.debug("input event: " + e + " | input data: " + e.getData());
    }

  }
});
