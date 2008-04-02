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

public class While extends Statement {
    private Expression test;
    private Statement body;

    public While(Expression test, Statement body) throws SemanticError {
        this.test = test;
        this.body = body;
        if (test.getType() != Int.TYPE) {
            throw new SemanticError("boolean expression expected");
        }
    }

    @Override
    public void translate(Code dest) {
        int startLabel;
        int testLabel;

        startLabel = dest.declareLabel();
        testLabel = dest.declareLabel();
        dest.emit(GOTO, testLabel);
        dest.defineLabel(startLabel);
        body.translate(dest);

        dest.defineLabel(testLabel);
        test.translate(dest);
        dest.emit(IFNE, startLabel);
    }
}
