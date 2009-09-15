/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2766/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2766"
 */
qx.Class.define("bug2766.Application",
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

      var button1 = new qx.ui.form.Button("First Button", "bug2766/test.png");

      var doc = this.getRoot();
      doc.add(button1, {left: 100, top: 50});

      doc.setBlockerColor("grey");
      doc.setBlockerOpacity(0.5);
      
      button1.addListener("execute", function(e) {
        doc.block();
        
        qx.event.Timer.once(function() {
          this.unblock();
        }, doc, 2000);
      });
    }
  }
});
