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



/**
 * Loop with >= 1 iterations. Caution, this is not Kleene star.
 * Using Kleene star would be problematic because translating EBNF rules
 * into LALR(1) grammars becomes much harder.
 */

public class Loop extends RegExpr {
    private RegExpr body;

    public Loop(RegExpr body) {
        if (body == null) {
            throw new NullPointerException();
        }

        this.body = body;
    }

    /** Kleene star. */
    public static RegExpr createStar(RegExpr bodyInit) {
        return Choice.createOption(new Loop(bodyInit));
    }

    @Override
    public Object visit(Action action) {
        Object tmp;

        tmp = body.visit(action);
        return action.loop(tmp);
    }

    @Override
    public String toString() {
        return "{" + body.toString() + "}";
    }
}
