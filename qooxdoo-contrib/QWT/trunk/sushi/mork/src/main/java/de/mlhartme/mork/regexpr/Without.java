// §{{header}}:
//
// This is file src/de/mlhartme/mork/regexpr/Without.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.regexpr;



/** Left | Right, a little bit more general.  TODO: rename to Restriction? */

public class Without extends RegExpr {
    private RegExpr left;

    private RegExpr right;

    //----------------------------------------------------------------

    public Without(RegExpr left, RegExpr right) {
        this.left = left;
        this.right = right;
    }

    public Object visit(Action action) {
        Object a;
        Object b;

        a = left.visit(action);
        b = right.visit(action);
        return action.without(a, b);
    }

    public String toString() {
        return left + " - " + right;
    }
}
