/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2191/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2191"
 */
qx.Class.define("bug2191.Application",
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

      var manager = new qx.ui.form.RadioButton("Manager");
      manager.setValue("v1");
      
      var client = new qx.ui.form.RadioButton("Client");
      client.setValue("v2");
      
      var mgr = new qx.ui.form.RadioGroup;
      
      mgr.addListener("changeValue", function(e) {
        this.debug("changeValue: " + e.getData());
      }, this);
      
      mgr.addListener("changeSelected", function(e) {
        this.debug("changeSelected: " + e.getData());
      }, this);
            
      mgr.add(manager, client);
      
      var doc = this.getRoot();
      doc.add(manager, {left: 100, top: 50});
      doc.add(client, {left: 100, top: 80});
    }
  }
});
