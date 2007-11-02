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

package org.qooxdoo.toolkit.engine.common;


/** 
 *  @native
$s*
#post(qx.application.Gui)
#post(org.qooxdoo.toolkit.engine.common.Parser:run)
#post(org.qooxdoo.toolkit.engine.common.Serializer:run)
#post(java.lang.Integer)
#post(java.lang.Boolean)
#post(java.lang.reflect.Method)
#require(org.qooxdoo.toolkit.engine.common.Registry)
#require(qx.theme.ClassicRoyale)
*$s

    function qwtRequest() {
      if (window.XMLHttpRequest) {
          return new XMLHttpRequest();
      } else if (window.ActiveXObject) {
          return new ActiveXObject('Microsoft.XMLHTTP')
      } else {
          throw new Error("no XMLHttpRequest");
      }
    }
*/

public class Transport {
    public static final String METHOD_RAW = "method/";
    public static final String METHOD = "/" + METHOD_RAW;
    public static final String SESSION_RAW = "session/";
    public static final String SESSION = "/" + SESSION_RAW;
    
    public static Object clientArgument(Registry registry) {
        return Parser.run(registry, startSession(SESSION_RAW));
    }

    /**
     * @native 

      var req = qwtRequest();
      qwtLog("POST " + url);      
      req.onprogress = function(e) {
        QWT_EVENT = e;
        qwtLog("##progress " + req.responseText + ".");
      }
      req.open("POST", url, true);
      req.setRequestHeader("Content-Type", "text/plain");
      QWT_REQ = req;
      req.send(null);
      return "null";
    */
    private static native String startSession(String url);
    
    /**
     * @native
         var type = typeof obj;
         if (type === "boolean") {
            return new java.lang.Boolean(obj);
         } else if (type === "number") {
            return new java.lang.Integer(obj);
         } else {
            return obj;
         } 
    */ 
    public static Object box(Object obj) {
        return obj;
    }        

    /**
     * @native
        if (obj instanceof java.lang.Integer) {
            return obj.intValue();
        } else if (obj instanceof java.lang.Boolean) {
            return obj.booleanValue();
        } else {
            return obj;
        }
     */
    public static Object unbox(Object obj) {
        return obj;
    }
    
    public static Object invoke(Registry registry, int object, String method, Object[] args) {
        String result;

        result = post(METHOD_RAW + object + "_" + method, argumentsString(registry, args));
        return Parser.run(registry, result);
    }

    /**
     * Qooxdoo Remote is not powerful enough ...
     * 
     * @native 

      var req = qwtRequest();
      qwtLog("POST " + url);      
      req.open("POST", url, false);   
      req.setRequestHeader("Content-Type", "text/plain");   
      req.send(body);     
      if (req.status != 200) {    
        throw new Error("error response: " + req.status);     
      }   
      return req.responseText;    
    */
    private static native String post(String url, String body);
    
    private static String argumentsString(Registry registry, Object[] args) {
        boolean first;
        StringBuilder builder;
        
        first = true;
        builder = new StringBuilder();
        builder.append('[');
        for (Object arg : args) {
            if (first) {
                first = false;
            } else {
                builder.append(',');
            }
            builder.append(Serializer.run(registry, box(arg)));
        }
        builder.append(']');
        return builder.toString();
    }
}
