/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
 * Martin Wittemann (martinwittemann)
 * Christian Boulanger (cboulanger)

 ************************************************************************ */

/**
 * 
 * The jsonrpc data store is responsible for fetching data from a json-rpc
 * server backend.
 * 
 * The loaded data will be parsed and saved in qooxdoo objects. Every value of
 * the loaded data will be stored in a qooxdoo property. The model classes for
 * the data will be created automatically.
 * 
 * For the fetching itself it uses the {@link qx.io.remote.Request} class and
 * for parsing the loaded javascript objects into qooxdoo objects, the
 * {@link qx.data.marshal.Json} class will be used.
 * 
 * Until qooxdoo includes a cometd-like service which allows low-latency server
 * push infrastructure, the databinding requests are used to transport events
 * and message between server and client, which "piggyback" on the transport in
 * both directions. Therefore, in the result sent from the server there is an
 * additional data layer. The response has to be a hash map of the following
 * structure.:
 * 
 * <pre>
 * {
 *   // result property should always be provided in order to allow events and messages to be transported
 *   result : 
 *   {
 *     result : { (... result data ...) },
 *     events : [ { type : &quot;event1&quot;, data : ... }, { type : &quot;event2&quot;, data: ... }, ... ],
 *     messages : [ { name : &quot;appname.messages.foo&quot;, data : ... }, { name : &quot;appname.messages.bar&quot;, data: ... }, ... ]
 *   }
 *   // error property only exists if an error occurred 
 *   error : 
 *   {
 *     (... error data ...)
 *   }
 *   id : (int id of rpc request)
 * }
 * </pre>
 * 
 * The "events" and "messages" array elements will be dispatched as events on
 * the sending/receiving object or as public messages.
 * 
 * 
 * 
 */
