/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(rpcconsole.demo/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "rpcconsole"
 */
qx.Class.define("rpcconsole.demo.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    
    desktop   : null,
    counter   : 1,
    serverUrl : "../../../../../RpcPhp/1.0.1/services/index.php",
    
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
        Console Desktop
      -------------------------------------------------------------------------
      */

      /*
       * main layout
       */
      var mainLayout = new qx.ui.container.Composite( new qx.ui.layout.VBox() );
      this.getRoot().add(mainLayout, {edge: 0});
      
      /*
       * menu bar
       */
      var toolbar = new qx.ui.toolbar.ToolBar();
      var createWindowButton = new qx.ui.toolbar.Button("Create RPC Console");
      createWindowButton.addListener("execute", this.createRpcConsole, this);
      toolbar.add(createWindowButton);
      mainLayout.add( toolbar );
         
      /*
       * desktop
       */
      var windowManager = new qx.ui.window.Manager();
      this.desktop = new qx.ui.window.Desktop(windowManager).set({
        decorator: "main", 
        backgroundColor: "background-pane"
      });
      mainLayout.add(this.desktop, { flex: 1});
      
      /*
       * create initial window
       */
      this.createRpcConsole();
    },
    
    
    /**
     * Create a window with an Rpc Console
     */
    createRpcConsole : function()
    {
 
      /*
       * window
       */
      var win = new qx.ui.window.Window("RPC console #" + this.counter++).set({
        width        : 500,
        height       : 500,
        showClose    : false,
        showMinimize : false
      });
      win.setLayout( new qx.ui.layout.Grow() );
      this.desktop.add( win, {
        left         : this.counter * 30,
        top          : this.counter * 30      
      });
      
      /*
       * console
       */
      var console = new rpcconsole.RpcConsole( this.serverUrl );      
      win.add(console);

      /*
       * finish
       */
      win.open();

    }
  }
});
