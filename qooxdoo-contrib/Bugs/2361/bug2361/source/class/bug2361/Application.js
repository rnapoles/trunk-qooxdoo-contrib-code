/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2361/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2361"
 */
qx.Class.define("bug2361.Application",
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

      var textarea = new qx.ui.form.TextArea; //new bug2361.TextArea;
      textarea.setMaxLength(10);
			
      doc.add(textarea, {left: 100, top: 50});

    }
  }
});