qx.Class.define("qcl.databinding.event.store.JsonRpc", 
    {
  extend : qx.core.Object,


  /** 
  * @param url {String|null} The url of the jsonrpc service.
  * @param serviceName {String} The name of the service, i.e. "foo.bar"
  * @param serviceMethod  {String} The name of the method, i.e. "doStuff"   
  * @param marshaler {Object|null} The marshaler to be used to create a model 
  *   from the data. If not provided, {@link qx.data.marshal.Json} is used and
  *   instantiated with the 'delegate' parameter as contstructor argument.
  * @param delegate {Object|null} The delegate containing one of the methods 
  *   specified in {@link qx.data.store.IStoreDelegate}. Ignored if a 
  *   custom marshaler is provided
  */
  construct : function( url, serviceName, serviceMethod, marshaler, delegate )
  {
    this.base(arguments);
  
    /*
     * set url, name and method of the service
     */
    if (url != null) 
    {
      this.setUrl(url);
    }
    if (serviceName != null) 
    {
      this.setServiceName( serviceName );
    }
    if (serviceMethod != null) 
    {
      this.setServiceMethod( serviceMethod );
    }    
  
    /* 
     * store the marshaler
     */
    if ( ! marshaler )
    {
      this._marshaler = new qx.data.marshal.Json(delegate);
    }
    else
    {
      this._marshaler = marshaler;
    }
  
    /* 
     * create object pool for rpc objects, doesn't work
     */
    this.__pool = new qx.util.ObjectPool(10);
    for ( var i=0; i<10; i++)
    {
      this.__pool.poolObject( new qx.io.remote.Rpc );
    }

  },


  events : 
  {
    /**
    * Data event fired after the model has been created. The data will be the 
    * created model.
    */
    "loaded": "qx.event.type.Data"
  },


  properties : 
  {  
    /**
    * Property for holding the loaded model instance.
    */
    model : {
      nullable: true,
      event: "changeModel"
    },
  
  
    /**
     * The url where the request should go to.
     */
    url : {
      check: "String"
    },
  
    /** 
     * The service class name on the server that provides data
     * for the store 
     */
    serviceName :
    {
      check : "String"
    },
  
    /**   
     * The service name on the server to pull the data from
     * defaults to "updateStore".
     */
    serviceMethod :
    {
      check : "String",
      init: "updateStore"
    },    
  
    /**
     * The marshaler used to create models from the json data
     */
    marshaler : {
      check: "Object",
      nullable: true
    },  
  
    /**  
     * Timeout for request 
     */
    timeout :
    {
      check : "Integer",
      init : 30000
    },
  
    /**  
     * If jsonrpc is used, whether cross-domain requests will be used  
     */
    allowCrossDomainRequests :
    {
      check : "Boolean",
      init : false
    }


  },


  members :
  {
    /*
    * private members
    */
    __request : null,
    __pool : null,
    __opaqueCallRef : null,
    _responseData : null,
    _marshaler : null,


    /**
     * Loads the data from a service method asynchroneously. 
     * @param serviceMethod {String} Method to call
     * @param params {Array} Array of arguments passed to the service method
     */
    load : function( serviceMethod, params, finalCallback  )
    {
      this._sendJsonRpcRequest( 
          serviceMethod||this.getServiceMethos(), 
          params,
          finalCallback
      );
    },

    /**
     * Reloads the data.
     */
    reload: function() 
    {

    },   




    /** 
     * Creates and sends a GET request with the given url. Additionally two
     * listeners will be added for the state and the completed event of the 
     * request.
     * @return {qx.io.remote.Rpc}
     */
    _createRequest: function() 
    {

      /* 
       * get new request object from pool and configure it
       */
      var rpc = this.__pool.getObject( qx.io.remote.Rpc );
      rpc.setTimeout( this.getTimeout() );
      rpc.setUrl( this.getUrl() );
      rpc.setServiceName( this.getServiceName() );
      rpc.setCrossDomain( this.getAllowCrossDomainRequests() );

      /*
       * Application state is sent as server data (piggybacking on the request
       * to update the server about the state). (is ignored if application
       * doesn't support application state) @todo rewrite, remove if we have a
       * cometd implementation
       */
      var app = qx.core.Init.getApplication();
      if ( typeof app.getStates == "function" )
      {
        rpc.setServerData( app.getStates() );  
      }

      return rpc;
    },


    /** 
     * Send json-rpc request with arguments
     * @param serviceMethod {String} Method to call
     * @param params {Array} Array of arguments passed to the service method
     */
    _sendJsonRpcRequest : function( serviceMethod, params, finalCallback )
    {

      var rpc = this._createRequest();

      /*
       * tag the current object instance for closures
       */
      var _this = this;

      /*
       * create callback function
       */
      var callbackFunc = function( data, ex, id ) 
      {

        /*
         * discard request object
         */
        rpc.dispose();
        delete rpc;

        /*
         * save data for debugging etc.
         */
        _this._responseData = data;

        /*
         * notify of end of request @todo get rid of this after rewriting the
         * qcl request queue manager
         */
        var m = new qx.event.message.Message("qcl.databinding.messages.rpc.end", (new Date).getTime() );
        m.setSender( _this );
        qx.event.message.Bus.dispatch( m );

        /*
         * show that no request is underway
         */
        _this.__opaqueCallRef = null ;

        /*
         * handle messages and events
         */
        if ( data && ( data.messages || data.events ) ) 
        {
          _this.__handleEventsAndMessages( _this, data );
        }        

        /*
         * check for error
         */
        if ( ex == null ) 
        {  

          /* 
           * The result data is either
           * in the 'result' property of the object (qcl) or the object
           * itself.
           */
          if ( data.result )
          {
            _this.__handleResponseData( data.result, finalCallback ); 
          }
          else
          {
            _this.__handleResponseData( data, finalCallback );
          }
        } 
        else 
        {
          /* 
          * dispatch error message  
          * we're using a message and not an error message or event
          * so that all error messages can be dealt with in a central
          * location
          */
          qx.event.message.Bus.dispatch( 
              "qcl.databinding.messages.rpc.error",
              ex.message
          );
          _this.warn ( "Async exception (#" + id + "): " + ex.message );

          /*
           * notify that data has been received but failed
           */
          _this.fireDataEvent("loaded",null);

        }

      }     

      /*
       * send request 
       */
      params = params || [];
      params.unshift( serviceMethod );
      params.unshift( callbackFunc );
      this.__opaqueCallRef = rpc.callAsync.apply( rpc, params );

    },

    /**
     * handles events and messages received with server response
     */
    __handleEventsAndMessages : function ( obj, data )
    {
      /*
       * server messages
       */
      if( data.messages && data.messages instanceof Array )
      {
        data.messages.forEach( function(message){
          qx.event.message.Bus.dispatch( message.name, message.data ); 
        });
      }

      // server events
      if( data.events && data.events instanceof Array )
      {
        data.events.forEach( function(event)
            {
          obj.fireDataEvent( event.type, event.data ); 
            });
      }       
    },


    /**
     * Handles response data
     */
    __handleResponseData : function( data, finalCallback ) 
    {


      // create the class
      this._marshaler.jsonToClass( data, true);

      // set the initial data
      this.setModel( this._marshaler.jsonToModel(data) );

      // fire complete event
      this.fireDataEvent( "loaded", this.getModel() );

      /*
       * final callback
       */
      if ( typeof finalCallback == "function" )
      {
        finalCallback.call(null, data);
      }       

    },   

    /**
     * Aborts the current request
     */
    abort : function()
    {
      if ( this.__opaqueCallRef )
      {
        this.getCurrentRequest().abort( this.__opaqueCallRef );
      }

    }

  }
});