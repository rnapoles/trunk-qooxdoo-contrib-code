// §{{header}}:
//
// This is file examples/interpreter/Reference.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package interpreter;

public class Reference extends Expression {
    private Variable var;

    public Reference(Declarations ctx, String name)
        throws SemanticError
    {
        var = ctx.find(name);
        if (var == null) {
            throw new SemanticError("unkown variable: " + name);
        }
    }

    public int getType() {
        return var.getType();
    }

    public Object eval() {
        return var.get();
    }

    public Variable getVar() {
        return var;
    }
}
