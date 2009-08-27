/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(testoptvar/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "testoptvar"
 */

qx.Class.define("testoptvar.Application",
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

      var button1 = new qx.ui.form.Button("First Button");
      var doc = this.getRoot();
      doc.add(button1, {left: 100, top: 50});
      var test = new qx.ui.form.Button("Just a test");

      button1.addListener("execute", function(e) {
	doc.add(test, {left: 150, top: 150});
        alert("Hello World!");
      });
    }
  }
});
