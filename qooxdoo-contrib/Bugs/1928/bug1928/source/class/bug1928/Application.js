/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug1928/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug1928"
 */
qx.Class.define("bug1928.Application",
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

      var textfield = new qx.ui.form.TextField();

      var win = new qx.ui.window.Window("Window");
      win.setModal(true);
      
      textfield.addListener("keypress", function(e) {
        if (e.getKeyIdentifier() == "Enter") {
          win.open()
        }
      }, this);
      
      var root = this.getRoot();
      root.add(textfield, {left: 50, top: 50});
      root.add(win, {left: 150, top: 150});
    }
  }
});
