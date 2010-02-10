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
     * @see #_onMessage
     */
    allowServerControl : function( value )
    {
      var messageName = "qcl.ui.dialog.Dialog.createDialog";
      if ( value )
      {
        qx.event.message.Bus.getInstance().subscribe( messageName, this._onMessage,this);
      }
      else
      {
        qx.event.message.Bus.getInstance().unsubscribe( messageName, this._onMessage,this);
      }
    },
    
    /**
     * Handles the message. The message data has to be a map with of the following
     * structure: <pre>
     * {
     *   type : "(alert|confirm|form|login|select|wizard)",
     *   properties : { the dialog properties WITHOUT a callback },
     *   service : "the.name.of.the.rpc.service",
     *   method : "serviceMethod",
     *   params : [ the, parameters, passed, to, the, service, method ]
     * }
     * </pre>
     */
    _onMessage : function( message )
    {
      var data = message.getData();
      if ( data.service )
      {
        data.properties.callback = function( result )
        {
          /*
           * push the result to the beginning of the parameter array
           */
          if ( ! data.params || ! data.params instanceof Array )
          {
            data.params = [];
          }
          data.params.unshift(result);
          
          /*
           * send request back to server
           */
          qx.core.Init.getApplication().executeService( 
              data.service, data.method, data.params 
          );
        }
      }
      var widget = qcl.ui.dialog.Dialog.getInstanceByType(data.type);
      widget.set( data.properties );
      widget.show();
    }
  }
});