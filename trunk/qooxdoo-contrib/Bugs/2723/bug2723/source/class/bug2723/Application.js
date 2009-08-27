/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2723/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2723"
 */
qx.Class.define("bug2723.Application",
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



         var win1 = new qx.ui.window.Window("test").set({
           width: 300,
           height: 200
            });

         win1.setLayout(new qx.ui.layout.VBox());

      // Add button to document at fixed coordinates
      this.getRoot().add(win1,
      {
              left : 100,
              top  : 50
      });

      var container = new qx.ui.container.Composite(new qx.ui.layout.VBox(20));

      var scroll = new qx.ui.container.Scroll(container);


      var inp = new qx.ui.form.SelectBox();
      inp.add(new qx.ui.form.ListItem("111", null, "NULL"));
      inp.add(new qx.ui.form.ListItem("222", null, "NULL"));
      inp.add(new qx.ui.form.ListItem("333", null, "NULL"));

      container.add(new qx.ui.basic.Label(""));
      container.add(new qx.ui.basic.Label(""));
      container.add(inp);
      for(var i=0; i < 10; i++)
      {
      container.add(new qx.ui.basic.Label(""));
      }
      win1.add(scroll);

      win1.open();


    }
  }
});
