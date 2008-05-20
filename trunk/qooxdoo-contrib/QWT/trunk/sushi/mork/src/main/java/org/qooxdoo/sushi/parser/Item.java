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

package org.qooxdoo.sushi.parser;

import org.qooxdoo.sushi.misc.StringArrayList;

import java.util.Collection;

/** Immutable. */

public class Item implements Comparable<Item> {
    public final int production;
    public final int dot;

    public Item(int productionInit, int dotInit) {
        production = productionInit;
        dot = dotInit;
    }

    //---------------------------------------------------------------

    @Override
    public int hashCode() {
        return production * dot;
    }

    @Override
    public boolean equals(Object obj) {
        Item item;

        if (obj instanceof Item) {
            item = (Item) obj;
            return (production == item.production) && (dot == item.dot);
        } else {
            return false;
        }
    }

    public int compareTo(Item obj) {
        Item item;

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

    public void addExpansion(PDA env, Collection<Item> result) {
        int symbol;

        symbol = getShift(env);
        if (symbol != -1) {
            addExpansion(env, symbol, result);
        } else {
            // reduce item, nothing to do
        }
    }

    public static void addExpansion(PDA env, int symbol, Collection<Item> result) {
        int alt, maxAlt;

        maxAlt = env.grm.getAlternativeCount(symbol);
        for (alt = 0; alt < maxAlt; alt++) {
            result.add(new Item(env.grm.getAlternative(symbol, alt), 0));
        }
    }

    //-------------------------------------------------------------------

    public String toString(PDA env, StringArrayList symbolTable) {
        StringBuilder result;
        int ofs, len;

        result = new StringBuilder();
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
