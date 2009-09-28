/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(custom/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "themed_iframe"
 */
qx.Class.define("custom.Application",
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

      var sub = new qx.ui.menu.Menu();
      sub.add(new qx.ui.menu.Button("Juhu"));
      
      this.getRoot().add(this.createMenuButton("menu1", sub), {left: 10, top: 40});
      this.getRoot().add(this.createMenuButton("menu2", sub), {left: 200, top: 40});
    },
    
    
    createMenuButton : function(label, sub)
    {
      var menu = new qx.ui.menu.Menu();
      menu.add(new qx.ui.menu.Button(label, "", null, sub));
      
      var btn = new qx.ui.form.MenuButton(label, "", menu);
      return btn;
    }
  }
});
