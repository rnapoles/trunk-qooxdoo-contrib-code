/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2006 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)

************************************************************************ */


/**
 * A native window that monitors the jsonrpc requests and responses
 */
qx.Class.define("qcl.components.jsonrpc.MonitorWindow",
{
  
  extend : qx.client.NativeWindow,
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    
    this.base(arguments);
    this.setName("debugHtml");
    this.setUrl("../../backend/php/services/qcl/lib/listCollapse/listCollapse.html");
    
    /*
     * setup location
     */
    this.set({
      top    : 0,
      right  : 0,
      width  : 600,
      height : 400
    });
    

    
    /*
     * check for firebug in the window
     */
    this.addEventListener("load",function()
    {  
      
      qx.client.Timer.once(function() 
      {
        if ( ! this._window.console )
        {
          this._window.document.writeln (
             "<div style='color:red'>Firebug not available...</div>"
          );
          this._window.console = {
            log : function ( msg )
            {
             // implement 
            },
            warn : function ( msg )
            {
              // implement
            },
            error : function ( msg )
            {
              alert(msg);
            },
            dir : function ( obj )
            {
              // implement
            }          
          }
        }  
               
        /*
         * setup message listeners
         */
        var bus = qx.event.message.Bus.getInstance();
        bus.subscribe("qcl.databinding.messages.rpc.end",this.handleRequestEnd,this);
        bus.subscribe("qcl.messages.htmlDebug", this.handleHtmlDebug, this );
      },this,1000);
    },this);
    
  },


  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * Debug response data to the firebug console
     */
    handleRequestEnd : function(message)
    {
      
      /*
       * get requesting object and response data
       */
      var reqObj = message.getSender();
      var data   = reqObj.getResponseData();

      /*
       * log it to the firebug console
       */
      if ( this._window && this._window.console )
      {
        this._window.console.dir(data);  
      }
    },
    
    /**
     * Write html debug data to the document
     * @param {Object} message
     */
    handleHtmlDebug : function(message)
    {
      if ( this._window )
      {
        try 
        {
          var html = message.getData();        
          var doc  = this._window.document;
          var node = doc.createElement("span");
          node.innerHTML = html;  
          doc.body.appendChild(node);
        }
        catch(e)
        {
          this.warn(e);
        }
      }
    }
  }
});
