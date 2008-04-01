// §{{header}}:
//
// This is file examples/interpreter/Print.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package interpreter;

public class Print extends Statement {
    private Expression expr;

    public Print(Expression exprInit) {
        expr = exprInit;
    }

    public void execute() {
        System.out.println(expr.eval().toString());
    }
}
