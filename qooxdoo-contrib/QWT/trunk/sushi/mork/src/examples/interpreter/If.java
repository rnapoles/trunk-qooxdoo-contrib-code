// §{{header}}:
//
// This is file examples/interpreter/If.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package interpreter;

public class If extends Statement {
    private Expression test;
    private Statement yes;
    private Statement no;

    public If(Expression test, Statement yes, Statement no) throws SemanticError {
        this.test = test;
        this.yes = yes;
        if (no == null) {
            this.no = Block.createNop();
        } else {
            this.no = no;
        }
        if (test.getType() != Expression.BOOL) {
            throw new SemanticError("boolean expression expected");
        }
    }

    public void execute() {
        if (test.evalBool()) {
            yes.execute();
        } else {
            no.execute();
        }
    }
}
