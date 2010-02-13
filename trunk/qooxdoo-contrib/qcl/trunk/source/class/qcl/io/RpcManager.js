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

/* ************************************************************************
#require(qcl.application.*)
************************************************************************ */

/**
 * This object manages the json-rpc -based backend communication
 */
qx.Class.define("qcl.io.RpcManager",
{
  
  extend : qx.core.Object,
 
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties : {
      
     /**
      * The RPC object that is shared by all methods that require access
      * to the backend.
      */
     rpcObject : 
     {
       check : "qx.io.remote.Rpc",
       nullable : true,
       event    : "changeRpcObject"
     },
     
     /**
      * The URL of the json-rpc server
      * @type 
      */
     serverUrl :
     {
        check : "String",
        nullable : false
     },
     
     /**
      * The JSONRPC service method that should be called when the application is
      * closed
      */
     serviceMethodOnTerminate :
     {
       check : "String",
       nullable : true
     },
     
    /**
     * Allow dialogs initiated by the server
     */
    allowServerDialogs :
    {
      check : "Boolean",
      init : false,
      apply : "_applyAllowServerDialogs"
    }
  },

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */  

  construct : function()
  {
    this.base(arguments);
    
    /*
     * global rpc object to be reused by for all requests
     */
    if ( ! this.getRpcObject() )
    {
      this.setRpcObject( new qx.io.remote.Rpc() );
    }
  },
  
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  
  members :
  {

    /*
    ---------------------------------------------------------------------------
       PRIVATE MEMBERS
    ---------------------------------------------------------------------------
    */             
    _rpc : null,
    _eventStore: null,
    _appStore : null,
    
    /*
    ---------------------------------------------------------------------------
       APPLY METHODS
    ---------------------------------------------------------------------------
    */          
    
    
    /**
     * Applying the server url will automatically create a rpc object if it 
     * does not exist.
     */
    _applyServerUrl : function( url, old )
    {
      if ( ! this.getRpcObject() )
      {
        this.setRpcObject( new qx.io.remote.Rpc );
      }
      this.getRpcObject().setUrl(url);
    },
    
    /**
     * Turns remote server control on or off. If turned on, you can trigger the
     * display of dialogs using messages which can come from the server.
     * @see #_onServerDialog
     */
    _applyAllowServerDialogs : function( value, old )
    {
      var messageName = "qcl.ui.dialog.Dialog.createDialog";
      if ( value )
      {
        qx.event.message.Bus.getInstance().subscribe( messageName, this._onServerDialog,this);
      }
      else
      {
        qx.event.message.Bus.getInstance().unsubscribe( messageName, this._onServerDialog,this);
      }
    },        
    
    /*
    ---------------------------------------------------------------------------
       STARTUP AND TERMINATION
    ---------------------------------------------------------------------------
    */     
        
    /**
     * Called when the page is closed and unregisteres stores on the server. 
     * If you want to have additional termination
     * action, define a _terminate method in your main application, which is 
     * called after at the end of this method.
     */
    terminate : function()
    {
      /*
       * unregister stores
       */
      if( this.getEventStore() )
      {
        this.getEventStore().unregisterStore();
      }
      
      /*
       * execute terminate function on server
       */
      if ( this.getServiceMethodOnTerminate() && this.getRpcObject() )
      {
        this.execute( this.getServiceMethodOnTerminate() );
      }
       
      /*
       * call application function
       */
       if ( typeof this._terminate == "function" )
       {
         this._terminate();
       }
    },

    /*
    ---------------------------------------------------------------------------
       SERVER COMMUNICATION
    ---------------------------------------------------------------------------
    */
     
    /** 
     * Executes a jsonrpc service method with the rpc object configured in the 
     * main application's constructor
     * @param serviceName {String}
     * @param serviceMethod {String}
     * @param params {Array} Parameters to send to the method
     * @param callback {Function} Callback function that is called with the data returned from the server
     * @param context {Object} The object context in which the callback function is executed
     * @return {void}
     */
    execute : function( serviceName, serviceMethod, params, callback, context )
    {
      
      /* 
       * create all-purpose json store
       */
      if ( ! this._appStore )
      {
        this._appStore = new qcl.data.store.JsonRpc( 
            null, null, null, null, this.getRpcObject() 
        ); 
      }
      
      this._appStore.setServiceName(serviceName);
      this._appStore.execute( serviceMethod, params, callback, context);
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
    _onServerDialog : function( message )
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
          this.execute( 
              data.service, data.method, data.params 
          );
        }
      }
      var widget = dialog.Dialog.getInstanceByType(data.type);
      widget.set( data.properties );
      widget.show();
    
    },
   
    /*
    ---------------------------------------------------------------------------
       EVENT TRANSPORT 
    ---------------------------------------------------------------------------
    */               
   
    /**
     * Start a central mechanism for registered databinding controllers
     * to transport their events to the server through period polling
     * @param interval {Integer|false} If an positive integer, the interval
     * for the polling 
     */
    startEventTransport : function( serviceName, serviceMethod, interval )
    {

      if ( this._eventStore )
      {
        this.warn("Event transport is already running.");
        return;
      }
      if ( ! this.getRpcObject() )
      {
        this.error("No rpc object defined");
      }

      var store = this._eventStore;
      
      if( ! store )
      {
        store = this._eventStore = new qcl.data.store.JsonRpc( null, serviceName);
        store.registerStore();        
      }
      if ( interval )
      {
        if ( isNaN( parseInt( interval ) ) )
        {
          this.error("Invalid interval value");
        }        
        store.setInterval( interval );  
      }
      if ( serviceMethod )
      {
        store.setServiceMethodExchangeEvents( serviceMethod ); 
      }
      store.setUseEventTransport( true );
    },
    
    /**
     * Stop the event transport
     * @return {Void}
     */
    stopEventTransport : function()
    {
      if ( ! this._eventStore )
      {
        this.warn("Event transport is not running.");
        return;
      }
      this.getEventStore().setUseEventTransport(false);
    },

    /** 
     * Returns the event store object
     * @return qcl.data.store.JsonRpc
     */
    getEventStore : function()
    {
      return this._eventStore;
    },
    
    /**
     * Registers a store with the server
     * @param {} store
     */
    registerStore : function( store )
    {
      this.load("register",[ store.getStoreId() ],function(data){
        //this.info(data);
      }, this );  
    },
    
    /**
     * Unregisters a store from the server
     * @param {} store
     */
    unregisterStore : function( store )
    {
      this.load("unregister",[ store.getStoreId() ],function(data){
        //this.info(data);
      }, this );  
    }
  }
});