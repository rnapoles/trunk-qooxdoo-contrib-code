// §{{header}}:
//
// This is file examples/interpreter/Const.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

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

    public int getType() {
        return type;
    }

    public Object eval() {
        return val;
    }
}
