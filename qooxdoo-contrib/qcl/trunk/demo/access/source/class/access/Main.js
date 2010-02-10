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
#asset(qx/*)
#require(qcl.application.*)
************************************************************************ */

/**
 * Class definition
 */
qx.Class.define("access.Main",
{
  extend : qx.application.Standalone,

  properties :
  {
    /**
     * The backend server used
     * @type 
     */
    server :
    {
      check    : ["rpcphp","qcl"],
      init     : "rpcphp",
      nullable : false,
      apply    : "_applyServer",
      event    : "changeServer"
    },
    
    /**
     * The application manager
     * @type 
     */
    appManager :
    {
      check    : "qcl.application.AppManager",
      nullable : false
    },
    
    /**
     * Flag to indicate if we have an authenticated user
     * @type 
     */
    authenicatedUser :
    {
      check    : "Boolean",
      init     : false
    }
  },

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

      /*
       * logging
       */
      if (qx.core.Variant.isSet("qx.debug", "on")) {
        qx.log.appender.Native;
      }

      this.info("Starting Application...");

      /*
       * application manager
       */
      var appMgr = new qcl.application.AppManager();
      this.setManager(appMgr);
      
      /*
       * Setup authentication and config without
       * setting the service methods
       */
      appMgr.setupAuthentication();
      appMgr.setupConfig();

      /*
       * setup server state, this will configure
       * the service methods and start auth/config
       */
      if (!mgr.getState("server")) {
        this.setServer("qcl");
      } else {
        appMgr.updateState("server");
      }
      
      /*
       * bind the authentication state to a local boolean
       * property, which will be false if there is no user logged 
       * in (initial state) or the user is anonymous (after the backend
       * has connected) and true when a real login has occurred 
       */
      mgr.getUserManager().bind("activeUser",this,"authenticatedUser",{
        converter : function(activeUser){ 
          return ( ! activeUser || activeUser.isAnonymous() ? false : true ) 
        }
      });

      /*
       * Greet the visitor!
       */
      dialog.Dialog.init(); // creates the shorthand methods like dialog.alert()
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
      var appMgr = qx.core.Init.getApplication().getAppManager(); 
      appMgr.authenticate(username, password, function(data)
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
          appMgr.loadConfig();
        }
      },
      this);
    },


    /**
     * TODOC
     *
     * @return {void} 
     */
    logoutUser : function()
    {
      var appMgr = qx.core.Init.getApplication().getAppManager(); 
      /*
       * call parent method to log out
       */
      appMgr.logout(function()
      {
        /*
         * load configuration data for anonymous
         */
        appMgr.loadConfig();
      },
      this);
    },


    /**
     * Changes the backend
     *
     * @param version {var} TODOC
     * @param old {var} TODOC
     * @return {void} 
     */
    _applyServer : function(version, old)
    {
      var appMgr = qx.core.Init.getApplication().getAppManager();
      /*
       * remove the session of the other server if exists
       */
      if (old) {
        appMgr.removeState('sessionId');
      }

      /*
       * save the state in the URL hash
       */
      appMgr.setState("server", version);

      /*
       * set the new values according to server version
       */
      switch(version)
      {
        case "rpcphp":
          appMgr.setServerUrl("../services/server_rpcphp.php");
          appMgr.getAuthStore().setServiceName("access.SimpleAuthController");
          appMgr.getConfigStore().setServiceName("access.SimpleConfigController");
          dialog.alert("Using RpcPhp server now with mockup data.");
          break;

        case "qcl":
          appMgr.setServerUrl("../services/server_qcl.php");
          appMgr.getAuthStore().setServiceName("access.AuthController");
          appMgr.getConfigStore().setServiceName("access.ConfigController");
          dialog.alert("Using qcl server now with real database backend.");
          break;

        default:
          this.alert("Invalid server version");
      }

      /*
       * re-authenticate and load new config values
       */
      appMgr.startAuthentication(function() {
        appMgr.loadConfig();
      }, appMgr);
    }
  }
});