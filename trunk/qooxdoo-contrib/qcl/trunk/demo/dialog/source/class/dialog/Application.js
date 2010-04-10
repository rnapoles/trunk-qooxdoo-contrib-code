/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(dialog/*)
#asset(qx/icon/Tango/48/status/dialog-information.png)
#asset(qx/icon/Tango/22/actions/dialog-ok.png)
#asset(qx/icon/Tango/22/actions/dialog-cancel.png)
#require(qcl.ui.dialog.RemoteWizard)

************************************************************************ */

/**
 * This is the main application class of your custom application "dialog"
 */
qx.Class.define("dialog.Application",
{
  extend : qx.application.Standalone,
  include : [ qcl.application.MAppManagerProvider ],


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

    members :
    {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     */
    main : function()
    {
      // Call super class
      this.base(arguments);
    
      // Enable logging in debug variant
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

    
      /*
       * the URL of the jsonrpc server
       */ 
      this.setServerUrl("../services/server.php");
    
      /*
       * allow remote user interaction
       */
      qcl.ui.dialog.Dialog.allowServerControl(true);    
    
      /*
       * button data
       */
      var buttons = 
      [
         {
           label : "Remote Wizard (Requires RpcPhp backend)",
           method : "createRemoteWizard",
           enabled : true
         },
         {
           label : "Server-initiated dialogs (Requires RpcPhp backend)",
           method : "startServerDialog",
           enabled : true
         }
       ];
    
      /*
       * button layout
       */
      var vbox = new qx.ui.container.Composite();
      vbox.setLayout(new qx.ui.layout.VBox(5));
      var title = new qx.ui.basic.Label("<h2>Dialog Demo</h2>");
      title.setRich(true);
      vbox.add( title );
      buttons.forEach(function(button){
        var btn = new qx.ui.form.Button( button.label );
        btn.addListener("execute",this[button.method],this);
        if ( button.enabled != undefined )
        {
          btn.setEnabled(button.enabled);
        }
        vbox.add(btn);
      },this);
      this.getRoot().add(vbox,{ left: 100, top: 100} );
    
    },
    
    createRemoteWizard : function()
    {
      this.executeService("DialogDemo","setupAccount",[0]);
    },
    
    /**
     * Starts the server dialog
     * @return {void} 
     */
    startServerDialog : function() {
      this.executeService("DialogDemo", "serverDialog1");
    }
  }
});
