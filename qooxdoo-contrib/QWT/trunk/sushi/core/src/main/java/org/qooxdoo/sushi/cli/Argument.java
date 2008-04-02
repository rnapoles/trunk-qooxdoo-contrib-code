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

import org.qooxdoo.sushi.metadata.SimpleType;

/** TODO: merge with Item? */
public abstract class Argument {
    private final String name;
    private final SimpleType type;

    protected Argument(String name, SimpleType type) {
        this.name = name;
        this.type = type;
    }
    
    public String getName() {
        return name;
    }
    
    public SimpleType getType() {
        return type;
    }

    public abstract void set(Object obj, Object value);
}
