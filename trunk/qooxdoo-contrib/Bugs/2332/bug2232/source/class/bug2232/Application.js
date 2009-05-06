/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2232/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2232"
 */
qx.Class.define("bug2232.Application",
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

      var selectBox = new qx.ui.form.SelectBox()

      for (var i = 0; i < 10; i++) {
        var item = new qx.ui.form.ListItem("ListItem" + i);
        selectBox.add(item);
      }
            

      var button = new qx.ui.form.Button("Remove All");
      
      button.addListener("execute", function() {
        selectBox.removeAll();
      });
      
      var doc = this.getRoot();
      doc.add(selectBox, {left: 100, top: 50});
      doc.add(button, {left: 300, top: 50});
    }
  }
});