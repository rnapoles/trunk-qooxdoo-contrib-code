/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2142/*)
#asset(qx/icon/Oxygen/16/apps/office-web.png)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2142"
 */
qx.Class.define("bug2142.Application",
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

      var win = new qx.ui.window.Window("First Button", "icon/16/apps/office-web.png");
      win.open();
      
      var doc = this.getRoot();
      doc.add(win, {left: 100, top: 50});
    }
  }
});
