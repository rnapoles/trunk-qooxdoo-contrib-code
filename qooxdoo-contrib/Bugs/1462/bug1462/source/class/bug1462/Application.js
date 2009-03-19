/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug1462/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug1462"
 */
qx.Class.define("bug1462.Application",
{
  extend : qx.application.Inline,
  //extend : qx.application.Standalone,

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

      var button = new qx.ui.form.Button("button")
      
      var win = new qx.ui.window.Window("First Window");
      win.setWidth(300);
      win.setHeight(50);
      win.open();
      
      button.addListener("execute", function(e)
      {
        var doc = this.getRoot();
        var test = new qx.ui.window.Window("test").set({modal: true});
        test.open();
        doc.add(test, {left: 200, top: 200});
      }, this);
      
      var doc = this.getRoot();
      doc.add(button, {left: 100, top: 100});
      doc.add(win, {left: 20, top: 20});
    }
  }
});
