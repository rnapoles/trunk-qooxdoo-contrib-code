/* ************************************************************************

   server-objects - a contrib to the Qooxdoo project (http://qooxdoo.org/)

   http://qooxdoo.org

   Copyright:
     2010 Zenesis Limited, http://www.zenesis.com

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     
     This software is provided under the same licensing terms as Qooxdoo,
     please see the LICENSE file in the Qooxdoo project's top-level directory 
     for details.

   Authors:
     * John Spackman (john.spackman@zenesis.com)

************************************************************************ */

/**
 * ProxyManager
 * 
 * The client must provide an implementation of this class so that the proxy classes
 * have an implementation-neutral means to send data to the server
 * 
 * Matches the server-side c.z.g.af.remote.ProxyManager.
 *
 * @author John Spackman [john.spackman@zenesis.com]
 */
qx.Class.define("com.zenesis.qx.remote.ProxyManager", {
	extend: qx.core.Object,
	
	statics: {
		__instance: null,
		
		/**
		 * Called to set the singleton global instance that will be used to send data
		 */
		setInstance: function(instance) {
			if (this.__instance && instance)
				this.warn("Overwriting existing instance " + this.__instance + " with " + instance);
			this.__instance = instance;
		},
		
		/**
		 * Returns the current instance
		 */
		getInstance: function() {
			return this.__instance;
		}
	},
	
	construct: function(proxyUrl) {
		if (this.constructor.__instance)
			this.warn("Not setting ProxyManager instance because one is already defined");
		else
			com.zenesis.qx.remote.ProxyManager.setInstance(this);
		
		this.__serverObjects = [];
		this.setProxyUrl(proxyUrl);
	},
	
	properties: {
		proxyUrl: {
			init: null,
			nullable: false,
			check: "String"
		}
	},
	
	members: {
		
		// Server object array and hash lookup
		__serverObjects: null,
		
		// Client-created server objects and hash lookup
		__clientObjects: null,
		
		// Dirty arrays
		__dirtyArrays: null,
		
		// Extra class information
		__classInfo: {},
		
		// Classes currently being defined
		__classesBeingDefined: {},
		
		// Queue of commands to send to the server at the next flush
		__queue: null,

		// The property currently being set, if any (used to prevent recursive sets)
		__setPropertyObject: null,
		__setPropertyName: null,
		
		// The number of call backs to the server
		__numberOfCalls: 0,
		
		// Exception returned from the server, to be thrown at end of current function call
		__exception: null,
		
		/**
		 * The Servlet at the other end is configured to return an initial object for this
		 * session; it can be any arbitrary object because QRJO will instantiate it correctly
		 * at this end.  That becomes the entry point for the application from here on in.
		 * 
		 * Can be called multiple times, the first object is always returned.
		 */
		getBootstrapObject: function() {
			if (this.__serverObjects.length)
				return this.__serverObjects[0];
			var result = null;
			var msg = { cmd: "bootstrap" };
			this._sendCommandToServer(msg, function(evt) {
					result = this._processResponse(evt, true);
				}, this);
			var ex = this.clearException();
			if (ex)
				throw ex;
			return result;
		},
		
		/**
		 * Registers a client object
		 * @return the new ID for this object
		 */
		registerClientObject: function(obj) {
			if (!this.__clientObjects)
				this.__clientObjects = [ "invalid" ];
			var index = this.__clientObjects.length;
			this.__clientObjects[index] = obj;
			return 0 - index;
		},
		
		/**
		 * Handles the "completed" event from the Request
		 * @param evt {Response} the response event
		 */
		_processResponse: function(evt) {
			var txt = evt.getContent();
			txt = qx.lang.String.trim(txt);
			try {
				this.debug("received: txt=" + txt);
				if (!txt.length)
					return null;
				var data = eval("(" + txt + ")");
				return this._processData(data);
			} catch(e) {
				this.debug("Exception during receive: " + this.__describeException(e));
				throw e;
			}
		},
		
		/**
		 * Called to interpret the text returned by the server and perform any commands
		 * @param data {Object} the response compiled from JSON
		 */
		_processData: function(data) {
			var result = null;
			for (var i = 0, l = data.length; i < l; i++) {
				var elem = data[i];
				var type = elem.type;
				
				// Init or Function return
				if (type == "bootstrap" || type == "return") {
					qx.core.Assert.assertNull(result, "Multiple function returns in data from server");
					result = this._readProxyObject(elem.data);
					
				// An exception was thrown
				} else if (type == "exception") {
					this._handleServerException(elem.data, "function");
					
				// A client-created object has been registered on the server, update the IDs to server IDs 
				} else if (type == "mapClientId") {
					var index = 0 - elem.data.clientId;
					var clientObject = this.__clientObjects[index];
					this.__clientObjects[index] = null;
					qx.core.Assert.assertEquals(elem.data.clientId, clientObject.getServerId());
					
					clientObject.setServerId(elem.data.serverId);
					qx.core.Assert.assertEquals(elem.data.serverId, this.__serverObjects.length);
					this.__serverObjects[elem.data.serverId] = clientObject;
					
				// Setting a property failed with an exception - change the value back and handle the exception 
				} else if (type == "reset") {
					var obj = this._readProxyObject(elem.object);
					try {
						var set = {};
						set[elem.name] = elem.data.oldValue;
						obj.set(set);
					} catch(e) {
						// Ignore it - we were only trying to recover from a server exception
					}
					this._handleServerException(elem.data, "property");

				// A server property value changed, update the client
				} else if (type == "set") {
					var obj = this._readProxyObject(elem.object);
					var set = {};
					set[elem.name] = elem.data;
					obj.set(set);
					
				// An event was fired on the server
				} else if (type == "fire") {
					var obj = this._readProxyObject(elem.object);
					var eventData = elem.data ? this._readProxyObject(elem.data) : null;
					obj.fireDataEvent(elem.name, eventData);
					
				// Unknown!
				} else
					qx.core.Assert.assertTrue(false, "Unexpected type of command from server: " + type);
			}

			// Once all client objects are processed, the __clientObjects array should be full of
			//	nulls and therefore all client IDs are disposed of (and replaced with server IDs);
			//	when this is the case, we can reset the client ids array 
			var cos = this.__clientObjects;
			if (cos && cos.length > 1) {
				var isEmpty = true;
				for (var i = 1; i < cos.length; i++)
					if (cos[i] != null) {
						isEmpty = false;
						break;
					}
				if (isEmpty)
					this.__clientObjects = null;
			}
			
			return result;
		},
		
		/**
		 * Reads a proxy object from the server and either creates a new
		 * object (creating classes as required) or returns an existing one
		 */
		_readProxyObject: function(data) {
			if (!data)
				return null;
			var result = null;
			
			if (qx.lang.Type.isArray(data)) {
				var result = [];
				for (var i = 0; i < data.length; i++)
					result[i] = this._readProxyObject(data[i]);
			} else {
				if (typeof data == "object" && data.serverId != undefined) {
					var serverId = data.serverId;
					var serverObject = this.getServerObject(serverId);
					if (serverObject)
						return serverObject;
					
					var clazz = this.getClassOrCreate(data.clazz);
					result = this.__serverObjects[serverId] = new clazz(serverId);
					if (data.values) {
						for (var propName in data.values) {
							var propValue = data.values[propName];
							if (propValue)
								propValue = this._readProxyObject(propValue);
							this.setPropertyValueFromServer(result, propName, propValue);
						}
					}
					
				} else
					result = data;
			}
			
			return result;
		},
		
		/**
		 * Reads a "clazz" and interprets it to return a class, creating new
		 * class definitions as required
		 */
		getClassOrCreate: function(data) {
			// If it's a string, then it's an existing class we need to create
			if (typeof data == "string") {
				if (this.__classesBeingDefined[data])
					return null;
				var clazz = eval(data);
				return clazz;
			}
			
			this.__classesBeingDefined[data.className] = true;
			try {
				// Create the JSON definition for qx.Class
				var def;
				if (data.isInterface)
					def = { members: { } };
				else {
					def = {
							construct: /*function(serverId) {
								this.base(arguments, serverId);
							},*/ new Function('serverId', 'this.base(arguments, serverId);'),
							members: { }
						};
					if (data.extend)
						def.extend = this.getClassOrCreate(data.extend);
					else
						def.extend = com.zenesis.qx.remote.Proxy;
				}
				
				// Add interfaces
				if (data.interfaces) {
					var interfaces = data.interfaces;
					for (var i = 0; i < data.interfaces.length; i++)
						interfaces[i] = this.getClassOrCreate(interfaces[i]);
					if (interfaces.length) {
						if (data.isInterface)
							def.extend = interfaces;
						else
							def.implement = interfaces;
					}
				}
				
				// Add methods
				if (data.methods)
					for (var methodName in data.methods) {
						var method = data.methods[methodName];
						method.name = methodName;
						if (data.isInterface)
							def.members[methodName] = new Function('');
						else
							def.members[methodName] = new Function('return this._callServer("' + methodName + '", qx.lang.Array.fromArguments(arguments));');
						
						if (method.returnType)
							this.getClassOrCreate(method.returnType);
						
						var params = method.parameters;
						if (params)
							for (var i = 0; i < params.length; i++) {
								if (params[i])
									params[i] = this.getClassOrCreate(params[i]);
							}
					}
				
				// Add properties
				var onDemandProperties = [];
				if (data.properties) {
					def.properties = {};
					for (var propName in data.properties) {
						var fromDef = data.properties[propName];
						fromDef.name = propName;
						
						var propClass = null;
						if (fromDef.clazz)
							propClass = this.getClassOrCreate(fromDef.clazz);
						
						var toDef = def.properties[propName] = {};
						
						// Define the property
						toDef.nullable = fromDef.nullable;
						if (fromDef.event)
							toDef.event = fromDef.event;
						
						// Handle arrays
						if (fromDef.array == "wrap")
							toDef.transform = "_transformToDataArray";
						
						// Create an apply method
						var applyName = "_apply" + qx.lang.String.firstUp(propName);
						toDef.apply = applyName;
						def.members[applyName] = new Function('value', 'this._applyProperty("' + propName + '", value);');
							
						// onDemand properties - patch it later
						if (fromDef.onDemand)
							onDemandProperties[onDemandProperties.length] = fromDef;
					}
				}
				
				// Add events
				if (data.events) {
					def.events = {};
					for (var eventName in data.events) {
						var fromDef = data.events[eventName];
						if (!fromDef.isProperty)
							def.events[eventName] = "qx.event.type.Data";
					}
				}
				
				// Define the class
				var clazz;
				if (data.isInterface) {
					clazz = qx.Interface.define(data.className, def);
					clazz.$$proxyDef = data;
				} else {
					clazz = qx.Class.define(data.className, def);
					clazz.prototype.$$proxyDef = data;
				}
				this.__classInfo[data.className] = data;
				
				// Patch on demand properties
				for (var i = 0; i < onDemandProperties.length; i++) {
					var propDef = onDemandProperties[i];
					this.__addOnDemandProperty(clazz, propDef.name, propDef.readOnly||false);
				}
				
				// Done
				return clazz;
			}finally {
				delete this.__classesBeingDefined[data.className];
			}
		},
		
		/**
		 * Adds an on-demand property
		 */
		__addOnDemandProperty: function(clazz, propName, readOnly) {
			var upname = qx.lang.String.firstUp(propName);
			clazz.prototype["get" + upname] = function() {
				return this._getPropertyOnDemand(propName);
			};
			if (!readOnly)
				clazz.prototype["set" + upname] = function(value) {
					return this._setPropertyOnDemand(propName, value);
				};
		},
		
		/**
		 * Returns the class definition received from the server for a named class 
		 */
		getClassInfo: function(className) {
			var info = this.__classInfo[className];
			qx.core.Assert.assertNotNull(info);
			return info;
		},
		
		/**
		 * Serialises a value for sending to the server
		 */
		_serializeValue: function(value) {
			if (!value)
				return null;
			
			if (qx.lang.Type.isArray(value)) {
				var send = [];
				for (var j = 0; j < value.length; j++) {
					if (!value[j])
						send[j] = null;
					else
						send[j] = this._serializeValue(value[j]);
				}
				return send;
			}
			
			if (!value.classname)
				return value;
			
			if (qx.Class.isSubClassOf(value.constructor, com.zenesis.qx.remote.Proxy))
				return value.getServerId();
				
			if (qx.Class.isSubClassOf(value.constructor, qx.data.Array))
				return value.toArray();
				
			if (qx.Class.isSubClassOf(value.constructor, qx.core.Object)) {
				this.debug("Cannot serialize a Qooxdoo object to the server unless it implements com.zenesis.qx.remote.Proxied");
				return null;
			}
				
			return value;
		},
		
		/**
		 * Called by Proxy to call a server method on a server object - not to be invoked directly
		 * @param serverObject {Object} the server object
		 * @param method {Object} method definition
		 * @param args {Array} the arguments passed to the method
		 */
		callServerMethod: function(serverObject, methodName, args) {
			var parameters = [];
			for (var i = 0; i < args.length; i++)
				parameters[i] = this._serializeValue(args[i]);
			var data = {
				cmd: "call",
				serverId: serverObject.getServerId(),
				methodName: methodName,
				parameters: parameters
			};
			var result = null;
			this._sendCommandToServer(data, function(evt) {
				result = this._processResponse(evt);
				var md = serverObject.$$proxyDef.methods[methodName];
				var array = md && md.returnArray;  // On-Demand property accessors don't have a method definition 
				if (array == "wrap")
					result = new qx.data.Array(result);
				return result;
			}, this);
			return result;
		},
		
		/**
		 * Handler for "change" event on properties with arrays wrapped by qx.data.Array.  For use only
		 * by Proxy.
		 * @param evt {Data} original "change" event for the array
		 * @param serverObject {Object} the Proxy instance for a server object
		 * @param propDef {Map} the property definition 
		 */
		onWrappedArrayChange: function(evt, serverObject, propDef) {
			var data = evt.getData();
			/*
			var cmdData = {
					cmd: "edit-array",
					serverId: serverObject.getServerId(),
					propertyName: propDef.name,
					type: data.type,
					start: data.start,
					end: data.end
				};
			if (data.type != "remove" && data.items) {
				cmdData.items = [];
				for (var i = 0; i < data.items.length; i++)
					cmdData.items[i] = this._serializeValue(data.items[i]);
			}
			if (propDef.sync == "queue")
				this._queueCommandToServer(data);
			else
				this._sendCommandToServer(data);
			*/
			
			// The change event for qx.data.Array doesn't give enough information to replicate 
			//	the change, so for now we just hack it by remembering the array is dirty and 
			//	copying the whole thing on the next server flush
			if (!this.__dirtyArrays)
				this.__dirtyArrays = {};
			var array = evt.getTarget();
			this.__dirtyArrays[array.toHashCode()] = {
					array: array,
					serverObject: serverObject,
					propertyName: propDef.name
				};
		},
		
		/**
		 * Queues all the dirty arrays ready to flush them to the server
		 */
		_queueDirtyArrays: function() {
			if (!this.__dirtyArrays)
				return;
			for (var arrHash in this.__dirtyArrays) {
				var arrData = this.__dirtyArrays[arrHash];
				var data = {
						cmd: "edit-array",
						serverId: arrData.serverObject.getServerId(),
						propertyName: arrData.propertyName,
						type: "replaceAll",
						items: this._serializeValue(arrData.array.toArray())
					};
				this._queueCommandToServer(data);
			}
			this.__dirtyArrays = null;
		},
		
		/**
		 * Called by Proxy when a property value is changed - do not invoke directly
		 * @param serverObject {Object} the server object Proxy implementation
		 * @param propertyName {Object} property name
		 * @param value {Object?} the value to set the property to
		 */
		setPropertyValue: function(serverObject, propertyName, value, oldValue) {
			if (this.isSettingProperty(serverObject, propertyName))
				return;
			
			var data = {
				cmd: "set",
				serverId: serverObject.getServerId(),
				propertyName: propertyName,
				value: this._serializeValue(value)
			};
			var def = this.__classInfo[serverObject.classname];
			var pd = def.properties[propertyName];
			if (pd.sync == "queue")
				this._queueCommandToServer(data);
			else
				this._sendCommandToServer(data);
			
			// OnDemand properties need to have their event fired for them
			if (pd.onDemand && pd.event)
				serverObject.fireDataEvent(pd.event, value, oldValue);
		},
		
		/**
		 * Called internally to set a property value that has been received from the server;
		 * this must suppress property-set events being triggered
		 */
		setPropertyValueFromServer: function(serverObject, propertyName, value) {
			this.__setPropertyObject = serverObject;
			this.__setPropertyName = propertyName;
			try {
				var upname = qx.lang.String.firstUp(propertyName);
				serverObject["set" + upname](value);
			}catch(e) {
				this.debug(e);
				throw e;
			}finally {
				this.__setPropertyObject = null;
				this.__setPropertyName = null;
			}
		},
		
		/**
		 * Detects whether the property is currently being set (i.e. from the server)
		 */
		isSettingProperty: function(serverObject, propertyName) {
			return this.__setPropertyObject == serverObject && this.__setPropertyName == propertyName;
		},
		
		/**
		 * Called by Proxy when an event listener is added; this queues a command to the server
		 * @param serverObject {Object} the server object Proxy implementation
		 * @param eventName {Object} event name
		 */
		addListener: function(serverObject, eventName) {
			var className = serverObject.classname;
			var def = this.__classInfo[className];
			var event = def.events[eventName];
			
			// If the event is not a server event, or it's for a property, or there is already
			//	a server based listener, then skip (property change events will be triggered 
			//	automatically by Qx when the property change is synchronised)
			if (!event || event.isProperty || event.numListeners)
				return;
			
			// Queue the addListener to the server
			event.numListeners = (event.numListeners||0) + 1;
			var data = {
					cmd: "listen",
					serverId: serverObject.getServerId(),
					eventName: eventName
				};
			this._queueCommandToServer(data);
		},
		
		/**
		 * Called by Proxy when an event listener is removed; this queues a command to the server
		 * @param serverObject {Object} the server object Proxy implementation
		 * @param eventName {Object} event name
		 */
		removeListener: function(serverObject, eventName) {
			var className = serverObject.classname;
			var def = this.__classInfo[className];
			var event = def.events[eventName];
			
			// If the event is not a server event or it's for a property then skip (property change 
			//	events will be triggered automatically by Qx when the property change is synchronised)
			if (!event || event.isProperty)
				return;
			
			// Queue the removeListener to the server
			event.numListeners--;
			qx.core.Assert.assertTrue(event.numListeners >= 0);
			var data = {
					cmd: "unlisten",
					serverId: serverObject.getServerId(),
					eventName: eventName
				};
			this._queueCommandToServer(data);
		},
		
		/**
		 * Method called to send data to the server; this is to be implemented by the host
		 * framework on the client.
		 * 
		 * @param obj {Object} object to be turned into a JSON string and sent to the server
		 * @param callback {function} callback
		 * @param context {Object?} context for the callback
		 * @return {String} the server response 
		 */
		_sendCommandToServer: function(obj, callback, context) {
	      	var req = new qx.io.remote.Request(this.getProxyUrl(), "POST", "text/plain");
	      	req.setAsynchronous(false);

	      	// Queue any client-created object which need to be sent to the server 
			this._queueClientObjects();
			
			// Queue any dirty arrays
			this._queueDirtyArrays();
			
			// Consume the queue
			var queue = this.__queue;
			if (queue) {
				this.__queue = null;
				queue[queue.length] = obj;
				obj = queue;
			}
	      	
			// Set the data
	      	var text = qx.util.Json.stringify(obj);
	      	req.setData(text);
	      	
	      	// Send it
	      	this.debug("Sending to server: " + text);
      		req.addListener("completed", callback||this._processResponse, context||this);
	      	req.send();
	      	this.__numberOfCalls++;
		},
		
		/**
		 * Queues a command to the server
		 */
		_queueCommandToServer: function(obj) {
			var queue = this.__queue;
			if (!queue)
				this.__queue = queue = [];
			this._queueClientObjects();
			queue[queue.length] = obj;
		},
		
		/**
		 * Takes any objects created on the client which have not yet been delivered to
		 * the server and adds them to the queue (i.e. processes all pendingClientObject's).
		 */
		_queueClientObjects: function() {
			var pco = this.__clientObjects;
			if (!pco || pco.length < 2)
				return;
			var queue = this.__queue;
			if (!queue)
				this.__queue = queue = [];
			for (var i = 1; i < pco.length; i++) {
				var clientObject = pco[i];
				if (clientObject.getSentToServer())
					continue;
				var className = clientObject.classname;
				var def = this.__classInfo[className];
				var data = {
						cmd: "new",
						className: className,
						clientId: clientObject.getServerId(),
						properties: {}
					};
				if (def.properties)
					for (var propName in def.properties) {
						var pd = def.properties[propName];
						if (!pd.readOnly && !pd.onDemand) {
							var value = clientObject.get(propName);
							if (value)
								data.properties[propName] = value;
						}
					}
				queue[queue.length] = data;
				clientObject.setSentToServer();
			}
		},
		
		/**
		 * Returns the number of calls to the server
		 */
		getNumberOfCalls: function() {
			return this.__numberOfCalls;
		},
		
		/**
		 * Returns the server object with a given ID
		 */
		getServerObject: function(serverId) {
			if (serverId < 0)
				return this.__clientObjects(0 - serverId);
			
			return this.__serverObjects[serverId];
		},
		
		/**
		 * Called when the server reports an exception to be handled by the client; stores the
		 * exception to be obtained later by calling clearException or getException
		 * @param data {Map} the details from the server
		 * @param cause {String} the cause: "property" or "function"
		 */
		_handleServerException: function(data, cause) {
			//this.error("Exception from server: " + data.exceptionClass + ": " + data.message);
			this.__exception = new Error("Exception at server: " + data.message);
		},
		
		/**
		 * Clears the last known exception and returns it
		 * @return {Error?} null if there is no exception to return
		 */
		clearException: function() {
			var ex = this.__exception;
			this.__exception = null;
			return ex;
		},
		
		/**
		 * Returns the last known exception
		 * @return {Error?} null if there is no exception to return
		 */
		getException: function() {
			return this.__exception;
		},
		
		/**
		 * Utility method to describe an exception
		 */
        __describeException: function(e) {
    		var desc = "";
    		if (typeof e == "string")
    			return e;
    		if (e.name)
    			desc = e.name;
    		if (e.number)
    			desc += "[#" + (e.number & 0xFFFF) + "]";
    		if (desc.length == 0)
    			desc = "typeof Exception == " + (typeof e) + " " + e;
    		desc += ": ";
    		if (e.message)
    			desc += e.message;
    		if (e.description && e.description != e.message)
    			desc += e.description;
    		if (e.fileName)
    			desc += " in file " + e.fileName;
    		if (e.lineNumber)
    			desc += " on line " + e.lineNumber;
    		return desc;
        }
	}
	
});