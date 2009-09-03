/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2748/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2748"
 */
qx.Class.define("bug2748.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     */
    main : function()
    {
      this.base(arguments);

      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }

      var button1 = new qx.ui.form.Button("First Button");

      var cbOil = new qx.ui.form.CheckBox("Sun Oil");
      var rbOil = new qx.ui.form.RadioButton("Sun Oil");
      
      var doc = this.getRoot();
      doc.add(button1, {left: 100, top: 50});
      doc.add(cbOil, {left: 100, top: 150});
      doc.add(rbOil, {left : 100, top: 170});
      
      button1.addListener("execute", function(e) {
        cbOil.setEnabled(!cbOil.getEnabled());
        rbOil.setEnabled(!rbOil.getEnabled());
      });
    }
  }
});
