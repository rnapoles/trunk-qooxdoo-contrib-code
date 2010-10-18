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
     * Subscribes to a message name
     * @param name {String} The name of the message
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
     * Unsubscribes from a message name
     * @param name {String} The name of the message
     * @param callback {Function} A function that is called when the message is 
     *    published 
     * @param context {Object} The context object
     * @return {void}
     */
    unsubscribe : function( name, callback, context )
    {
      this.__core.unsubscribe( name, callback, context );
    },    
    
    /**
     * Publishes a message
     * @param name {String}
     * @param message {unknown}
     * @return {void}
     */
    publish : function( name, message )
    {
      this.__core.publish( name, message );
    },
    
    /*
    ---------------------------------------------------------------------------
       USER MANAGEMENT
    ---------------------------------------------------------------------------
    */
    
    callOnceWhenAuthenticated : function( callback, context )
    {
      this.__core.addListenerOnce("changeActiveUser",function(){
        if ( this.__core.isAuthenticatedUser() )
        {
          callback.call( context );
        }
        else
        {
          this.callOnceWhenAuthenticated( callback, context );
        }
      },this);
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
     * Shows a user notification message in a popup or growl-like way,
     * depending on implementation
     * @param message {String}
     */
    showNotification : function( message )
    {
      this.__core.showNotification( message );
    },
    
    /**
     * Hides the notification message.
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
     * 
     * @param {} service
     * @param {} method
     * @param {} params
     * @param {} callback
     * @param {} context
     * @return {}
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