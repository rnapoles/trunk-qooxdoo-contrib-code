// §{{header}}:
//
// This is file examples/interpreter/Variable.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

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
