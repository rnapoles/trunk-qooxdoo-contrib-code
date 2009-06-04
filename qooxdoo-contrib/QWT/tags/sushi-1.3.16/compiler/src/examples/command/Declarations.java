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
