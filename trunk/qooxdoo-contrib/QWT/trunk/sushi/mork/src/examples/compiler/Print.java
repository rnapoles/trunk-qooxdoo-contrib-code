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

    @Override
    public void translate(Code dest) {
        expr.translate(dest);
        dest.emit(INVOKESTATIC, printMethod);
    }
}
