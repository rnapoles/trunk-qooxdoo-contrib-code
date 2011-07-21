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


/**
 * Base class for dialog widgets
 */
qx.Class.define("qcl.ui.dialog.Dialog",
{
  extend : dialog.Dialog,
  
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */     
  statics :
  {
    
    /**
     * The name of the message that is sent to display a dialog
     * @type String
     */
    MESSAGE_NAME : "qcl.ui.dialog.Dialog.createDialog",
  
    /**
     * Returns a instance of the dialog type
     * @param type {String}
     * @return qcl.ui.dialog.Dialog
     */
    getInstanceByType : function(type)
    {      
       try 
       {
         return new qcl.ui.dialog[qx.lang.String.firstUp(type)];
       }
       catch(e)
       {
         this.error(type + "is not a valid dialog type");
       }
    },
    
    /**
     * Turns remote server control on or off. If turned on, you can trigger the
     * display of dialogs using messages which can come from the server.
     * @see #_onServerDialog
     * @param value {Boolean}
     * @param core {qcl.application.Sandbox} The application sandbox instance
     */
    allowServerDialogs : function( value, sandbox )
    {
      var channel = qcl.ui.dialog.Dialog.MESSAGE_NAME;
      this.__sandbox = sandbox;
      if ( value )
      {
        sandbox.subscribeToChannel( channel, this._onServerDialog,this);
      }
      else if( sandbox.isSubscribedChannel( channel) )
      {
        sandbox.unsubscribeFromChannel( channel, this._onServerDialog,this);
      }
    },
    
    /**
     * Handles the dialog request from the server. The message data has to be a
     * map with of the following structure: <pre>
     * {
     *   type : "(alert|confirm|form|login|prompt|select|wizard)",
     *   properties : { the dialog properties WITHOUT a callback },
     *   service : "the.name.of.the.rpc.service",
     *   method : "serviceMethod",
     *   params : [ the, parameters, passed, to, the, service, method ]
     * }
     * </pre>
     */
    _onServerDialog : function( message )
    {
      var data = message.getData();
      if ( data.service )
      {
        var _this = this;
        data.properties.callback = function( result )
        {
          /*
           * push the result to the beginning of the parameter array
           */
          if ( ! qx.lang.Type.isArray( data.params ) )
          {
            data.params = [];
          }
          data.params.unshift(result);
          
          /*
           * send request back to server
           */
          _this.__sandbox.rpcRequest( 
              data.service, data.method, data.params 
          );
        };
      }
      /*
       * deferring the construction of the widget so that errors are 
       * not thrown within request handler
       */
      new qx.util.DeferredCall(function(){
          var widget = dialog.Dialog.getInstanceByType( data.type );          
          widget.set( data.properties );        
          widget.show();
      },this).schedule();    
    }
  }
});