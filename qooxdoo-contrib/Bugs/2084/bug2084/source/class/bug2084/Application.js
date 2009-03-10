/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2084/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2084"
 */
qx.Class.define("bug2084.Application",
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

      this._testWin = new bug2084.MyWindow();

      // Create a button
      var button1 = new qx.ui.form.Button("TestWin");

      // Add button to document at fixed coordinates
      var root = this.getRoot();
      root.add(button1, {left: 100, top: 50});

      // Add an event listener
      button1.addListener("execute", function(e) {
        this._testWin.open();
      }, this);
    }
  }
});
