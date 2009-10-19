qx.Class.define("bug2912.Application",
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

      var doc = this.getRoot();
      
      /*
       * window with desktop
       */ 
      var desktop = new qx.ui.window.Desktop(new qx.ui.window.Manager());
      doc.add(desktop, {edge: 100});
      
      var win = new qx.ui.window.Window("Test Window");
      win.open();

      win.addListener("minimize", this.logEvent, this);
      win.addListener("maximize", this.logEvent, this);
      win.addListener("restore", this.logEvent, this);
      win.addListener("close", this.logEvent, this);

      desktop.add(win);
      
      /*
       * buttons for window
       */ 
      var buttons = new qx.ui.container.Composite(new qx.ui.layout.HBox(8));
      doc.add(buttons, {left: 50, top: 50})
      
      var open = new qx.ui.form.Button("open");
      buttons.add(open);
      open.addListener("execute", function(e) {
        win.open();
      }, this);
      
      var close = new qx.ui.form.Button("close");
      buttons.add(close);
      close.addListener("execute", function(e) {
        win.close();
      }, this);
      
      var minimize = new qx.ui.form.Button("minimize");
      buttons.add(minimize);
      minimize.addListener("execute", function(e) {
        win.minimize();
      }, this);
      
      var maximize = new qx.ui.form.Button("maximize");
      buttons.add(maximize);
      maximize.addListener("execute", function(e) {
        win.maximize();
      }, this);
      
      var restore = new qx.ui.form.Button("restore");
      buttons.add(restore);
      restore.addListener("execute", function(e) {
        win.restore();
      }, this);
    },
    
    logEvent : function(e) {
      this.debug("Event " + e.getType());
    }
  }
});
