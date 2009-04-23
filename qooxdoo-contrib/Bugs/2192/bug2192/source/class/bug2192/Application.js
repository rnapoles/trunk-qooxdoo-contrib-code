/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2192/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2192"
 */
qx.Class.define("bug2192.Application",
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

      var container=new qx.ui.container.Composite(new qx.ui.layout.VBox());
      this.getRoot().add(container,{edge:0});
      for (var i=0;i<50;i++)  {
        container.add(new qx.ui.form.TextField);        
      }

    }
  }
});
