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

    @Override
    public void execute() {
        if (test.evalBool()) {
            yes.execute();
        } else {
            no.execute();
        }
    }
}
