// §{{header}}:
//
// This is file examples/compiler/Assign.java,
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

public class Assign extends Statement {
    private LValue left;
    private Expression expr;

    public Assign(LValue left, Expression expr) throws SemanticError {
        this.left = left;
        this.expr = expr;
        if (!left.getType().isAssignableFrom(expr.getType())) {
            throw new SemanticError("type mismatch");
        }
    }

    public void translate(Code dest) {
        expr.translate(dest);
        left.translateAssign(dest);
    }
}
