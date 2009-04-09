/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2226/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2226"
 */
qx.Class.define("bug2226.Application",
{
  extend : qx.application.Inline,

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

      var custfield = document.getElementById("ordercustomer");
      var inlineCust = new qx.ui.root.Inline(custfield);
      var cust = new qx.ui.form.SelectBox();
      inlineCust.add(cust, {left:0, top:0});

      // Populate the SelectBox widget with test data...
      for (var tr=0; tr<5; tr++)
      {
        var item = new qx.ui.form.ListItem("Test Stuff"+tr, null, "" + tr);
        cust.add(item);
      }
    }
  }
});
