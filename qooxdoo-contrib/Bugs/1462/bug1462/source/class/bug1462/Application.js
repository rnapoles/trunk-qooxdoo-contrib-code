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

      var win = new qx.ui.window.Window("First Window");
      win.setWidth(300);
      win.setHeight(50);
      win.open();
      
      var doc = this.getRoot();
      doc.add(win, {left: 20, top: 20});
    }
  }
});
