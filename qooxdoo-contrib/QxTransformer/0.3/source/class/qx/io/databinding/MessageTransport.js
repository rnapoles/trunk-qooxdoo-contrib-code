/* ************************************************************************

  qooxdoo simple message bus system - message transport

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger

************************************************************************ */

/* ************************************************************************

#module(io.databinding)

************************************************************************ */

/**
 * An object which transports/forwards messages from the client to the server or
 * from the server to the client. 
 * 
 * - Client-Server tranport uses a jsonrpc call
 * - Server-Client uses a polling mechanism and piggybacks on other qx.databinding
 *   rpc calls
 *   
 * NOTE: THIS CLASS IS DEPRECATED AND HAS MOVED TO A DIFFERENT NAMESPACE! 
 * USE THE qcl.databinding PACKAGE INSTEAD, AVAILABLE FROM
 * https://qooxdoo-contrib.svn.sourceforge.net/svnroot/qooxdoo-contrib/trunk/qooxdoo-contrib/qcl
 *  
 * @deprecated   
 *   
 */
qx.Class.define("qx.io.databinding.MessageTransport",
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

    /** the remote uri of the datasource  */
    serviceUrl :
    {
      check : "String"
    },

    /** the service class name on the server */
    serviceName :
    {
      check : "String"
    },

    /** the service name on the server */
    serviceMethod :
    {
      check : "String"
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
			       function(result, ex, id){
			        request.reset();
			        request.dispose();
	            request = null; // dispose rpc object            
	            if (ex == null) {
	              // dispatch response events
	              if (typeof result=="object" && typeof result.__messages == "object" )
	              {
	               _this._dispatchMessages(result.__messages);
	              }
	            } else {
	              // generic error handling; todo: proper error handling
	              _this.error ("Async(" + id + ") exception: " + 
                    "origin: " + ex.origin +
                    "; code: " + ex.code +
                    "; message: " + ex.message
                );
	            }
	           }, 
	           _this.getServiceMethod(),
	           message.getName(),
	           message.getData()
	          );
	          break;
	          
	         default:
            this.error ("Method not implemented");
            break;         
        }
      },this);
    },

    /**
     * dispatches a hash map of messages
     * @param messages {Object}
     * @type member
     * @return {void}
     */
    _dispatchMessages : function ( msgs )
    {
      for (var key in msgs)
      {
        var m = new qx.event.message.Message(key, msgs[key]);
        m.setSender(this);
        qx.event.message.Bus.dispatch(m);
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
     * forwards events from server to client
     *
     * @type member
     * @return {void}
     */
    _createMessageTransportToClient : function(name)
    {
      // create timer
      this._timer = new qx.client.Timer( this.getInterval() );
      
      // add interval event
      this._timer.addEventListener("interval", function(message)
      { 
        if ( !this.getEnabled() ) return false;
        
        switch ( this.getTransport() )
        {
          // use JSON-RPC
          case "jsonrpc":
			      var rpc = new qx.io.remote.Rpc();
			      rpc.setTimeout(this.getTimeout());
			      rpc.setUrl(this.getServiceUrl());
			      rpc.setServiceName(this.getServiceName() );
		        rpc.setCrossDomain(this.getAllowCrossDomainRequests());
		        var _this = this;
			      var request = rpc.callAsync(
			      function(result, ex, id){
			        // dispose rpc object
			        request.reset();
			        request.dispose();
	            request = null; 
	            
	            //check if interval has changed
	            _this.getTimer().setInterval( _this.getInterval() );
	            
	            if (ex == null) {
	              // dispatch response events
	              if (typeof result=="object" && typeof result.__messages == "object" )
	              {
	               _this._dispatchMessages(result.__messages);
	              }
	            } else {
	              // generic error handling;
	              _this.getTimer().stop();
	              _this.error ("Async(" + id + ") exception: " + 
                    "origin: " + ex.origin +
                    "; code: " + ex.code +
                    "; message: " + ex.message
                );
	            }
	           }, 
	           this.getServiceMethod()
	          );
	          break;
	          
	         default:
            this.error ("Method not implemented");
            break;         
        }
      },this);
      
      // start timer
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
