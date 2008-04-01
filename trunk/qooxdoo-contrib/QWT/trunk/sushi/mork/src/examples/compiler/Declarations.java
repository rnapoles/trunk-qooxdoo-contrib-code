// §{{header}}:
//
// This is file examples/compiler/Declarations.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package compiler;

public class Declarations {
    private Declarations parent;
    private Variable[] vars;

    public Declarations(Declarations parent, Variable[] vars) throws SemanticError {
        this.parent = parent;
        this.vars = vars;
        checkDuplicates();
    }

    private void checkDuplicates() throws SemanticError {
        int i;
        String n;
        Variable v;

        for (i = 0; i < vars.length; i++) {
            v = vars[i];
            n = v.getName();
            if (lookup(n) != v) {
                throw new SemanticError("duplicate variable: " + n);
            }
        }
    }

    public Variable lookup(String name) throws SemanticError {
        int i;

        for (i = 0; i < vars.length; i++) {
            if (vars[i].getName().equals(name)) {
                return vars[i];
            }
        }
        if (parent != null) {
            return parent.lookup(name);
        }
        throw new SemanticError("no such variable: " + name);
    }

    public int allocate(int address) {
        int i;

        for (i = 0; i < vars.length; i++) {
            address = vars[i].allocate(address);
        }
        return address;
    }
}
