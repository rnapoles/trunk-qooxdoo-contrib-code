/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2658/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2658"
 */
qx.Class.define("bug2658.Application",
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
      qx.locale.Manager.getInstance().setLocale("en");

      var toolbar = new qx.ui.toolbar.ToolBar();
      var menuPart = new qx.ui.toolbar.Part();
      toolbar.add(menuPart);      
      var toolbarButton = new qx.ui.toolbar.MenuButton(this.tr("Menu"));
      //var toolbarButton = new qx.ui.toolbar.MenuButton("short");
      menuPart.add(toolbarButton);
      
      this.toolbarButton = toolbarButton;
      
      var menu = new qx.ui.menu.Menu();
      var menuButton = new qx.ui.menu.Button(this.tr('some_key'));
      //var menuButton = new qx.ui.menu.Button("short");
      menu.add(menuButton);
      
      this.menuButton = menuButton;
      
      toolbarButton.setMenu(menu);
      
      this.getRoot().add(toolbar, {left: 10, top: 10});
      
      var languageButton = new qx.ui.form.Button(this.tr("Toggle Language"));
      languageButton.addListener("execute", this.__toggleLanguage, this);
      this.getRoot().add(languageButton, {left: 10, top: 40});
      
      this.menu = menu;
      
      this.menuButton.resetMaxWidth();
      
    },
    
    __toggleLanguage : function(ev)
    {
      var currentLanguage = qx.locale.Manager.getInstance().getLocale();
      if (currentLanguage == "en") {
        qx.locale.Manager.getInstance().setLocale("de");
      }
      else {
        qx.locale.Manager.getInstance().setLocale("en");
      }
    }
  }
});
