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
 * The sandbox object passed to the application modules and provides them
 * with an interface for the needed functionality. The sandbox has no 
 * access to the application core. See
 * http://developer.yahoo.com/yui/theater/video.php?v=zakas-architecture
 * http://www.slideshare.net/nzakas/scalable-javascript-application-architecture
 */
qx.Class.define("qcl.application.Sandbox",
{
  extend : qx.core.Object,
 
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */  
  
  properties : 
  {
    
  },
  

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * Constructor
   *  
   * @param core {logbuch.Core}
   */
  construct : function( core )
  {  
    this.base(arguments);
    if ( ! qx.Class.implementsInterface( core, qcl.application.Core ) ) 
    {
      this.error("Sandbox must be instantiated with an instance of qcl.application.Core");
    }
    
    // save in "private" variable
    this.__core = core;
    
    this.__channels = [];
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
       PRIVATES
    ---------------------------------------------------------------------------
    */
    
    /**
     * The core application library
     * @type qcl.application.Core
     */
    __core : null,
    
    
    /*
    ---------------------------------------------------------------------------
       MESSAGES
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
      this.__core.subscribe( name, callback, context );
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
      this.__core.subscribeOnce( name, callback, context );
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
      return this.__core.isSubscribed( name, callback, context );
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
      this.__core.unsubscribe( name, callback, context );
    },    
    
    /**
     * Publishes a message
     * @param name {String} The name of the message
     * @param data {unknown} The message data
     * @return {void}
     */
    publish : function( name, data )
    {
      this.__core.publish( name, data );
    },
    
    
    /**
     * Returns true if the message transport is running.
     * @return {Boolean}
     */
    isMessageTransportRunning : function()
    {
      return this.__core.isMessageTransportRunning();
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
     */
    subscribeToChannel : function( name, callback, context, finalCallback, finalContext )
    {
      return this.__core.subscribeToChannel( name, callback, context, finalCallback, finalContext );
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
      return this.__core.isSubscribedChannel( name );
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
    unsubscribeFromChannel : function( name, callback, context, finalCallback, finalContext  )
    {
      return this.__core.unsubscribeFromChannel( name, callback, context, finalCallback, finalContext );
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
      this.__core.publishToChannel( name, data, now, clientAlso );
    },    
    
    /*
    ---------------------------------------------------------------------------
       USER MANAGEMENT
    ---------------------------------------------------------------------------
    */
    
    /**
     * Call the given function once the user has authenticated.
     * @param callback {Function}
     * @param context {Object}
     */
    callOnceWhenAuthenticated : function( callback, context )
    {
      this.__core.callOnceWhenAuthenticated( callback, context );
    },
    
    /**
     * Returns a qx.core.Object with the properties of the active user
     * @return {qx.core.Object}
     */
    getActiveUserData: function()
    {
      return this.__core.getActiveUserData();
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
      this.__core.authenticate( username, password, callback, context );
    },    
     
    isAuthenticatedUser : function()
    {
      return this.__core.isAuthenticatedUser();
    },
    
    /*
    ---------------------------------------------------------------------------
      CONFIG
    ---------------------------------------------------------------------------
    */
    
    /**
     * Checks if a config key exists
     * @param key {String}
     * @return {Boolean}
     */
    hasConfigKey : function( key )
    {
      return this.__core.hasConfigKey( key );
    },
   
    /**
     * Returns a config value
     * @param key {String}
     * @return {var}
     */
    getConfigKey : function ( key )
    {
      return this.__core.getConfigKey( key );
    },
    
    /**
     * Sets a config value and fire a 'clientChange' event.
     * @param key {String}
     * @param value {unknown} 
     */
    setConfigKey : function (key, value)
    {
      this.__core.setConfigKey( key, value );
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
      this.__core.bindConfigKey( key, targetObject, targetPath, updateSelfAlso );
    },
    
    /**
     * Returns object or qx.core.Object (default) with values used for application layout.
     * @param nativeObject {Boolean|undefined} 
     * @return {qx.core.Object|Object}
     * @deprecated This method will be removed
     */
    getLayoutConfig : function( nativeObject )
    {
      return this.__core.getLayoutConfig( nativeObject );
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
      this.__core.bindPermissionState( permission, target, propertyChain, options );
    },
    
    /**
     * Returns true if the current user has the permission with the given name,
     * otherwise false
     * @param permission {String}
     * @return {Boolean}
     */
    hasPermission : function( permission )
    {
      return this.__core.hasPermission( permission );
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
      this.__core.addPermissionListener( permission, callback, context );
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
      this.__core.removePermissionListener( permission, callback, context );
    },    
    
    /*
    ---------------------------------------------------------------------------
       MODULE REGISTRATION
    ---------------------------------------------------------------------------
    */    
    
    register : function( name, module )
    {
      this.__core.register( name, module );
    },
    
    /*
    ---------------------------------------------------------------------------
       USER INTERACTION
    ---------------------------------------------------------------------------
    */
    
    /**
     * Shows a user notification message in a popup 
     * @param message {String}
     * FIXME This should differentiate between growl-like notification and
     * splash-screen-like popups
     * @deprecated This API will change
     */
    showNotification : function( message )
    {
      this.__core.showNotification( message );
    },
    
    /**
     * Hides the notification message.
     * FIXME 
     * @deprecated This API will change
     */
    hideNotification : function()
    {
      this.__core.hideNotification();
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
      this.__core.alert( message, callback, context );
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
      this.__core.confirm( message, callback, context );
    },    
    
    /*
    ---------------------------------------------------------------------------
      SESSION
    ---------------------------------------------------------------------------
    */
    
    /**
     * FIXME: Should the sandbox have access to the session id at all?
     */
    getSessionId : function()
    {
      return this.__core.getSessionId();  
    },

    /*
    ---------------------------------------------------------------------------
      I/O
    ---------------------------------------------------------------------------
    */   
    
    /**
     * Executes a JSON-RPC request.
     * @param service {String} The name of the service
     * @param method {String} The name of the method
     * @param params {Array} An array of arguments passed to the method
     * @param callback {Function} The callback called when the request returns
     *    from the server
     * @param  context {Object} The context of the callback
     * @return {void}
     * @todo The method should return some kind of "Deferred" object with a 
     *    success and failure handler, then we don't need the callback in the arguments.
     */
    rpcRequest : function( service, method, params, callback, context )
    {
      return this.__core.rpcRequest( service, method, params, callback, context );
    },
    
    /*
    ---------------------------------------------------------------------------
      APPLICATION STATE
    ---------------------------------------------------------------------------
    */   
    
    setApplicationState : function( name, value )
    {
      return this.__core.setApplicationState( name, value );
    },
    
    getApplicationState : function( name )
    {
      return this.__core.getApplicationState( name );
    },    
    
    removeApplicationState : function( name )
    {
      return this.__core.removeApplicationState( name );
    },     
    
    getApplicationStateMap : function()
    {
      return this.__core.getApplicationStateMap();
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
      return this.__core.onApplicationStateChange( name, callback, context );
    },
    
    dummy : null
    
  }
});