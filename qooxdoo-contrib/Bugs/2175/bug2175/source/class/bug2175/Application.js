/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2175/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2175"
 */
qx.Class.define("bug2175.Application",
{
  extend : qx.application.Standalone,

  members :
  {
    widge : null,
    
    main : function()
    {
      this.base(arguments);

      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }

      var container = new qx.ui.container.Composite(new qx.ui.layout.VBox());
      this.getRoot().add(container, {edge: 0});
      
      var windowManager = new qx.ui.window.Manager();
      var desktop = new qx.ui.window.Desktop(windowManager).set({
        backgroundColor: "#ffffff",
        blockerColor: "red",
        blockerOpacity: 0.1
      });
      container.add(desktop, {flex: 1});
        
      for (var i = 0; i < 10; i++)
      {
        var win = new qx.ui.window.Window("Test window " + i).set(  
        {
          width: 200,
          height: 200
        });
        win.open();
        desktop.add(win, {top: 100 + 10 * i, left: 100 + 10 * i});
      }
      
      var button = new qx.ui.form.Button("lock/unlock desktop");
      button.addListener("execute", function(evt) {
        if (!desktop.isBlocked()) {
          desktop.block();
        } else {
          desktop.unblock();
        }
      }, this);
      container.add(button);
    }
  }
});
