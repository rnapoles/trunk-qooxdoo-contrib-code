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
     * Christian Boulanger (port to qooxdoo-contrib)

************************************************************************ */

/*
 * import objects
 */
var
  qx      = require('./qx-oo').qx,
  url     = require('url'),
  promise = require("promise"),     // Async operations
  fs      = require('fs-promise'),  // Async filesystem operations
  sys     = require('sys');  
  
  
/**  
 * Marker interface for services that are dynamically loaded 
 * from the filesystem. This is to prevent malicious clients 
 * from trying to execute non-rpc service methods. 
 */
qx.Interface.define("rpcnode.Service",{}); 


/**
 * Server class implementing JSON-RPC 1.0 and 2.0
 * 
 * http://json-rpc.org/wiki/specification
 * http://groups.google.com/group/json-rpc/web/json-rpc-1-2-proposal
 * http://groups.google.com/group/json-rpc/web/json-rpc-over-http
 * 
 * http://nodejs.org/
 * 
 * Creator: Martin Wittemann
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
    __serviceObjectCounter : 0,
    
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

      if ( __services.length === 0) 
      {
        throw new Error("You need to add at least one service object");
      }      
      
      /*
       * create http server
       */
      var server = require('http').createServer( qx.lang.Function.bind( this._onHttpRequest, this ) );
      server.listen( this.getPort() );
      this.setHttpServer(server);
      
    },        
    
    /*
     -------------------------------------------------------------------------
       EVENT HANDLERS
     -------------------------------------------------------------------------
     */        
 
    /**
     * 
     * @param {} req
     * @param {} res
     */
    _onHttpRequest : function(req, res)
    {
      /*
       * handle GET requests
       */
      if (req.method === "GET" && req.uri.params.method) 
      {
        try 
        {
          var rpcRequest = {
            method: req.uri.params.method,
            params: JSON.parse(req.uri.params.params),
            id: req.uri.params.id
          };
          this.processRequest( rpcRequest, res );
        } 
        catch (e) 
        {
          var error = this.parseError();
          this.send( res, error.response, error.httpCode );
        }
  
      /*
       * handle POST requests
       */
      } 
      else 
      {
        req.setBodyEncoding("utf8");
        var body = "";
        req.addListener("body", function(chunk) {
          body += chunk;
        });
  
        req.addListener("complete", qx.lang.Type.bind( function() {
          try 
          {
            var rpcRequest = JSON.parse(body);        
            this.processRequest(rpcRequest, res);
          } 
          catch (e) 
          {
            var error = this.parseError();
            this.send(res, error.response, error.httpCode);        
          }
        }, this) );
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
     * @param {qx.core.Object} serviceObject
     * @param {String|undefined} name
     */
    addServiceObject : function( serviceObject, name )
    {
      if( ! typeof serviceObject == "object" )
      {
        throw new Error("Invalid argument.");
      }
      
      if ( ! name )
      {
        name = this.__serviceObjectCounter++;
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
          finish.when( function(result) {
            /* success */
            self.send(
              res, 
              self.createResponse(result, null, rpcRequest), 
              rpcRequest.id != null ? 200 : 204
            );                    
          }, 
          function(e) {
            /* error */
            var error = self.internalError(rpcRequest);
            self.send(res, error.response, error.httpCode);            
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
        if (response instanceof promise.Promise) {
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
            var error = self.internalError(rpcRequest);
            self.send(res, error.response, error.httpCode);            
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
     * Processes a single request
     * @param {Object} rpcRequest
     * @param {Object} res
     *    The response object
     * @return {}
     */
    processSingleRequest : function(rpcRequest, res ) 
    {
      /*
       * validate
       */
      var error = this.checkValidRequest( rpcRequest );
      if ( typeof error == "object" ) 
      { 
        return error;
      };
      
      /*
       * named parameter handling
       */
      if ( this.getVersion() == "2.0" )
      {
        if( rpcRequest.params instanceof Object && ! rpcRequest.params instanceof Array )
        {
          rpcRequest.params = this.paramsObjToArr(rpcRequest);
        }
      }
      
      /*
       * execute method on service object
       */
      var serviceObject = this.getServiceObject( rpcRequest, res );
      

      /*
       * check if method exists
       */
      if ( typeof serviceObject[rpcRequest.method] != "function" )
      {
        return this.methodNotFound( rpcRequest );
      }
      
      /*
       * check for param count
       */
      if ( serviceObject[rpcRequest.method].length != rpcRequest.params.length) 
      {
        return this.invalidParams( rpcRequest );
      }
      
      /*
       * get result of method call
       */
      try
      {
        var result = serviceObject[rpcRequest.method].apply( serviceObject, rpcRequest.params );
      }
      catch (e) 
      {
        console.log(e);
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
     * Checks if the request is valid. Returns true if valid, or an
     * error object if false
     * 
     * @param {Object} rpcRequest
     * @return {true|Object}
     */
    checkValidRequest : function( rpcRequest ) 
    {
      if ( ! typeof rpcRequest == "object" || ! rpcRequest.method 
           || ! rpcRequest.params || rpcRequest.id === undefined ) 
      {    
        return invalidRequest(rpcRequest);
      }
      
      var params = rpcRequest.params;
      
      if ( this.getVersion() == "2.0") 
      {
        if ( params instanceof Array || params instanceof Object) 
        {
          return true;
        }
      } 
      else 
      {
        if ( params instanceof Array ) 
        {
          return true;
        }
      }
      return this.invalidRequest(rpcRequest);
    },    
    
    
    /**
     * Returns the service object on which the service method will
     * be called
     * 
     * @param {Object} rpcObject
     * @param {Object} res The response object
     */
    getServiceObject : function( rpcReq, res )
    {
      /*
       * if a service name has been supplied ...
       */
      if( rpcReq.service )
      {
        /*
         * ... check and sanitize service name 
         */
        var service = rpcReq.service;
        if ( ! typeof service == "string" || service.match(/[^a-zA-Z_]/) )
        {
          var error = this.invalidService( rpcReq );
          this.send( res, error.response, error.httpCode );
          return;
        }
        
        /*
         * ... look it up in our services stack
         */
        if ( this.__services[ service ] )
        {
          return  this.__services[ service ];
        }
        
        /*
         * ok, not there, try loading it. Must be placed in the same directory
         * and implement the rpcnode.Service marker interface.
         */
        try
        {
          var obj = require( "./" + service );
          if( ! qx.class.hasInterface(rpcnode.Service) )
          {
            var error = this.invalidService( rpcReq );
            this.send( res, error.response, error.httpCode );
            return;
          }
          return obj;
        }
        catch( e )
        {
          var error = this.serviceNotFound( rpcReq );
          this.send( res, error.response, error.httpCode );
          return;
        }
      }
    },
    
    /**
     * Sends the jsonrpc response
     * @param {Object} res
     * @param {Object} rpcRespone
     * @param {Object} httpCode
     */
    send : function(res, rpcRespone, httpCode) 
    {
      /*
       * default resposes
       */
      if (httpCode != 204) 
      {
        res.sendHeader(httpCode, {'Content-Type': 'application/json-rpc'});
        res.sendBody(JSON.stringify(rpcRespone));    
      } 
      
      /*
       * notification response
       */
      else 
      {
        res.sendHeader(204, {'Connection': 'close'});    
      }
      
      res.finish();
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

    /*
     -------------------------------------------------------------------------
       NAMED ARGUMENT HANDLING
     -------------------------------------------------------------------------
     */ 
    
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
    
    invalidService : function(request) 
    {
      return {
        httpCode: 400, 
        response: this.createResponse(null, this.createError(-32600, "Invalid Service."), request)
      };
    },    
    
    serviceNotFound : function(request) 
    {
      return {
        httpCode: 404, 
        response: this.createResponse(null, this.createError(-32601, "Service not found."), request)
      };  
    },    
    
    methodNotFound : function(request) 
    {
      return {
        httpCode: 404, 
        response: this.createResponse(null, this.createError(-32601, "Method not found."), request)
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