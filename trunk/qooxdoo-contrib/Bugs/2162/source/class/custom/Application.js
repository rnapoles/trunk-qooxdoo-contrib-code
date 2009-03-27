/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(custom/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "2162"
 */
qx.Class.define("custom.Application",
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

      var b = new custom.B();
      b.setEnabled(true);      
    }
  }
});



qx.Class.define("custom.A",
{
  extend : qx.core.Object,
  
  properties : {
    enabled : {}
  }
});

a = new custom.A();

qx.Interface.define("custom.IForm",
{
  members : {
    setEnabled : function(value) {},
  }
});

qx.Class.define("custom.B", 
{
  extend : custom.A,
  implement : custom.IForm
});
