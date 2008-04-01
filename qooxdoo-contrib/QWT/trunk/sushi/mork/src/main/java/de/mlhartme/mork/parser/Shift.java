// §{{header}}:
//
// This is file src/de/mlhartme/mork/parser/Shift.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.parser;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.qooxdoo.sushi.util.IntBitSet;

import de.mlhartme.mork.grammar.Grammar;
import de.mlhartme.mork.util.StringArrayList;

public class Shift {
    public final int symbol;
    public final State end;

    private IntBitSet readInit;     // DR: directly reads
    private Set readImplies;       // READS: set of Shifts
    private IntBitSet read;         // read

    // read is followImplies
    private Set followImplies;    // INCLUDES: set of Shifts
    private IntBitSet follow;      // follow

    public Shift(int symbolInit, State endInit) {
        symbol = symbolInit;
        end = endInit;

        readInit = new IntBitSet();
        readImplies = new HashSet();
        read = new IntBitSet();
        followImplies = new HashSet();
        follow = new IntBitSet();
    }

    //----------------------------------------------------------------------

    /** calculate anything available when LR(0) is implete. */

    public void prepare(PDA env, State start) {
        int prod, alt, maxAlt;
        int i;
        List lst;
        Shift t;

        // read implies
        end.addReadImplies(env, readImplies);

        if (isSymbol(env.grm) && env.grm.isNonterminal(symbol)) {
            // read init
            end.addReadInit(env, readInit);

            // follow implies
            maxAlt = env.grm.getAlternativeCount(symbol);
            for (alt = 0; alt < maxAlt; alt++) {
                prod = env.grm.getAlternative(symbol, alt);
                lst = new ArrayList();
                if (start.trace(env, prod, lst)) {
                    for (i = lst.size() - 1; i >= 0; i--) {
                        t = (Shift) lst.get(i);
                        t.followImplies.add(this);
                        if (!env.nullable.contains(t.symbol)) {
                            break;
                        }
                    }
                }
            }
        } else {
            // read init: do nothing
            // follow implies: do nothing
        }
    }

    public boolean isSymbol(Grammar grammar) {
        return (symbol >= 0) && (symbol < grammar.getSymbolCount());
    }


    //----------------------------------------------------------------------

    // for closure computation
    private IntBitSet clInit;
    private Set clImplies;
    private IntBitSet clResult;
    private int clN;

    public void initReadCalc() {
        clInit = readInit;
        clImplies = readImplies;
        clResult = new IntBitSet();
        clN = 0;
    }
    public void saveReadCalc() {
        read = clResult;
        clResult = null;
    }
    public void initFollowCalc() {
        clInit = read;
        clImplies = followImplies;
        clResult = new IntBitSet();
        clN = 0;
    }
    public void saveFollowCalc() {
        follow = clResult;
        clResult = null;
    }

    public void addFollow(IntBitSet result) {
        result.addAll(follow);
    }

    /**
     * @param stack of Shifts
     */
    public void digraph(List stack) {
        if (clN == 0) {
            traverse(stack);
        }
    }

    private void traverse(List stack) {
        int d;  // initial stack size
        Shift t;
        Iterator pos;

        // initialize
        stack.add(this);
        d = stack.size();
        clN = d;
        clResult.addAll(clInit);

        // complete closure process
        pos = clImplies.iterator();
        while (pos.hasNext()) {
            t = (Shift) pos.next();
            if (t.clN == 0) {
                t.traverse(stack);
            }
            clN = Math.min(clN, t.clN);
            clResult.addAll(t.clResult);
        }
        if (clN == d) {
            do {
                t = (Shift) stack.get(stack.size() - 1);
                stack.remove(stack.size() - 1);
                t.clN = Integer.MAX_VALUE;
                t.clResult.addAll(clResult);
            } while (t != this);
        }
    }

    //--------------------------------------------------------------

    public String toString(PDA env, StringArrayList symbolTable) {
        StringBuffer result;

        result = new StringBuffer();
        result.append("shift ");
        result.append(symbolTable.getOrIndex(symbol));
        result.append(" -> " + end.id + '\n');
        return result.toString();
    }

    public static void toStringShiftSet(StringArrayList symbolTable, Set set, StringBuffer result) {
        Iterator pos;
        Shift sh;

        result.append('{');
        pos = set.iterator();
        while (pos.hasNext()) {
            sh = (Shift) pos.next();
            result.append(' ');
            result.append(symbolTable.getOrIndex(sh.symbol));
            result.append('.');
            result.append("" + sh.end.id);
        }
        result.append(" }");
    }
}
