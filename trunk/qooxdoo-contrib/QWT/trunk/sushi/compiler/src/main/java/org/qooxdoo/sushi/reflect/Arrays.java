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

package org.qooxdoo.sushi.reflect;

import java.lang.reflect.Array;

/**
 * Additional functionality over java.util.Arrays.
 */

public class Arrays {
    public static Object[] append(Class cl, Object[] left, Object[] right) {
        Object[] result;

        result = (Object[]) Array.newInstance(cl, left.length + right.length);
        System.arraycopy(left, 0, result, 0, left.length);
        System.arraycopy(right, 0, result, left.length, right.length);
        return result;
    }

    public static Object[] cons(Class cl, Object left, Object[] right) {
        Object[] result;

        result = (Object[]) Array.newInstance(cl, 1 + right.length);
        result[0] = left;
        System.arraycopy(right, 0, result, 1, right.length);
        return result;
    }

    public static Object[] pair(Class cl, Object left, Object right) {
        Object[] result;

        result = (Object[]) Array.newInstance(cl, 2);
        result[0] = left;
        result[1] = right;
        return result;
    }

    /**
     * Return an array class object with component as component type.
     * The API decription for java.lang.Class (Java 2) mentions
     * that forName can be called with an Array name, but neither
     * Class.forName("java.lang.String[]") nor
     * Class.forName("[java.lang.String") returns an array class!?
     */
    public static Class getArrayClass(Class component) {
        return Array.newInstance(component, 0).getClass();
    }
}
