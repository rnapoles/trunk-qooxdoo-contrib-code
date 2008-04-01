// §{{header}}:
//
// This is file examples/interpreter/Declarations.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package interpreter;

public class Declarations {
    private Variable[] vars;

    public Declarations(Variable[] varsInit) {
        vars = varsInit;
    }

    public Variable find(String name) {
        int i;

        for (i = 0; i < vars.length; i++) {
            if (name.equals(vars[i].getName())) {
                return vars[i];
            }
        }
        return null;
    }
}
