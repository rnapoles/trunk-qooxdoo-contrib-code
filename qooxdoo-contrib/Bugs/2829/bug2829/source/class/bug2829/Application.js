/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2829/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2829"
 */
qx.Class.define("bug2829.Application",
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

      var button = new qx.ui.form.MenuButton("open");
      button.setToolTipText("Press me!");
      var menu = new qx.ui.menu.Menu();
      button.setMenu(menu);

      var menuButton = new qx.ui.menu.Button("button");
      menuButton.setToolTipText("tooltip");
      menu.add(menuButton);
      
      var button1 = new qx.ui.form.Button("First Button", "bug2829/test.png");
      var doc = this.getRoot();
      doc.add(button, {left: 100, top: 50});
    }
  }
});
