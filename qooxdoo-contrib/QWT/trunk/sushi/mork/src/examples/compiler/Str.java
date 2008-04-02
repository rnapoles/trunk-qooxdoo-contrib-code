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

public class Str extends Type {
    public static final Str TYPE = new Str();

    private static final MethodRef ADD_METH = MethodRef.meth(
        ClassRef.STRING, ClassRef.STRING, "concat", ClassRef.STRING);

    private static final MethodRef EQ_METH = MethodRef.meth(
        ClassRef.STRING, ClassRef.BOOLEAN, "equals", ClassRef.STRING);

    private Str() {
        super("string");
    }

    @Override
    public boolean isAssignableFrom(Type from) {
        return from == this;
    }

    @Override
    public Type getUnaryType(int op) throws SemanticError {
        throw new SemanticError("no such operator for type string");
    }

    @Override
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

    @Override
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

    @Override
    public void translateUnary(int op, Code dest) {
        throw new UnsupportedOperationException();
    }
}
