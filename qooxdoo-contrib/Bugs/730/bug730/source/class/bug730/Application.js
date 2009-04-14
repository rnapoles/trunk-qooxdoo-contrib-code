/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug730/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug730"
 */
qx.Class.define("bug730.Application",
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


            var d = this.getRoot();


             var m2 = new bug730.Menu();

             for (var i=1; i<45; i++) {
               m2.add(new qx.ui.menu.Button("Item #" + i))
             }

             d.add(m2, {left: 10, top : 20})

//             console.log(m2.measureHeight());

             var m1 = new qx.ui.menu.Menu;

             var mb1_01 = new qx.ui.menu.Button("View/Lists");
             var mb1_02 = new qx.ui.menu.Button("Syntax Highlighting");
             var ms1    = new qx.ui.menu.Separator();
             var mb1_03 = new qx.ui.menu.Button("Window Font");
             var mb1_04 = new qx.ui.menu.Button("Printer Font");
             var ms2    = new qx.ui.menu.Separator();
             var mb1_14 = new qx.ui.menu.Button("View", null, null, m2);

             m1.add(mb1_01);
             m1.add(mb1_02);
             m1.add(ms1);
             m1.add(mb1_03);
             m1.add(mb1_04);
             m1.add(ms2);
             m1.add(mb1_14);

             d.add(m1, {left: 200, top : 20});


             var w1 = new qx.ui.form.Button("Open");


             w1.addListener("click", function(e)
             {
               m1.setOpener(w1);
               m1.open();
               e.stopPropagation();
             });

             w1.addListener("mousedown", function(e)
             {
               e.stopPropagation();
             });


             d.add(w1, {left: 10, top : 100});


    }
  }
});
