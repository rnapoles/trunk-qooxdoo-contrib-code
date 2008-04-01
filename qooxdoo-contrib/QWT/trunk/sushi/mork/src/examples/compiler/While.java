// §{{header}}:
//
// This is file examples/compiler/While.java,
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

public class While extends Statement {
    private Expression test;
    private Statement body;

    public While(Expression test, Statement body)
        throws SemanticError
    {
        this.test = test;
        this.body = body;
        if (test.getType() != Int.TYPE) {
            throw new SemanticError("boolean expression expected");
        }
    }

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
