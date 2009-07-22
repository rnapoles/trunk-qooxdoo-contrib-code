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
#require(qcl.ui.dialog.Alert)
#require(qcl.ui.dialog.Confirm)
#require(qcl.ui.dialog.Login)
#require(qcl.ui.dialog.Form)
#require(qcl.ui.dialog.Select)
************************************************************************ */

/**
 * Class definition
 */
qx.Class.define("access.Main",
{
  extend : qx.application.Standalone,
  include : [ qcl.application.MApplication ],

  properties :
  {
    server :
    {
      check    : "String",
      nullable : false,
      apply    : "_applyServer",
      event    : "changeServer"
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
                   * Setup authentication and config without
                   * setting the service methods
                   */

      this.setupAuthentication();
      this.setupConfig();

      /*
                   * setup server state, this will configure
                   * the service methods and start auth/config
                   */

      if (!this.getState("server")) {
        this.setServer("qcl");
      } else {
        this.updateState("server");
      }

      /*
                   * pre-configure login popup singleton for later use
                   */

      var loginPopup = qcl.ui.dialog.Dialog.getInstanceByType("login");

      loginPopup.set(
      {
        callback    : this.checkLogin,
        allowCancel : true,
        image       : "access/qooxdoo-logo.gif",
        text        : "<h3>QCL Login Widget</h3><p>Enter any of the username/password combinations <br/>from the first group box.</p>"
      });

      /*
                   * allow remote user interaction
                   */

      qcl.ui.dialog.Dialog.allowServerControl(true);

      /*
                   * Greet the user!
                   */

      this.alert("Welcome to the Access Demo Application!");
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
      qx.core.Init.getApplication().authenticate(username, password, function(data)
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

          qx.core.Init.getApplication().loadConfig();
        }
      },
      this);
    },


    /**
     * Starts the server dialog
     *
     * @return {void} 
     */
    startServerDialog : function() {
      this.executeService("access.ApplicationController", "serverDialog1");
    },


    /**
     * TODOC
     *
     * @return {void} 
     */
    logoutUser : function()
    {
      /*
                   * call parent method to log out
                   */

      this.logout(function()
      {
        /*
                         * load configuration data for anonymous
                         */

        this.loadConfig();
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
      /*
                   * remove the session of the other server if exists
                   */

      if (old) {
        this.removeState('sessionId');
      }

      /*
                   * set the state
                   */

      this.setState("server", version);

      /*
                   * set the new values according to server version
                   */

      switch(version)
      {
        case "1.0":
          this.setServerUrl("../services/index.php");
          this.getAuthStore().setServiceName("access.SimpleAuthController");
          this.getConfigStore().setServiceName("access.SimpleConfigController");
          this.info("Server: changed to 1.0 version.");
          break;

        case "qcl":
          this.setServerUrl("../services/server.php");
          this.getAuthStore().setServiceName("access.AuthController");
          this.getConfigStore().setServiceName("access.ConfigController");
          this.info("Server: changed to trunk version.");
          break;

        default:
          this.alert("Invalid server version");
      }

      /*
                   * re-authenticate and load new config values
                   */

      this.startAuthentication(function() {
        this.loadConfig();
      }, this);
    }
  }
});