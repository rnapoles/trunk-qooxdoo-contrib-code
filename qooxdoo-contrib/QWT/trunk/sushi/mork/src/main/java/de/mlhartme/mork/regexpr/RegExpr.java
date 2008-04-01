// §{{header}}:
//
// This is file src/de/mlhartme/mork/regexpr/RegExpr.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.
package de.mlhartme.mork.regexpr;

import java.io.Serializable;

/**
 * Regular Expression. All derived classes shall be immutable, it has
 * to be safe to share instances. Anything that can read from a buffer
 * and that can be visited is considered a regular expression.
 */

public abstract class RegExpr implements Serializable {
    /**
     * Visit this expressions and its sub-expression and perform
     * some action.
     */
    public abstract Object visit(Action action);
}
