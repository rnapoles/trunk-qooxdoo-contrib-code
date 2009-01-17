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

package interpreter;

public class Variable {
    private String name;
    private int type;
    private Object val;

    public Variable(int typeInit, String nameInit) {
        name = nameInit;
        type = typeInit;
        switch (type) {  // initialize
        case Expression.BOOL:
            val = new Boolean(false);
            break;
        case Expression.INT:
            val = new Integer(0);
            break;
        case Expression.STR:
            val = new String("");
            break;
        default:
            throw new RuntimeException("unkown type: " + type);
        }
    }

    public int getType() {
        return type;
    }

    public String getName() {
        return name;
    }

    public void set(Object obj) {
        val = obj;
    }

    public Object get() {
        return val;
    }
}
