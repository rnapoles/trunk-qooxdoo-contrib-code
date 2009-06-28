/* ************************************************************************
#asset(access/*)
#require(qcl.components.login.Popup)
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
      check : "String",
      nullable : false,
      apply : "_applyServer"
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

      /*
       * the URL of the jsonrpc server
       */
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
      if ( ! this.getState( "server" ) )
      {
        this.setServer( "1.0" );
      }
      else
      {
        this.updateState("server");
      }
      
      /*
       * configure login popup
       */
      var loginPopup = qcl.components.login.Popup.getInstance();
      loginPopup.setCallback(this.checkLogin);
      loginPopup.setImage("access/qooxdoo-logo.gif");
      loginPopup.setText("<h3>QCL Login Widget</h3><p>Enter any of the username/password combinations <br/>from the first group box.</p>");
      
      /*
       * what to do when authentication fails: display message
       * in popup. 
       */
      loginPopup.addListener("loginFail", function(event) {
        loginPopup.setMessage(event.getData());
      }, this);
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
     * TODOC
     *
     * @return {void} 
     */
    logoutUser : function()
    {
      /*
       * call parent method to log out
       */
      this.logout(function(){
        /*
         * load configuration data for anonymous
         */
        this.loadConfig();                
      }, this);

    },


    /**
     * Changes the backend
     *
     * @param version {var} TODOC
     * @return {void} 
     */
    _applyServer : function( version, old )
    {
      /*
       * remove the session of the other server if exists
       */
      if( old )
      {
        this.removeState('sessionId');  
      }
      
      /*
       * set the state
       */
      this.setState("server", version );
      
      /*
       * set the new values according to server version
       */
      switch(version)
      {
        case "1.0":
          this.setServerUrl("../services/index.php");
          this.getAuthStore().setServiceName("Access.SimpleAuthController");
          this.getConfigStore().setServiceName("Access.SimpleConfigController");
          this.info("Server: changed to 1.0 version.");
          break;

        case "qcl":
          this.setServerUrl("../services/server.php");
          this.getAuthStore().setServiceName("Access.AuthController");
          this.getConfigStore().setServiceName("Access.ConfigController");
          this.info("Server: changed to trunk version.");
          break;
          
        default:
          this.alert("Invalid server version");
      }
      
      /*
       * re-authenticate and load new config values
       */
      this.startAuthentication(function(){
        this.loadConfig();
      },this);
    }
  }
});