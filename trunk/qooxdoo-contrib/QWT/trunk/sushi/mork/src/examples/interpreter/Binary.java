// §{{header}}:
//
// This is file examples/interpreter/Binary.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package interpreter;

public class Binary extends Expression {
    private int type;
    private int op;
    private Expression left;
    private Expression right;

    public static final int[][] ops = {
        { NONE, INT, STR },  // add
        { NONE, INT, NONE }, // sub
        { NONE, INT, NONE }, // mul
        { NONE, INT, NONE }, // div
        { NONE, INT, NONE }, // rem

        { BOOL, NONE, NONE }, // and
        { BOOL, NONE, NONE }, // or
        { NONE, NONE, NONE }, // not, dummy-Angabe

        { BOOL, BOOL, BOOL }, // eq
        { BOOL, BOOL, BOOL }, // ne

        { NONE, BOOL, BOOL }, // LT
        { NONE, BOOL, BOOL }, // GT
        { NONE, BOOL, BOOL }, // LE
        { NONE, BOOL, BOOL }  // GE
    };

    public Binary(Expression left, int op, Expression right)
        throws SemanticError
    {
        this.op = op;
        this.left = left;
        this.right = right;
        this.type = ops[op][left.getType()];

        if (type == NONE) {
            throw new SemanticError("type missmatch");
        }
        if (left.getType() != right.getType()) {
            throw new SemanticError("type missmatch");
        }
    }

    public int getType() {
        return type;
    }

    public Object eval() {
        switch (type) {
        case BOOL:
            return new Boolean(calcBool());
        case INT:
            return new Integer(calcInt());
        case STR:
            return calcString();
        default:
            throw new RuntimeException("unkown type: " + type);
        }
    }

    //-----------------------------------------------------------------

    private boolean calcBool() {
        int cmp;

        switch (left.getType()) { // same as right.getType()
        case BOOL:
            switch (op) {
            case AND:
                return left.evalBool() && right.evalBool();
            case OR:
                return left.evalBool() || right.evalBool();
            case EQ:
                return left.evalBool() == right.evalBool();
            case NE:
                return left.evalBool() != right.evalBool();
            default:
                throw new RuntimeException("illegal bool op: " + op);
            }
        case INT:
            cmp = left.evalInt() - right.evalInt();
            break;
        case STR:
            cmp = left.evalString().compareTo(right.evalString());
            break;
        default:
            throw new RuntimeException("unkown type: " + left.getType());
        }

        switch (op) { // same for string and int
        case LT:
            return cmp < 0;
        case GT:
            return cmp > 0;
        case LE:
            return cmp <= 0;
        case GE:
            return cmp >= 0;
        case EQ:
            return cmp == 0;
        case NE:
            return cmp != 0;
        default:
            throw new RuntimeException("illegal non-bool op: " +op);
        }
    }

    private int calcInt() {
        switch (op) {
        case ADD:
            return left.evalInt() + right.evalInt();
        case SUB:
            return left.evalInt() - right.evalInt();
        case MUL:
            return left.evalInt() * right.evalInt();
        case DIV:
            return left.evalInt() / right.evalInt();
        case REM:
            return left.evalInt() % right.evalInt();
        default:
            throw new RuntimeException("evalInt: unknown op: " + op);
        }
    }

    private String calcString() {
        switch (op) {
        case ADD:
            return left.evalString() + right.evalString();
        default:
            throw new RuntimeException("evalString: unkown op: " + op);
        }
    }
}
