/* ************************************************************************

   JSON-RPC 1.0 and 2.0 implementation running on node.js
   
   Copyright:
     2010 The autors
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (original implementation)
     * Christian Boulanger (port to qooxdoo-contrib & to qooxdoo-rpc )
   
   Dependencies:
     * node-promise (http://github.com/kriszyp/node-promise)

************************************************************************ */

/* ************************************************************************
#ignore(require)
#ignore(nodejs)
#ignore(nodejs.url)
#ignore(nodejs.promise)
#ignore(nodejs.promise.Promise)
************************************************************************ */

/*
 * import node modules as properties of global 
 * 'nodejs' object
 */
nodejs = {
  url         : require('url'),  
  sys         : require('sys'),
  proc        : require("child_process"),     // Child process management
  promise     : require("./lib/promise"),     // Async operations
  promise_fs  : require("./lib/fs-promise")   // Async file system operations
};

/*
 * import qooxdoo-style classes as global objects
 */
qx = require('./lib/qx-oo');
require('./IService');
require('./RpcException');

/**
 * Server class implementing JSON-RPC 1.0 and 2.0
 * 
 * http://json-rpc.org/wiki/specification
 * http://groups.google.com/group/json-rpc/web/json-rpc-1-2-proposal
 * http://groups.google.com/group/json-rpc/web/json-rpc-over-http
 * 
 */
