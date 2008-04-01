// §{{header}}:
//
// This is file examples/interpreter/Unary.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package interpreter;

public class Unary extends Expression {
    private int type;
    private int op;
    private Expression body;

    public static final int[][] ops = {
        { NONE, INT, NONE },  // add   <=
        { NONE, INT, NONE },  // sub   <=
        { NONE, NONE, NONE }, // mul
        { NONE, NONE, NONE }, // div
        { NONE, NONE, NONE }, // rem

        { NONE, NONE, NONE }, // and
        { NONE, NONE, NONE }, // or
        { BOOL, NONE, NONE }, // not   <=

        { NONE, NONE, NONE }, // eq
        { NONE, NONE, NONE }, // ne

        { NONE, NONE, NONE }, // LT
        { NONE, NONE, NONE }, // GT
        { NONE, NONE, NONE }, // LE
        { NONE, NONE, NONE }, // GE

        { NONE, NONE, NONE },
        { NONE, NONE, NONE }
    };

    public Unary(int opInit, Expression bodyInit)
        throws SemanticError
    {
        op = opInit;
        body = bodyInit;
        type = ops[op][body.getType()];
        if (type == NONE) {
            throw new SemanticError("type missmatch");
        }
    }

    public int getType() {
        return type;
    }

    public Object eval() {
        switch (op) {
        case ADD:
            return body.eval();
        case SUB:
            return new Integer(-body.evalInt());
        case NOT:
            return new Boolean(!body.evalBool());
        default:
            throw new RuntimeException("evalBool: unknown op: " + op);
        }
    }
}
