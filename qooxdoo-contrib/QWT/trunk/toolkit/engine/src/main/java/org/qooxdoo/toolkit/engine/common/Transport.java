/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2008 1&1 Internet AG, Germany, http://www.1and1.org
   
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
   
   Authors:
     * Michael Hartmeier (mlhartme)
   
 ************************************************************************ */

package org.qooxdoo.toolkit.engine.common;

import java.util.ArrayList;


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
    
    private static int sessionId = 0;

    private static Object currentRequest = null;
    
    /** IE 7 hangs if an application is reloaded without terminating! */
    public static void terminate() {
        Object obj;
        
        obj = currentRequest;  // if the request finishes in the meanwhile
        if (obj != null) {
            System.out.println("aborting request ...");
            abortRequest(obj);
            currentRequest = null;
            System.out.println("done");
        }
    }
    
    /** @native request.abort() */
    private static native void abortRequest(Object request);
    
    public static Object clientArgument(Registry registry) {
        String str;
        Object argument;
        int idx;
        
        str = post(SESSION_RAW, null);
        idx = str.indexOf("\n");
        if (idx == -1) {
            throw new IllegalArgumentException(str);
        }
        sessionId = Integer.parseInt(str.substring(0, idx));
        argument = Parser.run(registry, null, str.substring(idx + 1));
        requestEvent(SESSION_RAW, sessionId);
        return argument;
    }

    /**
     * @native
         var req = qwtRequest();
         req.onreadystatechange = function() {
           if (req.readyState == 4) {
             org.qooxdoo.toolkit.engine.common.Transport.processCall(REGISTRY, sessionNo, req.status, req.responseText);
             org.qooxdoo.toolkit.engine.common.Transport.currentRequest = null;
           }
         }
         req.open("POST", url + sessionNo, true);   
         req.setRequestHeader("Content-Type", "text/plain");   
         req.send(null);     
         org.qooxdoo.toolkit.engine.common.Transport.currentRequest = req;
     */
    private static native void requestEvent(String url, int sessionNo);
    
    public static void processCall(Registry registry, int sessionNo, int status, String text) {
        if (status == 200) {
            invokeCall(registry, text);
            requestEvent(SESSION_RAW, sessionNo);
        } else {
            System.out.println("call skipped - status " + status);
        }
    }

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

        result = post(METHOD_RAW + sessionId + "/" + object + "_" + method, argumentsString(registry, args));
        return unbox(Parser.run(registry, null, result));
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

    // Client-to-server calls
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

    // TODO: something that cannot collide with serialized objects ...
    public static final String DELIM = "|";
    
    private static void invokeCall(Registry registry, String str) {
        int idx;
        int prev;
        Object obj;
        ArrayList<Object> args;
        String method;
        
        args = new ArrayList<Object>();
        idx = str.indexOf(DELIM);
        if (idx == -1) {
            throw new IllegalArgumentException(str);
        }
        obj = registry.get(Integer.parseInt(str.substring(0, idx)));
        prev = idx + 1;
        idx = str.indexOf(DELIM, prev);
        if (idx == -1) {
            method = str.substring(prev);
        } else {
            method = str.substring(prev, idx);
            prev = idx + 1;
            while (true) {
                idx = str.indexOf(DELIM, prev);
                if (idx == -1) {
                    args.add(Parser.run(registry, null, str.substring(prev)));
                    break;
                }
                args.add(Parser.run(registry, null, str.substring(prev, idx)));
                prev = idx + 1;
            }
        }
        doInvoke(obj, method, args);
    }
    
    /**
     * @native
         obj[method].apply(obj, args.data);
     */
    private static void doInvoke(Object obj, String method, ArrayList<Object> args) {
    }
}
