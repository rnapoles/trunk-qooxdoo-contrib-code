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

/**
 * The application core, see
 * http://developer.yahoo.com/yui/theater/video.php?v=zakas-architecture
 * http://www.slideshare.net/nzakas/scalable-javascript-application-architecture
 * 
 * There should be only one core object. However, for security reasons,
 * the core is not implemented as a globally accessible singleton. The
 * "main" method of the application should instantiate it as a local 
 * variable and pass it to the sandbox of the included modules. 
 * 
 * The core currently supports: 
 * <ul>
 * <li>session management</li>
 * <li>application state saved in the URL / history support</li>
 * <li>authentication with backend</li>
 * <li>synchronization of configuration values with backend</li>
 * <li>generic json-rpc backend communication</li>
 * <li>exchanging events and messages with a backend</li>
 * <li>addressing widgets by unique ids</li>
 * <li>cross-window clipboard</li>
 * <li>creating new native child windows using the object tree of 
 * the current application (not yet functional, depends on the resolution
 * of bug <a href="http://bugzilla.qooxdoo.org/show_bug.cgi?id=3086">3096</a>).</li>
 * </ul>
 *  
 */
qx.Class.define("qcl.application.Core",
{
  extend : qx.core.Object,
  
  include : [ qcl.ui.MLoadingPopup ], 

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties : 
  {
    
    /**
     * The named id of the application === application namespace
     */
    applicationId : 
    {
      check : "String",
      nullable : false,
      init : "qooxdoo"
    },    
    
    /**
     * The name of the application
     */
    applicationName : 
    {
      check : "String",
      nullable : false,
      init : "A qooxdoo application"
    },
    
    
    /** 
     * The session manager
     * @type qcl.application.SessionManager
     */
    sessionManager :
    {
      check    : "qx.core.Object", // @todo: create interface
      nullable : false,
      event    : "changeSessionManager"
    },
    
    /**
     * The manager for rpc backend calls
     * @type qcl.application.RpcManager
     */
    rpcManager :
    {
      check    : "qx.core.Object", // @todo: create interface
      nullable : false,
      event    : "changeRpcManager"
    },
    
    /**
     * The manager responsible for authentication
     * @type qcl.access.AccessManager
     */
    accessManager :
    {
      check    : "qx.core.Object", // @todo: create interface
      nullable : false,
      event    : "changeAccessManager"
    },
    
    /**
     * The manager synchronizing configuration values between client and 
     * server 
     * @type qcl.application.ConfigManager
     */
    configManager :
    {
      check    : "qx.core.Object", // @todo: create interface
      nullable : false,
      event    : "changeConfigManager"
    },
    
    /**
     * The manager for state maintenance in the URL and application state history
     * @type qcl.application.StateManager
     */
    stateManager :
    {
      check    : "qx.core.Object", // @todo: create interface
      nullable : false,
      event    : "changeStateManager"
    },
    
    /**
     * The manager for maintaining a central clipboard that interacts
     * with the clipboard of the OS
     * @type qcl.application.ClipboardManager
     */
    clipboardManager :
    {
      check    : "qx.core.Object", // @todo: create interface
      nullable : false,
      event    : "changeClipboardManager"
    },
    
    /**
     * The manager for loading the client-side code of the
     * plugins of the application
     * @type qcl.application.PluginManager
     */
    pluginManager :
    {
      check    : "qx.core.Object", // @todo: create interface
      nullable : false,
      event    : "changePluginManager"
    },    
    
    /**
     * The manager for native child windows
     * @type qcl.application.NativeWindowManager
     */
    nativeWindowManager :
    {
      check    : "qx.core.Object", // @todo: create interface
      nullable : false,
      event    : "changeNativeWindowManager"
    },

    /**
     * The manager for exchanging events and messages with the server
     * @type 
     */
    eventTransportManager :
    {
      check    : "qx.core.Object", // @todo: create interface
      nullable : false,
      event    : "changeEventTransportManager"
    },    
    
    /**
     * The manager for maintaining a central clipboard that interacts
     * with the clipboard of the OS
     * @type 
     */
    clipboardManager :
    {
      check    : "qx.core.Object", // @todo: create interface
      nullable : false,
      event    : "changeClipboardManager"
    },
    
    /**
     * The currently active user object
     * @type qcl.access.User
     */
    activeUser :
    {
      check    : "qcl.access.User", // @todo create interface
      nullable : true,
      event    : "changeActiveUser"
    },
    
    /**
     * Whether the application should ask users if they "really" want 
     * to quit the application.
     * @type {Boolean} 
     */
    confirmQuit : 
    {
      check : "Boolean",
      init : true
    }
    
  },

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * Constructor.
   *  
   * 
   */
  construct : function()
  {  
    this.base(arguments);
    
    /*
     * initialize private members
     */
    this.__modules = {};
    this.__widgets = {};
    
    /*
     * mixins
     */
    qx.Class.include( qx.core.Object, qcl.application.MGetApplication );
    qx.Class.include( qx.core.Object, qcl.application.MWidgetId );
    
    /*
     * initialize the manager objects
     */
    this.initializeManagers();
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
    
    __widgets : null,   
    __modules : null,
    
    /*
    ---------------------------------------------------------------------------
       MODULE REGISTRATION
    ---------------------------------------------------------------------------
    */      
    
    /**
     * Registers the module, passing a sandbox instance to the 
     * module.
     * @param moduleId {String}
     * @param module {qcl.application.IModule}
     */
    register : function( moduleId, module )
    {
      /*
       * save module instance
       */
      if ( ! qx.Class.implementsInterface(module, qcl.application.IModule ) )
      {
        this.error("Invalid parameter: must be instance of qcl.application.IModule");
      }
      this.__modules[moduleId] = module;
      module.setUserData("moduleId", moduleId );
      
      /*
       * initialize module with sandbox
       */
      module.init( new qcl.application.Sandbox( this ) );
    },
    
    /**
     * Return the module object, given its id
     * @param moduleId {String}
     * @return {qcl.application.IModule}
     */
    getModuleById : function( moduleId )
    {
      return this.__modules[moduleId];
    },
    
    /**
     * Unregisters and destructs the module
     * @param module {qcl.application.IModule}
     */
    unregister : function( module )
    {
      if ( ! qx.Class.implementsInterface(module, qcl.application.IModule ) )
      {
        this.error("Invalid parameter: must be instance of qcl.application.IModule");
      }
      var moduleId = module.getUserData("moduleId");
      if ( ! moduleId )
      {
        this.error("Cannot unregister module: no module id.");
      }
      module.destruct();
      this.__modules[moduleId] = null;
    },
    
    /**
     * Build all modules that are widgets
     */
    buildModules : function()
    {
      for ( var moduleId in this.__modules )
      {
        var module = this.__modules[moduleId];
        if ( qx.Class.implementsInterface( module, qcl.application.IWidgetModule ) )
        {
          module.build();
        }
      }
    },    
    
    
    /**
     * Starts all modules
     */
    startModules : function()
    {
      for ( var moduleId in this.__modules )
      {
        this.__modules[moduleId].start();
      }
    },
    
    /**
     * Stopps all modules 
     */
    stopModules : function()
    {
      for ( var moduleId in this.__modules )
      {
        this.__modules[moduleId].stop();
      }
    },
    
    /*
    ---------------------------------------------------------------------------
       MESSAGING
    ---------------------------------------------------------------------------
    */   
    
    /**
     * Subscribes to a message name
     * @param name {String} The name of the message
     * @param callback {Function} A function that is called when the message is 
     *    published 
     * @param context {Object} The context object
     * @return {void}
     */
    subscribe : function( name, callback, context )
    {
      qx.event.message.Bus.subscribe( name, callback, context );
    },

    
    /**
     * Unsubscribes from a message name
     * @param name {String} The name of the message
     * @param callback {Function} A function that is called when the message is 
     *    published 
     * @param context {Object} The context object
     * @return {void}
     */
    unsubscribe : function( name, callback, context )
    {
      qx.event.message.Bus.unsubscribe( name, callback, context );
    },
    
    /**
     * Publishes a message
     * @param name {String}
     * @param message {unknown}
     */
    publish : function( name, message )
    {
      qx.event.message.Bus.dispatchByName( name, message );
    },
    
    /*
    ---------------------------------------------------------------------------
       MANAGERS
    ---------------------------------------------------------------------------
    */    
    
    /**
     * Initializes the managers. Override by defining this method in your
     * application class. 
     * @todo is a session manager object really needed?
     */
    initializeManagers : function()
    {
      /*
       * setup managers
       */ 
      this.setSessionManager( new qcl.application.SessionManager( this ) );
      this.setStateManager( new qcl.application.StateManager( this ) );
      this.setRpcManager( new qcl.io.RpcManager( this ) );
      this.setAccessManager( new qcl.access.AccessManager( this ) );
      this.setConfigManager( new qcl.application.ConfigManager( this ) );
      this.setPluginManager( new qcl.application.PluginManager( this ) );
      // this.setClipboardManager ( new qcl.application.ClipboardManager( this ) );
   
      /*
       * set session id from state, if any. 
       */
      var sid =  this.getStateManager().getState("sessionId");
      if ( sid )
      {
        this.getSessionManager().setSessionId( sid );  
      }
      
      /*
       * set session id from message
       */
		  this.subscribe( "setSessionId", function( e ){
		    this.getSessionManager().setSessionId( e.getData() );
		  }, this);
      
      /*
       * initialize some managers
       */
      this.getAccessManager().init();
      this.getConfigManager().init();
      
      /*
       * bind the access manager's active user object 
       */
      this.getAccessManager().getUserManager().bind("activeUser", this, "activeUser" );
      
    },
    
    /*
    ---------------------------------------------------------------------------
      SERVER COMMUNICATION
    ---------------------------------------------------------------------------
    */
    
    /**
     * Sets the url of the server that handles RPC requests
     * @param url {String}
     * @return void
     */
    setServerUrl : function( url )
    {
      this.getRpcManager().setServerUrl( url );
    },
    
    /**
     * Turns server-initiated dialogs on or off.
     * @param value {Boolean}
     */
    allowServerDialogs : function( value )
    {
      qcl.ui.dialog.Dialog.allowServerDialogs( value );    
    },    
    
    /*
    ---------------------------------------------------------------------------
       ACCESS
    ---------------------------------------------------------------------------
    */    
    
    /**
     * Returns the session id, if set.
     * @return {String}
     */
    getSessionId : function()
    {
      return this.getSessionManager().getSessionId();  
    },
    
    /**
     * Sets the name of the service that does access-related stuff
     * @param {} service
     */
    setAccessService : function( service )
    {
      this.getAccessManager().setService(service);
    },
    
    /**
     * Authenticates with a session token, if exists, otherwise
     * logs in as anonymous. Returns to a callback if given. 
     * @param callback {Function}
     * @param context {Object}
     */
    connect : function( callback, context )
    {
      this.getAccessManager().connect( this.getSessionId(), callback, context );
    },    
    
    /**
     * Authenticates with a username and password
     * @param username {String}
     * @param password {String}
     * @param callback {Function}
     * @param context {Object}
     */
    authenticate : function( username, password, callback, context  )
    {
      this.getAccessManager().authenticate( username, password, callback, context );
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
      this.getAccessManager().logout( callback, context );
    },

    
    /*
    ---------------------------------------------------------------------------
      CONFIG
    ---------------------------------------------------------------------------
    */
    
    /**
     * Sets the name of the service that does configuration stuff
     * @param service {String}
     */
    setConfigService : function( service )
    {
      this.getConfigManager().setService(service);
    },
    
    /**
     * Returns qx.core.Object with values used for application layout
     * @return {qx.core.Object}
     */
    getLayoutConfig : function()
    {
      return qx.core.Init.getApplication().getLayoutConfig();
    },

    
    /*
    ---------------------------------------------------------------------------
       STARTUP AND TERMINATION
    ---------------------------------------------------------------------------
    */     
    
    /**
     * Called before the page is closed. If you would like to override this
     * method, define a close method in your main application. 
     * @return
     */
    close : function()
    {  
      if ( this.isMainApplication() && this.isConfirmQuit() )
      {  
        return this.tr("Do you really want to quit %1?",  this.getApplicationName() );
      }
      return undefined;
    },
    
    /**
     * Called when the page is closed. Calls the terminate() method of the
     * rpc manager. Override by definining a terminate() method in your application
     * class
     */
    terminate : function()
    {
      this.getRpcManager().terminate();
    },
    
    /*
    ---------------------------------------------------------------------------
       WIDGET ID (DEPRECATED)
    ---------------------------------------------------------------------------
    */             
    
    /**
     * Store a reference to a widget linked to its id. Using this technique
     * is discouraged. Use messages instead to allow for loose coupling.
     * @param id {String}
     * @param widget {Object}
     * @return void
     */
    setWidgetById : function(id,widget)
    {
      this.__widgets[id] = widget;
    },
    
    /**
     * gets a reference to a widget by its id. Using this technique
     * is discouraged. Use messages instead to allow for loose coupling.
     * @param id {String}
     * @return widget {Object}
     */
    getWidgetById : function(id)
    {
      return this.__widgets[id];
    }    
     
  }
});