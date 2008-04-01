// §{{header}}:
//
// This is file src/de/mlhartme/mork/parser/Reduce.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.parser;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import org.qooxdoo.sushi.util.IntBitSet;

import de.mlhartme.mork.grammar.Grammar;

public class Reduce {
    public final int production;
    public final IntBitSet lookahead;

    public final Set lookback;

    public Reduce(int productionInit) {
        production = productionInit;
        lookahead = new IntBitSet();

        lookback = new HashSet();
    }

    public void calcLookahead() {
        Iterator pos;
        Shift sh;

        pos = lookback.iterator();
        while (pos.hasNext()) {
            sh = (Shift) pos.next();
            sh.addFollow(lookahead);
        }
    }

    //----------------------------------------------------------

    public String toString(Grammar grammar) {
        StringBuilder buffer;

        buffer = new StringBuilder();
        buffer.append("reduce ");
        grammar.prodToString(buffer, production);
        buffer.append(" on ");
        buffer.append(lookahead.toString(grammar.getSymbolTable().toList()));
        buffer.append('\n');

        return buffer.toString();
    }
}
