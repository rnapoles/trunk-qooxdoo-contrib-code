// §{{header}}:
//
// This is file examples/compiler/Print.java,
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
import de.mlhartme.mork.classfile.ClassRef;
import de.mlhartme.mork.classfile.MethodRef;

public class Print extends Statement {
    private Expression expr;
    private MethodRef printMethod;

    private static final MethodRef PRINT_INT = MethodRef.meth(
        new ClassRef(Runtime.class), ClassRef.VOID, "printInt", ClassRef.INT);

    private static final MethodRef PRINT_STRING = MethodRef.meth(
        new ClassRef(Runtime.class), ClassRef.VOID, "printString", ClassRef.STRING);

    public Print(Expression expr) throws SemanticError {
        Type type;

        this.expr = expr;
        type = expr.getType();
        if (type == Int.TYPE) {
            printMethod = PRINT_INT;
        } else if (type == Str.TYPE) {
            printMethod = PRINT_STRING;
        } else {
            throw new SemanticError("cannot print this type: " + type);
        }
    }

    public void translate(Code dest) {
        expr.translate(dest);
        dest.emit(INVOKESTATIC, printMethod);
    }
}
