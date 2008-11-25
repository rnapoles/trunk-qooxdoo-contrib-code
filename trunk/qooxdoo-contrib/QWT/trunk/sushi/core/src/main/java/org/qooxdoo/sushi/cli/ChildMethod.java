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

public class ChildMethod {
    /** @param m must not throw checked exceptions; it's expected to have no real side effects. */
    public static void check(Method m) {
        if (!Modifier.isPublic(m.getModifiers())) {
            throw new IllegalArgumentException(m.getName());
        }
        if (Modifier.isStatic(m.getModifiers())) {
            throw new IllegalArgumentException(m.getName());
        }
        if (m.getParameterTypes().length != 0) {
            throw new IllegalArgumentException(m.getName());
        }
        if (!Object.class.isAssignableFrom(m.getReturnType())) {
            throw new IllegalArgumentException(m.getName());
        }
    }
    
    //--
    
    private final String name;
    private final Method meth;
    
    public ChildMethod(String name, Method meth) {
        check(meth);
        
        this.name = name;
        this.meth = meth;
    }
    
    public String getName() {
        return name;
    }

    /** @throws ArgumentException for every checked exception thrown by the underlying method */
    public Object invoke(Object obj) throws ArgumentException {
        Throwable cause;
        
        try {
            return meth.invoke(obj);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        } catch (InvocationTargetException e) {
            cause = e.getCause();
            if (cause instanceof Error) {
                throw (Error) cause;
            }
            if (cause instanceof RuntimeException) {
                throw (RuntimeException) cause;
            }
            throw new ArgumentException(cause.getMessage(), cause);
        }
    }
}
