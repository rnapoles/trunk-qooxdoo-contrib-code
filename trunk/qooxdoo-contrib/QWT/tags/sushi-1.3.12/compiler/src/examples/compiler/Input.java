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

package compiler;

import org.qooxdoo.sushi.classfile.ClassRef;
import org.qooxdoo.sushi.classfile.Code;
import org.qooxdoo.sushi.classfile.MethodRef;

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

    @Override
    public void translate(Code dest) {
        dest.emit(INVOKESTATIC, inputMethod);
        left.translateAssign(dest);
    }
}
