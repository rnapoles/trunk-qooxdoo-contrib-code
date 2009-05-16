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

public class If extends Statement {
    private Expression test;
    private Statement yes;
    private Statement no;

    public If(Expression test, Statement yes, Statement no) throws SemanticError {
        if (test.getType() != Int.TYPE) {
            throw new SemanticError("int expression expected");
        }
        this.test = test;
        this.yes = yes;
        if (no != null) {
            this.no = no;
        } else {
            this.no = new Block();
        }
    }

    @Override
    public void translate(Code dest) {
        int noLabel;
        int endLabel;

        noLabel = dest.declareLabel();
        endLabel = dest.declareLabel();
        test.translate(dest);
        dest.emit(IFEQ, noLabel);
        yes.translate(dest);
        dest.emit(GOTO, endLabel);
        dest.defineLabel(noLabel);
        no.translate(dest);
        dest.defineLabel(endLabel);
    }
}
