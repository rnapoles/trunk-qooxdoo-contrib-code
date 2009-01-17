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

package org.qooxdoo.sushi.regexpr;



/** Left | Right, a little bit more general.  TODO: rename to Restriction? */

public class Without extends RegExpr {
    private RegExpr left;

    private RegExpr right;

    //----------------------------------------------------------------

    public Without(RegExpr left, RegExpr right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public Object visit(Action action) {
        Object a;
        Object b;

        a = left.visit(action);
        b = right.visit(action);
        return action.without(a, b);
    }

    @Override
    public String toString() {
        return left + " - " + right;
    }
}
