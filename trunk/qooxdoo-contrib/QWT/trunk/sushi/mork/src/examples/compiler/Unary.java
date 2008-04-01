// §{{header}}:
//
// This is file examples/compiler/Unary.java,
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

public class Unary extends Expression {
    private Type type;
    private int op;
    private Expression body;

    public Unary(int op, Expression body) throws SemanticError {
        this.op = op;
        this.body = body;
        this.type = body.getType().getUnaryType(op);
    }

    public Type getType() {
        return type;
    }

    public void translate(Code code) {
        body.translate(code);
        body.getType().translateUnary(op, code);
    }
}
