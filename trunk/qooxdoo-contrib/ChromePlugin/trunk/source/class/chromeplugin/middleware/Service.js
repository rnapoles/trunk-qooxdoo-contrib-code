/* *********************************************************************

#ignore(chrome)
#ignore(chrome.extension)

* The above commands tell the build system to not warn about using the
* global variable named "chrome" which the Qooxdoo build system knows
* nothing about.  The name is specific to the Chrome browser and houses
* all the functions and variables that Chrome extensions will have to
* utilize.
***********************************************************************/

/**
 * A class for the front end of your Qooxdoo application which will solve
 * some of the basic communication between a front-end application (like
 * a page/browser action) and a background script by encapsulating your
 * method invocations and argument passing into a standardized set of
 * calls to the background service.
 * 
 * This should help you to segregate your background threads into something
 * more akin to object-oriented methods, although really it just allows
 * you to more or less namespace your background methods.  Each override
 * of this class should correspond to one override of the BackgroundServiceImpl
 * class, which contains all the logic for automatically processing the
 * calls from this service's invocation.
 */
qx.Class.define("chromeplugin.middleware.Service",
{
// We are only going to extend the basic object
extend : qx.core.Object

// We don't want anyone to actually make an instance of this class
,type : "abstract"

/**
 * The name of the background service we are attempting to contact. This
 * will be wrapped into each and every service call that we make to the
 * background classes which is registered with this service.
 * 
 * @param service {String} Name of the service registered with dispatch
 */
,construct : function(service) {
	// Just in case we have anything in the qx.core.Object layer
	// which needs to be instantiated
	this.base(arguments);
	
	// Store the service we are connecting to for use later
	this.__service = service;
}

/*
 * Member functions
 */
,members : {
	__service : null
	/**
	 * Invoke this background service's method named "method" with
	 * the optional args passed as an array to that method.  You may
	 * optionally specify a callback method to be called from the
	 * background (only once per invocation) and a scope within which
	 * to run the callback.  The last argz array is arguments
	 * which will be passed to the callback after any elements which
	 * are returned from the calling function.
	 * 
	 * This line is because Qooxdoo does not know about nor recognize
	 * the global variables in the Chrome browser.
	 *
	 * @param method {String} The name of the Service method
	 * @param args {Array?null} Array of arguments for the Service method
	 * @param callback {Function?null} A method on this side of the plugin
	 * which will receive the list of callback values returned
	 * @param scope {Object?null} An object within the context of which
	 * to execute the callback method
	 * @param argz {Array?null} An array of extra arguments to be
	 * passed to the callback when it is invoked.
	 * 
	 * @lint ignoreUndefined(chrome)
	 * @lint ignoreUndefined(chrome.extension)
	 * @lint ignoreGlobal(chrome.extension)
	 */
	,invoke : function(method, args, callback, scope, argz) {
		/**
		 * Since it will be called from the background, expect this method
		 * to never excute in the context of the object it is actually
		 * a portion of.
		 * 
		 * @param returnz {Object} The items which are answers from the
		 * background service implementation.
		 */
		var localcallback = function(returnz) {
			// Now package up the returnz and return them
			returnz = [returnz];	// Get ready for .apply
			if(argz)
				returnz = returnz.concat(argz); // Append user arguments
			if(scope)
				callback.apply(scope, returnz);
			else
				callback.apply(callback, returnz);
		};
		var backArgs = {
			service : this.__service
			,method : method
		};
		if(args) backArgs.args = args;
		else backArgs.args = null;
		chrome.extension.sendRequest(backArgs, localcallback);
	}
}
});
