/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(mdi.demo/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "mdi"
 */
qx.Class.define("mdi.demo.Application",
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
       * Startup of the application
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

        this.initialiseGUI();

      },


      /**
       * Construct and render the top level GUI widgets.
       */
      initialiseGUI : function()
      {

          // Create Top Level Layout
          var layout = new qx.ui.container.Composite(new qx.ui.layout.VBox());
          this.getRoot().add(layout, {top: 0, left: 0, bottom: 0, right: 0});


          var builder = mdi.demo.Builder.getInstance();


          // Create Desktop before Toolbar, because Toolbar expects Desktop to exist
          var desktop = this.__dt = new mdi.ui.window.Desktop();
          desktop.setPositioner(new mdi.ui.window.position.CascadeStrategy(desktop));

          // Create Dock
          var dock = this.__d = new mdi.ui.window.Dock();
          dock.set({
              marginBottom : 0,  // Position dock at bottom of layout
              height : 28  // Maintain height even when dock is empty
          });

          // Create window manager
          var manager = this.__wm = new mdi.ui.window.Manager();
              manager.addRenderer(desktop);
              manager.addRenderer(dock);


          // Create application Toolbar
          var toolbar = this.__tb = builder.getToolbar();

          // Create application Toolbar
          var titlebar = this.__tt = builder.getTitlebar();

          // Layout gui
          layout.add(titlebar);
          layout.add(toolbar);
          layout.add(desktop, {flex : 1});
          layout.add(dock);
      },


      /**
       * @return {qx.ui.window.Manager} The application window manager.
       */
      getWindowManager : function()
      {
          return this.__wm;
      },


      /**
       * @return {qx.ui.toolbar.ToolBar} The application toolbar.
       */
      getToolbar : function()
      {
          return this.__tb;
      },


      /**
       * @return {qx.ui.window.Desktop} The application desktop.
       */
      getDesktop : function()
      {
          return this.__dt;
      },


      /**
       * @return {qx.ui.toolbar.ToolBar} The application dock.
       */
      getDock : function()
      {
          return this.__d;
      }

    }

});
