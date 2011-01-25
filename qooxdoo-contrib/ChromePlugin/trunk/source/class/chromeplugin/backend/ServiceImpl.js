/* *********************************************************************

Nothing to see here, move along, move along.

***********************************************************************/

/**
 * The BackgroundServiceImpl class is designed for running in a Chrome
 * plugin's background page and for handling one service's set of method
 * endpoints.
 * 
 * Create the methods within this class, then register this service
 * implementation with the background thread's main object, and this
 * object's dispatch function will be called whenever a request is received
 * for this service.
 * 
 * In order to register your custom endpoints, simply call this.register("endpointName", this.endpointFunction)
 * from within your object's constructor and it will be invoked every
 * time this service is called with "endpointName" as the method argument.
 * The return value from the endpoint function will be used as the arguments
 * for the callback on the front-end side.
 */
qx.Class.define("chromeplugin.backend.ServiceImpl",
{
extend : qx.core.Object

// This class cannot be instantiated, but instead must be extended
,type : "abstract"

/**
 * Call this base constructor in order to register the service with the
 * background dispatcher so that it can be located.  serviceName is the
 * name by which this service can be invoked from the foreground
 * services.
 * 
 * @param serviceName {String} The name of this service to register with
 * the dispatcher
 */
,construct : function(serviceName) {
	var dispatcher = chromeplugin.backend.Dispatcher.getInstance();
	dispatcher.register(serviceName, this);

	this.__functions = new Array();
}

/*
 * Member methods
 */
,members : {
	__functions : null
	/**
	 * This is the method which the BackgroundDispatcher will call
	 * when it has received a request for this service.  The dispatcher
	 * will then call the requested method, if it exists, and return
	 * that invocation's response.  Otherwise it will raise an
	 * exception and return an appropriate error message.
	 * 
	 * @param method {String} Will invoke the function registered to
	 * this name.  Your code should never have to call this method.
	 * @param args {Array} An array of arguments for the method to
	 * accept.
	 */
	,dispatch : function(method, args) {
		// First, check that arguments is an array or is null
		if(!qx.lang.Type.isArray(args) & typeof(args) != 'undefined' && args != null) {
			this.error("Invalid type passed for BackgroundServiceImpl::dispatch's argument array");
			throw "Invalid type passed for BackgroundServiceImpl::dispatch's argument array";
			return;
		}
		try {
			// Fetch the function we are supposed to call
			var methodFunction = this.__functions[method];
			// Call it if this is a function
			if(qx.lang.Type.isFunction(methodFunction)) {
				var returns = methodFunction.apply(this, args);
				return returns;
			} else {
				throw "Invalid endpoint registered for method name " + method;
			}
		} catch (err) {
			this.error("Invalid endpoint registered for method name " + method + " or other error:\n" + err);
			throw "BackgroundServiceImpl caught: " + err;
		}
	}
	
	/**
	 * This will register the function "func" to be invoked every time
	 * the dispatcher receives a request for the endpoint "method"
	 * on this service.
	 * 
	 * If this method is invoked multiple times with the same value
	 * of method, then the called function will simply be overwritten.
	 * 
	 * Calls to func will be invoked within the scope of this current
	 * object, and not another one.
	 * 
	 * @param method {String} The name of the method to register under
	 * for when the front end calls.
	 * @param func {Function} The function to call when this endpoint
	 * is registered.
	 */
	,register : function(method, func) {
		// Check that func is a Function indeed
		if(!qx.lang.Type.isFunction(func)) {
			this.error("Non-function being registered in BackgroundServiceImpl");
			throw "BackgroundServiceImpl::register caught an attempt to register an invalid value as a function";
			return;
		}
		// Duh
		if(method === null || typeof(method) == 'undefined') {
			// This isn't really that fatal, but probably should be logged
			this.debug("Attempt to register a function with no endpoint set");
		}
		// Store the value
		this.__functions[method] = func;
	}
} // End of members
});
