/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug3331/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug3331"
 */
qx.Class.define("bug3331.Application",
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

      var dashboard = new qx.ui.container.Composite()
      dashboard.setLayout(new qx.ui.layout.Canvas());
      
      var tabView = new qx.ui.tabview.TabView();
      dashboard.add(tabView, {top: 10, edge:0});
      
      var page = new qx.ui.tabview.Page("Tab1");
      page.setLayout(new qx.ui.layout.Grow());
      tabView.add(page);
      
      var windowManager = new qx.ui.window.Manager();
      var desktop = new qx.ui.window.Desktop(windowManager);
      page.add(desktop);
      
      var windows = [];
      var blockers = [];
      for(var i = 0; i < 10; i++) 
      {
        this.debug(i);
        var win = new qx.ui.window.Window("Window: " + i).set(
        {
          width: 110,
          height: 100,
          layout: new qx.ui.layout.Canvas()
        });
        
        if (i < 5) {
          desktop.add(win, {top: 50 + (i % 5 * 100), left: 50 + (i % 5 * 110)});
        } else {
          desktop.add(win, {top: 50 + (i % 5 * 100), left: 200 + (i % 5 * 110)});
        }
        
        var textField = this.__textField = new qx.ui.form.TextField();
        textField.focus();
        win.add(textField);        
        win.open();
        windows[windows.length] = win;
      }
        
      var btnBlock = new qx.ui.form.Button("Block");
      btnBlock.addListener("execute", function()
      {
        for(var i = 0; i < windows.length; i++)
        {
          var blocker = new qx.ui.core.Blocker(windows[i]).set(
          {
            opacity: 0.2,
            color: "black"
          });
          blockers.push(blocker);
          this.__textField.focus();
          blocker.block();
        }
      }, this);
      
      var btnUnBlock = new qx.ui.form.Button("UnBlock");
      btnUnBlock.addListener("execute", function()
      {
        for(var i = 0; i < blockers.length; i++) {
          blockers[i].unblock();
        }
      }, this);
    
      desktop.add(btnBlock, {top: 0, left: 0});
      desktop.add(btnUnBlock, {top: 0, left: 100});
      
      this.getRoot().add(dashboard, {left: "1%", top: "1%", width:"98%", height:"98%"});
    }
  }
});
