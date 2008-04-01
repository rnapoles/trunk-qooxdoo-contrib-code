// §{{header}}:
//
// This is file examples/compiler/If.java,
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

public class If extends Statement {
    private Expression test;
    private Statement yes;
    private Statement no;

    public If(Expression test, Statement yes, Statement no)
        throws SemanticError
    {
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
