/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2007 1&1 Internet AG, Germany, http://www.1and1.org
   
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
   
   Authors:
     * Michael Hartmeier (mlhartme)
   
 ************************************************************************ */

package org.qooxdoo.toolkit.server;

/** 
 *  @augment org.qooxdoo.toolkit.server.Proxy
 *  @native
$s*
#post(qx.application.Gui)
#post(org.qooxdoo.toolkit.server.Parser:run)
#post(org.qooxdoo.toolkit.server.Serializer:run)
#post(java.lang.Integer)
#post(java.lang.Boolean)
#require(qx.theme.ClassicRoyale)
*$s

// takes an array, returns a string
function qwtArguments(serviceArgs) {
  var max = serviceArgs.length;
  var args = "[";
  for (var i = 0; i < max; i++) {
    if (i > 0) {
      args = args + ",";
    }
    var arg = serviceArgs[i];
    var type = typeof arg;
    if (type === "boolean") {
      arg = new java.lang.Boolean(arg);
    } else if (type === "number") {
      arg = new java.lang.Integer(arg);
    } 
    args = args + org.qooxdoo.toolkit.server.Serializer.run(arg);
  }
  args = args + "]";
  return args;
}

function waitOn() {}
function waitOff() {}

// args is a string
function qwtService(object, method, args) {
  var url = "method/" + object + "_" + method;
  var req = new XMLHttpRequest();
  waitOn();
  try {
    qwtLog("POST " + url);
    req.open("POST", url, false);
    req.setRequestHeader("Content-Type", "text/xml");
    req.send(args);
    if (req.status != 200) {
      throw new Error("error response: " + req.status);
    }
    return req.responseText;
  } finally {
    waitOff();
  }
}

//--

function Proxy(object, methods) {
    var m;
  
    for (var i = 0; i < methods.length; i++) {
        m = methods[i];
        this[m] = proxyMethod(object, m);
    }
}

function proxyMethod(object, method) {
    return function() {
        var args = qwtArguments(arguments)
        var result = qwtService(object, method, args);
        qwtLog("result: " + result);
        var obj = org.qooxdoo.toolkit.server.Parser.run(result);
        if (obj instanceof java.lang.Integer) {
            // TODO
            return obj.intValue();
        } else if (obj instanceof java.lang.Boolean) {
            // TODO
            return obj.booleanValue();
        } else {
            return obj;
        }
    }
}
*/
public class Proxy {
}

