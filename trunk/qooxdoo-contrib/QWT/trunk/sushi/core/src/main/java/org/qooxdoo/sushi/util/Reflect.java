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

package org.qooxdoo.sushi.util;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;

public class Reflect {
    public static String resourceName(Class<?> clazz) {
        return "/" + clazz.getName().replace('.', '/') + ".class";        
    }
    
    public static String importName(Class<?> clazz) {
        String name;

        name = clazz.getName();
        return name.replace('$', '.');
    }

    private static final List<?> PRIMITIVE_TYPES = Arrays.asList(new Class[] {
        Void.TYPE, Boolean.TYPE, Byte.TYPE, Character.TYPE, Integer.TYPE, Long.TYPE, Float.TYPE, Double.TYPE,
    });
    
    private static final List<?> WRAPPER_TYPES = Arrays.asList(new Class[] {
        Void.class, Boolean.class, Byte.class, Character.class, Integer.class, Long.class, Float.class, Double.class
    });
    
    public static Class<?> getWrapper(Class<?> primitive) {
        int idx;

        idx = PRIMITIVE_TYPES.indexOf(primitive);
        if (idx == -1) {
            return null;
        } else {
            return (Class<?>) WRAPPER_TYPES.get(idx);
        }
    }

    public static Class<?> getPrimitive(Class<?> wrapper) {
        int idx;

        idx = WRAPPER_TYPES.indexOf(wrapper);
        if (idx == -1) {
            return null;
        } else {
            return (Class<?>) PRIMITIVE_TYPES.get(idx);
        }
    }

    public static String getSimpleName(Class<?> cls) {
        String name;
        int idx;

        name = Reflect.importName(cls);
        idx = name.lastIndexOf('.');
        return name.substring(idx + 1); // ok for -1 :-)
    }

    public static Method lookup(Class<?> task, String rawName) {
        return lookup(task, rawName, new Class[] {});
    }

    public static Method lookup(Class<?> task, String rawName, Class<?> arg) {
        return lookup(task, rawName, new Class[] { arg });
    }

    public static Method lookup(Class<?> task, String rawName, Class<?> ... args) {
        Method[] methods;
        int i;
        Method m;
        Method found;

        methods = task.getMethods();
        found = null;
        for (i = 0; i < methods.length; i++) {
            m = methods[i];
            if (equals(args, m.getParameterTypes())
                    && m.getName().equalsIgnoreCase(rawName)) {
                if (found != null) {
                    throw new IllegalArgumentException("duplicate method: " + rawName);
                }
                found = m;
            }
        }
        return found;
    }

    public static boolean equals(Class<?>[] left, Class<?>[] right) {
        int i;

        if (left.length != right.length) {
            return false;
        }
        for (i = 0; i < left.length; i++) {
            if (!left[i].equals(right[i])) {
                return false;
            }
        }
        return true;
    }
    
    //--
    
    public static <T extends Enum<?>> T[] getValues(Class<T> clazz) {
        Method m;
        
        try {
            m = clazz.getDeclaredMethod("values");
        } catch (SecurityException e) {
            throw new RuntimeException(e);
        } catch (NoSuchMethodException e) {
            throw new RuntimeException(e);
        }
        m.setAccessible(true);
        try {
            return (T[]) m.invoke(null);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        } catch (InvocationTargetException e) {
            throw new RuntimeException(e);
        }
    }
    
}
