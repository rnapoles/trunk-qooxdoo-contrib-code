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

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.qooxdoo.sushi.io.IO;

public class Call {
    public static Call parse(Session session, String pathInfo, HttpServletRequest request) throws IOException, ServletException {
        IO io;
        int idx;
        String destName;
        Object dest;
        InputStream src;
        String args;
        
        idx = pathInfo.indexOf('_');
        if (idx == -1) {
            throw new IllegalArgumentException(pathInfo);
        }
        destName = pathInfo.substring(0, idx);
        dest = session.lookupObject(destName);
        if (dest == null) {
            throw new ServletException("unkown object: " + destName);
        }
        src = request.getInputStream();
        io = session.rm.getIO(); // TODO: encoding!?
        args = io.buffer.readString(src);
        src.close();
        return parseMethod(dest, pathInfo.substring(idx + 1), args);
    }

    public static Call parseMethod(Object dest, String method, String args) {
        Call call;
        
        call = new Call(dest, lookup(dest.getClass(), method));
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
    
    private final Object dest; 
    private final Method method;
    public final List<Object> args;
    
    public Call(Object dest, Method method) {
        // TODO: without this, Call cannot invoke methods from other packages
        method.setAccessible(true);
        this.dest = dest;
        this.method = method;
        this.args = new ArrayList<Object>();
    }
    
    public Method getMethod() {
        return method;
    }
    
    public void addArgs(String str) { 
        args.addAll((List<?>) Parser.run(str));
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
        return Serializer.run(result);
    }
    
    @Override
    public String toString() {
        return dest + "." + method.getName() + args.toString();
    }
}
