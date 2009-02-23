/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug1800/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug1800"
 */
qx.Class.define("bug1800.Application",
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

      var checkBox1 = new qx.ui.form.CheckBox("First CheckBox");
      var checkBox2 = new qx.ui.form.CheckBox("Second CheckBox");
      var checkBox3 = new qx.ui.form.CheckBox("Third CheckBox");
      
      var doc = this.getRoot();
      doc.add(checkBox1, {left: 100, top: 50});
      doc.add(checkBox2, {left: 100, top: 70});
      doc.add(checkBox3, {left: 100, top: 90});
      doc.add(new qx.ui.form.Button("test"), {left: 100, top: 120});
    }
  }
});
