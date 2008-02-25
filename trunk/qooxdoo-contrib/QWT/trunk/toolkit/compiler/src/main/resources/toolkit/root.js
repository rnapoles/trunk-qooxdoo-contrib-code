//++ toolkit.root []

global = this;

// Remove Rhino's built-in Java-access-Packages
// Firefox provides the same objects if Java is enabled. 
// CAUTION: delete doesn't work!?
org = new Object();
java = new Object();

ABSTRACT = function() {}

var ALL_CLASSES = new Object();

/*
 * Defines a Class function by augmenting a constructor function with the appropriate meta data.
 *
 * Class        constructor function
 * name         fully qualified class name (primitive string)
 * interfaces   class functions of the interfaces implemented by this Class
 */
function defineClass(Class, name, Base, interfaces) {
    if (Class === undefined) {
        // TODO: silently ignore unreal qooxdoo classes (aka classes without class object)
        return;
    }

    if (typeof qx !== 'undefined') { // for Qooxdoo:
        if (typeof qx.Class !== 'undefined') {
            if (typeof qx.Class.getByName !== 'undefined') { // for bootstrapping
                if (!qx.Class.getByName(name)) { 
                    qx.Class.__registry[name] = Class;
                }
            }
        }
    }

    // TODO
    if (Class instanceof Function) {
        // ok
    } else {
        // for singletons
        Class = Class.constructor;
    }
    if (Base) {
	    Class.superclass = Base;  // for Qooxdoo
	    Class.prototype = new Base();
	}

	if (name.indexOf("qx.") != -1) {  // TODO: poor check ...
		// already defined by Qooxdoo
    } else {
        var array = [];
        for (var i = 3; i < arguments.length; i++) {
            array.push(arguments[i]);
        }
        var basename = qwtCreateNamespace(name, Class);
        Class.classname = Class.prototype.classname = name; 
        Class.basename = basename;
        Class.prototype.constructor = Class;
		Class.$$implements = array;
		Class.$$flatImplements = array; // TODO
	}

    // metadata will be replaced by the Java Class object
    Class.metadata = name;
    ALL_CLASSES[name] = Class;
}

function qwtCreateNamespace(name, object) {
    var splits = name.split(".");
    var parent = global;
    var part = splits[0];

    for (var i=0, l=splits.length-1; i<l; i++, part=splits[i]) {
        if (!parent[part]) {
          parent = parent[part] = {};
        } else {
          parent = parent[part];
        }
    }

    // store object
    parent[part] = object;

    // return last part name (i.e. classname)
    return part;
}

function touchPackage(array) {
    var pkg;
    var max = arguments.length;
    var segment;
    
    pkg = global;
    for (var i = 0; i < max; i++) {
        segment = arguments[i];
        if (pkg[segment] === undefined) {
            pkg[segment] = new Object();
        }            
        pkg = pkg[segment];
    }
}

function assertClass(Class) {
    if (!isQwtClass(Class)) {
        qwtFail("not a class: " + Class);
    }
}

function isQwtClass(Class) {
    return typeof Class.metadata != "undefined";
}
function isQwtInterface(Class) {
    return isQwtClass && !(Class.prototype instanceof java.lang.Object);
}

function qwtFail(msg) {
    qwtLog(msg);
    qwtPrintStacktrace();
    throw new Error(msg);
}

function qwtPrintStacktrace() {
    // work for rhino only
    // see http://blogs.sun.com/sundararajan/entry/more_javascript_debugging_tips_mustang
    var a = undefined;
    try {
        a.toString(); // force exception
    } catch (e) {
        // from http://blogs.sun.com/sundararajan/entry/more_javascript_debugging_tips_mustang
        if (typeof e.rhinoException != "undefined") {
            e.rhinoException.printStackTrace();
        }
    }
}

function newObject(Type, init, args) {
    var obj = new Type();
   	init.apply(obj, args);
    return obj;
}

function newEmptyArray(length) {
    var array = new Array(length);
    // TODO: runtime type information
    for (var i = 0; i < length; i++) {
        array[i] = null;
    }
    return array;
}

function newInitializedArray() {
	var length = arguments.length;
	var array = new Array(length);
	for (var i = 0; i < length; i++) {
	    array[i] = arguments[i];
	}
	return array;
}

// getClass is defined by Firefox
function getQwtClass(instance) {
	return instance.constructor;
}

function instanceofInterface(instance, Class) {
    if (instance === null) {
        return false;
    }
    return findConstructor(getQwtClass(instance), Class);
}

function findConstructor(current, Class) {
    assertClass(current);
    assertClass(Class);
    if (current === Class) {
        return true;
    }
    var interfaces = current.$$implements;
    var max = interfaces.length;    
    for (var i = 0; i < max; i++) {
        if (findConstructor(interfaces[i], Class)) {
            return true;
        }
    }
    var base = getBase(current);
    if (base !== null) {
        if (!isQwtClass(base)) {
            qwtFail(Class + ": invalid base");
        }
        return findConstructor(base, Class);
    }
    return false;
}

function getBase(Class) {
    assertClass(Class);
    if (Class.prototype.constructor !== Class) {
        qwtFail("TODO: " + Class);
    }
    if (Class === java.lang.Object) {
        return null;
    }
    if (isQwtInterface(Class)) {
        return null; 
    }
    if (Class.superclass === null) {
        qwtFail("no superclass: " + Class);
    }
    return Class.superclass;
}

//--

function stringConcat() {
    var result = "";
	var max = arguments.length;
	var arg;
	
    for (var i = 0; i < max; i++) {
        arg = arguments[i];
        if (arg === null) {
            result = result + 'null';
        } else if (typeof arg === 'string') {
	        result = result + arg;
        } else if (typeof arg === 'number') {
	        result = result + arg;
        } else if (typeof arg === 'undefined') {
	        result = result + "undefined";  // TODO
        } else {
            result = result + arg.toString();
	    }
    }
    return result;
}

function qwtLog(message) {
    if (typeof println != 'undefined') {
        println(message);
    }
    if (typeof console != 'undefined') {
        // http://www.getfirebug.com/console.html
        console.info(message);
    }
}
