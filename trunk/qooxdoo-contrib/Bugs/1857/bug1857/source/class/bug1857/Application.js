/* ************************************************************************

#asset(bug1857/*)
#asset(qx/icon/Tango/32/actions/help-about.png)

************************************************************************ */
qx.Class.define("bug1857.Application",
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

      var button1 = new qx.ui.form.Button("First Button", "bug1857/test.png");

      var doc = this.getRoot();
      doc.add(button1, {bottom: 0, right: 0});

      button1.addListener("execute", function(e) {
        alert("Hello World!");
      });
      
      button1.setToolTip(new qx.ui.tooltip.ToolTip("Such a great tooltip with a (show) timeout of 50ms.", "icon/32/actions/help-about.png"));
    }
  }
});
