/* ************************************************************************

   qcl - the qooxdoo component library
  
   http://qooxdoo.org/contrib/project/qcl/
  
   Copyright:
     2007-2010 Christian Boulanger
  
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
  
   Authors:
   *  Christian Boulanger (cboulanger)
  
************************************************************************ */

/* ************************************************************************
#require(qcl.application.*)
************************************************************************ */

/**
 * This object manages authentication and authorization issues.
 */
qx.Class.define("qcl.access.AccessManager",
{
  
  extend : qx.core.Object,  
 
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties : {
    
     /**
      * The data store used for authentication.
      */
     store :
     {
       check : "qcl.data.store.JsonRpc",
       nullable : true,
       event    : "changeStore"
     },

     /**
      * The user manager
      */
     userManager :
     {
       check : "qx.core.Object", //@todo: interface
       nullable : true,
       event    : "changeUserManager"
     },
     
     /**
      * The permission manager
      */
     permissionManager :
     {
       check : "qx.core.Object", //@todo: interface
       nullable : true,
       event    : "changePermissionManager"
     }
  },

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */  

  construct : function( core )
  {
    this.base(arguments);
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
       PRIVATE MEMBERS
    ---------------------------------------------------------------------------
    */         
    _authenticationSetup : false,
    
    /*
    ---------------------------------------------------------------------------
       APPLY METHODS
    ---------------------------------------------------------------------------
    */          

   /*
    ---------------------------------------------------------------------------
       API METHODS 
    ---------------------------------------------------------------------------
    */       
    
    /**
     * Setup the authentication mechanism.
     * @param authStore {qcl.data.store.JsonRpc}
     */
    init : function( service )
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
        this.setUserManager( qcl.access.UserManager.getInstance() );
      }
      
      if ( ! this.getPermissionManager() )
      {
        this.setPermissionManager( qcl.access.PermissionManager.getInstance() );
      }
      
      if ( ! this.getStore() )
      {
        this.setStore(       
          new qcl.data.store.JsonRpc( null, service, null, null, this.__core.getRpcManager().getRpcObject() ) 
        );
      }

      /*
       * bind the authentication stores data model to the user managers data model
       */
      this.getStore().bind("model", this.getUserManager(), "model");

    }, 

    /**
     * Changes the service name of the store
     * @param service {String}
     */
    setService : function( service )
    {
      this.getStore().setServiceName( service );  
    },
    
    /**
     * Authenticate with session id, if any, otherwise with null to get
     * guest access, if allowed.
     * @param sessiongId {String}
     * @param callback {function|undefined} optional callback that is called
     *   when logout request returns from server.
     * @param context {object|undefined} Optional context for callback function
     */    
    connect : function( sessionId, callback, context)
    {
      if ( typeof sessionId == "function" )
      {
        this.error("Method signature change: connect() must be called with the session id as first parameter ");
      }
      this.getStore().load("authenticate",[ sessionId || null ], callback, context );
    },
    
    /**
     * Authenticates a user with the given password asynchroneously.
     * @param username {String}
     * @param password {String}
     * @param callback {Function}
     * @param context {Object} The context in which the callback is executed
     * @return {void}
     */
    authenticate : function( username, password, callback, context )
    {
       this.getStore().load("authenticate",[ username, password ], callback, context );
    },
    
    /**
     * Shorthand method to return active user
     * @return {qcl.access.User}
     */
    getActiveUser : function()
    {
      return this.getUserManager().getActiveUser();
    },
    
   /**
    * Shorthand method to return a permission object by name
    * FIXME use this shorthand in the core !
    * @return {qcl.access.Permission}
    */    
    getPermission : function( name )
    {
      return this.getPermissionManager().create( name );   
    },
    
    /**
     * Shorthand method to return a permission state
     * FIXME use this shorthand in the core !
     * @return {Boolean}
     */    
     getPermissionState : function( name )
     {
       return this.getPermissionManager().create( name ).getState();   
     },    

    /**
     * Shorthand method to update a permission
     * FIXME use this shorthand in the core !
     * @return {void}
     */        
    updatePermission : function( name )
    {
      this.getPermission( name ).update();
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
      this.getStore().load("logout", null, callback, context );
    }
   
  }
});