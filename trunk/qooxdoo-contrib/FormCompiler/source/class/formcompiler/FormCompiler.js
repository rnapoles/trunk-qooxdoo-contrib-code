// -*- mode: javascript; fill-column: 125; -*-

/* ************************************************************************

    qooxdoo - the new era of web development

    http://qooxdoo.org

    Copyright:
      2009 by Arcode Corporation

     License:
       LGPL: http://www.gnu.org/licenses/lgpl.html
       EPL: http://www.eclipse.org/org/documents/epl-v10.php
       See the LICENSE file in the project's top-level directory for details.

    Authors:
      * Dave Baggett

************************************************************************ */

/**
 * The Form class parses a form description, represented as a heierchical JavaScript map, and creates the corresponding user
 * interface form. It is able to run the code to create the form asynchronously over a period of time, so as not to bog down
 * slower browsers. It does this by first creating functions that perform the actual computation required to build the form
 * and then executing these functions incrementally. Intuitively, you can think of this class as a "form compiler".
 *
 * TBD: form validation
 *
 * dmb - July 2009 - Copyright (C) 2009 Arcode Corporation
 */
qx.Class.define("formcompiler.FormCompiler", {
	extend : qx.core.Object,

	/**
	 * 
	 * Instantiates a form.
	 *
	 * @param spec {Map} The form description.
	 * @param self {Object} A reference to the object to set <code>this</code> to inside functions defined in the form
	 * description.
	 * @param async {Boolean?} If true, the constructor will return immediately and the form will be constructed
	 * in the background. Otherwise, the constructor will block until the form is constructed.
	 * @param parent {qx.ui.container?} The container widget to add the form's root widget to.
	 * @param callback {Function?} An optional callback to call when form creation completes. The callback will be
	 * passed a reference to the finalized Form object.
	 * @param callback_self {Object} A reference to the object to set <code>this</code> to inside the callback.
	 */
	construct: function(spec, self, async, parent, callback, callback_self) {
	    for (var tt in this.__thunk_eval_order)
		if (this.__thunk_eval_order.hasOwnProperty(tt))
		    this.__thunks[this.__thunk_eval_order[tt]] = [];

	    // Parse the description
	    this._parse(spec, self, parent);

	    // Add a thunk for the callback, if one is provded.
	    if (callback)
		this.__thunks['finalize'].push(
		    function () {
			callback.call(callback_self, this);
		    });

	    // Evaulated the collected thunks to create the form
	    this._evaluate(async);
	},

	// MEMBERS
	members : {
	    __thunk_eval_order: [ 
		'create', 'add', 'model', 'set', 'bind', 'finalize' 
	    ],
	    __finalized: false,
	    __thunks: {},
	    __root: null,
	    __widgets: null,
	    __model_skeleton: null,
	    __model: null,
	    __marshaler: null,
	    __controller: null,
	    __msec_per_event: 0,	// we're synchronous by default
	    __last_thunk_type: 0,
	    __last_thunk_index: 0,
	    __timer_id: null,

	    //
	    // Public methods
	    //

	    getRootWidget: function() {
		return this.__root;
	    },

	    getWidget: function (name) {
		return this.__widgets[name];
	    },

	    getModel: function () {
		return this.__model;
	    },
	    getModelValue: function (name) {
		return this.__model["get" + qx.lang.String.firstUp(name)]();
	    },
	    setModelValue: function(name, value) {
		this.__model["set" + qx.lang.String.firstUp(name)](value);
	    },
	    isFinalized: function () {
		return this.__finalized;
	    },

	    // This is mainly for completeness:
	    getModelSkeleton: function (name) {
		return this.__model_skeleton;
	    },

	    /**
	     * Force form creation to complete as soon as possible at the cost of greater CPU utilization. This is helpful
	     * when you have started form creation asynchronously, but later realize you need the form immediately. If the
	     * form is already finalized, the provided callback is called immediately, meaning that you can use this method
	     * as a matter of course, to ensure that the form is in fact finalized before displaying the root widget.
	     *
	     * @param callback {Function?} An optional callback to call when form creation completes. The callback will be
	     * passed a reference to the finalized Form object. It will be called after the callback passed to the
	     * constructor (if one was provided).
	     * @param callback_self {Object} A reference to the object to set <code>this</code> to inside the callback.
	     *
	     * @note This call will return immediately; you will still be notified of form creation via the callback you
	     * provided to the constructor earlier.
	     */
	    finalize: function (callback, callback_self) {
		if (this.__finalized) {
		    //
		    // This form is already finalized. We can just call the callback.
		    //
		    callback.call(callback_self, this);
		}
		else {
		    //
		    // The caller wants the form now, so hurry up its construction by disabling CPU throttling.
		    //
		    this.__msec_per_event = 0;
		    
		    //
		    // Add a thunk for the callback, if one is provded.
		    //
		    if (callback)
			this.__thunks['finalize'].push(
			    function () {
				callback.call(callback_self, this);
			    });
		}
	    },

	    //
	    // Internal methods
	    //

	    //
	    // Initialize internal state, parse the form description, and create thunks.
	    //
	    // For more information on thunks and functional-style deferred execution in general, see:
	    //
	    //   http://en.wikipedia.org/wiki/Thunk
	    //
	    // You probably also want to fully understand closures before modifying this code:
	    //
	    //   http://en.wikipedia.org/wiki/Closure_%28computer_science%29
	    //
	    _parse: function(spec, self, parent) {
		//
		// Initialize the master widget table. It will have a key for each named widget whose value is a reference to
		// the widget.
		//
		this.__widgets = {};

		//
		// Initialize the model skeleton. This is an intermediate data structure used to craete the model.
		//
		this.__model_skeleton = {};

		//
		// Push a thunk to parse the form description's root widget.
		//
		this.__thunks['create'].push(
		    function () {
			this.__parse(spec, self, parent);
			this.__root = spec.__widget;
		    });

		//
		// Push a thunk to create the model. This happens after all the widgets are created and added to their
		// parents.
		//
		this.__thunks['model'].push(
		    function () {
			//
			// Create the model from the model skeleton implied by the form description.  Every named widget
			// automatically gets an entry in the model. We must do this before we run the thunks that establish bindings
			// using the model.
			//
			try {
			    this.__marshaler = new qx.data.marshal.Json();
			    this.__marshaler.jsonToClass(this.__model_skeleton);
			    this.__model = this.__marshaler.jsonToModel(this.__model_skeleton);
			    this.__controller = new qx.data.controller.Object(this.__model);
			}
			catch (e) {
			    this.debug(e);
			}
		    });

		//
		// Push a thunk to mark this form finalized.
		//
		this.__thunks['finalize'].push(
		    function () {
			this.__finalized = true;
		    });
	    },

	    //
	    // Parse the form specification. This adds 'create' thunks to create the actual QooxDoo widgets, 'add' thunks to
	    // add these widgets to their parents, and 'set' thunks to apply settings.
	    //
	    // As alluded to above, we create thunks rather than simply evaluating the code as we go, for two reasons:
	    //
	    // 1) the thunks may depend on being able to look up widget instances by name in the master widget table, so we
	    //    need to defer thunk evaluation until all the widget names have been put into the master widget table.
	    //
	    // 2) we can easily spread thunk evaluation over multiple periods of time, meaning that we can avoid bogging down
	    //    the browser when creating huge forms.
	    //
	    __parse: function(spec, self, parent, widgets, model) {
		var This = this;

		if (!spec) {
		    this.debug("Form.__parse: null form specification object");
		    return null;
		}

		//
		// Look for the widget key. If there isn't one, we're done.
		//
		// Otherwise immediately resolve the widget to an object.
		//
		var widget = this.__resolve(spec.widget, self, null, "object", /*evaluate_thunks_now:*/ true);
		if (!widget)
		    return null;

		// Stash a reference to the widget object in the spec.
		spec.__widget = widget;

		//
		// Add the widget to the master widget map under the provided name. We first resolve the name to a string.
		//
		// We also create an entry in the model for the name. If a starting value is given, we assign that value to
		// the model entry.
		//
		var name = this.__resolve(spec.name, self, widget, "string", /*evaluate_thunks_now:*/ true);
		if (name) {
		    //
		    // Because of the way the model is built, the name must be a valid JavaScript variable name.
		    //
		    if (this.__isValidJavaScriptVariableName(name)) {
			//this.debug("created widget " + name + "...");
			this.__widgets[name] = widget;

			//
			// Set the starting value. Note that if no starting value is provided, we have to set the value to null
			// rather than undefined, because we need the key to be in the model map in order for
			// qx.data.marshal.Json to see it.
			//
			var initial_value = this.__resolve(spec.initial_value, self, widget, "object", /*evaluate_thunks_now:*/ true);
			this.__model_skeleton[name] = initial_value;
		    }
		    else
			throw new Error("illegal name \"" + name + "\": not a valid JavaScript variable name");
		}

		//
		// Add a thunk to set the widget's layout according to the "layout" spec key.
		//
		var layout = this.__resolve(spec.layout, self, widget, "object");
		if (layout)
		    this.__thunks['set'].push(
			function() { 
			    widget.setLayout(this.__eval(layout)); 
			});

		//
		// Add a thunk to set widget properties according to the "props" spec key. The properties object may be a
		// list of maps or a single map.
		//
		var properties = this.__resolve(spec.props, self, widget, "object");
		if (properties)
		    this.__thunks['set'].push(
			function() {
			    this.__apply(
				function (obj) {
				    widget.set(obj);
				},
				this.__eval(properties),
				this);
			});

		//
		// Add a thunk to set listeners according to the "listeners" spec key. It should resolve to an object whose
		// keys are event types, and whose values are standard QooxDoo listener functions.
		//
		// NOTE: if you need to access the form itself inside a listener -- for example, to manipulate some form
		// widget, you can forward-reference the form by the name of whatever variable you assign it to (assuming you
		// assign to a variable in the local scope). This works because execution of the listeners cannot occur until
		// the form is instantiated, at which point the local variable captured by the listener function will be
		// bound to the instantiated form.
		//
		var listener = this.__resolve(spec.listeners, self, widget, "object");
		if (listener)
		    this.__thunks['set'].push(
			function() {
			    var _listener = this.__eval(listener);
			    for (var event in _listener)
				if (_listener.hasOwnProperty(event))
					widget.addListener(event, _listener[event], self);
			});

		//
		// Add a thunk to establish data bindings according to the "binding" key.
		//
		// Bindings come in two forms:
		//
		// 1) Bindings to the model implied by the form specification
		// 2) Bindings to specific targets, where a target is "property P of object O".
		//
		// Type 1 is the most common: this is the simple case where you just want values shown to and modified by the
		// user to echo those in "model" behind the form. That way, the form values get set and read
		// automagically. You can read and write these values from your code using Form.getModel().
		//
		// Type 2 bindings establish connections between object properties. You would use this when, for example, you
		// want changes to one form field echoed in another field. In general, type 2 bindings can bind any property
		// of the widget to any property of any other object.
		//
		// A Type 1 binding establishes a bidirectional binding, and looks like this:
		//
		// name: "fancy-mode",
		// binding: {
		//     // bind true/false checkbox value to 1/0 model value
		//     property: "value",
		//     to_widget_options: { converter: function (data) { return data ? 1 : 0; } },
		//     to_model_options:  { converter: function (data) { return data == 1; } }
		// }
		//
		// The conversion specifications are optional. You must provide a name for every widget that's bound using a
		// Type 1 binding; this name will be used for the equivalent value in the model.
		//
		// A Type 2 binding is similar, but also includes a target specification, and is always unidirectional.
		//
		// name: "password",
		// binding: [
		//     //
		//     // Any time the user sets the overall default password, set the passwords for
		//     // both sub-accounts. Also set the global password object's "secret" property.
		//     //
		//
		//     /* sub-account 1 */ {
		//         property: "input",
		//         target: {
		//             object: "account1_password", // a widget in this form must have this name
		//             property: "value"
		//         }
		//     },
		//     /* sub-account 2 */ {
		//         property: "input",
		//         target: {
		//             object: "account2_password", // a widget in this form must have this name
		//             property: "value"
		//         }
		//     },
		//     /* global password object */ {
		//         property: "input",
		//         target: {
		//             object: Password, // a qx.core.Object referenced by variable Password must have the secret property
		//             property: "secret"
		//         }
		//     },
		//     /* global password entry in model */ {
		//         property: "input",
		//         target: {
		//             model: "account1_password", // the model entry corresponding to the widget name "account1_password"
		//         }
		//     }
		// ]
		//	
		var binding_spec = this.__resolve(spec.binding, self, widget, "object");
		if (binding_spec || name) {
		    this.__thunks['bind'].push(
			function() {
			    var default_property = this.__resolve(spec.bind_property, self, widget, "string", /*evalate_thunks_now:*/ true);
			    if (!default_property)
				default_property = "value";

			    var established_default_binding = false;
			    this.__apply(
				function (obj) {
				    var property = this.__resolve(obj.property, self, widget, "string", /*evalate_thunks_now:*/ true);
				    if (!property)
					property = default_property;
				    try {
					var target_spec = this.__resolve(obj.target, self, widget, "object", /*evalate_thunks_now:*/ true);
					if (target_spec) {
					    var target_property = null;

					    //
					    // A target spec is provided; the binding is unidirectional.
					    //
					    // As syntactic sugar, we allow the target object to be given as a string, where
					    // the string names a widget in the instantiated form. So if the target object is
					    // of type string, we actually use the string as a key in the form widget
					    // table. (You can't bind anything to a string, so there's no ambiguity here.)
					    //
					    // If the target is a model property, the value of the model key must can be a
					    // string that names a widget in the model.
					    //
					    var target_object = this.__resolve(target_spec.object, self, widget, /*type=any:*/ null, /*evalate_thunks_now:*/ true);
					    if (!target_object) {
						//
						// See if the target object is actually a model property. In this case, it will
						// be specified by the string value of the model key.
						//
						var target_model_property = this.__resolve(target_spec.model, self, widget, "string", /*evalate_thunks_now:*/ true);
						if (!target_model_property)
						    throw new Error("Form: bad binding target: no object reference/name or model name");
						target_object = this.__model;
						target_property = target_model_property;
					    }

					    //
					    // Now bind to the specific object. If we have a string, look up the widget with that name.
					    //
					    if (typeof(target_object) == "string")
						target_object = this.__widgets[target_object];

					    //
					    // Get the target property to bind to if it's not the model.
					    //
					    if (!target_property)
						target_property = this.__resolve(target_spec.property, self, widget, "string", /*evalate_thunks_now:*/ true);

					    // See if the user provided bind options
					    var options = this.__resolve(target_spec.options, self, widget, /*type=any:*/ null, /*evalate_thunks_now:*/ true);
					    widget.bind(property, target_object, target_property, options ? options : undefined);
					    
					    //
					    // See if this explicit binding overrides the usual default binding to the
					    // identically-named model property.
					    //
					    if (name && target_object == this.__model && target_property == name)
						established_default_binding = true;
					}
					else {
					    //
					    // No target spec is provided. Bind to the identically-named property in the model.
					    //
					    if (!name)
						throw new Error("Form: attempt to bind unnamed widget to model");

					    // See if the user provided bind options
					    var to_widget = this.__resolve(obj.to_widget_options, self, widget, "object", /*evalate_thunks_now:*/ true);
					    var to_model =  this.__resolve(obj.to_model_options,  self, widget, "object", /*evalate_thunks_now:*/ true);

					    this.__controller.addTarget(/*target:*/ widget,
									/*target property:*/ property,
									/*model property:*/ name,
									/*bidirectional:*/ true,
									/*options:*/ to_widget ? to_widget : undefined,
									/*reverseOptions:*/ to_model ? to_model : undefined);

					    // This overrides the default binding to the model
					    established_default_binding = true;
					}
				    }
				    catch (e) {
					this.debug("caught assertion!");
					this.debug(e);
					this.debugobj(widget);
				    }
				},
				this.__eval(binding_spec),
				this);

			    //
			    // Every named widget with a value property gets that value property bound to the
			    // identically-named model property unless the user overrides this by specifying an explicit
			    // binding to that model property. Here we establish this default binding if the user hasn't
			    // overridden it.
			    //
			    if (!established_default_binding && name) {
				try {
				    //
				    // NOTE: one limitation of looking for the property this way is that we'll
				    // still pick up deprecated properties.
				    //
				    // TBD: You get lots of warnings binding SelectBoxes and Lists, because those widgets
				    // only have deprecated "value" properties. They really need some property for us to bind
				    // to legitimately, but right now there's nothing available.
				    //
				    if ("getValue" in widget && "setValue" in widget && "resetValue" in widget) {
					this.debug("establishing default binding: " + name + ":" + default_property + " to model");
					this.__controller.addTarget(/*target:*/ widget,
								    /*target property:*/ default_property,
								    /*model property:*/ name,
								    /*bidirectional:*/ true);
				    }
				}
				catch (e) {
				    this.debug("caught: " + e);
				    this.debugobj(widget);
				    this.debug("name = " + name);
				}
			    }
			});
		}

		//
		// If the "preinit" key defines a function, call it now. This allows the user to put code in that will be
		// evaluated at parse time rather than get defered until after parsing is done.
		//
		this.__resolve(spec.preinit, self, widget, "object", /*evalate_thunks_now:*/ true);

		//
		// Add a thunk to call code stored in the "init" key.
		//
		var init = this.__resolve(spec.init, self, widget, "object");
		if (init)
		    this.__thunks['set'].push(function() { this.__eval(init); });
		
		//
		// Push a thunk to recurse into children. When executed, the thunk will create child widgets and add their
		// names to the master widget table.
		//
		this.__apply(
		    function (obj) {
			var child_spec = this.__resolve(obj, self, widget, "object", /*evalate_thunks_now:*/ true);
			if (child_spec) {
			    //
			    // Parse each child specification and instantiate the corresponding child widget.  Each will add
			    // itself as a child of this widget.
			    //	
			    this.__apply(
				function (obj) {
				    //
				    // Push a thunk to parse the child specification.
				    //
				    this.__thunks['create'].push(
					function() { 
					    this.__parse(obj, self, /*parent:*/ widget); 
					});
				},
				child_spec,
				this);
			}
		    },
		    this.__resolve(spec.children, self, widget, "object", /*evalate_thunks_now:*/ true),
		    this);

		//
		// Add a thunk to call postinit code. This will get called after the child thunks are evaluated.
		//
		var postinit = this.__resolve(spec.postinit, self, widget, "object");
		if (postinit)
		    this.__thunks['set'].push(function() { this.__eval(postinit); });

		// Now push an 'add' thunk to add this widget to its parent.
		if (parent) {
		    this.__thunks['add'].push(
			function () {
			    var options = this.__resolve(spec.options, self, widget, "object", /*evalate_thunks_now:*/ true);
			    parent.add(widget, options ? options : undefined);
			});
		}
	    },

	    //
	    // Evalute all the thunks in the proper order. Note that thunk evaluation may cause additional thunks to get
	    // added to the thunk table. So we can't cache the thunk table lengths to save time, because they'll change while
	    // we're iterating.
	    //
	    // If we're given a callback, start a recurring event that runs ~100 msec of computation per second, and call the
	    // callback when form creation is complete. Otherwise, just run all the thunks now.
	    //
	    _evaluate: function(async) {
		if (async) {
		    //
		    // Asynchronous mode: call event every 1000 msec to run thunks; call callback when form creation
		    // completes.  This method returns immediately.
		    //
		    var This = this;
		    this.__timer_id = setInterval(function () { This.__evaluate(); }, 1000);
		}
		else {
		    //
		    // Synchronous mode: run all the thunks now (block until the form is created).
		    //
		    this.__evaluate();
		}
	    },

	    //
	    // Evaluate thunks until the form creation completes or we use too much time.
	    //
	    __evaluate: function () {
		var msec = this.__msec_per_event;
		var count = 0;
		while (this.__last_thunk_type < this.__thunk_eval_order.length) {
		    var thunktype = this.__thunk_eval_order[this.__last_thunk_type];
		    var thunks = this.__thunks[thunktype];
		    var start = (new Date()).getTime();
		    while (this.__last_thunk_index < thunks.length) {
			thunks[this.__last_thunk_index++].call(this);
			count++;

			// See how much time has elapsed; don't use more than 100 msec per event
			if (msec) {
			    var used = (new Date()).getTime() - start;
			    if (used > msec) {
				//this.debug("Form: ran " + count + " thunks in " + used + " msec");
				return;
			    }
			}
		    }

		    // We're done all the thunks of the current type. Proceed to the next type.
		    this.__last_thunk_type++;
		    this.__last_thunk_index = 0;
		}
		
		//
		// All done; shut off the recurring event timer if we used one.
		//
		if (this.__timer_id)
		    clearTimeout(this.__timer_id);
	    },

	    //
	    // Utility methods
	    //

	    //
	    // Evaluate the provided object to get either:
	    //
	    // - an instance of the named primitive type,
	    //
	    // or
	    //
	    // - a thunk that, when called, will presumably produce an instance of this type.
	    //
	    // (There's no way to check the return type of the function we'll wrap in the thunk, so it's the user's
	    // responsibility to ensure that functions in form specifications return the right primitive types.)
	    //
	    // This extra layer of indirection, though somewhat confusing, allows users to put functions in the form
	    // specification anywhere an object is allowed.
	    //
	    // Why would you want to express objects as functions rather than just inlining the objects?
	    //
	    // 1) You might not be able to easily respresent the object in a single expression,
	    //
	    // 2) You may want to defer evaluation of the object-generating expression until the form is actually parsed.
	    //
	    // With respect to #2, note that when you declare objects inline as expressions, these expressions will be
	    // evaluated when *JavaScript* first parses the form specification object. In contrast, execution of the contents
	    // of functions won't occur until *the code in this file runs* to evaluate the form specification. (It is easy
	    // to see the difference if you imagine declaring your form specification as a global variable.)
	    //
	    __resolve: function(obj, self, widget, T, evaluate_thunks_now) {
		var This = this;

		if (evaluate_thunks_now == undefined)
		    evaluate_thunks_now = false;

		if (!obj)
		    return null;
		else if (typeof(obj) == "function") {
		    if (evaluate_thunks_now) {
			// call the function now to get the object
			return obj.call(self, widget, This);
		    }
		    else {
			// return a thunk that, when called, will (hopefully) produce the object
			return function () { obj.call(self, widget, This); };
		    }
		}
		else if (!T || typeof(obj) == T)
		    return obj;
		else {
		    // Throw an exception here: not function or required type
		    return null;
		}
	    },

	    //
	    // Apply a function to an object or list of objects. This allows user to put lists of objects in various places
	    // where single objects are allowed. It is explicitly permitted to __apply a function to a null object; doing so
	    // has no effect.
	    //
	    __apply: function (func, obj, self) {
		if (obj) {
		    if (typeof(obj.length) == 'number')
			for (var i = 0; i < obj.length; i++)
			    func.call(self, obj[i]);
		    else
			func.call(self, obj);
		}
	    },

	    //
	    // Evaluate a thunk. If the thunk is actually just an object, return the object. This lets us treat objects as
	    // thunks without wastefully wrapping them in functions.
	    //
	    __eval: function(thunk) {
		if (typeof(thunk) == "function")
		    return thunk.call();
		else
		    return thunk;
	    },

	    // Return true if string s is a valid JavaScript variable name
	    __isValidJavaScriptVariableName: function(s) {
		return /^[a-z$_][\w$]*$/i.test(s);
	    }
	}
    });
