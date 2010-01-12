/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug3272/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug3272"
 */
qx.Class.define("bug3272.Application",
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

      var selectBox = new qx.ui.form.SelectBox();
      selectBox.add(new qx.ui.form.ListItem("Item1"));
      selectBox.add(new qx.ui.form.ListItem("Item2"));
      
      selectBox.getChildrenContainer().setSelectionMode("single");
      
      var button = new qx.ui.form.Button("reset");
      
      var doc = this.getRoot();
      doc.add(selectBox, {left: 100, top: 50});
      doc.add(button, {left: 100, top: 100});
      
      button.addListener("execute", function(e) {
        selectBox.resetSelection();
      });
    }
  }
});
