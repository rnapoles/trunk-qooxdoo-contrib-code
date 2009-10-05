/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2876/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2876"
 */
qx.Class.define("bug2876.Application",
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

      var button1 = new qx.ui.form.Button("First Button", "bug2876/test.png");

      var doc = this.getRoot();
      doc.add(button1, {left: 100, top: 50});

      button1.addListener("execute", function(e) {
        alert("Standard mode: " + qx.bom.Document.isStandardMode());
        alert("document.compatMode: " + document.compatMode);
      });
    }
  }
});
