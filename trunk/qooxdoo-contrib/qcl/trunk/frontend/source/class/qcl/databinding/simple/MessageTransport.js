/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************

#module(qcl.databinding)

************************************************************************ */

/**
 * An object which transports/forwards messages from the client to the server or
 * from the server to the client. 
 * 
 * - Client-Server tranport uses a jsonrpc call
 * - Server-Client uses a polling mechanism and piggybacks on other qx.databinding
 *   rpc calls
 *   
 */
qx.Class.define("qcl.databinding.simple.MessageTransport",
{
  extend : qx.core.Target,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * Create a new instance
   * 
   * @param filter {String} message filter, can be truncated by "*"
   * @param mode {String} either "toClient" or "toServer"
   * @type constructor
   */
  construct : function(filter,mode)
  {
    this.base(arguments);
    this.setFilter(filter);
    this.setMode(mode);
  },


  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /*
    ---------------------------------------------------------------------------
      PROPERTIES
    ---------------------------------------------------------------------------
    */
    
    /** whether message forwarding is enabled */
    enabled :
    {
      check : "Boolean",
      init : true
    },
    
    
    /** filter for message names */
    filter :
    {
      check : "String",
      init : "*"
    },

    /** mode of transport */
    mode :
    {
      check : ['forward','poll'],
      apply : "_applyMode"
    },    
    
    /** the method to be used for data transport */
    transport :
    {
      check : [ "get", "post", "jsonrpc" ],
      init : "jsonrpc"
    },

    /** polling frequency in ms */
    interval :
    {
      check : "Integer",
      init : 0,
      apply : "_applyInterval"
    },
    
    /** 
     * jsonrpc/get/post: the remote uri of the datasource 
     * defaults to php backend
     * @todo set default path in qx:application attribute
     */ 
    serviceUrl :
    {
      check : "String",
      init : "../../backend/php/services/index.php"
    },

    /** jsonrpc: the service class name on the server */
    serviceName :
    {
      check : "String"
    },

    /** jsonrpc: the service name on the server  */
    serviceMethod :
    {
      check : "String",
      init: "updateClient"
    },

    /** request id   */
    requestId :
    {
      check : "String",
      init: ""
    },

    /** timeout for request */
    timeout :
    {
      check : "Integer",
      init : 10000
    },

    /** if jsonrpc is used, whether cross-domain requests will be used  */
    allowCrossDomainRequests :
    {
      check : "Boolean",
      init : false
    }
    
  },

  
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * sets up an message transport in the specified direction
     *
     * @type member
     * @param direction
     * @return {void}
     */
    _applyMode : function(mode)
    {
      switch (mode)
      {
        case "forward":
          this._createMessageTransportToServer();
          break;
        case "poll":
          this._createMessageTransportToClient();
          break;
        default:
          this.error("Invalid message transfer mode");
      }
    },

    /**
     * specifies the interval between polling requests
     *
     * @type member
     * @param interval {Integer} interval in ms
     * @return {void}
     */
    _applyInterval : function(interval,oldInterval)
    {
      if (this.getMode() != "poll" )
      {
        this.error("Interval can only be set in 'poll' mode" );
        return false;
      }
      if (interval != oldInterval)      
      {
        if (oldInterval)
        {
          this.getTimer().stop();
        }
        if (interval)
        {
          this.getTimer().setInterval(interval);
          this.getTimer().start();
        }
      }
    },


    /**
     * handles events and messages received with server response
     */
    __handleEventsAndMessages : function ( obj, data )
    {
      // server messages
      if( data.messages && data.messages instanceof Array )
      {
        data.messages.forEach( function(message)
        {
          qx.event.message.Bus.dispatch( message.name, message.data ); 
        });
      }

      // server events
      if( data.events && data.events instanceof Array )
      {
        data.events.forEach( function(event)
        {
          obj.createDispatchDataEvent( event.type, event.data ); 
        });
      }       
    },

    /**
     * gets the timer for polling
     *
     * @type member
     * @return {qx.client.Timer}
     */  
    getTimer : function()
    {
      return this._timer;
    },
    
    /**
     * forwards messages from client to server
     *
     * @type member
     * @return {void}
     */
    _createMessageTransportToServer : function(name)
    {
      if ( !this.getFilter() )
      {
        this.error("Declare filter property BEFORE mode property!");
        return false;
      }
      
      var _this = this;
      qx.event.message.Bus.subscribe( this.getFilter(), function(message)
      { 
        if ( ! _this.getEnabled() ) return false;
        
        switch (_this.getTransport())
        {
          // use JSON-RPC
          case "jsonrpc":
            var rpc = new qx.io.remote.Rpc();
            rpc.setTimeout(_this.getTimeout());
            rpc.setUrl(_this.getServiceUrl());
            rpc.setServiceName(_this.getServiceName() );
            rpc.setCrossDomain(_this.getAllowCrossDomainRequests());
            var request = rpc.callAsync(
              function(data, ex, id)
              { 
                /*
                 * dispose objects
                 */
                request.dispose();
                delete request;
                rpc.dispose();
                delete rpc;
                
                /*
                 * check for errors
                 */            
                if (ex == null) 
                {
                   /* 
                    * handle messages and events
                    */
                   if (data.messages || data.events) 
                   {
                     _this.__handleEventsAndMessages(_this,data)
                   }
                } 
                else 
                {
                  /*
                   * notify subscribers
                   */
                  qx.event.message.Bus.dispatch( 
                    "qcl.databinding.messages.rpc.error", 
                    ex.message 
                  );
                }
              }, 
              _this.getServiceMethod(),
              message.getName(),
              message.getData(),
              this.getRequestId()
            );
            break;
            
           default:
            this.error ("Method not implemented");
            break;         
        }
      },this);
    },

    /**
     * forwards events from server to client
     *
     * @type member
     * @return {void}
     */
    _createMessageTransportToClient : function(name)
    {
      /*
       *  create timer
       */
      this._timer = new qx.client.Timer( this.getInterval() );
      
      /*
       * add interval event
       */
      this._timer.addEventListener("interval", function(message)
      { 
        if ( ! this.isEnabled() || this._requestPending ) return false;
        
        switch ( this.getTransport() )
        {
          /*
           * use JSON-RPC
           */
          case "jsonrpc":
          
            var rpc = new qx.io.remote.Rpc();
            rpc.setTimeout(this.getTimeout());
            rpc.setUrl(this.getServiceUrl());
            rpc.setServiceName(this.getServiceName() );
            rpc.setCrossDomain(this.getAllowCrossDomainRequests());
            var _this = this;
            var request = rpc.callAsync(
            function(data, ex, id)
            {
              /*
               * dispose objects @todo: recycle!
               */
              
              request.dispose();
              delete request;
              rpc.dispose();
              delete rpc;
               
              /*
               * unblock other requests
               */ 
              _this._requestPending = null;
              
              /*
               * check if interval has changed
               */
              _this.getTimer().setInterval( _this.getInterval() );
              
              /*
               * check for errors
               */
              if (ex == null) 
              {
                /*
                 * handle messages and events
                 */
                if (data.messages || data.events) 
                {
                  _this.__handleEventsAndMessages(_this,data)
                }
              } 
              else 
              {
                /*
                 * there was an error, stop polling 
                 */
                _this.getTimer().stop();
                
                /*
                 * notify subscribers
                 */
                qx.event.message.Bus.dispatch( "qcl.databinding.messages.rpc.error", ex.message );
              }
             }, 
             this.getServiceMethod(),
             this.getRequestId()
           );
            
            /*
             * block any other polling request until this one has returned
             */
            this._requestPending = rpc;
            break;
            
          default:
            this.error ("Method not implemented");
            break;         
        }
      },this);
      
      /*
       * start timer
       */
      if ( this.getEnabled() && this.getInterval() )
      {
        this.getTimer().start();
      }
    }
    
  },

  /*
  ***************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function() {
    this._timer = null;
  }
});
