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


             var m1 = new bug730.Menu();

             for (var i=1; i<45; i++) {
               m1.add(new qx.ui.menu.Button("Item #" + i))
             }

             d.add(m1, {left: 200, top : 20});


             var w1 = new qx.ui.form.Button("Open");

             w1.addListenerOnce("move", function(){
               m1.setOpener(w1);
               m1.open();
             }, this)


             d.add(w1, {left: 10, top : 100});

    }
  }
});
