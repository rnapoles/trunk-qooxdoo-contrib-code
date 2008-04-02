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

package org.qooxdoo.sushi.cli;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

import org.qooxdoo.sushi.metadata.Schema;
import org.qooxdoo.sushi.metadata.SimpleType;
import org.qooxdoo.sushi.metadata.Type;

public class ArgumentMethod extends Argument {
    public static ArgumentMethod create(String name, Schema metadata, Method method) {
        Class<?>[] formals;
        Type type;
        
        if (Modifier.isStatic(method.getModifiers())) {
            throw new IllegalArgumentException(method + ": static not allowed");
        }
        if (!Modifier.isPublic(method.getModifiers())) {
            throw new IllegalArgumentException(method + ": public expected");
        }
        formals = method.getParameterTypes();
        if (formals.length != 1) {
            throw new IllegalArgumentException("1 argument expected");
        }
        type = metadata.type(formals[0]);
        return new ArgumentMethod(name, type instanceof SimpleType ? (SimpleType) type : null, method);
    }
    
    //--
    
    private final Method method;
    
    public ArgumentMethod(String name, SimpleType simple, Method method) {
        super(name, simple);
        this.method = method;
    }

    @Override
    public void set(Object obj, Object value) {
        Throwable cause;
        
        try {
            method.invoke(obj, new Object[] { value });
        } catch (IllegalArgumentException e) {
            throw new RuntimeException(getName() + ": " + value + ":" + value.getClass(), e);
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        } catch (InvocationTargetException e) {
            cause = e.getCause();
            if (cause instanceof Error) {
                throw (Error) cause;
            }
            if (cause instanceof ArgumentException) {
                throw (ArgumentException) cause;
            }
            if (cause instanceof RuntimeException) {
                throw new RuntimeException(getName(), cause);
            }
            throw new RuntimeException("unexpected exception" , cause);
        }
    }
}
