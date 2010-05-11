/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug3689/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug3689"
 */
qx.Class.define("bug3689.Application",
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

      // Document is the application root
      var doc = this.getRoot();

qx.core.Setting.set("qx.nativeScrollBars", "on");

var selectBox = new qx.ui.form.SelectBox();
for (var i=0; i<30; i++)
{
  var tempItem = new qx.ui.form.ListItem("Item " + (i+1));
  selectBox.add(tempItem);
}



      // Add button to document at fixed coordinates
      doc.add(selectBox, {left: 100, top: 50});

    }
  }
});
