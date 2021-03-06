/*
 * Copyright:
 *   2011 Derrell Lipman
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *   * Derrell Lipman (derrell)
 */

/*
#asset(rpcjs/*)
*/

/**
 * JSON-RPC server
 */
qx.Class.define("rpcjs.rpc.Server",
{
  extend : qx.core.Object,

  
  /**
   * Constructor for a JSON_RPC server.
   *
   * @param serviceFactory {Function}
   *   A function which provides an interface to a service method. The
   *   function will be called with a namespaced method name, and an
   *   rpcjs.rpc.error.Error object. Under normal circumstances (success), it
   *   should return a function reference. If the method identified by name is
   *   not available, either because it does not exist, or for some other
   *   reason (e.g. the function's was called in a cross-domain fashion but
   *   the function is not permitted to be used in that fashion), the provided
   *   error object's methods should be used to provide details of the error,
   *   and then the error object should be returned.
   */
  construct : function(serviceFactory)
  {
    // Call the superclass constructor
    this.base(arguments);

    // The service factory is mandatory
    if (! qx.lang.Type.isFunction(serviceFactory))
    {
      throw new Error("Missing service factory function");
    }
    
    // Save the parameters for future use
    this.setServiceFactory(serviceFactory);
  },
  
  properties :
  {
    /**
     * A function which provides an interface to a service method. The
     * function will be called with a namespaced method name, and an
     * rpcjs.rpc.error.Error object. Under normal circumstances (success), it
     * should return a function reference. If the method identified by name is
     * not available, either because it does not exist, or for some other
     * reason (e.g. the function's was called in a cross-domain fashion but
     * the function is not permitted to be used in that fashion), the provided
     * error object's methods should be used to provide details of the error,
     * and then the error object should be returned.
     */
    serviceFactory :
    {
      check    : "Function"
    }
  },

  members :
  {
    /**
     * Process a single remote procedure call request.
     *
     * @param jsonInput {String}
     *   The input string, containing the JSON-encoded RPC request.
     *
     * @return {String}
     *   The JSON response.
     */
    processRequest : function(jsonInput)
    {
      var             timer;      // timeout object
      var             ret;        // error return object
      var             bBatch;     // whether a batch request is received
      var             requests;   // the parsed input request
      var             error;      // an error object
      var             reply;      // a textual reply in case garbage input
      var             protocol;   // protocol version being used
      var             fqMethod;   // fully-qualified method name
      var             service;    // service function to call
      var             result;     // result of calling service function
      var             parameters; // the parameter list for the RPC
      var             run;        // function to run the service call
      var             responses;  // array of responses (in case of batch)
      
      // Assume protocol is 2.0 until we (might) discover otherwise
      protocol = "2.0";

      try
      {
        // Parse the JSON
        requests = qx.lang.Json.parse(jsonInput);
      }
      catch(e)
      {
        // We couldn't parse the request.
        // Get a new version 2.0 error object.
        error = new rpcjs.rpc.error.Error("2.0");
        error.setCode(qx.io.remote.RpcError.v2.error.ParseError);
        error.setMessage("Could not parse request");

        // Build the error response
        ret = 
          {
            jsonrpc : "2.0",
            id      : null,
            error   : qx.lang.Json.parse(error.stringify())
          };

        return qx.lang.Json.stringify(ret);
      }

      // Determine if this is normal or batch mode
      if (qx.lang.Type.isArray(requests))
      {
        // It's batch mode.
        bBatch = true;
        
        // Ensure that there's at least one element in the array
        if (requests.length === 0)
        {
          // Get a new version 2.0 error object.
          error = new rpcjs.rpc.error.Error("2.0");
          error.setCode(qx.io.remote.RpcError.v2.error.InvalidRequest);
          error.setMessage("Empty batch array");

          // Build the error response
          ret = 
            {
              jsonrpc : "2.0",
              id      : null,
              error   : qx.lang.Json.parse(error.stringify())
            };

          return qx.lang.Json.stringify(ret);
        }
      }
      else if (qx.lang.Type.isObject(requests))
      {
        // It's normal mode
        bBatch = false;
        
        // Create an array as if it were batch mode
        requests = [ requests ];
      }
      else
      {
        // Get a new version 2.0 error object.
        error = new rpcjs.rpc.error.Error("2.0");
        error.setCode(qx.io.remote.RpcError.v2.error.InvalidRequest);
        error.setMessage("Unrecognized request type");
        error.setData("Expected an array or an object");

        // Build the error response
        ret = 
          {
            jsonrpc : "2.0",
            id      : null,
            error   : qx.lang.Json.parse(error.stringify())
          };

        return qx.lang.Json.stringify(ret);
      }

      // For each request in the batch (or the single non-batch request)...
      responses = requests.map(
        function(request)
        {
          var             ret;
          var             id;

          // Get the id value to use in error responses
          id = typeof request.id == "undefined" ? null : request.id;

          // Ensure that this is a valid request object
          if (! qx.lang.Type.isObject(request))
          {
            // Get a new version 2.0 error object.
            error = new rpcjs.rpc.error.Error("2.0");
            error.setCode(qx.io.remote.RpcError.v2.error.InvalidRequest);
            error.setMessage("Unrecognized request");
            error.setData("Expected an object");

            // Build the error response
            ret = 
              {
                jsonrpc : "2.0",
                id      : id,
                error   : qx.lang.Json.parse(error.stringify())
              };

            return ret;
          }

          // Determine which protocol to use. Is there a jsonrpc member?
          if (typeof(request.jsonrpc) == "string")
          {
            // Get a new version 2.0 error object.
            error = new rpcjs.rpc.error.Error("2.0");

            // Yup. It had better be "2.0"!
            if (request.jsonrpc != "2.0")
            {
              error.setCode(qx.io.remote.RpcError.v2.error.InvalidRequest);
              error.setMessage("'jsonrpc' member must be \"2.0\".");
              error.setData("Found value " + request.jsonrpc + "in 'jsonrpc'.");

              // Build the error response
              ret = 
                {
                  jsonrpc : "2.0",
                  id      : id,
                  error   : qx.lang.Json.parse(error.stringify())
                };

              return ret;
            }

            // Validate that the method is a string
            if (! qx.lang.Type.isString(request.method))
            {
              error.setCode(qx.io.remote.RpcError.v2.error.InvalidRequest);
              error.setMessage("JSON-RPC method name is missing or " +
                               "incorrect type");
              error.setData("Method name must be a string.");

              // Build the error response
              ret = 
                {
                  jsonrpc : "2.0",
                  id      : id,
                  error   : qx.lang.Json.parse(error.stringify())
                };

              return ret;
            }

            // Validate that the params member is undefined, an object, or an
            // array.
            if (typeof(request.params) != "undefined" &&
                ! qx.lang.Type.isObject(request.params) &&
                ! qx.lang.Type.isArray(request.params))
            {
              error.setCode(qx.io.remote.RpcError.v2.error.InvalidRequest);
              error.setMessage("JSON-RPC params is missing or incorrect type");
              error.setData(
                "params must be undefined, an object, or an array.");

              // Build the error response
              ret = 
                {
                  jsonrpc : "2.0",
                  id      : id,
                  error   : qx.lang.Json.parse(error.stringify())
                };

              return ret;
            }

            // We have what appears to be a valid version 2.0 request
            protocol = "2.0";
          }
          else if (bBatch)
          {
            // We're in batch mode so we had to have been in 2.0 mode
            error.setCode(qx.io.remote.RpcError.v2.error.InvalidRequest);
            error.setMessage("JSON-RPC protocol version is missing.");
            error.setData("Expected 'jsonrpc:\"2.0\"'");

            // Build the error response
            ret = 
              {
                jsonrpc : "2.0",
                id      : id,
                error   : qx.lang.Json.parse(error.stringify())
              };

            return ret;
          }
          else
          {
            protocol = "qx1";

            // Get a qooxdoo-modified version 1 error object
            error = new rpcjs.rpc.error.Error("qx1");

            // Ensure all of the required members are present in the request
            if (! qx.lang.Type.isString(request.service) ||
                ! qx.lang.Type.isString(request.method) ||
                ! qx.lang.Type.isArray(request.params))
            {
              // Invalid. We still send back a 2.0 error object, however.
              error.setCode(qx.io.remote.RpcError.qx1.error.server.Unknown);
              error.setMessage("Missing service, method, or params");

              // Build the error response
              ret = 
                {
                  id      : id,
                  error   : qx.lang.Json.parse(error.stringify())
                };

              return ret;
            }
          }

          // Generate the fully-qualified method name
          fqMethod =
            (protocol == "qx1"
             ? request.service + "." + request.method
             : request.method);

          /*
           * Ensure the requested method name is kosher.  It should be:
           *
           *   First test for:
           *   - a dot-separated sequences of strings
           *   - first character of each string is in [a-zA-Z] 
           *   - other characters are in [_a-zA-Z0-9]
           *
           *   Then verify:
           *   - no two adjacent dots
           */

          // First test for valid characters
          if (! /^[a-zA-Z][_.a-zA-Z0-9]*$/.test(fqMethod))
          {
            // There's some illegal character in the service or method name
            error.setCode(
              {
                "qx1" : qx.io.remote.RpcError.qx1.error.server.MethodNotFound,
                "2.0" : qx.io.remote.RpcError.v2.error.MethodNotFound
              }[protocol]);
            error.setMessage("Illegal character found in service name.");

            // Build the error response
            ret = 
              {
                id      : id,
                error   : qx.lang.Json.parse(error.stringify())
              };

            // If this is v2, we need to add the indicator of such.
            if (protocol == "2.0")
            {
              ret.jsonrpc = "2.0";
            }

            return ret;
          }

          // Next, ensure there are no double dots
          if (fqMethod.indexOf("..") != -1)
          {
            error.setCode(
              {
                "qx1" : qx.io.remote.RpcError.qx1.error.server.MethodNotFound,
                "2.0" : qx.io.remote.RpcError.v2.error.MethodNotFound
              }[protocol]);
            error.setMessage("Illegal use of two consecutive dots " +
                             "in service name.");

            // Build the error response
            ret = 
              {
                id      : id,
                error   : qx.lang.Json.parse(error.stringify())
              };

            // If this is v2, we need to add the indicator of such.
            if (protocol == "2.0")
            {
              ret.jsonrpc = "2.0";
            }

            return ret;
          }

          // Use the registered callback to get a service function associated
          // with this method name.
          service = this.getServiceFactory()(fqMethod, protocol, error);

          // Was there an error?
          if (service == null)
          {
            // Yup. Is this a notification?
            if (typeof request.id == "undefined")
            {
              // Yes. Just return undefined so the error is ignored.
              return undefined;
            }

            // Build error response. The error was set in the service factory.
            ret = 
              {
                id    : request.id,
                error : qx.lang.Json.parse(error.stringify())
              };
            
            // If this is v2, we need to add the indicator of such.
            if (protocol == "2.0")
            {
              ret.jsonrpc = "2.0";
            }

            return ret;
          }

          // Were we given a parameter array, or a parameter map, or none?
          if (qx.lang.Type.isArray(request.params))
          {
            // Use the provided parameter list
            parameters = request.params;
          }
          else if (qx.lang.Type.isObject(request.params))
          {
            // Does this service allow a map of parameters?
            if (service.parameterNames)
            {
              // Yup. Initialize to an empty parameter list
              parameters = [];

              // Map the arguments into the parameter array. (We are 
              // forgiving of members of request.params that are not
              // in the formal parameter list. We just ignore them.)
              service.parameterNames.forEach(
                function(paramName)
                {
                  // Add the parameter. If it's undefined, so be it.
                  parameters.push(request.params[paramName]);
                });
            }
          }
          else
          {
            // No provided parameters is equivalent to an empty list
            parameters = [];
          }

          // Create a function that will run this one request. We do this to
          // allow notifications to be run after we return from
          // processRequest().
          run = qx.lang.Function.bind(
            function(request)
            {
              var             result;
              var             params = qx.lang.Array.clone(parameters);
              var             timer = {}; // just a reference to compare to

              // Assume that any error that occurs here on out will be of
              // Application origin. Only JavaScript errors in the script will
              // return to being Server origin.
              if (protocol == "qx1")
              {
                error.setOrigin(qx.io.remote.RpcError.qx1.origin.Application);
              }

              // Provide the error object as the last parameter.
              params.push(error); 

              // We should now have a service function to call. Call it.
              try
              {
                result = service.apply(window, params);
              }
              catch(e)
              {
                // The service method threw an error. Create our own error from
                // it.
                error.setCode(
                  {
                    "qx1" : qx.io.remote.RpcError.qx1.error.server.ScriptError,
                    "2.0" : qx.io.remote.RpcError.v2.error.InternalError
                  }[protocol]);

                // Combine the message from the original error
                error.setMessage("Method threw an error: " + e);

                // This is classified as a server error, not application-origin.
                if (protocol == "qx1")
                {
                  error.setOrigin(qx.io.remote.RpcError.qx1.origin.Server);
                }

                // Use this error as the result
                result = error;
              }

              return result;
            },
            this);

          // Is this request a notification?
          if (typeof(request.id) == "undefined")
          {
            // Yup. Schedule this method to be called later, but ASAP. We
            // don't care about the result, so we needn't wait for it to
            // complete.
            setTimeout(
              function()
              {
                run(request);
              }, 
              0);
            
            // Set result to the timer object, so we'll ignore it, below.
            result = timer;
          }
          else
          {
            // It's not a notification. Run requested service method now.
            result = run(request);
          }

          // Was this a notification?
          if (result === timer)
          {
            // Yup. Return undefined so it'll be ignored.
            return undefined;
          }
          
          // Was the result an error?
          if (result instanceof rpcjs.rpc.error.Error)
          {
            // Yup. Stringify and return it.
            // The error class knows how to stringify itself, but we need a map.
            // Go both directions, to obtain the map.

            // Build the error response
            ret = 
              {
                id    : request.id,
                error : qx.lang.Json.parse(result.stringify())
              };
            
            // If this is v2, we need to add the indicator of such.
            if (protocol == "2.0")
            {
              ret.jsonrpc = "2.0";
            }

            return ret;
          }

          // We have a standard result. Stringify and return a proper response.
          ret = 
            {
              id     : request.id,
              result : result
            };

          // If this is v2, we need to add the indicator of such.
          if (protocol == "2.0")
          {
            ret.jsonrpc = "2.0";
          }

          return ret;
        },
        this);
      
      // Remove any responses that were for notifications (undefined ones)
      responses = responses.filter(
        function(response)
        {
          return typeof(response) !== "undefined";
        });

      // Is there a response, i.e. were there any non-notifications?
      if (responses.length == 0)
      {
        // Nope. Return null to indicate that no response should be returned.
        return null;
      }

      // Give 'em the response(s)
      return (bBatch
              ? qx.lang.Json.stringify(responses)
              : qx.lang.Json.stringify(responses[0]));
    }
  }
});
