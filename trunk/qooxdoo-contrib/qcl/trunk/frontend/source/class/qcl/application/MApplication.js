/* ************************************************************************

   qcl - the qooxdoo component library
  
   http://qooxdoo.org/contrib/project/qcl/
  
   Copyright:
     2007-2009 Christian Boulanger
  
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
  
   Authors:
   *  Christian Boulanger (cboulanger)
  
************************************************************************ */

/* ************************************************************************
#require(qcl.application.*)
#require(qx.*)
************************************************************************ */

/**
 * A mixin for an application instance that provides methods concerning 
 * application state, a cross-window clipboard, history support.
 *
 */
qx.Mixin.define("qcl.application.MApplication",
{

  include : [ 
    qcl.application.MApplicationState
  ],
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */  

  construct : function()
  {
    
    /*
     * cache for widget ids
     */
    this._widgetById = {};
    
    /*
     * Mixins
     */
    qx.Class.include( qx.core.Object, qcl.application.MGetApplication );
    qx.Class.include( qx.core.Object, qcl.application.MWidgetId );
    
    /*
     * session id
     */
    var sid =  this.getState("sessionId");
    if ( sid )
    {
      this.setSessionId( sid );  
    }
    
  },
 
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties : {
    
    /**
     * The name of the application
     */
    applicationName : 
    {
      check : "String",
      nullable : false,
      init : "qooxdoo"
    },
    
    /**
     * Whether this is the main application window or a dependent
     * child window
     */
    mainApplication : 
    {
      check : "Boolean",
      init : true
    },
    
    /** 
     * The current session id, unique for each browser window in which an application
     * instance exists.
     */
    sessionId :
    {
      check : "String",
      nullable : true,
      event : "changeSessionId",
      apply : "_applySessionId"
    },
    
     /**
      * The URL of the backend
      */
     serverUrl :
     {
       check : "String",
       nullable : true
     },
     
     /**
      * The RPC object that is shared by all methods that require access
      * to the backend. Needs to be set by the parent constructor and must be
      * a subclass of 
      */
     rpcObject : 
     {
       check : "qx.io.remote.Rpc",
       nullable : true
     },
     
     /**
      * The JSONRPC service method that should be called when the application is
      * closed
      */
     serviceMethodOnTerminate :
     {
       check : "String",
       nullable : true
     },
     
     /**
      * The data store used for authentication
      */
     authStore :
     {
       check : "qcl.data.store.JsonRpc",
       nullable : true
     },

     /**
      * The user manager
      * @todo create interface
      */
     userManager :
     {
       check : "qcl.access.user.Manager",
       nullable : true
     },     
     
     /**
      * The data store used for configuration data
      */
     configStore :
     {
       check : "qcl.data.store.JsonRpc",
       nullable : true
     },
     
     /**
     * The data store used for authentication
     * @todo create interface
     */
    configManager :
    {
      check : "qcl.config.Manager",
      nullable : true
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
    ---------------------------------------------------------------------------
       PRIVATE MEMBERS
    ---------------------------------------------------------------------------
    */         
    
    _rpc : null,
    _widgetById : {},
    _sessionId : null,
    _eventStore: null,
    
    /*
    ---------------------------------------------------------------------------
       APPLY METHODS
    ---------------------------------------------------------------------------
    */          
    
    _applySessionId : function( sessionId, old )
    {
      if ( sessionId )
      {
        this.setState( "sessionId", sessionId );
      }
      else
      {
        this.removeState("sessionId");
      }
    },
    
    /**
     * Applying the server url will automatically create a rpc object if it 
     * does not exist.
     */
    _applyServerUrl : function( url, old )
    {
      if ( ! this.getRpcObject() )
      {
        this.setRpcObject( new qx.io.remote.Rpc );
      }
      this.getRpcObject().setUrl(url);
    },
    
    /*
    ---------------------------------------------------------------------------
       WIDGET ID
    ---------------------------------------------------------------------------
    */             
    
    /**
     * Store a reference to a widget linked to its id.
     * @param id {String}
     * @param widget {Object}
     * @return void
     */
    setWidgetById : function(id,widget)
    {
      this._widgetById[id] = widget;
    },
    
    /**
     * gets a reference to a widget by its id
     * @param id {String}
     * @return widget {Object}
     */
    getWidgetById : function(id)
    {
      return this._widgetById[id];
    },
    
    /*
    ---------------------------------------------------------------------------
       STARTUP AND TERMINATION
    ---------------------------------------------------------------------------
    */     
    
    /**
     * Called before the page is closed. If you would like to override this
     * method, define a _close method in your main application. 
     * @return
     */
    close : function()
    {
      /*
       * call application function
       */
      if ( typeof this._close == "function" )
      {
        return this._close();
      }      
      
      if ( this.isMainApplication() )
      {  
        return this.tr("Do you really want to quit %1?",  this.getApplicationName() );
      }
      return undefined;
    },
    
    /**
     * Called when the page is closed and unregisteres stores on the server. 
     * If you want to have additional termination
     * action, define a _terminate method in your main application, which is 
     * called after at the end of this method.
     */
    terminate : function()
    {
      /*
       * unregister stores
       */
      if( this.getEventStore() )
      {
        this.getEventStore().unregisterStore();
      }
      
      /*
       * execute terminate function on server
       */
      if ( this.getServiceMethodOnTerminate() && this.getRpcObject() )
      {
        this.executeService( this.getServiceMethodOnTerminate() );
      }
       
      /*
       * call application function
       */
       if ( typeof this._terminate == "function" )
       {
         this._terminate();
       }
    },

    /*
    ---------------------------------------------------------------------------
       SERVER COMMUNICATION
    ---------------------------------------------------------------------------
    */
   
    _appStore : null,
     
    /** 
     * Executes a jsonrpc service with the rpc object configured in the 
     * main application's constructor
     * @param serviceName {String}
     * @param serviceMethod {String}
     * @param params {Array} Parameters to send to the method
     * @param callback {Function} Callback function that is called with the data returned from the server
     * @param context {Object} The object context in which the callback function is executed
     * @return {void}
     */
    executeService : function( serviceName, serviceMethod, params, callback, context )
    {
      
      /* 
       * create all-purpose json store
       */
      if ( ! this._appStore )
      {
        this._appStore = new qcl.data.store.JsonRpc( 
            null, null, null, null, this.getRpcObject() 
        ); 
      }
      
      this._appStore.setServiceName(serviceName);
      this._appStore.execute( serviceMethod, params, callback, context);
    },
    
    /*
    ---------------------------------------------------------------------------
       AUTHENTICATION 
    ---------------------------------------------------------------------------
    */       
    
    /**
     * Setup the authentication mechanism.
     * @param authStore {qcl.data.store.JsonRpc}
     */
    setupAuthentication : function( service )
    {
     
      /*
       * check if setup is already done
       */
      if ( this._authenticationSetup )
      {
        this.error("Authentication already set up");
      }
      this._authenticationSetup = true;      
      
      /*
       * set user manager and auth store
       */
      if ( ! this.getUserManager() )
      {
        this.setUserManager( qcl.access.user.Manager.getInstance() );
      }
      
      if ( ! this.getAuthStore() )
      {
        this.setAuthStore(       
          new qcl.data.store.JsonRpc( null, service ) 
        );
      }

      /*
       * bind the authentication stores data model to the user managers data model
       */
      this.getAuthStore().bind("model", this.getUserManager(), "model");

      /*
       * bind the session id propery of the auth store to the session
       * id of this application
       */
      this.getAuthStore().bind("model.sessionId", this, "sessionId" );
      
    }, 

    /**
     * Authenticate with session id, if any, otherwise with null to get
     * guest access, if allowed.
     * @param callback {function|undefined} optional callback that is called
     *   when logout request returns from server.
     * @param context {object|undefined} Optional context for callback function
     */    
    startAuthentication : function(callback,context)
    {
      this.info("Starting authentication...");
      this.getAuthStore().load("authenticate",[ this.getSessionId() || null ], callback, context );
    },
    
    /**
     * Authenticates a user with the given password. Since this is done
     * asynchroneously, the method has no return value but uses a callback 
     * instead.
     * @param username {String}
     * @param password {String}
     * @param callback {Function}
     * @param context {Object} The context in which the callback is executed
     * @return {void}
     */
    authenticate : function( username, password, callback, context )
    {
       this.getAuthStore().load("authenticate",[ username, password ], callback, context );
    },
       
    /**
     * Log out current user on the server
     * @param callback {function|undefined} optional callback that is called
     * when logout request returns from server.
     * @param context {object|undefined} Optional context for callback function
     * @return {void}
     */
    logout : function( callback, context )
    {
      this.getAuthStore().load("logout", null, callback, context );
    },
   
    
    /*
    ---------------------------------------------------------------------------
       CONFIGURATION
    ---------------------------------------------------------------------------
    */        
    
   /**
    * Retrieves configuration values from the server and configures auto-update
    * whenever the a value changes on the server. The config data has to be sent
    * in the following format:
    * <pre> 
    * {
    *   keys : [ ... array of the names of the configuration keys ],
    *   values : [ ... array of the configuration values ... ]
    * }
    * </pre>
    */
   setupConfig : function( service )
   {
      
      /*
       * avoid duplicate bindings
       */
      if ( this._configSetup )
      {
        this.error("Configuration already set up");
      }
      this._configSetup = true;
      
      /*
       * set default config manager
       */
      if ( ! this.getConfigManager() )
      {
        this.setConfigManager( qcl.config.Manager.getInstance() );
      }
      
      /*
       * set default config store
       */
      if ( ! this.getConfigStore() )
      {
        this.setConfigStore(
          new qcl.data.store.JsonRpc( null, service )       
        );        
      }
           
      /* 
       * bind the configuration store's data model to the user manager's data model
       */
      this.getConfigStore().bind("model", this.getConfigManager(), "model");

      /*
       * whenever a config value changes on the server, send it to server
       */
      this.getConfigManager().addListener("clientChange",function(event){
        var data = event.getData();
        this.getConfigStore().execute("set",[ data.key, data.value ] );
      },this);       
   },
   
   /**
    * Load config data
    */
   loadConfig : function()
   {
     this.getConfigStore().load();
   },
   
    /*
    ---------------------------------------------------------------------------
       EVENT TRANSPORT 
    ---------------------------------------------------------------------------
    */               
   
    /**
     * Start a central mechanism for registered databinding controllers
     * to transport their events to the server through period polling
     * @param interval {Integer|false} If an positive integer, the interval
     * for the polling 
     */
    startEventTransport : function( serviceName, serviceMethod, interval )
    {
      if ( ! interval || isNaN(parseInt(interval) ) )
      {
        this.error("Invalid interval value");
      }
      if ( this._eventStore )
      {
        this.warn("Event transport is already running.");
        return;
      }
      if ( ! this.getRpcObject() )
      {
        this.error("No rpc object defined");
      }

      var store = this._eventStore;
      
      if( ! store )
      {
        store = this._eventStore = new qcl.data.store.JsonRpc( null, serviceName);
        store.register();        
      }
      store.setInterval( interval );
      store.setUseEventTransport( true );
    },
    
    /**
     * Stop the event transport
     * @return {Void}
     */
    stopEventTransport : function()
    {
      if ( ! this._eventStore )
      {
        this.warn("Event transport is not running.");
        return;
      }
      this.getEventStore().setUseEventTransport(false);
    },

    /** 
     * Returns the event store object
     * @return qcl.data.store.JsonRpc
     */
    getEventStore : function()
    {
      return this._eventStore;
    },


    /*
    ---------------------------------------------------------------------------
       CHILD WINDOWS
    ---------------------------------------------------------------------------
    */         
    
    /**
     * Child windows opened by this application
     */
    _windows : {},
    
    /**
     * Sets the window title/caption. If the window is connected to a 
     * menu button, set the label of this button.
     * @param title {String}
     * @return
     */
    setWindowTitle : function( title )
    {
      document.title = title;
      if ( window.menuButton )
      {
        window.menuButton.setLabel(title);
      }
      
    },    
    
    /** 
     * Start an application in a new window or bring the
     * window to the front if it has already been opened.
     *
     * @param application {String} class name of application
     * @param state {Map} application state
     * @param width {Int} Width of window
     * @param height {Int} Height of window     
     * @return {qx.bom.Window} 
     */
    startApplication : function( application, state, width, height )
    {
      /*
       * add session id and access mode to the state
       */
      state.parentSessionId = this.getSessionId();
      state.access = "continue";
      
      /*
       * convert into string
       */
      var stateArr = [];
      for ( var key in state )
      {
        stateArr.push( key + "=" + encodeURIComponent( state[key] ) )
      }
      var stateStr = "#" + stateArr.join("&");
      var w = this._windows[stateStr];
      if ( w instanceof qx.bom.Window ) 
      {
        w.focus();
        return w;
      }
      
      /*
       * open new window
       */
      w = new qx.bom.Window("?application=" + application + stateStr );      
      w.setAllowScrollbars(false);
      if (width && height) 
      {
        w.setDimension(width, height);
      }
      else
      {
         w.setDimension(800, 400);
      }
      w.open();

      /*
       * check if window has been blocked
       */
      if (! w.isOpen() )
      {
        alert("Cannot open popup window. Please disable your popup blocker.");
        return null;
      }

      /*
       * delete reference on close
       */
      w.addEventListener("close", function() {
        delete this._windows[stateStr];
        delete w;
      }, this);

      /*
       * save window in registry
       */
      this._windows[stateStr] = w;
      
      return w;
    },

    
   /** 
    * Starts an application in a new window and creates a menu button connected with 
    * this window. When the button is clicked, the window gets the focus. Returns a 
    * qx.ui.menu.Button widget with the connected window reference attached as the 
    * "window" property
    *
    * @param application {String} class name of application
    * @param state {Map} application state
    * @param width {Int} Width of window
    * @param height {Int} Height of window
    * @param label {String} Label of the menu button connected to the window
    * @return {qx.ui.menu.Button} 
    */
   startApplicationWithMenuButton : function( application, state, width, height, label ) 
   {
     /*
      * window
      */
     var win = this.startApplication( application, state, width, height );
     
     /*
      * menu button
      */
     var menuButton = new qx.ui.menu.Button( label );
     
     /*
      * attach reference to window as the "window" property
      * and vice versa
      */
     console.log(menuButton.window);
     menuButton.window = win;
     win._window.menuButton = menuButton;
     
     /*
      * when button is clicked, give the focus to the window
      */
     menuButton.addEventListener("execute", function() {
       win.focus();
     });
     
     /*
      * when the window is closed, delete the button
      */
     win.addEventListener("close", function() {
       menuButton.getParent().remove(menuButton);
       menuButton.dispose();
       menuButton.destroy();
       win.dispose();
       delete win;
     });

     return menuButton;
   },    
   
   /*
   ---------------------------------------------------------------------------
      OTHER UTILITY METHODS
   ---------------------------------------------------------------------------
   */          
   _alert : null,
   
   /**
    * Alerts a message similarly to the alert() function
    * @param message {String}
    * @param callback {Function|undefined} Optional callback that is
    *   called when the user clicks on the "OK" button.
    */
   alert : function( message, callback )
   {
     if ( ! this._alert ) 
     {
       this._alert = new qcl.ui.dialog.Alert();
     }
     this._alert.set({
       message  : message,
       callback : callback || null
     });
     this._alert.show();
   },
    
    
    /**
     * Returns a reference to the main application
     *
     * @return {qx.application.Standalone}
     */
    getMainApplication : function()
    {
       if ( window.opener ) 
       {
         var app = opener.qx.core.Init.getApplication();
       } 
       else 
       {
         var app = this;
       }
       return app;
    },
    
    /**
     * Shorthand method to return active user
     * @return {qcl.access.user.User}
     */
    getActiveUser : function()
    {
      return qcl.access.user.Manager.getInstance().getActiveUser();
    },
    
   /**
    * Shorthand method to return a permission object by name
    * @return {qcl.access.permission.Permission}
    */    
    getPermission : function( name )
    {
      return qcl.access.permission.Manager.getInstance().create( name );   
    },
    
    /**
     * Shorthand method to return a permission state
     * @return {Boolean}
     */    
     getPermissionState : function( name )
     {
       return qcl.access.permission.Manager.getInstance().create( name ).getState();   
     },    

    /**
     * Shorthand method to update a permission
     * @return {void}
     */        
    updatePermission : function( name )
    {
      this.getPermission( name ).update();
    },
    
   /**
    * Returns a reference to the global clipboard instance
    *
    * @return {qcl.application.Clipboard}
    */
   getClipboard : function()
   {
     if (window.opener) {
       return opener.qcl.application.Clipboard.getInstance();
     } else {
       return qcl.application.Clipboard.getInstance();
     }
   },   

    /**
     * Shorthand method to return a config key
     * @return {String|Array|Boolean|Int}
     */       
    getConfigKey : function( key )
    {
      return qcl.config.Manager.getInstance().getKey( key );
    },

    /**
     * Shorthand method to set a config key
     * @param key {String}
     * @param value {String|Array|Boolean|Int}
     * @return {Bool} Whether setting succeeded
     */      
    setConfigKey : function( key, value )
    {
      return qcl.config.Manager.getInstance().setKey( key, value );
    }
  }
});