qx.Class.define("rpcnode.Server",
{ 
  extend : qx.core.Object,
  
  /*
   ****************************************************************************
     PROPERTIES
   ****************************************************************************
   */    
  properties : 
  {
    /**
     * The port this server listens on
     * @type 
     */
    port : 
    {
      check : "Integer",
      nullable : false
    },
    
    /**
     * The file server object responsible for serving static content
     * @type 
     */
    httpServer :
    {
      check : "Object",
      nullable : true
    },
    
    version :
    {
      check : ["1.0","2.0"],
      init : "1.0"
    }
  },
  
  
  /*
   ****************************************************************************
     CONSTRUCTOR
   ****************************************************************************
   */    
  
  /**
   * Class constructor
   */
  construct : function( port )
  {
    this.base(arguments);
    this.setPort( port );
    this.__services = {};
  },
    
  /*
   ****************************************************************************
     MEMBERS
   ****************************************************************************
   */  
  members :
  {
   
    /*
     -------------------------------------------------------------------------
       PRIVATE MEMBERS
     -------------------------------------------------------------------------
     */    
    
    __services : null,
    __anonymousServicesCounter : 0,
    __namedServicesCounter : 0,
    
    /*
     -------------------------------------------------------------------------
       SERVER START 
     -------------------------------------------------------------------------
     */      
    
    /**
     * Start the server
     */
    start : function()
    {
      if( ! this.getPort() )
      {
        throw new Error("You need to set a port first.");
      }
      
      
      if ( this.__anonymousServicesCounter === 0 && this.__namedServicesCounter === 0 ) 
      {
        throw new Error("You need to add at least one service object");
      }      
      
      /*
       * create http server
       */
      var self = this;
      var server = require('http').createServer( function( request, response ){
        return self._onHttpRequest( request, response );
      } );
      server.listen( this.getPort() );
      this.setHttpServer(server);
      
      console.log("json-rpc server accepting requests on port " + this.getPort() );
      
    },        
    
    /*
     -------------------------------------------------------------------------
       EVENT HANDLERS
     -------------------------------------------------------------------------
     */        
 
    /**
     * Main event handler. Called when the Server receives a http request.
     * 
     * @param request {http.ServerRequest}
     * @param response {http.ServerResponse}
     */
    _onHttpRequest : function( request, response)
    {
      var rpcRequest = null;
      try
      {
        var query = nodejs.url.parse(request.url,true).query;
        //console.log(nodejs.sys.inspect(query));
        
        /*
         * Handle "old-style" qooxdoo cross-domain json-rpc requests 
         */
        if ( request.method === "GET" && typeof query == "object" && query._ScriptTransport_id )
        {
          var data = JSON.parse( query._ScriptTransport_data );
          rpcRequest = {
            service : data.service || null,
            method  : data.method,
            params  : data.params,
            id      : data.id
          };
          response._ScriptTransport_id = query._ScriptTransport_id;
          this.processRequest( rpcRequest, request, response );
        }
        
        /*
         * handle normal GET requests
         */
        else if ( request.method === "GET" && request.uri && query.method  ) 
        {
          rpcRequest = {
            service : query.service || null,
            method  : query.method,
            params  : JSON.parse(query.params),
            id      : query.id
          };
          this.processRequest( rpcRequest, request, response );
        } 
        
        /*
         * handle POST requests
         */
        else if ( request.method === "POST" )
        {
          request.setBodyEncoding("utf8");
          var body = "";
          request.addListener("body", function(chunk) {
            body += chunk;
          });
    
          var self = this;
          request.addListener("complete", function() {
            rpcRequest = JSON.parse(body);        
            self.processRequest( rpcRequest, request, response );
          }); 
        } 
        
        /*
         * otherwise, invalid request
         */
        else
        {
          this.sendError( response, this.invalidRequest() );
        }
      }
      catch( e )
      {
        this.handleError( e, rpcRequest, response );
      }
    },      
    
    /*
     -------------------------------------------------------------------------
       MAIN API
     -------------------------------------------------------------------------
     */        
    
    /**
     * Adds a service object. If you supply a name as second parameter,
     * the service will be named to support to non-standard "service" parameter
     * in the JSON-RPC request for backwards-compatibility with the existing
     * RPC implementations. If no name is supplied, the object is added to a
     * stack of service object in which the requested service methods will be
     * looked up. 
     * 
     * @param serviceObject {Object}
     * @param name {String|undefined}
     */
    addService : function( serviceObject, name )
    {
      if( ! typeof serviceObject == "object" )
      {
        throw new Error("Invalid argument.");
      }
      
      if ( name )
      {
        this.__namedServicesCounter++;
      }
      else
      {
        name = this.__anonymousServicesCounter++;
      }
      this.__services[name] = serviceObject;
    },
   
    
    /**
     * Process a rpc request
     * @param rpcRequest  {Object|Array}
     *    A map with the request parameters as properties (ver. 1.0 or 2.0)
     *    or an array of maps (ver. 2.0)
     * @param request {http.ServerRequest}
     * @param response {http.ServerResponse}
     */
    processRequest : function( rpcRequest, request, response ) 
    {
      /*
       * batch case for version 2.0
       */
      if ( this.getVersion() == "2.0" && qx.lang.Type.isArray(rpcRequest) ) 
      {
        var results = [];
        var httpCode = 200;
        
        /*
         * iterate through the requests
         */
        for (var i = 0; i < rpcRequest.length; i++) 
        {
          
          results[i] = null;
          var result = this.processSingleRequest( rpcRequest[i], response );
          
          /*
           * async handling
           */
          if ( typeof result == "object" && typeof result.then == "function" ) // FIXME check for promise class 
          {
            results[i] = result;
          } 
          
          /*
           * sync handling
           */
          else 
          {
            results[i] = result.httpCode == 204 ? "NOTIFICATION" : result.response;
          }
        }
 
        /*
         * when all processes have returned, send the assembled result
         */
        var self=this;
        nodejs.promise.all( results, function( promise ) 
        { 
          promise.then( function( res ) {
            /* success */
            self.send(
              response, 
              self.createResponse( res, null, rpcRequest ), 
              rpcRequest.id != null ? 200 : 204
            );                    
          }, 
          function(e) {
            /* error */
            self.handleError(e, rpcRequest, response);
          });
        });
      } 
      
      /*
       * non batch case for non-standard, 1.0 and 2.0
       */      
      else 
      {
        var result = this.processSingleRequest( rpcRequest );
        
        /*
         * async handling
         */
        var self = this;
        if ( this.isPromise( result ) )  
        {
          result.then( function( res ) {
            /* success */
            self.send(
              response, 
              self.createResponse( res, null, rpcRequest ), 
              rpcRequest.id != null ? 200 : 204
            );                    
          }, 
          function(e) {
            /* error */
            self.handleError(e, rpcRequest, response);
          });
        } 
        
        /*
         * sync handling
         */
        else 
        {
          this.send( response, result.response, result.httpCode );
        }
      } 
    },
    
    
    /**
     * Processes a single request.
     * 
     * @param rpcRequest {Object}
     *    The rpc request map
     * @return {unknown}
     *    The return value of the request
     */
    processSingleRequest : function( rpcRequest ) 
    {
      /*
       * validate
       */
      this.checkValidRequest( rpcRequest );
      
      /*
       * named parameter handling
       */
      if ( this.getVersion() == "2.0" )
      {
        if( rpcRequest.params instanceof Object && ! rpcRequest.params instanceof Array )
        {
          rpcRequest.params = this.paramsObjToArr( rpcRequest );
        }
      }
      
      /*
       * execute method on service object
       */
      var serviceObject = this.getServiceObject( rpcRequest );
      var method = rpcRequest.method;

      /*
       * check if method exists
       */
      if ( typeof serviceObject[method] != "function" )
      {
        throw this.methodNotFound( rpcRequest, method );
      }
      
      /*
       * check for param count
       */
      if ( serviceObject[method].length != rpcRequest.params.length) 
      {
        throw this.invalidParams( rpcRequest );
      }
      
      /*
       * get result of method call. 
       */
      var result = serviceObject[method].apply( serviceObject, rpcRequest.params );

      /*
       * check for async requests
       */
      if ( this.isPromise( result ) ) 
      {
        return result;
      } 
      
      /*
       * sync result
       */
      else 
      {
        return {
          httpCode: rpcRequest.id != null ? 200 : 204, 
          response: this.createResponse( result, null, rpcRequest )
        };      
      }
    },
    
    /**
     * Checks if a return value is a promise/deferred object.
     * @param value {unknown} 
     * @return {Boolean}
     */
    isPromise : function( value )
    {
      return ( value && typeof value == "object" && typeof value.then == "function" );
    },
    
    /**
     * Checks if the request is valid. Throws an error object 
     * in case it isn't.
     * 
     * @param rpcRequest {Object}
     * @return {void}
     */
    checkValidRequest : function( rpcRequest ) 
    {
      if ( ! typeof rpcRequest == "object" || ! rpcRequest.method 
           || ! rpcRequest.params || rpcRequest.id === undefined ) 
      {    
        throw this.invalidRequest(rpcRequest);
      }
      
      var params = rpcRequest.params;
      if ( this.getVersion() == "2.0") 
      {
        if ( params instanceof Array || params instanceof Object) 
        {
          return;
        }
      } 
      else if ( params instanceof Array ) 
      {
        return;
      }
      throw this.invalidRequest(rpcRequest);
    },    
    
    
    /**
     * Returns the service object on which the service method will
     * be called.
     * 
     * @param rpcRequest {Object}
     */
    getServiceObject : function( rpcRequest )
    {
      /*
       * if a service name has been supplied ... (non-standard).
       * currently accepts "none" for no service name to work with 
       * the current version of the RpcConsole. This will be removed.
       */
      if( rpcRequest.service && rpcRequest.service !== "none" ) //FIXME
      {
        /*
         * ... check and sanitize service name 
         */
        var service = rpcRequest.service;
        if ( typeof service != "string" || service.match(/[^a-zA-Z\._]/) )
        {
          throw this.invalidService( rpcRequest, service );
        }
        
        /*
         * ... look it up in our services stack
         */
        if ( this.__services[ service ] )
        {
          return this.__services[ service ];
        }
        
        /*
         * not found
         */
        throw this.serviceNotFound( rpcRequest, service );
      }
      
      /*
       * no service name (standard 1.0/2.0 json-rpc spec)
       */
      else
      {
        /*
         * iterate through all registered services to find the method
         * and return the service if found.
         */
        for ( var i=0; i < this.__anonymousServicesCounter; i++)
        {
          if ( typeof this.__services[i][rpcRequest.method] == "function" )
          {
            return this.__services[i];
          }
        }
        
        /*
         * if not found, return with with error
         */
        throw this.methodNotFound( rpcRequest, rpcRequest.method );
      }
    },
    
    /**
     * Sends the jsonrpc response
     * @param response {http.ServerRequest}
     * @param rpcResponse {http.ServerResponse}
     * @param httpCode {Integer}
     */
    send : function( response, rpcResponse, httpCode) 
    {
      var headers, body;
      
      /*
       * "old-style" qooxdoo script transport
       */
      if ( response._ScriptTransport_id )
      {
        httpCode = 200; // overwrite the http code since we're loading an iframe
        headers = {'Content-Type': 'text/javascript'};
        body = 'qx.io.remote.transport.Script._requestFinished(';
        body += response._ScriptTransport_id +',' + JSON.stringify(rpcResponse) + ');';
      }
      
      /*
       * default resposes
       */
      else if ( httpCode != 204 ) 
      {
        headers = {'Content-Type': 'application/json-rpc'};
        body = JSON.stringify( rpcResponse );
      } 
      
      /*
       * notification response
       */
      else 
      {
        headers = {'Connection': 'close'};
      }
      
//      console.log("-----------------------------");
//      console.log("http code: " + httpCode );
//      console.log("headers: " + JSON.stringify(headers));
//      console.log("body: " + body);
//      console.log("-----------------------------");
      
      /*
       * send output
       */
      try
      {
        response.writeHead( httpCode, headers );
        if( body) response.write( body );
      }
      catch(e)
      {
        console.log(e); //FIXME
      }
      response.end();
    },
   
    
    /*
     -------------------------------------------------------------------------
       HELPER METHODS
     -------------------------------------------------------------------------
     */     
    
    /**
     * Helper method to create json response
     * @param result {unknown}
     * @param error {Object|null}
     * @param rpcRequest {Object}
     * @return {Object}
     */
    createResponse : function( result, error, rpcRequest ) 
    {
      /*
       * convert void/undefined result into null value
       * FIXME what do the specs say here?
       */
      if ( typeof result == "undefined" )
      {
        result = null;  
      }
      
      /*
       * create response object
       */
      var rpcResponse = {
        'id'        : ( rpcRequest && rpcRequest.id ) ? rpcRequest.id : null,
        'error'     : error,
        'result'    : result
      };      
      
      /*
       * add 2.0 marker if necessary
       */
      if (this.getVersion() === "2.0") 
      {
        rpcResponse.jsonrpc = "2.0"
      }
      
      return rpcResponse;
    },
    
    /**
     * Takes a rpc object and populates the arguments parameter by inspecting
     * the service method. 
     */
    paramsObjToArr : function(rpcRequest) 
    {
      var argumentsArray = [];
      var service = this.getServiceObject( rpcRequest );
      var argumentNames = this.getArgumentNames(service[rpcRequest.method]);
      for (var i=0; i < argumentNames.length; i++) {
        argumentsArray.push(rpcRequest.params[argumentNames[i]]);
      }
      return argumentsArray;
    },
   
    /**
     * Takes a user-defined function and returns the names of the arguments 
     * as an array by inspecting the method signature.
     *  
     * @param fcn {Function}
     * @return {Array}
     */
    getArgumentNames : function(fcn) 
    {
      var code = fcn.toString();
      var args = code.slice(0, code.indexOf(")")).split(/\(|\s*,\s*/);
      args.shift();
      return args;
    },
    
    /*
     -------------------------------------------------------------------------
       ERROR HANDLING
       @todo This is too complicated currently. We need a uniform error handling
       based on throwing exceptions which are turned into a json-rpc response
     -------------------------------------------------------------------------
     */ 
    
    /**
     * Handles an error message, which can be either a simple object,
     * a native error object or a dedicated user exception object.
     * @param e {Object} The error object
     * @param rpcRequest {Object} The rpc object
     * @param response {http.ServerResponse} The response object
     */
    handleError : function( e, rpcRequest, response )
    {
      /*
       * native error, indicates a programmer mistake
       */
      if( e instanceof Error )
      {
        console.log( e.stack );
        this.sendError( response, this.nativeError( rpcRequest, e ) ); 
      }
      
      /*
       * this is a user-generated exception, that is, thrown
       * in a service method
       */
      else if ( e instanceof rpcnode.RpcException )
      {
        this.sendError( response, this.userError( rpcRequest, e ) );
      }
      
      /*
       * an exception generated in the following methods
       */
      else
      {
        this.sendError( response, e );
      }      
    },
    
    /**
     * Send an error message and log it to the console
     * 
     * @param response {http.ServerResponse}
     *    The response object
     * @param error {Object}
     *    The error object
     */
    sendError : function ( response, error )
    {
      this.send( response, error.response, error.httpCode );
    },    

    
    createError : function(code, message) 
    {
      return {
        code : code, 
        message : message
      };
    },
    
    parseError : function(rpcRequest) 
    {
      return {
        httpCode: 500, 
        response: this.createResponse(null, this.createError(-32700, "Parse error."), rpcRequest)
      };
    },
    
    versionMismatch : function(rpcRequest) 
    {
      return {
        httpCode: 400, 
        response: this.createResponse(null, this.createError(-32600, "Version mismatch. This server accepts only json-rpc version " + this.getVersion() ), rpcRequest)
      };
    },    
    
    invalidrpcRequest : function(rpcRequest) 
    {
      return {
        httpCode: 400, 
        response: this.createResponse(null, this.createError(-32600, "Invalid rpcRequest."), rpcRequest)
      };
    },
    
    invalidService : function(rpcRequest, service ) 
    {
      return {
        httpCode: 400, 
        response: this.createResponse(null, this.createError(-32600, "Invalid Service '" + service + "'."), rpcRequest)
      };
    },    
    
    serviceNotFound : function(rpcRequest, service ) 
    {
      return {
        httpCode: 404, 
        response: this.createResponse(null, this.createError(-32601, "Service '" + service + "' not found."), rpcRequest)
      };  
    },    
    
    methodNotFound : function(rpcRequest, method ) 
    {
      return {
        httpCode: 404, 
        response: this.createResponse(null, this.createError(-32601, "Method '" + method + "' not found."), rpcRequest)
      };  
    },
    
    invalidParams : function(rpcRequest)
    {
      return {
        httpCode: 500, 
        response: this.createResponse(null, this.createError(-32602, "Invalid parameters."), rpcRequest)
      };
    },
    
    internalError : function(rpcRequest) 
    {
      return {
        httpCode: 500, 
        response: this.createResponse(null, this.createError(-32603, "Internal error."), rpcRequest)
      };  
    },
    
    userError : function( rpcRequest, e )
    {
      return {
        httpCode: e.getHttpCode(), 
        response: this.createResponse(null, this.createError( e.getCode(), e.getMessage() ), rpcRequest)
      };  
    },
    
    nativeError : function( rpcRequest, e )
    {
      return {
        httpCode: 500, 
        response: this.createResponse(null, this.createError( -32700, e.message ), rpcRequest)
      };  
    }    
  } 
});