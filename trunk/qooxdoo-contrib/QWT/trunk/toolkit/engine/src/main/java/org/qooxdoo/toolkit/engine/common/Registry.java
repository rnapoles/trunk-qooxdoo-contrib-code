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

import java.util.ArrayList;
import java.util.List;

/** Stores Service Objects passed to clients. */
public class Registry {
    private final List<Object> objects;

    public Registry() {
        this.objects = new ArrayList<Object>();
    }

    public int size() {
        return objects.size();
    }

    public int add(Object obj) {
        objects.add(obj);
        return objects.size() - 1;
    }
    
    public int addIfNew(Object obj) {
        for (int i = 0, max = objects.size(); i < max; i++) {
            if (objects.get(i) == obj) {
                return i;
            }
        }
        return add(obj);
    }

    public Object get(int id) {
        return objects.get(id);
    }
}

