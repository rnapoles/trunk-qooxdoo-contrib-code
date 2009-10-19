/* ************************************************************************

#asset(bug2925/*)

************************************************************************ */

qx.Class.define("bug2925.Application",
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

      var listbox = new qx.ui.form.SelectBox();
      listbox.setRich(true);
      
      for (var i = 0; i < 10; i++)
      {
        var item = new qx.ui.form.ListItem();
        item.setRich(true);
        item.setLabel("<span style='color:red'>" + i + "</span>");
        listbox.add(item);
      }
      
      doc.add(listbox, {left:50, top: 50, right: 50});
    }
  }
});
