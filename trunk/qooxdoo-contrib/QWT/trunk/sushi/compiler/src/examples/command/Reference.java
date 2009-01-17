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

    @Override
    public String eval() {
        return var.get();
    }
}
