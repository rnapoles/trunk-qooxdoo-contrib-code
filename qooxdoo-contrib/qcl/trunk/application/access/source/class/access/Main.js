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

  members :
  {
    /**
     * Initialize the application
     *
     * @return {void} 
     */
    main : function()
    {
      /*
             * call parent class' main method
             */

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

      this.setServerUrl("../services/index.php");
      this.info("Starting Application...");

      /*
             * Starting the authentication
             */

      this.startAuthentication("access.SimpleAuthController");

      /*
             * setup and load configuration
             */

      this.setupConfig("access.SimpleConfigController");
      this.loadConfig();

      /*
             * login popup
             */

      var loginPopup = qcl.components.login.Popup.getInstance();
      loginPopup.setCallback(this.checkLogin);
      loginPopup.setImage("access/qooxdoo-logo.gif");
      loginPopup.setText("<h3>QCL Login Widget</h3><p>Enter any of the username/password combinations <br/>from the first group box.</p>");

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
        } else {
          
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
    
    logoutUser : function()
    {
      /*
       * call parent method to log out
       */
      this.logout();
      
      /*
       * load configuration data for anonymous
       */
      this.loadConfig();      
    },


    /**
     * Changes the backend
     *
     * @param version {var} TODOC
     * @return {void} 
     */
    useServer : function(version)
    {
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
      }

      this.removeState("sessionId");
      this.logoutUser();
    }
  }
});