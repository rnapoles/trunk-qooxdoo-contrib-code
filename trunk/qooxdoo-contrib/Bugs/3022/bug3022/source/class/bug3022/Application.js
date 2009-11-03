/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug3022/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug3022"
 */
qx.Class.define("bug3022.Application",
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
      doc.setBlockerColor("green");
      doc.setBlockerOpacity(0.3);
            
      doc.getBlocker().getBlockerElement().setStyle("cursor", "wait");
            
      var timer = new qx.event.Timer(4000);
      timer.addListener("interval", function()
      {
        if (doc.isBlocked()) {
          doc.unblock();
        } else {
          doc.block();
        }
      }, this);
      timer.start();
    }
  }
});
