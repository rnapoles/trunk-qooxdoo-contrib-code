/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2941/*)

************************************************************************ */

qx.Class.define("bug2941.Application",
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

      var button1 = new qx.ui.form.ToggleButton("First Button", "bug2941/test.png");

      var doc = this.getRoot();
      doc.add(button1, {left: 100, top: 50});

      button1.addListener("execute", function(e) {
        this.debug("execute");
      }, this);
    }
  }
});
