/**
 * event handlers for qcl.components.login.window.Simple
 **/
qx.Class.define('qcl.components.login.window.SimpleHandlers',
{

  members :
  {
     /**
     * Event handler for qcl.components.loginWidget.window.Simple
     * Event type 'execute'
     * @param event {qx.event.type.Event} Event object
     * @param target {qx.core.Target} Event target object
     * @return void
     */
    onSubmit : function(event,target)
    {
      var username = this.usernameField.getValue();
      var password = this.passwordField.getValue();
      
      if ( ! username )
      {
        alert(target.tr("You have to supply a username"));
        return;
      }
      var data = {
        'username' : username,
        'password' : password
      };
      qx.event.message.Bus.dispatch("qcl.auth.messages.loginAttempt", data);
      this.passwordField.setValue("");
    }
  }
});