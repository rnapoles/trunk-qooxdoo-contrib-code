/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2981/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2981"
 */
qx.Class.define("bug2981.Application",
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

      var doc = this.getRoot();

      var field1 = new qx.ui.form.TextField();
      field1.focus();
      
      var field2 = new qx.ui.form.TextField();
      
      var blocker = new qx.ui.core.Blocker(doc);
      blocker.setColor("red");
      blocker.setOpacity(0.3);
      
      var btn = new qx.ui.form.Button("Block me");
      btn.addListener("execute", function(e){
        blocker.block();
        doc.setCursor("wait");
      }, this);
      
      doc.add(field1, {top: 20, left: 20});
      doc.add(field2, {top: 120, left: 20});
      doc.add(btn, {top: 220, left: 20});
      
      var timer = new qx.event.Timer(4000);
      timer.addListener("interval", function(e) {
        if (blocker.isBlocked()) {
          blocker.unblock();
          doc.setCursor("default");
        }
      }, this);
      timer.start();
    }
  }
});
