/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2713/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2713"
 */
qx.Class.define("bug2713.Application",
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
      this.base(arguments);

      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }

      var popup = new qx.ui.window.Window("Test").set({modal: true});

      var doc = this.getRoot();
      doc.set(
      {
        blockerColor: "red", 
        blockerOpacity: 0.25
      });
      
      doc.add(new qx.ui.basic.Label("please click anywhere"), {edge:50});
      
      doc.addListener("mouseup", function()
      {
        this.debug("mouseup"); 
        popup.open();
      }, this);
      
      //doc.block();
    }
  }
});
