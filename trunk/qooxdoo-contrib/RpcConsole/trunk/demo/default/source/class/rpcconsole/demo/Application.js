/* ************************************************************************

   Copyright:
     2009 Christian Boulanger
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************

#asset(rpcconsole.demo/*)
#ignore(testName)
#require(qx.ui.form.ListItem)

************************************************************************ */

/**
 * A demo of the RpcConsole. This is a scriptable test client for your JSON-RPC
 * backend. Example test data is loaded from script/rpcconsole.testData.js, but
 * you can override this with adding '?testDataUrl=http://path/to/my/testData.js' 
 * to the build or source URL of this app. To change the default server url,
 * add '?serverUrl=http://path/to/my/server/'   
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
    
    /*
    -------------------------------------------------------------------------
      PUBLIC MEMBERS
    -------------------------------------------------------------------------
    */
    desktop   : null,
    counter   : 1,
    serverUrl : "../../../../../RpcPhp/1.0.1/services/index.php",
    testDataUrl : "script/rpcconsole.testData.js",

    /*
    -------------------------------------------------------------------------
      PRIVATE MEMBERS
    -------------------------------------------------------------------------
    */        
    __activeConsole : null,
    __testData : null,
    __testsMenu : null,

    /*
    -------------------------------------------------------------------------
      STARTUP
    -------------------------------------------------------------------------
    */    
    
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
       * GET parameters
       */
      var s = window.location.search.substring(1).split('&');
      if(!s.length) {
        return;
      }
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
      mainLayout.add( toolbar );
      
      /*
       * button to create a new console
       */
      var createWindowButton = new qx.ui.toolbar.Button("Create RPC Console");
      createWindowButton.addListener("execute", this.createRpcConsole, this);
      toolbar.add(createWindowButton);
      
      /*
       * menu with tests
       */
      var testsMenuButton = new qx.ui.toolbar.MenuButton("Tests");
      testsMenuButton.setShowArrow(true);
      var menu = this.getTestsMenu();
      var testData = this.getTestData();
      this.populateMenu( menu, testData );
      testsMenuButton.setMenu( menu );
      toolbar.add(testsMenuButton);
               
      /*
       * desktop
       */
      var windowManager = new qx.ui.window.Manager();
      this.desktop = new qx.ui.window.Desktop(windowManager).set({
        decorator: "main", 
        backgroundColor: "background-pane"
      });
      mainLayout.add(this.desktop, { flex: 1 });
      
      /*
       * create initial window
       */
      this.createRpcConsole();
      
      /*
       * load initial test data
       */
      var testDataUrl = window.location.parameters.testDataUrl || this.testDataUrl;
      if ( testDataUrl )
      {
        this.loadTestData( testDataUrl );
      }
    },
    
    /*
    -------------------------------------------------------------------------
      PUBLIC API
    -------------------------------------------------------------------------
    */    
    
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
          this.__activeConsole = console;
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
      return this.__activeConsole;
    },
    
    /**
     * Returns a menu instance that is used for the tests
     * @return {qx.ui.menu.Menu}
     */
    getTestsMenu : function()
    {
      if ( ! this.__testsMenu )
      {
        this.__testsMenu = new qx.ui.menu.Menu();
      }
      return this.__testsMenu;
    },

    /**
     * Populates a menu with various tests for the demo application.
     * @param menu {qx.ui.menu.Menu} The menu to populate
     * @param testData {Map} An map of maps of the following structure:
     * <pre>
     * {
     *   testName : {
     *     label : "The label in the menu",
     *     /**
     *      * Optional initialization function called when the 
     *      * button is created. If the function returns boolean false,
     *      * the button is not attached to the menu.
     *      * The menu button and the name of test are passed as arguments. 
     *      * /
     *     init : function( button, testName ){
     *      // "this" refers to the main application
     *      return true;
     *     },
     *     /**
     *      * Optional function called when the menu button is executed.
     *      * If the function returns boolean false, the request is not
     *      * send. The  name of the test is passed as argument.
     *      * /
     *     execute : function( testName )
     *     {
     *        // "this" refers to the main application
     *        return true;
     *     },
     *     /**
     *      * The request model data. Each value overrides an existing
     *      * property. Other properties are kept.
     *      * / 
     *     requestData : {
     *       url     : "http://", 
     *       service : "my.service.name",
     *       method : "myMethodName",
     *       params : ["arg1", "arg2", [ "arg", 3] ]
     *     },
     *     /**
     *      * Optional callback function called after the result of the
     *      * request has returned from the server.
     *      * /
     *     callback : function( response ){
     *       this.getActiveConsole().getRequestModel().setServerData(
     *        // do something with the response, for example, change
     *        // the server data like here
     *        // "this" refers to the main application
     *       );
     *     }
     *   },
     *   
     *   testName2 : {
     *    ...
     *   },
     *   
     *   testName3 : {
     *    ...
     *   }
     *   ...
     * }
     *
     * </pre>
     */
    populateMenu : function( menu, testData )
    {
      menu.removeAll();
      
      /*
       * (re-) populate the menu from the test data
       */
      for ( var testName in testData )
      {
        var data = testData[testName];
        
        /*
         * menu button with listener
         */
        var button = new qx.ui.menu.Button( data.label );

        /*
         * initialization function. if result is boolean false,
         * skip this button
         */
        if ( qx.lang.Type.isFunction( data.init ) )
        {
          var result = data.init.call( this, button, testName );
          if ( result === false ) {
            continue;
          }
        }
        
        /*
         * event handler called when user clicks the button
         */
        button.addListener("execute", qx.lang.Function.bind(function(testName){ 
          this.runTest( testName );
        },this, testName ));
        menu.add(button);
      } 
    },
    
    /**
     * Returns the test data map. If an argument is given, just return the
     * test data of the test of the given name, otherwise return the full map.
     * @return {Map}
     */
    getTestData : function( testName )
    {
      if ( testName )
      {
        return this.__testData[testName]
      }
      return this.__testData;
    },
    
    /**
     * Sets the test data map and populates the menu.
     * @param testData {Map}
     */
    setTestData : function( testData )
    {
      this.__testData = testData;
      this.populateMenu( this.getTestsMenu(), this.__testData );
    },
    
    /**
     * Loads the test data from the given url
     * @param testDataUrl {String}
     * @return {void}
     */
    loadTestData : function( testDataUrl )
    {
      new qx.io2.ScriptLoader().load( testDataUrl+"?"+(new Date).getTime(), function(){}, null );
    },
    
    /**
     * Runs the test with the given name.
     * @param testName {String}
     * @param callback {Function|undefined} If given, execute this callback
     *   after executing the callback in the test data.
     * @return {void}
     */
    runTest : function( testName, callback )
    {
      var doSendRequest, data = this.getTestData(testName);
      if ( ! data )
      {
        this.error("A test with name '"+testName+"' does not exist.");
      }
      
      /*
       * function to exectue before the request
       */
      if ( qx.lang.Type.isFunction( data.execute ) )
      {
        doSendRequest = data.execute.call( this, testName );
      }
      
      /*
       * send request
       */
      if ( doSendRequest !== false && this.getActiveConsole() && data.requestData )
      {
        this.getActiveConsole().sendRequest( data.requestData, function(result){
          /*
           * execute the test data callback
           */
          if ( qx.lang.Type.isFunction( data.callback ) )
          {
            data.callback.call( this, result);
          }
          /*
           * execute the method callback
           */
          if ( qx.lang.Type.isFunction( callback ) )
          {
            callback.call( this, result);
          }        
        }, this );
      }
    },
    
    /**
     * Convenience method that passes its arguments to the sendRequest method
     * of the currently active console. 
     * @param requestData {Map}
     * @param callback {Function|undefined}
     * @param context {Object|undefined}
     * @return {void}
     */
    sendRequest : function( requestData, callback, context )
    {
      this.getActiveConsole().sendRequest( requestData, callback, context ); 
    }
  }
});