/* ************************************************************************
#asset(bug2230/*)
************************************************************************ */
qx.Class.define("bug2230.Application",
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

      var toolbar = new qx.ui.toolbar.ToolBar();
      var textfield1 = new qx.ui.form.TextField();
      var textfield2 = new qx.ui.form.TextField();
      toolbar.add(textfield1);
      
      var doc = this.getRoot();
      doc.add(toolbar, {left: 100, top: 50, right: 100});
      doc.add(textfield2, {left: 250, top: 55});
    }
  }
});
