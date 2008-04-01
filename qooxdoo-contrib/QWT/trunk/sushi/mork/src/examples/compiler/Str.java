// §{{header}}:
//
// This is file examples/compiler/Str.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package compiler;

import de.mlhartme.mork.classfile.ClassRef;
import de.mlhartme.mork.classfile.Code;
import de.mlhartme.mork.classfile.Instruction;
import de.mlhartme.mork.classfile.MethodRef;

public class Str extends Type {
    public static final Str TYPE = new Str();

    private static final MethodRef ADD_METH = MethodRef.meth(
        ClassRef.STRING, ClassRef.STRING, "concat", ClassRef.STRING);

    private static final MethodRef EQ_METH = MethodRef.meth(
        ClassRef.STRING, ClassRef.BOOLEAN, "equals", ClassRef.STRING);

    private Str() {
        super("string");
    }

    public boolean isAssignableFrom(Type from) {
        return from == this;
    }

    public Type getUnaryType(int op) throws SemanticError {
        throw new SemanticError("no such operator for type string");
    }

    public Type getBinaryType(int op, Type second) throws SemanticError {
        switch (op) {
        case Operator.EQ:
        case Operator.NE:
            if (this != second) {
                throw new SemanticError("type mismatch");
            }
            return Int.TYPE;
        case Operator.ADD:
            if (this != second) {
                throw new SemanticError("type mismatch");
            }
            return this;
        default:
            throw new SemanticError("no such operator for type string");
        }
    }

    public void translateBinary(int op, Code dest) {
        switch (op) {
        case Operator.ADD:
            dest.emit(INVOKEVIRTUAL, ADD_METH);
            break;
        case Operator.EQ:
            dest.emit(INVOKEVIRTUAL, EQ_METH);
            break;
        case Operator.NE:
            dest.emit(INVOKEVIRTUAL, EQ_METH);
            dest.emit(LDC, 1);
            dest.emit(IXOR);
            break;
        default:
            throw new IllegalArgumentException("" + op);
        }
    }

    public void translateUnary(int op, Code dest) {
        throw new UnsupportedOperationException();
    }
}
