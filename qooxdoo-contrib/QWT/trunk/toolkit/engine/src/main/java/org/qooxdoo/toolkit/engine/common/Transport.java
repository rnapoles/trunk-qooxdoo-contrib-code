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

import org.qooxdoo.toolkit.qooxdoo.EventListener;

import qx.event.type.DataEvent;
import qx.io.remote.Request;
import qx.io.remote.Response;

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

*/

public class Transport {
    public static final String COOKIE = "qwtClientArgument";
    private static final String COOKIE_X = COOKIE + "=\"";
    public static String TODO;
    
    public static Object clientArgument(Registry registry, String str) {
        int idx;

        if (str == null) {
            return null;
        }
        idx = str.indexOf(COOKIE_X);
        if (idx == -1) {
            return null;
        }
        str = str.substring(idx + COOKIE_X.length());
        idx = str.indexOf("\"");  // TODO: indexOf(char) broken?
        if (idx == -1) {
            throw new IllegalArgumentException(str);
        }
        str = str.substring(0, idx);
        return Parser.run(registry, str);
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
        String url;
        Result result;
        Request request;
        
        url = "method/" + object + "_" + method;
        result = new Result();
        request = new Request(url, "POST");
        request.addCompletedListener(result);
        TODO = argumentsString(registry, args);
        System.out.println("data " + TODO);
        request.setData(TODO);
        request.setAsynchronous(false);
        request.send();
        if (request.isCompleted()) {
            throw new Error("error response: " + request.getState());
        }
        return Parser.run(registry, result.text);
    }

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
    
    private static class Result implements EventListener {
        public String text;

        public void notify(DataEvent event) { // TODO
            Object obj;
            
            System.out.println("notify " + event);
            obj = event;
            text = (String) ((Response) obj).getContent();
        }
    }

}
