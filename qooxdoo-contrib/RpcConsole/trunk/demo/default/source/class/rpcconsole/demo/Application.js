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
#asset(qx/icon/${qx.icontheme}/16/actions/document-open.png)
#asset(qx/icon/${qx.icontheme}/16/actions/view-refresh.png)
#asset(qx/icon/${qx.icontheme}/16/actions/document-save-as.png)
#ignore(testName)
#require(qx.ui.form.ListItem)

************************************************************************ */

/**
 * A demo of the RpcConsole. This is a scriptable test client for your JSON-RPC
 * backend. Example test data is loaded from script/rpcconsole.testData.js, but
 * you can override this with adding '?testDataUrl=http://path/to/my/testData.js' 
 * to the build or source URL of this app. To change the default server url,
 * add '?serverUrl=http://path/to/my/server/'. To automatically start a test after
 * the test data has loaded, add "?runTest=nameOfTheTest". All of the GET parameters
 * can be combined.
 * Please refer to {@link #populateMenu} for an explanation of the syntax of the 
 * test data.
 */
qx.Class.define("rpcconsole.demo.Application",
{
  extend : qx.application.Standalone,

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */
  properties :
  {
    serverUrl :
    {
      check : "String",
      init : "../../../../../RpcPhp/trunk/services/index.php"
    },
    
    testDataUrl : 
    {
      check : "String",
      init  : "resource/rpcconsole/demo/testData.js"
    }
  },
  
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

    /*
    -------------------------------------------------------------------------
      PRIVATE MEMBERS
    -------------------------------------------------------------------------
    */        
    __activeConsole : null,
    __testData : null,
    __testsMenu : null,
    __helpWindow : null,
    __editorWindow : null,

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
       * load / edit menu
       */
      var button = new qx.ui.toolbar.MenuButton("Load/Edit Tests");
      button.setShowArrow(true);
      var menu = new qx.ui.menu.Menu();
      // load
      var mb = new qx.ui.menu.Button( "Load test data from file", "icon/16/actions/document-open.png" );
      mb.addListener("execute", this._onLoadButtonExecute, this);
      menu.add(mb);
      // reload
      mb = new qx.ui.menu.Button( "Reload test data", "icon/16/actions/view-refresh.png" );
      mb.addListener("execute", this._onReloadButtonExecute, this);
      menu.add(mb);
      // edit
      mb = new qx.ui.menu.Button( "Edit test data", "icon/16/actions/document-save-as.png" );
      mb.addListener("execute", this._onEditButtonExecute, this);
      menu.add(mb);      
      
      button.setMenu( menu );
      toolbar.add(button);
      
      /*
       * menu with tests
       */
      var button = new qx.ui.toolbar.MenuButton("Run Tests");
      button.setShowArrow(true);
      var menu = this.getTestsMenu();
      var testData = this.getTestData();
      this.populateMenu( menu, testData );
      button.setMenu( menu );
      toolbar.add(button);
      
      toolbar.add( new qx.ui.core.Spacer() );
      
      /*
       * "Help" menu
       */
      var button = new qx.ui.toolbar.MenuButton("Help");
      button.setShowArrow(true);
      var menu = new qx.ui.menu.Menu();
      button.setMenu(menu);
//      var mbutton = new qx.ui.menu.Button("About RpcConsole");
//      mbutton.addListener("execute", this._onAboutButtonExecute, this);
//      menu.add(mbutton);
      mbutton = new qx.ui.menu.Button("RpcConsole Website");
      mbutton.addListener("execute", function(){
        window.open("http://qooxdoo.org/contrib/project/rpcconsole")
      }, this);
      menu.add(mbutton);
      toolbar.add(button);      
               
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
      var testDataUrl = window.location.parameters.testDataUrl || this.getTestDataUrl();
      if ( testDataUrl )
      {
        this.loadTestData( testDataUrl, function(){
          /*
           * start test if requested
           */
          var runTest = window.location.parameters.runTest;
          if ( runTest )
          {
            this.runTest( runTest );
          }
        },this );
      }
      
    },
    
    /**
     * Called when the "Load" button is executed.
     */
    _onLoadButtonExecute :  function()
    {
      var testDataUrl = prompt("Enter Test Data URL:");
      if ( ! testDataUrl ) return;
      try 
      {
        qx.util.Validate.url()(testDataUrl);
        this.setTestDataUrl( testDataUrl )
        this.loadTestData( testDataUrl );  
      }
      catch(e)
      {
        alert("Please enter a valid URL");
      }
    },
    
    /**
     * Called when the "Reload" button is executed
     */
    _onReloadButtonExecute : function()
    {
      if ( this.getTestDataUrl() )
      {
        this.loadTestData( this.getTestDataUrl() );  
      }
    },
    
    /**
     * Called when the "About" button is executed
     */
    _onAboutButtonExecute : function()
    {
      if ( ! this.__helpWindow )
      {
        var win = this.__helpWindow = new qx.ui.window.Window("About RpcConsole");
        win.set({
          width : 800,
          height : 500,
          showMinimize : false
        });
        win.addListener("appear", win.center, win );
        win.setLayout( new qx.ui.layout.Grow() );
        var iframe = new qx.ui.embed.Iframe("../../../readme.txt?"+(new Date).getTime());
        win.add( iframe );
      }
      this.__helpWindow.open();
    },
    
    /**
     * Called when the "Edit" button is executed
     */
    _onEditButtonExecute : function()
    {
      if ( ! this.getTestData() )
      {
        return;
      }
      if ( ! this.__editorWindow )
      {
        var win = this.__editorWindow = new qx.ui.window.Window("Edit test data");
        win.set({
          width : 600,
          height : 500,
          showMinimize : false
        });
        win.addListener("appear", win.center, win );
        win.setLayout( new qx.ui.layout.VBox(5) );
        var textArea = new qx.ui.form.TextArea();
        textArea.setValue( qx.util.Json.stringify( this.getTestData(), true) );
        win.add( textArea, { flex : 1 });
        var button = new qx.ui.form.Button("Update","icon/16/actions/document-save-as.png");
        button.addListener("execute", function(){
          try 
          {
            this.setTestData( window.eval( "(" + textArea.getValue() + ")" ) );
            win.close();
          } 
            catch(e)
          {
            alert(e);
          }
        },this);
        win.add( button );
      }
      this.__editorWindow.open();      
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
        var serverUrl = this.getServerUrl();
      }
      
      /*
       * create console and add test table
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
      
      /*
       * attach a event
       */
      console.getReportTable().addListener("cellClick", function(e){
         var tableModel = console.getReportTable().getTableModel();
         var id = tableModel.getValue(0,e.getRow());
         var requestData = console.getCachedRequest(id);
         var message = tableModel.getValue(4,e.getRow());
         
         console.getResponseTextArea().setValue(
          "[Request Data]\n" + qx.util.Serializer.toJson( requestData ) +
          "\n\n[Response Data]\n" + qx.util.Serializer.toJson( console.getCachedResponse( id ) ) +
          "\n\n[Status Message]\n" + message
         );
         
         if ( qx.lang.Type.isObject( requestData ) )
         {
           console.getRequestModel().set( requestData );
         }
         
      },this );
      
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
     * Reports the result of a test in the rep
     * @param {} success
     * @param {} status
     */
    displayTestResult : function( success, status )
    {
      
    },

    /**
     * Populates a menu with various tests for the demo application.
     * @param menu {qx.ui.menu.Menu} The menu to populate
     * @param testData {Map} An map of maps of the following structure:
     * <pre>
     * {
     *   testName : {
     *     label : "The label in the menu",
     *     icon : "path/to/the/optional-icon.png",
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
     *     callback : function( result ){
     *        // do something with the response, for example, change
     *        // the server data like here
     *        // "this" refers to the main application    
     *       this.getActiveConsole().getRequestModel().setServerData(
     *         foo : response.bar
     *       );
     *     },
     *     /**
     *      * Optional data to compare the result with an expected.
     *      * If the value is a function, this function must return
     *      * true if the result is correct, false, if the result is 
     *      * wrong. You can also return a string which is taken as
     *      * an error message.  
     *      * Alternatively, the data can be of any native data type
     *      * (boolean, null, string, array, object) and will be
     *      * compared verbatim to the result by jsonifying both 
     *      * values. "callback" and "checkResult" are mutually
     *      * exclusive. 
     *      * /
     *     checkResult : function( result )
     *     {
     *       if (result == "foo!")
     *       {
     *         return true;
     *       }
     *       return "Result is wrong!"; 
     *     }
     *   },
     *   
     *   testName2 : {
     *    // don't show a corresponding menu button 
     *    visible : false,
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
         * if the 'visible' property is set to false, or if we have
         * no label, don't show a button 
         */
        if ( data.visible === false ||  ! data.label )
        {
          continue;
        }
        
        /*
         * menu button with listener
         */
        var button = new qx.ui.menu.Button( data.label, data.icon || null );

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
     * @param callback {Function|undefined} Optional callback function
     * @param context {Object|undefined} Optional context object
     * @return {void}
     */
    loadTestData : function( testDataUrl, callback, context )
    {
      new qx.io.ScriptLoader().load( 
        testDataUrl+"?"+(new Date).getTime(),  // disable caching of script file
        callback, context  
      );
    },
    
    /**
     * Runs the test with the given name.
     * @param testName {String}
     * @param callback {Function|undefined} If given, execute this callback
     *   after executing the callback in the test data.
     * @return {void}
     * @todo fix the response vs. response.data mess
     */
    runTest : function( testName, callback )
    {
      var doSendRequest = true; 
      var data = this.getTestData(testName);
      
      if ( ! data )
      {
        this.logTestFailed( testName, "Test does not exist.");
        return;
      }
      
      /*
       * show in report table
       */
      var reportRow = data.__reportRow;
      try
      {
        var service = data.requestData.service;
        var method  = data.requestData.method;
        data.__reportRow = this.getActiveConsole().report( 
          null, service, method, "wait","Request is pending..."
        );
      }catch(e){}
      
      /*
       * function to execute before the request
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
        this.getActiveConsole().sendRequest( data.requestData, function(response){
          try 
          {
            /*
             * check response
             */
            if ( ! qx.lang.Type.isObject( response ) || response.result === undefined )
            {
              this._handleTestFailed( testName, "Invalid response: " + qx.util.Json.stringify(response) );
              return;
            }
            
            /*
             * save id of request with request data
             */
            data.__id = response.id; 
            
            /*
             * response is error
             */
            if ( response.error )
            {
              this._handleTestFailed( testName, response.error.message );
            }
            
            /*
             * Optional data to compare the result with an expected.
             * If the value is a function, this function must return
             * true if the result is correct, false, if the result is 
             * wrong. You can also return a string which is taken as
             * an error message.
             */
            else if ( qx.lang.Type.isFunction( data.checkResult ) )
            {
              var check = data.checkResult.call( 
                this, 
                qx.lang.Type.isObject( response.result ) && response.result.data !== undefined ?
                  response.result.data : response.result
              );
              if ( check === true )
              {
                this._handleTestPassed( testName );
              }
              else
              {
                this._handleTestFailed( testName, check===false ? "Wrong result." : check );
              }
            }
            
            /* Alternatively, the data can be of any native data type
             * (boolean, null, string, array, object) and will be
             * compared verbatim to the result by jsonifying both 
             * values.
             */ 
            else if ( data.checkResult !== undefined )
            {
              var expected = qx.util.Json.stringify( data.checkResult );
              if ( qx.lang.Type.isObject( response.result ) && response.result.data !== undefined )
              {
                var received = qx.util.Json.stringify( response.result.data );  
              }
              else
              {
                var received = qx.util.Json.stringify( response.result );  
              }
              if ( received == expected )
              {
                this._handleTestPassed( testName );
              }
              else
              {
                this._handleTestFailed( testName, "Expected:" + expected + ", received:" + received );
              }
            }
            
            /*
             * otherwise, we declare this test as successful
             */
            else
            {
              this._handleTestPassed( testName );
            }
            
            /*
             * if no check has been specified, execute the test data callback
             * if one exists. 
             */
            if ( qx.lang.Type.isFunction( data.callback ) )
            {
              data.callback.call( 
                this, 
                qx.lang.Type.isObject( response.result ) && response.result.data !== undefined ?
                  response.result.data : response.result
              );
            }
            
            /*
             * execute the method callback
             */
            if ( qx.lang.Type.isFunction( callback ) )
            {
              callback.call(
               this, 
                qx.lang.Type.isObject( response.result ) && response.result.data !== undefined ?
                  response.result.data : response.result            
              );
              return;
            }
            
          }
          catch( e )
          {
            console.warn(e);  
          }
        }, this );
      }
    },
    
    /**
     * Handles a successful test. Override for different behavior
     * @param  testName {String}
     */
    _handleTestPassed : function( testName )
    {
      var data = this.getTestData( testName );
      var id = data.__id;
      var reportRow = data.__reportRow;
      var service = data.requestData.service;
      var method  =  data.requestData.method;
      
      this.getActiveConsole().report(
        id, service, method, "ok", "", reportRow
      );
      
      delete data.__reportRow;
      delete data.__id;
    },
    
    /**
     * Handles a failed test. Override for different behavior
     * @param testName {String}
     * @param error {String}
     */
    _handleTestFailed : function( testName, error )
    {
      var data = this.getTestData( testName );
      var reportRow = data.__reportRow;
      var id = data.__id;
      var service = data.requestData.service;
      var method  =  data.requestData.method;
      
      this.getActiveConsole().report(
        id, service, method, "error", error, reportRow
      );      
      
      this.getActiveConsole().log( "Test '" + testName + "' failed: " + error );
      
      delete data.__reportRow;
      delete data.__id;
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
    },
    
    /**
     * Run all or selected tests sequentially. 
     * @param includeArg {Array|String|undefined} If array, run only the 
     *   given tests by name. If string, run all tests that match the string.
     *   You can use the "*" wildcard to match more than one test.
     *   If null or undefined, run all tests.
     * @param excludeArg {Array|String|undefined} If array, exclude the named
     *   tests. If string, run all tests that match the string.
     *   You can use the "*" wildcard to match more than one test.
     * @return {void}
     */
    runTests : function( includeArg, excludeArg )
    {
      var activeConsole =  this.getActiveConsole();
      activeConsole.clear();
      
      var testData = this.getTestData();
      var testNameArr = [];
      for( testName in testData )
      {
        /*
         * If an array has been passed as include argument,
         * skip if test name is not in the array
         */
        if ( qx.lang.Type.isArray(includeArg) 
          && ! qx.lang.Array.contains( includeArg, testName ) )
        {
          continue;
        }
        
        /*
         * If a string has been passed as include argument,
         * skip if test name does not match the string. You 
         * can use the "*" wildcard to truncate the search
         * string.
         */
        else if ( qx.lang.Type.isString( includeArg ) 
          && qx.lang.String.contains( includeArg, "*" )
          && testName.substr(0,includeArg.indexOf("*")-1) != includeArg.substr(0,includeArg.indexOf("*")-1))
        {
          continue;
        }     
        
        /*
         * If an array has been passed as exclude argument,
         * skip if test name is in the array
         */
        if ( qx.lang.Type.isArray( excludeArg ) 
          && qx.lang.Array.contains( excludeArg, testName ) )
        {
          continue;
        }
        
        /*
         * If a string has been passed as exclude argument,
         * skip if test name matches the string. You 
         * can use the "*" wildcard to truncate the search
         * string.
         */
        else if ( qx.lang.Type.isString( excludeArg ) 
          && qx.lang.String.contains( excludeArg, "*" )
          && testName.substr(0,excludeArg.indexOf("*")-1) == excludeArg.substr(0,excludeArg.indexOf("*")-1))
        {
          continue;
        }
        
        /*
         * include test
         */
        testNameArr.push( testName );
      }
  
      /*
       * run the the named tests
       */
      this.runTestsByName( testNameArr );
    },
    
    /**
     * Run the named tests sequentially. 
     * @param testNameArr {Array} An array of names of tests to run
     */
    runTestsByName : function ( testNameArr )
    {
      if ( ! qx.lang.Type.isArray( testNameArr) || ! testNameArr.length )
      {
        this.error("Invalid argument");
      }
      var testName = testNameArr.shift();
      this.runTest( testName, function() {
        if ( testNameArr.length )
        {
          this.runTestsByName( testNameArr ); 
        } 
        else
        {
          //this.getActiveConsole().log("Tests finished.");
        }
      });
    }
  }
});