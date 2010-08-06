/* ************************************************************************

   Copyright:
     2010 The authors
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************

#asset(socket/*)

************************************************************************ */

/**
 * A socket implementation based on Socket.IO
 * @see http://socket.io/
 */
qx.Class.define("nodesocket.Socket",
{
  extend : qx.core.Object,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * 
   * @param host {String}
   * @param port {Integer} 
   * @param channel {String} 
   */
  construct : function(host,port) 
  {
    this.base(arguments);
    io.setPath("../server/socket.io/");
    this.__socket = new io.Socket(host,{'port':port});
    this.__socket.connect();  
    this.__socket.addEvent('message', qx.lang.Function.bind( this._onServerMessage, this ) );
  },
  
  members :
  {
    getSocket : function()
    {
      return this.__socket; 
    },
    
    _onServerMessage : function(data)
    {
      var msg = qx.util.Json.parse( data );
      //console.log( [ "received message" , msg ]);
      if ( qx.lang.Type.isArray( msg.buffer ) )
      {
        this.__preventRedispatch = true;
        msg.buffer.forEach( function(msg) {
          //console.log( ["dispatching batched message ",msg.channel, msg.data]);
          qx.event.message.Bus.dispatchByName( msg.channel, msg.data );
        },this);
        this.__preventRedispatch = false;
      } 
      else 
      {
        this.__preventRedispatch = true;
        //console.log( ["dispatching normal message ",msg.channel, msg.data]);
        qx.event.message.Bus.dispatchByName( msg.channel, msg.data );
        this.__preventRedispatch = false;
      }
    },
    
    addServerChannel : function( channel )
    {
      qx.event.message.Bus.subscribe( channel, function( e ){
        if ( ! this.__preventRedispatch )
        {
          this.getSocket().send(qx.util.Json.stringify({
            'channel' : e.getName(),
            'data'    : e.getData()
          }));
        }
      }, this);
    }
  },
  
  /**
   * Destructor
   */
  destruct : function() 
  {
    this.__socket.disconnect();
    this.__socket = null;
  }  
}); 
