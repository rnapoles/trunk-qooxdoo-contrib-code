// §{{header}}:
//
// This is file src/de/mlhartme/mork/regexpr/Loop.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.regexpr;



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

    public Object visit(Action action) {
        Object tmp;

        tmp = body.visit(action);
        return action.loop(tmp);
    }

    public String toString() {
        return "{" + body.toString() + "}";
    }
}
