/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug1181/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug1181"
 */
qx.Class.define("bug1181.Application",
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
     * 
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */


      // Document is the application root
      var doc = this.getRoot();
			
      // Add button to document at fixed coordinates

        var btnShow = new qx.ui.form.Button("Show window");
        btnShow.addListener("execute", function(event) {

    if (! this.wnd) {
        var wnd = new qx.ui.window.Window(this.tr("Cancel"));
        wnd.setLayout(new qx.ui.layout.Basic);
        wnd.setWidth(300);
        wnd.setHeight(200);
        this.wnd = wnd;

        var chk = new qx.ui.form.CheckBox(this.tr("Preview (Old/New)"));
        wnd.add(chk, {left : 10, top : 50});

        var btnCancel = new qx.ui.form.Button(this.tr("Cancel"));
        wnd.add(btnCancel, {left : 10, top : 100});
        btnCancel.addListener("execute", function(event) {
            this.wnd.hide();
        }, this);


    }
    this.wnd.show();

}, this);


      doc.add(btnShow, {left: 100, top: 50});

    }
  }
});
