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

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

public class Proxy implements InvocationHandler {
    /** @native
        return org.qooxdoo.toolkit.engine.common.Proxy.jsCreate(registry, id, ifc);
     */
    public static Object create(Registry registry, int id, Class<?> ifc, CallListener listener) {
        return java.lang.reflect.Proxy.newProxyInstance(Proxy.class.getClassLoader(), 
                new Class[] { ifc }, new Proxy(registry, id, ifc, listener));
    }
    
    public static Object jsCreate(Registry registry, int id, Class<?> ifc) {
        return new Proxy(registry, id, ifc, null);
    }


    public final Registry registry;
    public final int id;
    public final Class<?> type;
    public final CallListener listener;
    
    public Proxy(Registry registry, int id, Class<?> type, CallListener listener) {
        this.registry = registry;
        this.id = id;
        this.type = type;
        this.listener = listener;
        initMethods();
    }

    private void initMethods() {
        Method[] methods;
        
        methods = type.getDeclaredMethods();
        for (int i = 0; i < methods.length; i++) {
            addMethod(methods[i].getName());
        }
    }

    /**
     * @native
         this[name] = function() {
           return org.qooxdoo.toolkit.engine.common.Transport.invoke(REGISTRY, this.id, name, arguments);
         }
     */
    private void addMethod(String name) {
    }

    @Override
    public int hashCode() {
        return id;
    }
    
    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Proxy) {
            return ((Proxy) obj).id == id;
        } else {
            return false;
        }
    }
    
    //--
    
    /** server-to-client calls */
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        StringBuilder builder;
        String str;

        builder = new StringBuilder();
        builder.append(id);
        builder.append(Transport.DELIM);
        builder.append(method.getName());
        if (args != null) { // Java passes null if method takes no arguments
            for (Object arg : args) {
                builder.append(Transport.DELIM);
                builder.append(Serializer.run(registry, arg));
            }
        }
        str = builder.toString();
        listener.notify(str);
        // TODO
        return null; /* aka "void" */
    }
}
