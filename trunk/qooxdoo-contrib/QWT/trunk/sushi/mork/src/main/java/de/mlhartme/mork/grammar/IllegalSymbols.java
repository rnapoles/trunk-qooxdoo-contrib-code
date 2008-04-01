// §{{header}}:
//
// This is file src/de/mlhartme/mork/grammar/IllegalSymbols.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.grammar;

import org.qooxdoo.sushi.util.IntBitSet;

/**
 * Indicate exceptions concering symbols.
 */

public class IllegalSymbols extends Exception {
    public final IntBitSet symbols;

    public IllegalSymbols(String msg, IntBitSet symbols) {
        super(msg);
        this.symbols = symbols;
    }
    public IllegalSymbols(String msg, int symbol) {
        super(msg);
        symbols = new IntBitSet();
        symbols.add(symbol);
    }
}
