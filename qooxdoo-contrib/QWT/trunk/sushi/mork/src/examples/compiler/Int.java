// §{{header}}:
//
// This is file examples/compiler/Int.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package compiler;

import de.mlhartme.mork.classfile.Code;

public class Int extends Type {
    public static final Int TYPE = new Int();

    private Int() {
        super("int");
    }

    public boolean isAssignableFrom(Type from) {
        return from == this;
    }

    public Type getUnaryType(int op) throws SemanticError {
        switch (op) {
        case Operator.SUB:
            return this;
        default:
            throw new SemanticError("no such operator for type int");
        }
    }

    public Type getBinaryType(int op, Type second) throws SemanticError {
        switch (op) {
        case Operator.ADD:
        case Operator.SUB:
        case Operator.MUL:
        case Operator.DIV:
        case Operator.AND:
        case Operator.OR:
        case Operator.EQ:
        case Operator.NE:
        case Operator.LT:
        case Operator.GT:
        case Operator.LE:
        case Operator.GE:
            if (second != this) {
                throw new SemanticError("type mismatch");
            }
            return this;
        default:
            throw new SemanticError("no such operator for int type");
        }
    }

    public void translateBinary(int op, Code dest) {
        int oneLabel;
        int endLabel;

        switch (op) {
        case Operator.ADD:
            dest.emit(IADD);
            break;
        case Operator.SUB:
            dest.emit(ISUB);
            break;
        case Operator.MUL:
            dest.emit(IMUL);
            break;
        case Operator.DIV:
            dest.emit(IDIV);
            break;
        case Operator.EQ:
            transBoolean(IF_ICMPEQ, dest);
            break;
        case Operator.NE:
            transBoolean(IF_ICMPNE, dest);
            break;
        case Operator.LT:
            transBoolean(IF_ICMPLT, dest);
            break;
        case Operator.LE:
            transBoolean(IF_ICMPLE, dest);
            break;
        case Operator.GT:
            transBoolean(IF_ICMPGT, dest);
            break;
        case Operator.GE:
            transBoolean(IF_ICMPGE, dest);
            break;
        default:
            throw new IllegalArgumentException("" + op);
        }
    }

    private void transBoolean(int opcode, Code dest) {
        int label;

        label = dest.currentLabel();
        dest.emit(opcode, label + 3);
        dest.emit(LDC, 0);
        dest.emit(GOTO, label + 4);
        dest.emit(LDC, 1);
    }

    public void translateUnary(int op, Code dest) {
        throw new UnsupportedOperationException();
    }
}
