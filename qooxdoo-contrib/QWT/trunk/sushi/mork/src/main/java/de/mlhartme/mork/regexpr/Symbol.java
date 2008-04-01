// §{{header}}:
//
// This is file src/de/mlhartme/mork/regexpr/Symbol.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.regexpr;

import de.mlhartme.mork.util.StringArrayList;

/**
 * Symbol constant for a regular expression.
 */

public class Symbol extends RegExpr {
    private int symbol;

    public Symbol(int symbolInit) {
        symbol = symbolInit;
    }

    @Override
    public Object visit(Action action) {
        return action.symbol(symbol);
    }

    @Override
    public String toString() {
        return "" + symbol;
    }

    public String toString(StringArrayList symbolTable) {
        return symbolTable.get(symbol);
    }
}
