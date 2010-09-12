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

#asset(access/*)

************************************************************************ */

/**
 * The main application class
 */
qx.Class.define("access.Main",
{
  extend : qx.application.Standalone,
  include : [ qcl.application.MAppManagerProvider ],

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */  
  
  properties :
  {
    /**
     * The backend server used
     * @type 
     */
    server :
    {
      check    : "String",
      nullable : true,
      apply    : "_applyServer",
      event    : "changeServer"
    }
  },
  
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */    
  members :
  {
    /**
     * Initialize the application
     *
     * @return {void} 
     */
    main : function()
    {
      this.base(arguments);
      
      /**
       * initialize the managers
       */
      this.initializeManagers();

      /*
       * logging
       */
      if (qx.core.Variant.isSet("qx.debug", "on")) {
        qx.log.appender.Native;
      }
      
      this.info("Starting Application...");
      
      /*
       * Setup authentication and configuration without
       * setting the service methods
       */
      this.getAccessManager().init();
      this.getConfigManager().init();

      /*
       * setup server state, this will configure
       * the service methods and start auth/config
       */
      if ( ! this.getStateManager().getState("server") ) {
        this.setServer("rpcphp"); // this updates the state,too
      } else {
        this.getStateManager().updateState("server"); // this updates the property, too
      }

      /*
       * Greet the visitor!
       */
      
      dialog.alert("Welcome to the Access Demo Application!");
    },


    /**
     * Callback function that takes the username, password and
     * another callback function with its context as parameters. 
     * The passed function is called with a boolean value 
     * (true=authenticated, false=authentication failed) and an 
     * optional string value which can contain an error message :
     * callback.call( context, {Boolean} result, {String} message);
     *
     * @param username {String} TODOC
     * @param password {String} TODOC
     * @param callback {Function} The callback function
     * @param context {Object} The execution context of the callback
     * @return {void} 
     */
    checkLogin : function(username, password, callback, context)
    {
    
      var app = qx.core.Init.getApplication();
      app.getAccessManager().authenticate(username, password, function(data)
      {
        if (data.error) {
          callback.call(context, false, data.error);
        }
        else
        {
          /*
           * login was successful
           */
          callback.call(context, true);

          /*
           * load configuration data for this user
           */
          app.getConfigManager().load();
        }
      },
      this);
    },


    /**
     * Log out the current user
     *
     * @return {void} 
     */
    logout : function()
    {
      /*
       * call parent method to log out
       */
      this.getAccessManager().logout(function()
      {
        /*
         * reload configuration data for anonymous
         */
        this.getConfigManager().load();
      },
      this);
    },


    /**
     * Changes the backend server.
     *
     * @param version {var} TODOC
     * @param old {var} TODOC
     * @return {void} 
     */
    _applyServer : function(version, old)
    {
      
      /*
       * remove the session of the other server if exists
       */
      if ( old ) {
        this.getStateManager().removeState('sessionId');
      }

      /*
       * save the state in the URL hash
       */
      this.getStateManager().setState("server", version);

      /*
       * set the new values according to server version
       */
      switch(version)
      {
        case "rpcphp":
          this.getRpcManager().setServerUrl("../services/server_rpcphp.php");
          this.getAccessManager().setService("simple.AuthController");
          this.getConfigManager().setService("simple.ConfigController");
          if ( old )
          {
            dialog.alert("Using RpcPhp server without database backend. Data is saved in PHP session.");  
          }
          break;

        case "qcl":
          this.getRpcManager().setServerUrl("../services/server.php");
          this.getAccessManager().setService("access.auth");
          this.getConfigManager().setService("access.config");
          if ( old )
          {
            dialog.alert("Using qcl server now with real database backend.");  
          }

          break;

        default:
          dialog.alert("Invalid server version");
      }

      /*
       * (re-)authenticate and when done, load new configKey values
       */
      this.getAccessManager().connect( function() {
        this.getConfigManager().load();
      }, this);
    }
  }
});