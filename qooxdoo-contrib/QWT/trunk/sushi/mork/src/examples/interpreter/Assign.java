// §{{header}}:
//
// This is file examples/interpreter/Assign.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package interpreter;

public class Assign extends Statement {
    private Variable var;
    private Expression expr;

    public Assign(Reference ref, Expression exprInit) throws SemanticError {
        var = ref.getVar();
        expr = exprInit;
        if (var.getType() != expr.getType()) {
            throw new SemanticError("type missmatch");
        }
    }

    public void execute() {
        var.set(expr.eval());
    }
}
