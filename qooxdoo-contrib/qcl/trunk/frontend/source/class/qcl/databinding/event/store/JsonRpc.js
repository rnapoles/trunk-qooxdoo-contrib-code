/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2009 Christian Boulanger

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
 *     events : [ { type : "fooEvent", data : ... }, { type : "barEvent", data: ... }, ... ],
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
      this.setMarshaler( new qx.data.marshal.Json(delegate) );
    }
    else
    {
      this.setMarshaler( marshaler );
    }
  
    /* 
     * create one JSON-RPC object
     */
     this.__rpc = new qx.io.remote.Rpc;
     
    /*
     * create store id
     */ 
     this.setStoreId( this.uuid() );

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
     * The unique id of the store, used to identify itself on the server
     */
    storeId :
    {
      check : "String",
      nullable : false
    },
    
   /**
    * Property for holding the loaded model instance.
    */
    model : 
    {
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
    },
    
    /**
     * This property allows the synchronization of data through
     * events. It has to exist in the controller and the store and
     * be bound together
     */
    dataEvent : 
    {
      check : "qx.event.type.Data",
      nullable : true,
      event : "changeDataEvent",
      apply : "_applyDataEvent"
    },
    
    useEventTransport :
    {
      check : "Boolean",
      init : false,
      event : "changeUseEventTransport",
      apply : "_applyUseEventTransport"
    },
    
    /** 
     * The polling frequency in ms
     */
    interval :
    {
      check : "Integer",
      init : 2
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
    __rpc : null,


    /** 
     * Loads the data from a service method asynchroneously. 
     * @param serviceMethod {String} Method to call
     * @param params {Array} Array of arguments passed to the service method
     * @param finalCallback {function} The callback function that is called with
     *   the result of the request
     * @param context {Object} The context of the callback function     
     */
    load : function( serviceMethod, params, finalCallback, context  )
    {
      this._sendJsonRpcRequest( 
          serviceMethod||this.getServiceMethos(), 
          params,
          finalCallback, 
          context
      );
    },

    /** 
     * Configures the request object
     * @return {qx.io.remote.Rpc}
     */
    _configureRequest: function() 
    {

      /* 
       * configure request object
       */
      var rpc = this.__rpc;
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
     * @param finalCallback {function} The callback function that is called with
     *   the result of the request
     * @param context {Object} The context of the callback function
     */
    _sendJsonRpcRequest : function( serviceMethod, params, finalCallback, context )
    {

      var rpc = this._configureRequest();

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
         * save data for debugging etc.
         */
        _this._responseData = data;

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
            _this.__handleResponseData( data.result, finalCallback, context ); 
          }
          else
          {
            _this.__handleResponseData( data, finalCallback, context );
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
     * Handles events and messages received with server response 
     * @param obj {Object} Context
     * @param data {Object} Data
     * @return {Void}
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
      return;
    },

 
    /** 
     * Handles response data 
     * @param data {Object} The response data
     * @param finalCallback {function} The callback function that is called with
     *   the result of the request
     * @param context {Object} The context of the callback function
     */
    __handleResponseData : function( data, finalCallback, context ) 
    {
      /*
       * create the class
       */
      this.getMarshaler().jsonToClass( data, true);

      /*
       * set the initial data
       */
      this.setModel( this.getMarshaler().jsonToModel(data) );

      /*
       * fire complete event
       */
      this.fireDataEvent( "loaded", this.getModel() );

      /*
       * final callback
       */
      if ( typeof finalCallback == "function" )
      {
        finalCallback.call( context, data );
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
    },
    
    _applyDataEvent : function( event, old )
    {
      if ( event )
      {
        if ( event.getTarget() !== this )
        {
          //this.info( "Propagating received event '" + event.getType() + "' from " + event.getTarget() + " to bound controllers...");
          this.saveDataEvent( event );          
        }
      }
    },
    
    __timerId : null,
    
    _applyUseEventTransport : function ( value, old )
    {
      /*
       * remove the old timer, if exists
       */
      if ( this.__timerId  )      
      {
        qx.util.TimerManager.getInstance().stop( this.__timerId );
        this.unregisterStore();
      }
      
       if ( value )
       {
        /*
         * start the timer
         */    
        this.__timerId = qx.util.TimerManager.getInstance().start(
          this._poll,
          this.getInterval() * 1000,
          this
        );
        this.registerStore();
       }
    },
    
    /*
     * register with server
     */    
    registerStore : function()
    {
       this.load("register",[this.getStoreId()],function(data){
         this.info(data);
       }, this );  
    },
    
    /*
     * unregister from server
     */
    unregisterStore : function()
    {
       this.load("unregister",[this.getStoreId()],function(data){
         this.info(data);
       }, this );   
    },
    
    _poll : function()
    {
      this.load("getEvents",[this.getStoreId(),this.getDataEvents()],function(data){
       this._handleServerEvents(data.events);
      }, this );
    },
    
    __dataEvents : [],
    
    getDataEvents : function()
    {
      var events = this.__dataEvents;
      this.__dataEvents = [];
      return events;
    },
    
    saveDataEvent : function( event )
    {
      if ( ! event || ! this.getUseEventTransport() ) return;
      
      var ed = event.getData();
      var type = event.getType();
      
      if ( !ed || ! type )
      {
        this.warn("Invalid event!");
        return;
      }
      
      ed.eventType = type;
      ed.data = [];
      var target = event.getTarget();
      
      switch ( type )
      {
       
        case "change": 
           /*
            * handle range
            */
           for ( var i=ed.start; i<= ed.end; i++)
           {
             switch ( ed.type )
             {
               /* 
                * add a node
                */
               case "add":
                 ed.data.push( target.getData()[i]);
                 break;
                 
              /*
               * move a node
               */
               case "move":
                 this.error("Not implmemented");
             }
           }  
           break;

        case "changeBubble":
          
          /*
           * change data
           */
          var _this  = this;
          ed.name   = ed.name.replace(/^data\[([0-9]+)\]/,function(m,sourceNodeId){
            var serverNodeId = target.getServerNodeId( parseInt(sourceNodeId) ) ;
            return "getData()[" + serverNodeId + "]";
          });
          break;
       }
      
      /*
       * save the event
       */
      this.__dataEvents.push( ed );
    },
    
    /**
     * Handles the events sent by the server
     */
    _handleServerEvents : function( events )
    {
      
      for ( var i=0; i < events.length; i++)
      {
        var ed = events[i];
        ed.isServerEvent = true;
        var type = ed.eventType;
        delete ed.eventType;
        
        var event = new qx.event.type.Data;
        event.init(ed);
        event.setType(type);
        event.setTarget(this);
        
        this.setDataEvent(null);
        this.setDataEvent(event);

      }
    },
    
    
   /*
     
    Adapted from
    
    File: Math.uuid.js
    Version: 1.3
    Change History:
      v1.0 - first release
      v1.1 - less code and 2x performance boost (by minimizing calls to Math.random())
      v1.2 - Add support for generating non-standard uuids of arbitrary length
      v1.3 - Fixed IE7 bug (can't use []'s to access string chars.  Thanks, Brian R.)
      v1.4 - Changed method to be "Math.uuid". Added support for radix argument.  Use module pattern for better encapsulation.

    Latest version:   http://www.broofa.com/Tools/Math.uuid.js
    Information:      http://www.broofa.com/blog/?p=151
    Contact:          robert@broofa.com
    ----
    Copyright (c) 2008, Robert Kieffer
    All rights reserved.

    Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

        * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
        * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
        * Neither the name of Robert Kieffer nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    */

    /*
     * Generate a random uuid.
     *
     * USAGE: Math.uuid(length, radix)
     *   length - the desired number of characters
     *   radix  - the number of allowable values for each character.
     *
     * EXAMPLES:
     *   // No arguments  - returns RFC4122, version 4 ID
     *   >>> Math.uuid()
     *   "92329D39-6F5C-4520-ABFC-AAB64544E172"
     * 
     *   // One argument - returns ID of the specified length
     *   >>> Math.uuid(15)     // 15 character ID (default base=62)
     *   "VcydxgltxrVZSTV"
     *
     *   // Two arguments - returns ID of the specified length, and radix. (Radix must be <= 62)
     *   >>> Math.uuid(8, 2)  // 8 character ID (base=2)
     *   "01001010"
     *   >>> Math.uuid(8, 10) // 8 character ID (base=10)
     *   "47473046"
     *   >>> Math.uuid(8, 16) // 8 character ID (base=16)
     *   "098F4D35"
     */
    uuid : function (len, radix) 
    {
      var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');  
      var chars = CHARS, uuid = [], rnd = Math.random;
      radix = radix || chars.length;

      if (len) {
        // Compact form
        for (var i = 0; i < len; i++) uuid[i] = chars[0 | rnd()*radix];
      } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (var i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | rnd()*16;
            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r & 0xf];
          }
        }
      }

      return uuid.join('');
    }
  },
  
  destruct : function()
  {
    this.unregisterStore();
  }
});


