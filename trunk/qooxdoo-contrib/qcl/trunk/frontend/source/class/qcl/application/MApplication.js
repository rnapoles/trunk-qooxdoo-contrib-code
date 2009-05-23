/* ************************************************************************

  qcl qooxdoo component library

   Copyright:
     2007-2009 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)

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
    this.__widgetById = {};
    
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
     * The current session id, unique for each application, usually
     * retrieved from the backend. Will be sent, for example, with
     * rpc requests
     */
    sessionId :
    {
      check : "String",
      nullable : true,
      event : "changeSessionId",
      apply : "_applySessionId"
    },
    
    /**
     * Whether the current user is anonymous, i.e. not logged in
     */
    authenticatedUser :
    {
      check : "Boolean",
      init : false,
      event : "changeAuthenticatedUser"
    },
    
    /**
     * The username of the currently authenticated user, or null
     * if none
     */
    username : 
    {
      check : "String",
      nullable : true,
      event : "changeUsername"
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
       check : "qcl.databinding.event.store.JsonRpc",
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
       check : "qcl.databinding.event.store.JsonRpc",
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
    
    __rpc : null,
    __widgetById : {},
    __sessionId : null,
    __eventStore: null,
    
    /*
    ---------------------------------------------------------------------------
       APPLY METHODS
    ---------------------------------------------------------------------------
    */          
    
    _applySessionId : function( sessionId, old )
    {
      this.setState( "sessionId", sessionId );
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
     * store a reference to a widget linked to its id
     * @param id {String}
     * @param widget {Object}
     * @return void
     */
    setWidgetById : function(id,widget)
    {
      this.__widgetById[id] = widget;
    },
    
    /**
     * gets a reference to a widget by its id
     * @param id {String}
     * @return widget {Object}
     */
    getWidgetById : function(id)
    {
      return this.__widgetById[id];
    },
    
    /*
    ---------------------------------------------------------------------------
       STARTUP AND TERMINATION
    ---------------------------------------------------------------------------
    */     
    
    /**
     * Called before the page is closed
     * @return
     */
    close : function()
    {
      if ( this.isMainApplication() )
      {  
        return this.tr("Do you really want to quit %s?",  this.getApplicationName() );
      }
      return undefined;
    },
    
    /**
     * Called when the page is closed
     */
    terminate : function()
    {
      /*
       * unregister stores
       */
      if( this.__eventStore )
      {
        this.__eventStore.unregister( this.__storeIds );
      }
      
      /*
       * execute terminate function on server
       */
      if ( this.getServiceMethodOnTerminate() && this.getRpcObject() )
      {
        this.executeService( this.getServiceMethodOnTerminate() );
      }
    },

    
    
    /*
    ---------------------------------------------------------------------------
       SERVER COMMUNICATION
    ---------------------------------------------------------------------------
    */        
    
    /** 
     * Converts jsonrpc request data into an Url that
     * performs a GET request on the jsonrpc backend,
     * @param {String} service
     * @param {String} method
     * @param {Object} params
     */
    convertToGetRequestUrl : function(service,method,params)
    {
      var url  = this.getServerUrl() + "?_ScriptTransport_id=1&_ScriptTransport_data=";
      url += qx.io.Json.stringify( {
        'service'     : service,
        'method'      : method,
        'params'      : params,
        'server_data' : {
          'sessionId' : this.getSessionId()  
        }
      })
      return url;
    },   
    
    
    /** 
     * Executes a jsonrpc service with the rpc object configured in the 
     * main application's constructor
     * @param serviceName {String}
     * @param serviceMethod {String}
     * @param params {Array} Parameters to send to the method
     * @param callback {Function} Callback function that is called with the data returned from the server
     * @param context {Object} The object context in which the callback function is executed
     * @param serverData {Map} Additional data passed to the server
     * @return {void}
     */
    executeService : function( serviceName, serviceMethod, params, callback, context, serverData )
    {
      if ( ! this.getRpcObject() )
      {
        this.error("No JsonRpc object configured.");
      }
      var rpc = this.getRpcObject();
      rpc.setServiceName( serviceName );
      var callbackFunc = function( data, ex, id ) 
      {
        if ( ex == null ) 
        {  
          if ( typeof callback == "function" )
          {
            callback.call( context, data );
          }            
        } 
      }
      if ( serverData )
      {
        rpc.setServerData( serverData );
      }

      rpc.callAsync.apply( rpc, params.unshift( serviceMethod ) );
    },
    
    /*
    ---------------------------------------------------------------------------
       AUTHENTICATION 
    ---------------------------------------------------------------------------
    */       
    
    /**
     * Starts the authentication on the server, 
     * using the given userManager object.
     */
    startAuthentication : function()
    {
       if ( this.__authenticationStarted )
       {
         this.error("Authentication already started");
       }
       this.__authenticationStarted = true;
       
       this.info("Starting authentication...");
       
       if ( ! this.getAuthStore() || ! this.getUserManager() )
       {
         this.error("You have to set an authentication store and the usermanager first.");
       }
       
       /*
        * bind the authentication stores data model to the user managers data model
        */
       this.getAuthStore().bind("model", this.getUserManager(), "model")
       
      /*
       * start authentication
       */
      if ( this.getState("access") == "login" )
      {
        /* 
         * log out a session so user can log in again
         */
         this.info("Preparing for login...");
      }
      else if (this.getState("access") == "continue")
      {
        /*
         * keep an existing session
         */
        this.info("Continuing existing session...");
      }
      else
      {
        /*
         * log in as a guest
         */
         this.info("Logging in as guest...");
      }
      
      return null;
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
   loadConfiguration : function()
   {
      if ( ! this.__authenticationStarted )
      {
        //this.error("Cannot load configuration, application has not started authentication");
      }
      
      if ( ! this.getConfigStore() || ! this.getConfigManager() )
      {
        this.error("You have to set an configuration store and manager first.");
      }
      
      /* 
       * bind the configuration store's data model to the user manager's data model
       */
      this.getConfigStore().bind("model", this.getConfigManager(), "model");


      /*
       * whenever a config value changes, send it to server
       */
      this.getConfigManager().addListener("change",function(event){
        var key = event.getData();
        this.getConfigStore().execute("set",[ key, this.getConfigManager().getValue(key) ] );
      },this);       

       /*
        * load the data
        */
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
      if ( this.__eventStore )
      {
        this.warn("Event transport is already running.");
        return;
      }
      if ( ! this.getRpcObject() )
      {
        this.error("No rpc object defined");
      }

      var store = this.__eventStore;
      
      if( ! store )
      {
        store = this.__eventStore = new qcl.databinding.event.store.JsonRpc( 
            this.getServerUrl(), serviceName, null, null, this.getRpcObject() 
        );
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
      if ( ! this.__eventStore )
      {
        this.warn("Event transport is not running.");
        return;
      }
      this.getEventStore().setUseEventTransport(false);
    },

    /**
     * Returns the event store object
     */
    getEventStore : function()
    {
      return this.__eventStore;
    },


    /*
    ---------------------------------------------------------------------------
       CHILD WINDOWS
    ---------------------------------------------------------------------------
    */         
    
    /**
     * Child windows opened by this application
     */
    __windows : {},
    
    
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
     * window to the front if it has already been opened
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
      var w = this.__windows[stateStr];
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
        delete this.__windows[stateStr];
        delete w;
      }, this);

      /*
       * save window in registry
       */
      this.__windows[stateStr] = w;
      
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

   
    /* 
    ---------------------------------------------------------------------------
      SHORTCUTS
    ---------------------------------------------------------------------------
    */             
    
    
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
      return qcl.access.permission.Manager.getInstance().getObject( name );   
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
    * gets a reference to the global clipboard instance
    *
    * @type member
    * @return {var} TODOC
    */
   getClipboard : function()
   {
     if (window.opener) {
       return opener.qcl.clipboard.Manager.getInstance();
     } else {
       return qcl.clipboard.Manager.getInstance();
     }
   },   

    /**
     * Shorthand method to return a config key
     * @return {String|Array|Bool|Int}
     */       
    getConfigKey : function( key )
    {
      return qcl.config.Manager.getInstance().getKey( key );
    },

    /**
     * Shorthand method to set a config key
     * @param key {String}
     * @param value {String|Array|Bool|Int}
     * @param {Bool} Whether setting succeeded
     */      
    setConfigKey : function( key, value )
    {
      return qcl.config.Manager.getInstance().setKey( key, value );
    }

  }
});