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

package org.qooxdoo.toolkit.engine;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.qooxdoo.sushi.fs.Settings;
import org.qooxdoo.sushi.io.Buffer;
import org.qooxdoo.toolkit.engine.common.CallListener;
import org.qooxdoo.toolkit.engine.common.Parser;
import org.qooxdoo.toolkit.engine.common.Registry;
import org.qooxdoo.toolkit.engine.common.Serializer;

public class Call {
    public static Call parse(Settings settings, Buffer buffer, Application application, String pathInfo, HttpServletRequest request) 
    throws IOException, ServletException {
        int idx;
        String destStr;
        Object dest;
        String args;
        InputStream in;
        Registry registry;
        CallListener callListener;

        idx = pathInfo.indexOf("/");
        if (idx == -1) {
            throw new IllegalArgumentException(pathInfo);
        }
        callListener = application.getClient().lookup(Integer.parseInt(pathInfo.substring(0, idx)));
        pathInfo = pathInfo.substring(idx + 1);
        idx = pathInfo.indexOf('_');
        if (idx == -1) {
            throw new IllegalArgumentException(pathInfo);
        }
        destStr = pathInfo.substring(0, idx);
        registry = application.getRegistry();
        dest = registry.get(Integer.parseInt(destStr));
        if (dest == null) {
            throw new ServletException("unkown object: " + destStr);
        }
        in = request.getInputStream();
        args = buffer.readString(in, settings.encoding);
        in.close();
        return parseMethod(registry, callListener, dest, pathInfo.substring(idx + 1), args);
    }

    public static Call parseMethod(Registry registry, CallListener callListener, Object dest, String method, String args) {
        Call call;
        
        call = new Call(registry, callListener, dest, lookup(dest.getClass(), method));
        call.addArgs(args);
        return call;
    }

    private static Method lookup(Class<?> clazz, String name) {
        Method[] methods;
        Method found;
        
        try {
            methods = clazz.getMethods();
        } catch (SecurityException e) {
            throw new IllegalArgumentException(name, e);
        }
        found = null;
        for (Method m : methods) {
            if (name.equals(m.getName())) {
                try {
                    if (found != null) {
                        throw new IllegalArgumentException(clazz.getName() + "." + name + ": ambiguous");
                    }
                    found = m;
                } catch (IllegalArgumentException e) {
                    // fall-through
                }
            }
        }
        if (found == null) {
            throw new IllegalArgumentException(clazz.getName() + "." + name + ": no such method");
        }
        return found;
    }

    //--
    
    private final Registry registry;
    private final CallListener callListener;
    private final Object dest; 
    private final Method method;
    public final List<Object> args;
    
    public Call(Registry registry, CallListener callListener, Object dest, Method method) {
        // TODO: without this, Call cannot invoke methods from other packages
        method.setAccessible(true);
        this.registry = registry;
        this.callListener = callListener;
        this.dest = dest;
        this.method = method;
        this.args = new ArrayList<Object>();
    }
    
    public Method getMethod() {
        return method;
    }
    
    public void addArgs(String str) { 
        args.addAll((List<?>) Parser.run(registry, callListener, str));
    }

    public String invoke() throws InvocationTargetException {
        Object result;
        
        try {
            result = method.invoke(dest, args.toArray());
        } catch (IllegalAccessException e) {
            throw new IllegalStateException(this + ":" + e, e);
        } catch (InvocationTargetException e) {
            throw new RuntimeException("TODO", e.getTargetException());
        }
        return Serializer.run(registry, result);
    }
    
    @Override
    public String toString() {
        return dest + "." + method.getName() + args.toString();
    }
}
