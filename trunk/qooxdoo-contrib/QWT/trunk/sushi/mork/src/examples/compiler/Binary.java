// §{{header}}:
//
// This is file examples/compiler/Binary.java,
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

public class Binary extends Expression {
    private Type type;
    private int op;
    private Expression left;
    private Expression right;

    public static Expression createRightOptional(Expression left, int op, Expression right)
        throws SemanticError
    {
        if (right == null) {
            return left;
        } else {
            return new Binary(left, op, right);
        }
    }

    public static Expression createLeftOptional(Expression left, int op, Expression right)
        throws SemanticError
    {
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

    public Type getType() {
        return type;
    }

    public void translate(Code code) {
        left.translate(code);
        right.translate(code);
        left.getType().translateBinary(op, code);
    }
}
