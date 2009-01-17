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

public class While extends Statement {
    private Expression test;
    private Statement body;

    public While(Expression testInit, Statement bodyInit) throws SemanticError {
        test = testInit;
        body = bodyInit;
        if (test.getType() != Expression.BOOL) {
            throw new SemanticError("boolean expression expected");
        }
    }

    @Override
    public void execute() {
        boolean ok;

        for (ok = test.evalBool(); ok; ok = test.evalBool()) {
            body.execute();
        }
    }
}
