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
    lastCreatedConsole : null,
    _activeConsole : null,
    
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
       * GET parameters
       */
      var s = window.location.search.substring(1).split('&');
      if(!s.length) return;
      var c = {};
      for(var i  = 0; i < s.length; i++)  {
          var parts = s[i].split('=');
          c[unescape(parts[0])] = unescape(parts[1]);
      }
      window.location.parameters = c; 

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

      var testsMenuButton = new qx.ui.toolbar.MenuButton("Tests");
      testsMenuButton.setShowArrow(true);
      testsMenuButton.setMenu( this.createTestsMenu() );
      toolbar.add(testsMenuButton);
      
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
       * get server url from get parameter or property
       */
      if ( window.location.parameters.serverUrl )
      {
        var serverUrl = window.location.parameters.serverUrl;
      } 
      else
      {
        var serverUrl = this.serverUrl;
      }
      
      /*
       * console
       */
      var console = new rpcconsole.RpcConsole( serverUrl );      
      win.add(console);
      win.addListener("changeActive",function(e){
        if (e.getData())
        {
          this._activeConsole = console;
        }
      },this);

      /*
       * finish
       */
      win.open();

    },
    
    /**
     * Returns the consolein the currently active window
     * @return {rpcconsole.RpcConsole}
     */
    getActiveConsole : function()
    {
      return this._activeConsole;
    },
    

    /**
     * Create a menu with various tests for the demo application
     */
    createTestsMenu : function()
    {
      var menu = new qx.ui.menu.Menu();
      var testData = this.getTestData();
      testData.forEach( function(data){
        var button = new qx.ui.menu.Button( data.label );
        button.addListener("execute", function(){
          if ( this._activeConsole )
          {
            this._activeConsole.sendRequest( data.requestData, data.callback, this);
          }
        }, this);
        menu.add(button);        
      },this);
      return menu;      
    },

    
    /**
     * Returns the test data. Override with your own implementation
     * @return {Object}
     */
    getTestData : function()
    {
      return this.testdata;
    },
    
    /**
     * Test data
     */
    testdata : 
    [
      {
        label : "Use RpcPhp trunk server ",
        requestData : {
          url : "../../../../../RpcPhp/trunk/services/index.php"
        }
      },
      {
        label : "Use RpcPhp 1.0.1 server ",
        requestData : {
          url : "../../../../../RpcPhp/1.0.1/services/index.php"
        }
      },        
      {
        label       : "qooxdoo.test.echo - Send a simple 'hello world' message to be echoed by the server.", 
        requestData : {
          service : "qooxdoo.test",
          method : "echo",
          params : ["Hello World!"],
          serverData : {
            authentication : {
              username : "Foo",
              password : "Bar"
            }
          }
        }
      },
      
      /*
       * custom test
       */
      {
        label : "Custom test: Authenticate against qcl backend",
        requestData : {
          url     : "http://localhost:8080/Bibliograph/bibliograph-2.0/bibliograph/services/server.php", 
          service : "bibliograph.controller.Authentication",
          method : "authenticate",
          params : [null]
        },
        callback : function( response ){
          this.getActiveConsole().getRequestModel().setServerData({
            sessionId : response.result.data.sessionId
          });
        }
      },
      
      /*
       * Custom Test: qcl service introspection
       */
      {
        label : "Custom test: qcl service introspection",
        requestData : {
          url     : "http://localhost:8080/Bibliograph/bibliograph-2.0/bibliograph/services/server.php", 
          service : "bibliograph.controller.Authentication",
          method : "listMethods",
          params : []
        },
        callback : function( response ){
          var methods = response.result.data;
          var methodComboBox = this.getActiveConsole()._methodComboBox;
          methodComboBox.removeAll();
          methods.forEach( function(method) {
            methodComboBox.add ( new qx.ui.form.ListItem(method) );
          }, this);
        }
      }      
    ]
  }
});
