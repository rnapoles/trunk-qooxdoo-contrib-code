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

/*
 * import node modules as local vars
 */
var
  url     = require('url'),  
  sys     = require('sys'),
  promise = require("./lib/promise"); // Async operations

/*
 * import qx as global var 
 */
qx = require('./lib/qx-oo');
  
/**  
 * Marker interface for services that are dynamically loaded 
 * from the filesystem. This is to prevent malicious clients 
 * from trying to execute non-rpc service methods. 
 */
qx.Interface.define("rpcnode.IService",{}); 


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
      var server = require('http').createServer( function( req, res ){
        return self._onHttpRequest( req, res );
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
     * @param {http.ServerRequest} req
     * @param {http.ServerResponse} res
     */
    _onHttpRequest : function(req, res)
    {
      var query = url.parse(req.url,true).query;
      console.log(sys.inspect(query));
      
      try
      {
        /*
         * Handle "old-style" qooxdoo cross-domain json-rpc requests 
         */
        if ( req.method === "GET" && query._ScriptTransport_id )
        {
          var data = JSON.parse( query._ScriptTransport_data );
          var rpcRequest = {
            service : data.service || null,
            method  : data.method,
            params  : data.params,
            id      : data.id
          };
          res._ScriptTransport_id = query._ScriptTransport_id;
          this.processRequest( rpcRequest, res );
        }
        
        /*
         * handle normal GET requests
         */
        else if ( req.method === "GET" && req.uri && query.method  ) 
        {
          var rpcRequest = {
            service : query.service || null,
            method  : query.method,
            params  : JSON.parse(query.params),
            id      : query.id
          };
          this.processRequest( rpcRequest, res );
        } 
        
        /*
         * handle POST requests
         */
        else if ( req.method === "POST" )
        {
          req.setBodyEncoding("utf8");
          var body = "";
          req.addListener("body", function(chunk) {
            body += chunk;
          });
    
          var self = this;
          req.addListener("complete", function() {
            var rpcRequest = JSON.parse(body);        
            self.processRequest(rpcRequest, res);    
          }); 
        } 
        
        /*
         * otherwise, invalid request
         */
        else
        {
          this.sendError( res, this.invalidRequest() );
        }
      }
      catch( error )
      {
        this.sendError( res, error );
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
     * @param {Object} serviceObject
     * @param {String|undefined} name
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
     * @param {Object|Array} rpcRequest 
     *    A map with the request parameters as properties (ver. 1.0 or 2.0)
     *    or an array of maps (ver. 2.0)
     * @param {Object} res 
     *    The response object
     */
    processRequest : function( rpcRequest, res ) 
    {
      /*
       * batch case for version 2.0
       */
      if ( this.getVersion() == "2.0" && qx.lang.Type.isArray(rpcRequest) ) 
      {
        var response = [];
        var httpCode = 200;
        
        /*
         * iterate through the requests
         */
        for (var i = 0; i < rpcRequest.length; i++) 
        {
          
          response[i] = null;
          var result = this.processSingleRequest( rpcRequest[i], res );
          
          /*
           * async handling
           */
          if (result instanceof promise.Promise) 
          {
            response[i] = result;
          } 
          
          /*
           * sync handling
           */
          else 
          {
            response[i] = result.httpCode == 204 ? "NOTIFICATION" : result.response;
          }
        }
 
        /*
         * when all processes have returned, send the assembled result
         */
        var self=this;
        promises.all( response, function( finish ) 
        { 
          finish.when( function( result ) {
            /* success */
            self.send(
              res, 
              self.createResponse(result, null, rpcRequest), 
              rpcRequest.id != null ? 200 : 204
            );                    
          }, 
          function(e) {
            /* error */
           throw self.internalError( rpcRequest );
           return;
          });
        });
      } 
      
      /*
       * non batch case
       */      
      else 
      {
        var response = this.processSingleRequest(rpcRequest, res);
        
        /*
         * async handling
         */
        var self = this;
        if (response instanceof promise.Promise) 
        {
          response.when( function(result) {
            /* success */
            self.send(
              res, 
              self.createResponse(result, null, rpcRequest), 
              rpcRequest.id != null ? 200 : 204
            );                    
          }, 
          function(e) {
            /* error */
             throw self.internalError( rpcRequest );   
             return;
          });
        } 
        
        /*
         * sync handling
         */
        else 
        {
          this.send(res, response.response, response.httpCode);
        }
      } 
    },
    
    
    /**
     * Processes a single request.
     * 
     * @param {Object} rpcRequest
     *    The rpc request map
     * @param {Object} res
     *    The response object
     * @return {unknown}
     *    The return value of the request
     */
    processSingleRequest : function( rpcRequest, res ) 
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
       * get result of method call. if an error is thrown inside the function,
       * throw an internal error
       */
      try
      {
        var result = serviceObject[method].apply( serviceObject, rpcRequest.params );
      }
      catch (e) 
      {
        return this.internalError( rpcRequest );
      }
      
      /*
       * check for async requests
       */
      if (result instanceof promise.Promise) 
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
          response: this.createResponse(result, null, rpcRequest)
        };      
      }
    },
    
    /**
     * Checks if the request is valid. Throws an error object 
     * in case it isn't.
     * 
     * @param {Object} rpcRequest
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
     * @param {Object} rpcRequest
     */
    getServiceObject : function( rpcRequest )
    {
      /*
       * if a service name has been supplied ... (non-standard)
       * 
       */
      if( rpcRequest.service && rpcRequest.service !== "none" ) //FIXME
      {
        /*
         * ... check and sanitize service name 
         */
        var service = rpcRequest.service;
        if ( typeof service != "string" || service.match(/[^a-zA-Z_]/) )
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
         * ok, not there, try loading it. Must be placed in the same directory
         * and implement the rpcnode.Service marker interface.
         */
        try
        {
          var obj = require( "./" + service );
          if( ! qx.class.hasInterface( rpcnode.Service ) )
          {
            throw this.invalidService( rpcRequest, service );
          }
          
          /*
           * cache object and return it
           */
          this.__services[ service ] = obj;
          return obj;
        }
        catch( e )
        {
          throw this.serviceNotFound( rpcRequest, service );
        }
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
     * @param {http.ServerRequest} res
     * @param {http.ServerResponse} rpcRespone
     * @param {Integer} httpCode
     */
    send : function(res, rpcResponse, httpCode) 
    {
      var headers, body = JSON.stringify(rpcResponse);
      
      /*
       * "old-style" qooxdoo script transport
       */
      if ( res._ScriptTransport_id )
      {
        httpCode = 200;
        headers = {'Content-Type': 'text/javascript'};
        body = 'qx.io.remote.transport.Script._requestFinished(';
        body += res._ScriptTransport_id +',' + JSON.stringify(rpcResponse) + ');';
      }
      
      /*
       * default resposes
       */
      else if ( httpCode != 204 ) 
      {
        headers = {'Content-Type': 'application/json-rpc'};
      } 
      
      /*
       * notification response
       */
      else 
      {
        headers = {'Connection': 'close'};
        body = "";
      }
      
      console.log("http code: " + httpCode );
      console.log("headers: " + JSON.stringify(headers));
      console.log("body: " + body);
      
      /*
       * send output
       */
      res.writeHead(httpCode, headers );
      res.write(body);
      res.end();
    },
    
    /**
     * Send an error message and log it to the console
     * 
     * @param {Object} res
     *    The response object
     * @param {Object} error
     *    The error object
     */
    sendError : function (res, error )
    {
      console.log( JSON.stringify( error.response ) ); // FIXME 
      this.send( res, error.response, error.httpCode );
    },
    
    /**
     * Helper method to create json response
     * @param {unknown} result
     * @param {Object|null} error
     * @param {Object} rpcRequest
     * @return {Object}
     */
    createResponse : function(result, error, rpcRequest) 
    {
      if (this.getVersion() === "2.0") 
      {
        var rpcResponse = {
          jsonrpc: "2.0"
        };
        error != null ? rpcResponse.error = error : rpcResponse.result = result
        rpcResponse.id = rpcRequest && rpcRequest.id ? rpcRequest.id : null;
        return rpcResponse;
      } 
      else 
      {
        return {
          result : result || null,
          error : error || null,
          id : rpcRequest && rpcRequest.id ? rpcRequest.id : null 
        };    
      }
    },
    
    /**
     * Takes a rpc object and populates the arguments parameter by inspecting
     * the service method. 
     */
    paramsObjToArr : function(rpcRequest) 
    {
      var argumentsArray = [];
      var argumentNames = this.getArgumentNames(exports.service[rpcRequest.method]);
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
       @todo use real error objects
     -------------------------------------------------------------------------
     */ 

    createError : function(code, message) 
    {
      return {
        code : code, 
        message : message
      };
    },
    
    parseError : function() 
    {
      return {
        httpCode: 500, 
        response: this.createResponse(null, this.createError(-32700, "Parse error."), null)
      };
    },
    
    versionMismatch : function(request) 
    {
      return {
        httpCode: 400, 
        response: this.createResponse(null, this.createError(-32600, "Version mismatch. This server accepts only json-rpc version " + this.getVersion() ), request)
      };
    },    
    
    invalidRequest : function(request) 
    {
      return {
        httpCode: 400, 
        response: this.createResponse(null, this.createError(-32600, "Invalid Request."), request)
      };
    },
    
    invalidService : function(request, service ) 
    {
      return {
        httpCode: 400, 
        response: this.createResponse(null, this.createError(-32600, "Invalid Service '" + service + "'."), request)
      };
    },    
    
    serviceNotFound : function(request, service ) 
    {
      return {
        httpCode: 404, 
        response: this.createResponse(null, this.createError(-32601, "Service '" + service + "' not found."), request)
      };  
    },    
    
    methodNotFound : function(request, method ) 
    {
      return {
        httpCode: 404, 
        response: this.createResponse(null, this.createError(-32601, "Method '" + method + "' not found."), request)
      };  
    },
    
    invalidParams : function(request)
    {
      return {
        httpCode: 500, 
        response: this.createResponse(null, this.createError(-32602, "Invalid params."), request)
      };
    },
    
    internalError : function(request) 
    {
      return {
        httpCode: 500, 
        response: this.createResponse(null, this.createError(-32603, "Internal error."), request)
      };  
    }
  } 
});

exports.Server   = rpcnode.Server;
exports.IService = rpcnode.IService;