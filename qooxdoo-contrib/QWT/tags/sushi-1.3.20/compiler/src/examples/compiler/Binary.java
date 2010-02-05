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

import org.qooxdoo.sushi.classfile.Code;

public class Binary extends Expression {
    private Type type;
    private int op;
    private Expression left;
    private Expression right;

    public static Expression createRightOptional(Expression left, int op, Expression right) throws SemanticError {
        if (right == null) {
            return left;
        } else {
            return new Binary(left, op, right);
        }
    }

    public static Expression createLeftOptional(Expression left, int op, Expression right) throws SemanticError {
        if (left == null) {
            return right;
        } else {
            return new Binary(left, op, right);
        }
    }

    private Binary(Expression left, int op, Expression right) throws SemanticError {
        this.op = op;
        this.left = left;
        this.right = right;
        type = left.getType().getBinaryType(op, right.getType());
    }

    @Override
    public Type getType() {
        return type;
    }

    @Override
    public void translate(Code code) {
        left.translate(code);
        right.translate(code);
        left.getType().translateBinary(op, code);
    }
}
