//++ toolkit.root []

global = this;

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

    // TODO
    if (Class instanceof Function) {
        // ok
    } else {
        // for singletons
        Class = Class.constructor;
    }
    if (Base) {
	    Class.prototype = new Base();
	}
    Class.prototype.constructor = Class;
	var max = arguments.length - 3;
	var array = new Array(max);
    for (var i = 0; i < max; i++) {
        array[i] = arguments[i + 3];
    }
    Class.interfaces = array;
    // metadata will be replaced by the Java Class object
    Class.metadata = name;
    ALL_CLASSES[name] = Class;
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
    // TODO: __proto__ in IE?
	return instance.__proto__.constructor;
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
    var interfaces = current.interfaces;
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
    if (Class.prototype.__proto__ === null) {
        qwtFail("no prototype: " + Class);
    }
    if (isQwtInterface(Class)) {
        return null; 
    }
    return Class.prototype.__proto__.constructor;
}

//--

function stringConcat() {
    var result = "";
	var max = arguments.length;
	var arg;
	
    for (var i = 0; i < max; i++) {
        arg = arguments[i];
        if (typeof arg === 'string') {
	        result = result + arg;
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
