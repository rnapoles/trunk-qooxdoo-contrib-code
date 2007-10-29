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

import java.lang.reflect.Method;

public class Proxy {
    public final int id;
    public final Class<?> type;
    
    public Proxy(int id, Class<?> type) {
        this.id = id;
        this.type = type;
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
}
