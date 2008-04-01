// §{{header}}:
//
// This is file src/de/mlhartme/mork/parser/Item.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.parser;

import de.mlhartme.mork.util.StringArrayList;
import java.util.Collection;

/** Immutable. */

public class Item implements Comparable {
    public final int production;
    public final int dot;

    public Item(int productionInit, int dotInit) {
        production = productionInit;
        dot = dotInit;
    }

    //---------------------------------------------------------------

    public int hashCode() {
        return production * dot;
    }

    public boolean equals(Object obj) {
        Item item;

        if (obj instanceof Item) {
            item = (Item) obj;
            return (production == item.production) && (dot == item.dot);
        } else {
            return false;
        }
    }

    public int compareTo(Object obj) {
        Item item;

        if (obj instanceof Item) {
            item = (Item) obj;
            if (production < item.production) {
                return -1;
            } else if (production > item.production) {
                return 1;
            } else {
                if (dot < item.dot) {
                    return -1;
                } else if (dot > item.dot) {
                    return 1;
                } else {
                    return 0;
                }
            }
        } else {
            throw new ClassCastException();
        }
    }

    //-----------------------------------------------------------------

    public int getShift(PDA env) {
        if (dot < env.grm.getLength(production)) {
            return env.grm.getRight(production, dot);
        } else {
            return -1;
        }
    }

    public Item createShifted() {
        return new Item(production, dot + 1);
    }

    public void addExpansion(PDA env, Collection result) {
        int symbol;

        symbol = getShift(env);
        if (symbol != -1) {
            addExpansion(env, symbol, result);
        } else {
            // reduce item, nothing to do
        }
    }

    public static void addExpansion(PDA env, int symbol, Collection result) {
        int alt, maxAlt;

        maxAlt = env.grm.getAlternativeCount(symbol);
        for (alt = 0; alt < maxAlt; alt++) {
            result.add(new Item(env.grm.getAlternative(symbol, alt), 0));
        }
    }

    //-------------------------------------------------------------------

    public String toString(PDA env, StringArrayList symbolTable) {
        StringBuffer result;
        int ofs, len;

        result = new StringBuffer();
        result.append(symbolTable.getOrIndex(env.grm.getLeft(production)));
        result.append("\t::=");
        len = env.grm.getLength(production);
        for (ofs = 0; ofs < len; ofs++) {
            result.append(' ');
            if (ofs == dot) {
                result.append(". ");
            }
            result.append(symbolTable.getOrIndex(
                              env.grm.getRight(production, ofs)));
        }
        if (ofs == dot) {
            result.append(" .");
        }
        result.append(" \n");  // no semicolon
        return result.toString();
    }
}
