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

import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

/**
 ** Class to collect useful algorithms used within other classes.
 **
 ** @author michael.hartmeier@softwareag.com
 ** @version $Revision: 1.1.1.1 $
 */
public class Misc {
    /**
     ** @return absolute resource name
     **/
    public static String getPackageResourceName(Class<?> clazz) {
        String name;
        int idx;
        
        name = clazz.getName();
        idx = name.lastIndexOf('.');
        if (idx == -1) {
            throw new RuntimeException(name);
        }
        name = name.substring(0, idx);
        return "/" + name.replace('.', '/');
    }
    
    public static boolean eq(Object a, Object b) {
        return (a == null)? b == null : a.equals(b);
    }
    
    public static String getXercesName() {
        // no hard-writed references to the version class because it might be unavailable
        Class<?> c;
        Method m;
        Object obj;
        
        try {
            c = Class.forName("org.apache.xerces.impl.Version");
            m = c.getDeclaredMethod("getVersion", new Class[] {});
            if (Modifier.isStatic(m.getModifiers())) {
                // Xerces 2.2.1
                obj = null;
            } else {
                // Xerces 2.1
                obj = c.newInstance();
            }
            return (String) m.invoke(obj, new Object[] {});
        } catch (Exception e) {
            return "unkown (" + e.getMessage() + ")";
        }
    }
}

