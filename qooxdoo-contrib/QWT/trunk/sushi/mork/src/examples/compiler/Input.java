// §{{header}}:
//
// This is file examples/compiler/Input.java,
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
import de.mlhartme.mork.classfile.MethodRef;

public class Input extends Statement {
    private LValue left;
    private MethodRef inputMethod;

    private static final MethodRef INPUT_INT = MethodRef.meth(
        new ClassRef(Runtime.class), ClassRef.INT, "inputInt");

    private static final MethodRef INPUT_STRING = MethodRef.meth(
        new ClassRef(Runtime.class), ClassRef.STRING, "inputString");



    public Input(LValue left) throws SemanticError {
        Type type;

        this.left = left;
        type = left.getType();
        if (type == Int.TYPE) {
            inputMethod = INPUT_INT;
        } else if (type == Str.TYPE) {
            inputMethod = INPUT_STRING;
        } else {
            throw new SemanticError("cannot input this type: " + type);
        }
    }

    public void translate(Code dest) {
        dest.emit(INVOKESTATIC, inputMethod);
        left.translateAssign(dest);
    }
}
