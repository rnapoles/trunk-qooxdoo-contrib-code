/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2046/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2046"
 */
qx.Class.define("bug2046.Application",
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

      var comboBox = new qx.ui.form.ComboBox();
      //comboBox.setSelectFirstItem(false);
	  
      for (var i = 0; i < 10; i++)
      {
        comboBox.add(new qx.ui.form.ListItem("Item " + i));
      }

      var doc = this.getRoot();
      doc.add(comboBox, {left: 100, top: 50});
    }
  }
});
