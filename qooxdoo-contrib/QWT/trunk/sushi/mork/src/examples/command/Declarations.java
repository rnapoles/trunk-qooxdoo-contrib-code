// §{{header}}:
//
// This is file examples/command/Declarations.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package command;

public class Declarations {
    private Variable[] vars;

    public Declarations(Variable[] vars) throws Failure {
        this.vars = vars;
        checkDuplicates();
    }

    /**
     * Throws Failure if there are multiple variables with the same name.
     */
    private void checkDuplicates() throws Failure {
        int i;
        Variable v;
        String name;

        for (i = 0; i < vars.length; i++) {
            v = vars[i];
            name = v.getName();
            if (lookup(name) != v) {
                throw new Failure("duplicate variable name: " + name);
            }
        }
    }

    public Variable lookup(String name) {
        int i;

        for (i = 0; i < vars.length; i++) {
            if (vars[i].getName().equals(name)) {
                return vars[i];
            }
        }
        return null;
    }

    public boolean runFrontend(String title, String description) {
        Frontend frontend;
        boolean result;
        int i;

        frontend = new Frontend(title, description, vars.length);
        for (i = 0; i < vars.length; i++) {
            frontend.setLabel(i, vars[i].getLabel());
        }
        result = frontend.run();
        for (i = 0; i < vars.length; i++) {
            vars[i].set(frontend.getValue(i));
        }

        return result;
    }
}
