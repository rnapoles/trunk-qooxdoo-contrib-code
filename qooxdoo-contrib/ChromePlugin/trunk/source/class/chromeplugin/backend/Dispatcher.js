/*

#ignore(chrome)
#ignore(chrome.extension)
#ignore(chrome.extension.onRequest)

*/

/**
 * This class serves at the invocation point for any requests that come
 * in to the backend for this system.  From here, they will all be sent
 * out to their terminal points and then the values reassembled and sent
 * back to the frontend callback functions which requested their reports.
 */
qx.Class.define("chromeplugin.backend.Dispatcher",
{
extend : qx.core.Object

// Make this a singleton, since we only want one dispatcher
,type : "singleton"

/**
 * A little magic here - this will be called automatically by Qooxdoo
 * after the class is defined.  We will use this to call the local
 * getInstance() method so we are sure that the BackgroundDispatcher
 * has been instantiated and is registering itself.
 * 
 * @lint ignoreUnused(instance)
 */
,defer : function(statics, members, properties) {
	var instance = chromeplugin.backend.Dispatcher.getInstance();
}

/**
 * Here is where things start to get interesting.  This will register
 * with Chrome to be the listener for incoming calls to this background
 * thread.
 * 
 * @lint ignoreUndefined(chrome)
 * @lint ignoreUndefined(chrome.extension.onRequest)
 */
,construct : function() {
	this.__services = new Array();
	chrome.extension.onRequest.addListener(qx.lang.Function.bind(this.dispatch, this));
}

/*
 * Member methods
 */
,members : {
	__services : null
	
	/**
	 * Your code should never need to call this function, as this is
	 * registered by this object with the browser to handle the calls
	 * of the frontend.
	 * 
	 * The real magic happens here.  The values packed into the static
	 * object request are pulled apart here so we can evaluate what
	 * service we should invoke and what endpoints to hit.
	 * 
	 * Callback will be given the results of the invocation and we
	 * can then wrap this up as a generic method of implementing
	 * Chrome background processes.
	 * 
	 * TODO: I still have no idea what the "sender" value is supposed
	 * to indicate to me.  Nothing at present.
	 * 
	 * @param request {Object} The request that Chrome passes us
	 * @param sender {Object} Not sure what this is - doesn't seem to
	 * ever be used by plugins.
	 * @param callback {Function} The function passed from the front
	 * end.
	 */
	,dispatch : function(request, sender, callback) {
		// Fetch the object we are supposed to be hitting up
		var service = this.__services[request.service];
		// Sanity check
		if(typeof(service) == 'undefined' || !qx.lang.Type.isObject(service)) {
			this.error("Service endpoint does not exist or is undefined or not an object.\n" +
				"  Requested service is " + request.service + " and I have " + service);
			throw "qxchrome::backend::Dispatcher::dispatch has detected an invalid service endpoint";
		}
		
		// Now extract the method we're calling and its arguments
		var method = request.method;
		var args = request.args;
		// Now call the method
		var returnz = service.dispatch(method, args);
		
		// Call our callback method
		callback(returnz);
	}
	
	/**
	 * And more magic is happening in here.  The BackgroundServiceImpl
	 * will be summoned by its dispatch() method whenever a request
	 * for the serviceName is executed.
	 * 
	 * If multiple services are registered with the same name, then
	 * the last one registered will overwrite the others.
	 * 
	 * @param serviceName {String} The name of the service which will
	 * be invoked from the front end.
	 * @param service {chrome.backend.ServiceImpl} An instance of
	 * ServiceImpl which will be invoked whenever a method with the
	 * service signature of this request is received.
	 */
	,register : function(serviceName, service) {
		// Sanity check
		if(!qx.lang.Type.isObject(service)) {
			this.error("Attempt to set a non-object as the service provider for " + serviceName);
			throw "qxchrome::backend::Dispatcher::register has detected an attempt to register an invalid service provider for " + serviceName;
			return;
		}
		if(typeof(serviceName) == 'undefined' || typeof(service) == 'undefined') {
			this.error("Attempt to set an invalid serviceName or undefined service");
			throw "qxchrome::backend::Dispatcher::register has detected an attempt to register an invalid serviceName or undefined service";
			return;
		}
		
		this.__services[serviceName] = service;
	}
}// End of members
});
