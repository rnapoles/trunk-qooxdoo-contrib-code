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
    this.__channels = [];
    
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
      init : "A qooxdoo application",
      apply : "_applyApplicationName"
    },
    
    /**
     * The session id
     * @type String
     */
    sessionId :
    {
      check : "String",
      nullable : true,
      event : "changeSessionId",
      apply : "_applySessionId"
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
    },
    
    /**
     * Whether to allow anonymous subscriptions, i.e. unauthenticated
     * users can subscribe to channels on the server. Default: false
     */
    anonymousChannelSubscriptions :
    {
      check : "Boolean",
      init : false
    },
    
    /**
     * Whether to delay a subscription until the authentication has been
     * done. If true and anonymousChannelSubscriptions is true, automatically
     * push off subscriptions until after authentication.
     * If false, the attempt to anonymously subscribe before being
     * authenticated will throw an error. Default: true
     */
    delayChannelSubscriptionsUntilAuthenticated :
    {
      check : "Boolean",
      init : true
    }    
    
  },

  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */
  
  events :
  {
    
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
    
    /**
     * An object mapping widget ids to widget objects
     * @type 
     */
    __widgets : null,   
    
    /**
     * An object mapping module names to module objects
     * @type 
     */
    __modules : null,
    
    /**
     * An array of names of channels subscribed on the server
     * @type 
     */
    __channels : null,

    /*
    ---------------------------------------------------------------------------
       APPLY METHODS
    ---------------------------------------------------------------------------
    */    
    _applySessionId : function( value, old )
    {
      if( value )
      {
        this.getStateManager().setState("sessionId", value );
      }
      else
      {
        this.getStateManager().removeState("sessionId" );
      }
    },
    
    _applyApplicationName : function( value, old )
    {
      window.name = value;
    },
    
    /*
    ---------------------------------------------------------------------------
       MODULE REGISTRATION
    ---------------------------------------------------------------------------
    */      
    
    /**
     * Registers the module, passing a sandbox instance to the 
     * module.
     * FIXME Remove moduleId - module has a getName()
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
     * Return the module object, given its id.
     * FIXME Rename to byName() ?
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
     * Subscribes to one or more message channels
     * @param name {Array|String} The name(s) of the channels(s)
     * @param callback {Function} A function that is called when the message is 
     *    published 
     * @param context {Object} The context object
     * @return {void}
     */
    subscribe : function( name, callback, context )
    {
      if (qx.lang.Type.isArray(name) )
      {
        name.forEach(function(n){
          this.subscribe(n, callback, context);
        },this);
        return;
      }      
      qx.event.message.Bus.subscribe( name, callback, context );
    },
    
    /**
     * Subscribes to one message channel, but only for one message
     * @param name {String} The name of the channels
     * @param callback {Function} A function that is called when the message is 
     *    published 
     * @param context {Object} The context object
     * @return {void}
     */
    subscribeOnce : function( name, callback, context )
    {
      qx.event.message.Bus.subscribe( name, function(){
        callback.apply(context,arguments);
        qx.event.message.Bus.unsubscribe( name, callback, context );
      }, this );
    },    
    
    /**
     * Returns true if the channel(s) is/are already subscribed by the given function
     * and context
     * @param name {Array|String} The name(s) of the message(s)
     * @param callback {Function} A function that is called when the message is 
     *    published 
     * @param context {Object} The context object
     * @return {Boolean} Returns true if all of the given channel names are subscribed.
     */
    isSubscribed : function( name, callback, context )
    {
      if ( qx.lang.Type.isArray(name) )
      {
        var isSubscribed = true;
        name.forEach(function(n){
          isSubscribed = isSubscribed && this.isSubscribed(n, callback, context);
        },this);
        return isSubscribed;
      }
      return qx.event.message.Bus.checkSubscription( name, callback, context );
    },    

    
    /**
     * Unsubscribes from one or more channels
     * @param name {Array|String} The name(s) of the channels(s)
     * @param callback {Function|undefined} If given, unsubscribe only this 
     * particular handler, otherwise unsubscribe all handlers 
     * @param context {Object|undefined} if given, unsubscribe only the handlers
     * with the given context object
     * @return {void}
     */
    unsubscribe : function( name, callback, context )
    {
      if (qx.lang.Type.isArray(name) )
      {
        name.forEach(function(n){
          this.unsubscribe(n, callback, context);
        },this);
      }      
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
    
    /**
     * Starts the message transport. When established, publishes the
     * "qcl/messagetransport/ready" message.
     * 
     * @param options {Map} 
     *    A map with the following structure:<pre>
     *    {
     *      mode : (String)  
     *          The mode of the transport. Currently, only "polling" supported.
     *      transport : (String)
     *          The transport typ used. Currently, only "rpc" supported
     *      service : (String)
     *          (mode "rpc") The name of the service used. The service must 
     *          implement the following methods: 
     *            broadcast: Called with one argumen, an array, containing the
     *                       message data  [{ channel: String, data: unknown }, ...]
     *            subscribe:  Called with one argument, the name of the channel
     *            unsubscribe: Called with one argument, the name of the channel
     *            unsubscribeAll : Removes all subscriptions on the server
     *      stopOnError : (Boolean)
     *          Whether the transport should be halted when an error occurred 
     *          on the server.
     *      authenticated : (Boolean)
     *          Whether the transport should be halted as long as there is not
     *          authenticated user, i.e. no transport when the user is anoymous 
     *      interval : (Integer)
     *          Whne the mode is "poll", the number of seconds between polling
     *          requests
     *    }</pre>
     *  
     */
    startMessageTransport : function( options )
    {
      if ( this.__transportRunning )
      {
        this.error( "Message transport already running.");
      }
      
     /*
      * start transport dependent on mode
      */
     switch( options.mode )
     {
        /*
         * use periodic polling
         */
        case "poll":
        
          // the message queue
          this.__pollMessageQueue = [];
          
          switch( options.transport )
          {
            case "rpc":
            
              if ( ! options.service )
              {
                this.error("Invalid message transport service.");
              }
              this.__pollingFunc = function()
              {
                /*
                 * is an authenticated user required?
                 */
                if ( options.authenticated && ! this.isAuthenticatedUser()  )
                {
                  return;
                }
                
                /*
                 * poll
                 */
                this.getRpcManager().execute(
                  options.service, "broadcast", [this.__pollMessageQueue], 
                  function(){},this
                );
                
                /*
                 * empty the queue
                 */
                this.__pollMessageQueue = [];
        
              };
              break;
              
            default:
              this.error("Unknow message transport type " + options.transport );
          }
          
          /*
           * periodically forward messages to the server and pick up the
           * server messages
           */
          if ( ! typeof options.interval == "number" || options.interval < 3  )
          {
            this.error("Interval must be integer and be >= 3");
          }
          
          /*
           * start polling or wait until authenticated
           */          
          if ( options.authenticated )
          {
            this.callOnceWhenAuthenticated( function() {
              this.__pollTimerId = qx.util.TimerManager.getInstance().start(
                this.__pollingFunc, options.interval*1000, this, null, 0
              );
            },this);
          }
          else
          {
            this.__pollTimerId = qx.util.TimerManager.getInstance().start(
              this.__pollingFunc, options.interval*1000, this, null, 0
            );            
          }
          break;
          
        default:
          this.error("Unknow message transport mode " + options.mode );
      }
     
      /*
       * stop the polling on error
       */
      if ( options.stopOnError )
      {
        qx.event.message.Bus.subscribe("qcl.data.store.JsonRpc.error",function(e){
          this.stopMessageTransport();
        },this);
      }
      this.__messageTransportOptions = options;
      this.__transportRunning = true;
      this.publish("qcl/messagetransport/ready");
    },
    
    /**
     * Stops the message transport
     */
    stopMessageTransport : function()
    {
      if ( ! this.__transportRunning )
      {
        // ignore
        return false;
      }
      
      switch( this.__messageTransportOptions.mode )
      {
        case "poll":
          qx.util.TimerManager.getInstance().stop( this.__pollTimerId );
          break;
      }
      
      this.__transportRunning = false;
    },
    
    /**
     * Returns true if the message transport is running.
     * @return {Boolean}
     */
    isMessageTransportRunning : function()
    {
      return this.__transportRunning;
    },
    
    /**
     * Subscribes to one or more message channels on the server.
     * @param name {Array|String} 
     *    The name(s) of the channel(s)
     * @param callback {Function} 
     *    A function that is called when the message is published to this channel 
     * @param context {Object} The context object of the callback
     * @param finalCallback {Function} 
     *    An optional callback which is called when the subscription has been made
     * @param finalContext {Object}
     *    The context of the finalCallback function 
     * @return {void}
     * @todo use promise instead
     */
    subscribeToChannel : function( name, callback, context, finalCallback, finalContext )
    {
      /*
       * check authentication state and delay if not authenticated yet
       * @todo rewrite this
       */
      if ( ! this.isAuthenticatedUser() )
      {
        if ( ! this.isAnonymousChannelSubscriptions() )
        {
          if ( this.isDelayChannelSubscriptionsUntilAuthenticated() )
          {
            this.callOnceWhenAuthenticated( function(){
              this.subscribeToChannel( name, callback, context, finalCallback, finalContext );
            },this);  
            return;
          }
          else
          {
            this.error("Cannot subscribe to channel(s) '" + name + "'. Anonymous subscriptions are not allowed and user is not yet authenticated.");
          }
        }
      }
      
      /*
       * subscribe on client, where the messages are actually published
       * this way we can listen to messages even before the message transport 
       * has started
       */
      if ( ! this.isSubscribed( name, callback, context ) )
      {
        this.subscribe( name, callback, context );  
      }      
      
      /*
       * if no transport is running yet, delay subscription until we 
       * the transport is ready.
       */
      if ( ! this.isMessageTransportRunning() )
      {
        var args = qx.lang.Array.fromArguments(arguments);
        this.subscribeOnce("qcl/messagetransport/ready", function(){
          this.subscribeToChannel.apply(this,args);
        },this);
        return;
      }
        
      /*
       * subscribe on server dependend on transport mode
       */
      if ( ! this.isSubscribedChannel( name ) )
      {
        // FIXME We have to do this before we know that this will be successful
        // otherwise we'll have a ton of subscription requests to the 
        // server. So we'll need a way to remove the subscription
        // from the list when an error occurs
        if ( qx.lang.Type.isArray(name) )
        {
          this.__channels = this.__channels.concat( name ); 
        }
        else
        {
          this.__channels.push( name );  
        }
        switch( this.__messageTransportOptions.mode )
        {
          case "poll":
            switch( this.__messageTransportOptions.transport )
            {
              case "rpc":
                this.rpcRequest( 
                  this.__messageTransportOptions.service, "subscribe", [name],
                  function() {
                    this.info("Subscribed to channel(s) " + name );
                    if ( typeof finalCallback == "function" )
                    {
                      finalCallback.call( finalContext );
                    }
                  },this
                );
                break;
            }
            break;
        }
      }
    },
    
    /**
     * Returns true if a channel of this name has been subscribed to,
     * false if not
     * @param name {Array|String} If you supply an array, it will check
     * if all of the given channels are subscribed. 
     * @return {Boolean} Returns true if the one given or all of the given channels
     * are subscribed to
     */
    isSubscribedChannel : function( name )
    {
      if (qx.lang.Type.isArray(name) )
      {
        var isSubscribed = true;
        name.forEach(function(n){
          isSubscribed = isSubscribed && this.isSubscribedChannel(n);
        },this);
        return isSubscribed;
      }
      return qx.lang.Array.contains( this.__channels, name );
    },
    
    /**
     * Unsubscribes from one or more message channels on the server
     * @param name {Array|String} 
     *    The name(s) of the channel(s)
     * @param callback {Function|undefined} If given, unsubscribe only this 
     * particular handler, otherwise unsubscribe all handlers 
     * @param context {Object|undefined} if given, unsubscribe only the handlers
     * with the given context object
     * @param finalCallback {Function} 
     *    An optional callback which is called when the subscription(s) has been cancelled
     * @param finalContext {Object}
     *    The context of the finalCallback function 
     * @return {void}
     */
    unsubscribeFromChannel : function( name, callback, context, finalCallback, finalContext )
    {
      /*
       * check transport
       */
      if ( ! this.isMessageTransportRunning() )
      {
        this.error( "Cannot unsubscribe from channel '" + name + "'. Message transport is not running.");
        return false;
      }
      
      /*
       * Check subscription 
       */
      if ( ! this.isSubscribedChannel( name ) )
      {
        this.warn( "No subscription to channel '" + name + "' exists." );
        return;
      }
      
      // need to remove already without knowing if the unsuscribe action
      // will be successful.
      if ( qx.lang.Type.isArray(name) )
      {
        name.forEach(function(n){
          qx.lang.Array.remove( this.__channels, name );
        });
      }
      else
      {
        qx.lang.Array.remove( this.__channels, name );
      }      
      
      
      /*
       * unsubscribe dependent on transport mode
       */
      switch( this.__messageTransportOptions.mode )
      {
        case "poll":
          switch( this.__messageTransportOptions.transport )
          {
            case "rpc":
              this.rpcRequest( 
                this.__messageTransportOptions.service, "unsubscribe", [name],
                function() {
                  this.info("Unsubscribed from channel(s) " + name );
                  this.unsubscribe( name, callback, context );
                  if ( typeof finalCallback == "function" )
                  {
                    finalCallback.call( finalContext );
                  }
                },this
              );
              break;
          }
          break;
      }
    },    
    
    /**
     * Unsubscribes from all channels. Continues with the given callback
     * @return {void}
     */
    unsubscribeFromAllChannels : function( finalCallback, finalContext )
    {
     
      /*
       * locally remove all
       */
      switch( this.__messageTransportOptions.mode )
      {
        case "poll":
          switch( this.__messageTransportOptions.transport )
          {
            case "rpc":
              this.rpcRequest( 
                this.__messageTransportOptions.service, "unsubscribeAll", [],
                function() {
                  this.info("Unsubscribed from all channels ");
                  this.__channels.forEach( function(name){
                    delete qx.event.message.Bus.getSubscriptions()[name];
                  },this);
                  this.__channels = [];
                  if ( typeof finalCallback == "function" )
                  {
                    finalCallback.call( finalContext );
                  }
                },this
              );
              break;
          }
          break;
      }
     },
    
    /**
     * Publishes a message to a message channel on the server
     * @param name {String} 
     *    The name of the channel
     * @param data {unknown} 
     *    The message data
     * @param now {Boolean|undefined} 
     *    If true, publish immediately without waiting for polling.
     *    Default to false.
     * @param clientAlso {Boolean|undefined}
     *    If true, publish the message also on the client. If false,
     *    only forward to the server. Default to false.
     * @return {void}
     */
    publishToChannel : function( name, data, now, clientAlso )
    {
      /*
       * if no transport is running yet, publish when 
       * the transport is ready.
       */
      if ( ! this.isMessageTransportRunning() )
      {
        var args = qx.lang.Array.fromArguments(arguments);
        this.subscribeOnce("qcl/messagetransport/ready", function(){
          this.publishToChannel.apply(this,args);
        },this);
        return;
      }
      
      /*
       * Check subscription 
       */
      if ( ! qx.lang.Array.contains( this.__channels, name ) )
      {
        this.warn( "Channel '" + name + "' is not subscribed to." );
        return false;
      }
      
      /*
       * publish according to transport mode
       */
      switch( this.__messageTransportOptions.mode )
      {
        case "poll":
          var msg = {
            channel : name,
            data    : data
          };
          this.__pollMessageQueue.push( msg );
          if ( now )
          {
            this.__pollingFunc();
          }
          if( clientAlso )
          {
            this.publish( name, data );
          }
          break;
      }
    },        
        
    
    /*
    ---------------------------------------------------------------------------
      PERMISSIONS
    ---------------------------------------------------------------------------
    */
    
    /**
     * Binds a permission object's 'state' property to the given target property
     * chain.
     * @param permission {String}
     * @param target {qx.core.Object}
     * @param propertyChain {String}
     * @param options {Object}
     */
    bindPermissionState : function( permission, target, propertyChain, options )
    {
      this.getAccessManager().getPermissionManager()
        .create( permission ).bind( "state", target, propertyChain, options );
    },
    
    /**
     * Returns true if the current user has the permission with the given name,
     * otherwise false
     * @param permission {String}
     * @return {Boolean}
     */
    hasPermission : function( permission )
    {
      return this.getAccessManager().getPermissionManager().create( permission ).getState();
    },
    
    /**
     * Adds a listener for the change of the permission state
     * @param permission {String}
     * @param callback {Function}
     * @param context {Object}
     * @return {void}
     */
    addPermissionListener : function( permission, callback, context )
    {
      this.getAccessManager().getPermissionManager().create( permission ).addListener( "changeState", callback, context );
    },
    
    /**
     * Removes a listener for the change of the permission state
     * @param permission {String}
     * @param callback {Function}
     * @param context {Object}
     * @return {void}
     */    
    removePermissionListener : function( permission, callback, context )
    {
      this.getAccessManager().getPermissionManager().create( permission ).removeListener( "changeState", callback, context );
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
     * @todo document session id behavior
     */
    initializeManagers : function()
    {
      /*
       * setup managers
       */ 
      this.setStateManager( new qcl.application.StateManager( this ) );
      this.setRpcManager( new qcl.io.RpcManager( this ) );
      this.setAccessManager( new qcl.access.AccessManager( this ) );
      this.setConfigManager( new qcl.application.ConfigManager( this ) );
      this.setPluginManager( new qcl.application.PluginManager( this ) );
      // this.setClipboardManager ( new qcl.application.ClipboardManager( this ) );
   
      /*
       * initialize the session id
       */
      this.initSessionId();
      
      /*
       * initialize some managers
       */
      this.getAccessManager().init();
      this.getConfigManager().init();
      
      /*
       * bind the access manager's active user object 
       */
      this.getAccessManager().getUserManager().bind("activeUser", this, "activeUser" );
      
      /*
       * bind the active user's session id 
       */
      this.getAccessManager().getStore().bind("model.sessionId", this, "sessionId" );
    },
    
    /**
     * Initializes the session id for this application. Current behavior: if a sessionId
     * key is in the URL hash-based application state, use its value. Otherwise generate
     * a random md5 hash. 
     */
    initSessionId : function()
    {
      /*
       * set session id from state, or create a random session id for this
       * application
       */
      var sessionId = this.getStateManager().getState("sessionId");
      if ( qx.lang.Type.isString(sessionId) && sessionId.length )
      {
        /*
         * parent and sibling session behavior
         */
        if( sessionId.substr(0,2)=="P_" || sessionId.substr(0,2)=="S_" )
        {
          if( sessionId.split("_").length == 2 )
          {
            sessionId += "_" + qcl.crypto.md5.createRandom();  
          }
        }
        this.setSessionId( sessionId ); 
      }
      else
      {
        this.setSessionId( qcl.crypto.md5.createRandom() );      
      }
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
      qcl.ui.dialog.Dialog.allowServerDialogs( value, new qcl.application.Sandbox( this ) );
    },    
    
    /**
     * Launches a server request
     * @param service {String}
     * @param method {String}
     * @param params {Array}
     * @param callback {Function}
     * @param context {Object}
     */
    rpcRequest : function( service, method, params, callback, context )
    {
      return this.getRpcManager().execute( service, method, params, callback, context );
    },
    
    /*
    ---------------------------------------------------------------------------
       ACCESS
    ---------------------------------------------------------------------------
    */    
    
    /**
     * Returns a safe subset of the active user to the module
     * @return {Object|null} if not null, a Map with the following keys: 
     *   namedId  : (string) alias of username, deprecated
     *   username : (string) the user login name
     *   fullname : (string) the full name of the user
     */
    getActiveUserData : function()
    {
      var activeUser = this.getActiveUser();
      if ( activeUser )
      {
	      return {
	        namedId   : activeUser.getNamedId(),
	        username  : activeUser.getNamedId(),
	        fullname  : activeUser.getFullname()
	      };
      }
      else
      {
        return null;
      }
    },
    
    /**
     * Returns true if the current user is not anonymous
     * @return {Boolean}
     */
    isAuthenticatedUser : function()
    {
      var activeUser = this.getActiveUser();
      return ( activeUser && ! activeUser.isAnonymous() );
    },
    
    /**
     * Call the given function once the user has authenticated. If 
     * the user is already authenticated, call immediately.
     * @param callback {Function}
     * @param context {Object}
     */    
    callOnceWhenAuthenticated : function( callback, context )
    {
      if ( ! this.isAuthenticatedUser() )
      {     
        this.addListenerOnce("changeActiveUser",function(){
          this.callOnceWhenAuthenticated( callback, context );
        },this);
      }
      else
      {
        callback.call( context );
      }
    },    
        
    /**
     * Sets the name of the service that does access-related stuff
     * @param service {String}
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
      var sessionId = this.getSessionId();
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
      this.unsubscribeFromAllChannels(function(){
        this.stopMessageTransport();
        this.getAccessManager().logout( callback, context );
      },this);
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
     * Checks if a config key exists
     * @param key {String}
     * @return {Boolean}
     */
    hasConfigKey : function( key )
    {
      return this.getConfigManager().keyExists( key );
    },
   
    /**
     * Returns a config value
     * @param key {String}
     * @return {var}
     */
    getConfigKey : function ( key )
    {
      return this.getConfigManager().getKey( key );
    },
    
    /**
     * Sets a config value and fire a 'clientChange' event.
     * @param key {String}
     * @param value {unknown} 
     */
    setConfigKey : function (key, value)
    {
      this.getConfigManager().setKey( key, value );
    },
    
    /**
     * Binds a config value to a target widget property, optionally in both
     * directions.
     * @param key {String}
     * @param targetObject {qx.core.Object}
     * @param targetPath {String}
     * @param updateSelfAlso {Boolean} 
     *    Optional, default undefined. If true, change the config value if the 
     *    target property changes
     * @return {void}
     */
    bindConfigKey : function( key, targetObject, targetPath, updateSelfAlso )
    {
      this.getConfigManager().bindKey( key, targetObject, targetPath, updateSelfAlso );
    },
    
    /**
     * Returns object or qx.core.Object (default) with values used for application layout.
     * @param nativeObject {Boolean|undefined} 
     * @return {qx.core.Object|Object}
     * @deprecated This method will be removed.
     */
    getLayoutConfig : function( nativeObject )
    {
      return qx.core.Init.getApplication().getLayoutConfig( nativeObject );
    },

    
   /*
    ---------------------------------------------------------------------------
      APPLICATION STATE
    ---------------------------------------------------------------------------
    */   
    
    /**
     * Sets an application state. If value is NULL, the state is implicitly removed.
     * @param name {String}
     * @param value {String}
     * @return {Boolean}
     */
    setApplicationState : function( name, value )
    {
      if ( value === null )
      {
        this.removeApplicationState( name );
        return false;
      }
      else
      {
        this.getStateManager().setState( name, value );
        return true;
      }
    },
    
    /**
     * Returns the value of an application state
     * @param name {String}
     * @return {unknown}
     */
    getApplicationState : function( name )
    {
      return this.getStateManager().getState( name );
    },    
    
    /**
     * Removes an application state
     * @param name {String}
     */
    removeApplicationState : function( name )
    {
      this.getStateManager().removeState( name );
    },
    
    /**
     * Removes all application state variables
     */
    removeAllApplicationStates : function()
    {
      this.getStateManager().removeAllStates();
    },          
    
    /**
     * Returns a map with all application states
     * @return {Map}
     */
    getApplicationStateMap : function()
    {
      return this.getStateManager().getStates();
    },
    
    /**
     * Subscribes to an application state change
     * @param name 
     *    Name of the state or "*" to monitor all changes
     * @param callback 
     *    The callback is called with a data event containing a map with the 
     *    'name' of the state, the 'value' and the 'old' value
     * @param context {Object}
     *    The execution context of the callback
     * @return {void}
     */
    onApplicationStateChange : function( name, callback, context )
    {
      this.getStateManager().addListener("changeState", function(e){
        if ( e.getData().name === name || e.getData().name == "*" )
        {
          callback.call( context, e );  
        }
      },this);
    },
    
    /*
    ---------------------------------------------------------------------------
       USER INTERACTION
    ---------------------------------------------------------------------------
    */
    
    /**
     * Shows a user notification message in a popup or growl-like way,
     * depending on implementation
     * @param message {String}
     */
    showNotification : function( message )
    {
      this.showPopup( message );
    },
    
    /**
     * Hides the notification message
     */
    hideNotification : function()
    {
      this.hidePopup();
    },
    
    /**
     * Shows an alert box. 
     * @param message {String}
     * @param callback {Function|undefined} 
     *    Optional callback function called when the user clicks on the
     *    OK button.
     * @param context {Object|undefined}
     *    The context object of the callback
     */
    alert : function( message, callback, context )
    {
      dialog.Dialog.alert( message, callback, context );
    },
    
    
    /**
     * Shows an confirmation dialog. 
     * @param message {String}
     * @param callback {Function} 
     *    Callback function called when the user clicks on the
     *    OK or CANCEL button. The callback takes one parameter,
     *    which is true when the user has ok'ed the dialog or false
     *    if she has cancelled.
     * @param context {Object|undefined}
     *    The context object of the callback
     */    
    confirm : function( message, callback, context )
    {
      dialog.Dialog.confirm( message, callback, context );
    },
    
    // todo...
    

    
    /*
    ---------------------------------------------------------------------------
       STARTUP AND TERMINATION
    ---------------------------------------------------------------------------
    */     
    
    /**
     * Called before the page is closed. Call this from the close method 
     * in your main application. 
     * @return
     */
    close : function()
    {  
      if ( this.isConfirmQuit() )
      {  
        return qx.locale.Manager.tr("Do you really want to quit %1?",  this.getApplicationName() );
      }
      return undefined;
    },
    
    /**
     * Called when the page is closed.
     */
    terminate : function()
    {
      // doesn't work
      //this.logout();
    },
    
    /*
    ---------------------------------------------------------------------------
       UTILITY METHODS
    ---------------------------------------------------------------------------
    */        
    
    randomString : function( length ) 
		{
		  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		  var randomstring = '';
		  for (var i=0; i < length; i++) {
		    var rnum = Math.floor(Math.random() * chars.length);
		    randomstring += chars.substring(rnum,rnum+1);
		  }
		  return randomstring;
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