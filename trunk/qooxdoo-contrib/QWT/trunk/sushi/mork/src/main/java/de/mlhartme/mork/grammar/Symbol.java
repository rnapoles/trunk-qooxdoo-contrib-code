// §{{header}}:
//
// This is file src/de/mlhartme/mork/grammar/Symbol.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.grammar;

/**
 * A stupid data container for Grammar.
 */

public class Symbol {
    /** productions for this symbol */
    public final int[] alternatives;

    /** productions using this symbol. */
    public final int[] users;

    /** ofsets in the using productions. */
    public final int[][] userOfs;

    public Symbol(int[] alternatives, int[] users, int[][] userOfs) {
        this.alternatives = alternatives;
        this.users = users;
        this.userOfs = userOfs;
    }
}
