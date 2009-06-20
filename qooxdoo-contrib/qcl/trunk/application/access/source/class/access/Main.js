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
      this.startAuthentication("qcl.test.Auth");

      /*
       * configuration
       */
      this.loadConfiguration("qcl.test.Config");

      /*
       * login popup
       */

      var loginPopup = qcl.components.login.Popup.getInstance();
      loginPopup.setCallback(this.checkLogin);
      loginPopup.setImage("/Bibliograph/qooxdoo-contrib/qcl/trunk/application/access/source/resource/access/qooxdoo-logo.gif");
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
        if ( data.error ) {
          callback.call(context, false, data.error);
        } else {
          callback.call(context, true);
        }
      },this);
    },


    /**
     * TODOC
     *
     * @param value {var} TODOC
     * @param old {var} TODOC
     * @return {void} 
     */
    _applyFoo : function(value, old) {
      this.setState("foo", value);
    },


    /**
     * TODOC
     *
     * @return {void} 
     */
    finalize : function() {
      this.info("Finalizing..");
    }
  }
});

/*
       * turn on browser history support
       */
// this.setHistorySupport(true);