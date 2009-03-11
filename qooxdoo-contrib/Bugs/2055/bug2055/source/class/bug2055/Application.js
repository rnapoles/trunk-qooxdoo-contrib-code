/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2055/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2055"
 */
qx.Class.define("bug2055.Application",
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

      /* Code to reproduce bug */  
      var win = new qx.ui.window.Window("First Button").set({
        useResizeFrame: false
      });

      win.open();
      
      var doc = this.getRoot();
      doc.add(win, {left: 100, top: 50});
      /* end */
      
      /* Test with desktop *
      var split = new qx.ui.splitpane.Pane("horizontal");
      this.getRoot().add(split, {edge: 0}); 
      
      split.add(new qx.ui.form.TextField(), 0);
      
      var desktop = new qx.ui.window.Desktop(new qx.ui.window.Manager());
      split.add(desktop, 1);
      
      var win = new qx.ui.window.Window("Window").set({
        useResizeFrame: false
      });
      desktop.add(win);
      win.open();
      /* end */
    }
  }
});
