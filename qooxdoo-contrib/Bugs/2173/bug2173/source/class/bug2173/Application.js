/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2173/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2173"
 */
qx.Class.define("bug2173.Application",
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

      var root = this.getRoot();
      root.setBlockerColor("red");
      root.setBlockerOpacity(0.1);
      
      var button = new qx.ui.form.Button("Block");
      button.addListener("execute", function(evt) {
        this.getRoot().block();
      }, this);
      root.add(button, {left: 200, top: 200});
    }
  }
});
