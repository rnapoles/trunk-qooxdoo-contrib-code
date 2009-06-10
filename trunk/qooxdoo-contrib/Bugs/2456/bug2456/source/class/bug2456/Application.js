/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2456/*)

************************************************************************ */

qx.Class.define("bug2456.Application",
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

      //var comboBox = new qx.ui.form.ComboBox();
      var comboBox = new qx.ui.form.SelectBox();

      for (var i = 0; i < 10; i++) 
      {
        var listItem = new qx.ui.form.ListItem("ListItem"+ i);

        if (i == 7) {
          listItem.setEnabled(false);
        }
        
        if (i % 3 == 0) {
          listItem.setVisibility("excluded");
        }
        
        comboBox.add(listItem); 
      }
      
      var doc = this.getRoot();
      doc.add(comboBox, {left: 100, top: 50});
    }
  }
});
