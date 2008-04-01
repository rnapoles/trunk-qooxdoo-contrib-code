// §{{header}}:
//
// This is file examples/interpreter/While.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package interpreter;

public class While extends Statement {
    private Expression test;
    private Statement body;

    public While(Expression testInit, Statement bodyInit)
        throws SemanticError
    {
        test = testInit;
        body = bodyInit;
        if (test.getType() != Expression.BOOL) {
            throw new SemanticError("boolean expression expected");
        }
    }

    public void execute() {
        boolean ok;

        for (ok = test.evalBool(); ok; ok = test.evalBool()) {
            body.execute();
        }
    }
}
