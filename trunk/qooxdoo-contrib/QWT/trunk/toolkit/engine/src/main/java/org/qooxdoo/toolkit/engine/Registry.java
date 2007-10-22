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

package org.qooxdoo.toolkit.engine;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/** Stores Service Objects passed to clients. */
public class Registry {
    private final Map<Object, List<Session>> objects;

    public Registry() {
        this.objects = new HashMap<Object, List<Session>>();
    }

    public void add(Object obj) {
        objects.put(obj, new ArrayList<Session>()); // TODO
    }
}

