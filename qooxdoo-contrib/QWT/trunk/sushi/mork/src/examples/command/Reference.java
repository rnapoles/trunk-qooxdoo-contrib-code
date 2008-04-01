// §{{header}}:
//
// This is file examples/command/Reference.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package command;

/** Variable reference. */

public class Reference extends Expression {
    /** variable referenced by this expression. */
    private Variable var;

    public Reference(Declarations decls, String identifier) throws Failure {
        var = decls.lookup(identifier);
        if (var == null) {
            throw new Failure("unkown identifier: " + identifier);
        }
    }

    public String eval() {
        return var.get();
    }
}
