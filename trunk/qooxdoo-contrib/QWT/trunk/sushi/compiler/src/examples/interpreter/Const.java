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

public class Const extends Expression {
    private int type;
    private Object val;

    public Const(Object valInit) {
        val = valInit;
        if (val instanceof Boolean) {
            type = BOOL;
        } else if (val instanceof Integer) {
            type = INT;
        } else if (val instanceof String) {
            type = STR;
        } else {
            throw new RuntimeException("illegal constant type: "
                                       + val.getClass());
        }
    }

    @Override
    public int getType() {
        return type;
    }

    @Override
    public Object eval() {
        return val;
    }
}
