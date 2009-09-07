/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2602/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2602"
 */
qx.Class.define("bug2602.Application",
{
  extend : qx.application.Standalone,

  members :
  {
    main : function()
    {
      this.base(arguments);

      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }

      var quantifyText = new qx.ui.form.TextField();
      quantifyText.setValue("abcdefg");

      quantifyText.addListener("keypress", function(e)
      {
        this.debug("keypress");
      }, this);

      var doc = this.getRoot();
      doc.add(quantifyText, {left: 100, top: 50});
      
      
      /*var timer = new qx.event.Timer(1000);
      timer.addListener("interval", function()
      {
        var focusHandler = qx.ui.core.FocusHandler.getInstance();
        
        this.debug("getActiveWidget: " + focusHandler.getActiveWidget());
        this.debug("getFocusedWidget: " + focusHandler.getFocusedWidget());
        
      }, this);
      timer.start();*/
    }
  }
});
