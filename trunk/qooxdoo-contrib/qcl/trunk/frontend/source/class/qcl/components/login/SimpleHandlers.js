/**
 * qooxdoo class containing all extracted handler code as methods.
 **/
qx.Class.define('qcl.ApplicationEventHandlers',
{
  extend : qx.application.Gui,

  members :
  {
     /**
     * Event handler for login-window-simple.xml, line 89
     * Event type 'execute'
     * @param event {qx.event.type.Event} Event object
     * @param target {qx.core.Target} Event target object
     * @return void
     */
    onSubmit : function(event,target)
    {
      var username = loginWindow_username.getValue();
      var password = loginWindow_password.getValue();
      
      if ( ! username )
      {
        alert(target.tr("You have to supply a username"));
        return;
      }
      var data = {
        'username'    : username,
        'password'    : password
      };
      qx.event.message.Bus.dispatch("qcl.auth.messages.loginAttempt", data);
      loginWindow_password.setValue("");
    }
  }
});