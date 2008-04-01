// §{{header}}:
//
// This is file src/de/mlhartme/mork/grammar/Rule.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.grammar;

import de.mlhartme.mork.regexpr.RegExpr;
import de.mlhartme.mork.util.StringArrayList;
import java.io.Serializable;

/**
 * Defines a symbol by a redular expression.
 */

public class Rule implements Serializable {
    private int left;
    private RegExpr right;

    public Rule(int leftInit, RegExpr rightInit) {
        if (rightInit == null) {
            throw new NullPointerException();
        }
        left = leftInit;
        right = rightInit;
    }

    public int getLeft() {
        return left;
    }

    public RegExpr getRight() {
        return right;
    }

    public String toString(StringArrayList symTab) {
        return symTab.get(left) + "\t::= " + right.toString() + ";";
    }
}
