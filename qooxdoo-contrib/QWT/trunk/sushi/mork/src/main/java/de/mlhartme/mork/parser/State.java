// §{{header}}:
//
// This is file src/de/mlhartme/mork/parser/State.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.parser;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;

import org.qooxdoo.sushi.util.IntBitSet;

import de.mlhartme.mork.grammar.Grammar;
import de.mlhartme.mork.util.StringArrayList;

/** LR-PDAs are generated using these states */

public class State {
    /** number representing this state in the resulting table. */
    public final int id;

    /** Set of Items. Contains core. */
    private final Set closure;

    /** Set of Items. Subset of closure. Sorted in order to
        speed up equals(). */
    private final SortedSet core;

    /** List of Shifts. */
    private final List shifts;

    /** List of Reduces. */
    private final List reduces;

    //------------------------------------------------------------------

    public static State create(PDA env, int symbol) {
        Collection coreCol;
        State result;

        coreCol = new ArrayList();
        Item.addExpansion(env, symbol, coreCol);
        return new State(env, coreCol);
    }

    public State(PDA env, Collection coreCol) {
        int i, max;
        Iterator pos;
        List todo;
        Item item;

        id = env.states.size();
        shifts = new ArrayList();
        reduces = new ArrayList();

        core = new TreeSet(coreCol); // adds, sorts and removes duplicates
        todo = new ArrayList(core); // avoid duplicates - don't use coreCol
        closure = new HashSet();

        // start loop with empty closure
        // note: loop grows its upper bound
        for (i = 0; i < todo.size(); i++) {
            item = (Item) todo.get(i);
            if (closure.add(item)) {
                item.addExpansion(env, todo);
            } else {
                // item is already known: do nothing
            }
        }
    }

    //-------------------------------------------------------------------

    @Override
    public boolean equals(Object obj) {
        State state;

        if (obj instanceof State) {
            state = (State) obj;
            return core.equals(state.core);
        } else {
            return false;
        }
    }

    //-----------------------------------------------------------------

    public State createShifted(PDA env, int symbol) {
        State end;

        end = new State(env, Collections.EMPTY_LIST);
        shifts.add(new Shift(symbol, end));
        env.states.add(end);
        return end;
    }

    /** one step in LR(0) construction */
    public void expand(PDA env) {
        Set todo;
        Item item;
        List lst;
        State next;
        int idx;
        Iterator pos;
        int shift;

        todo = new HashSet(closure);
        while (!todo.isEmpty()) {
            pos = todo.iterator();
            item = (Item) pos.next();
            pos.remove();
            shift = item.getShift(env);
            if (shift == -1) {
                reduces.add(new Reduce(item.production));
            } else {
                lst = new ArrayList();
                lst.add(item.createShifted());
                while (pos.hasNext()) {
                    item = (Item) pos.next();
                    if (item.getShift(env) == shift) {
                        pos.remove();
                        lst.add(item.createShifted());
                    }
                }

                next =  new State(env, lst);
                idx = env.states.indexOf(next);
                if (idx != -1) {
                    next = (State) env.states.get(idx);
                } else {
                    env.states.add(next);
                }
                shifts.add(new Shift(shift, next));
            }
        }
    }

    //-------------------------------------------------------------------
    // prepare follow calc

    /** Calculate anything available after LR(0) automaton is complete. */
    public void prepare(PDA env, List allShifts) {
        Iterator pos;
        Shift sh;
        int prod, alt, maxAlt;
        State end;
        Reduce r;

        pos = shifts.iterator();
        while (pos.hasNext()) {
            sh = (Shift) pos.next();
            sh.prepare(env, this);

            allShifts.add(sh);

            // calc lookback

            if (sh.isSymbol(env.grm) && env.grm.isNonterminal(sh.symbol)) {
                maxAlt = env.grm.getAlternativeCount(sh.symbol);
                for (alt = 0; alt < maxAlt; alt++) {
                    prod = env.grm.getAlternative(sh.symbol, alt);
                    end = trace(env, prod);
                    if (env != null) {
                        r = end.findReduce(prod);
                        if (r != null) {
                            r.lookback.add(sh);
                        }
                    }
                }
            }
        }
    }

    public void addReadInit(PDA env, IntBitSet result) {
        Iterator pos;
        Shift sh;

        pos = shifts.iterator();
        while (pos.hasNext()) {
            sh = (Shift) pos.next();
            if (!(sh.isSymbol(env.grm) && env.grm.isNonterminal(sh.symbol))) {
                // negative test - eof!
                result.add(sh.symbol);
            }
        }
    }

    public void addReadImplies(PDA env, Set result) {
        Iterator pos;
        Shift sh;

        pos = shifts.iterator();
        while (pos.hasNext()) {
            sh = (Shift) pos.next();
            if (env.nullable.contains(sh.symbol)) {
                result.add(sh);
            }
        }
    }

    //------------------------------------------------------------------

    public void addLookahead() {
        Reduce r;
        Iterator pos;

        pos = reduces.iterator();
        while (pos.hasNext()) {
            r = (Reduce) pos.next();
            r.calcLookahead();
        }
    }

    //------------------------------------------------------------------

    public Shift findShift(int symbol) {
        Shift sh;
        Iterator pos;

        pos = shifts.iterator();
        while (pos.hasNext()) {
            sh = (Shift) pos.next();
            if (sh.symbol == symbol) {
                return sh;
            }
        }
        return null;
    }

    public Reduce findReduce(int prod) {
        Reduce r;
        Iterator pos;

        pos = reduces.iterator();
        while (pos.hasNext()) {
            r = (Reduce) pos.next();
            if (r.production == prod) {
                return r;
            }
        }
        return null;
    }

    /**
     * @param result  list of Shifts
     */
    public boolean trace(PDA env, int prod, List result) {
        int ofs, len;
        State state;
        Shift t;

        state = this;
        len = env.grm.getLength(prod);
        for (ofs = 0; ofs < len; ofs++) {
            t = state.findShift(env.grm.getRight(prod, ofs));
            if (t == null) {
                return false;
            }
            result.add(t);
            state = t.end;
        }
        return true;
    }

    public State trace(PDA env, int prod) {
        int ofs, len;
        State state;
        Shift t;

        state = this;
        len = env.grm.getLength(prod);
        for (ofs = 0; ofs < len; ofs++) {
            t = state.findShift(env.grm.getRight(prod, ofs));
            if (t == null) {
                return null;
            }
            state = t.end;
        }
        return state;
    }

    //------------------------------------------------------------------

    public void addActions(PDA env, ParserTable result, Conflicts conflicts) {
        Iterator pos;
        Shift sh;
        Reduce r;
        int term;

        pos = shifts.iterator();
        while (pos.hasNext()) {
            sh = (Shift) pos.next();
            result.addShift(id, sh.symbol, sh.end.id, conflicts);
        }
        pos = reduces.iterator();
        while (pos.hasNext()) {
            r = (Reduce) pos.next();
            for (term = r.lookahead.first(); term != -1;
                 term = r.lookahead.next(term))
            {
                result.addReduce(id, term, r.production, conflicts);
            }
        }
    }

    //-------------------------------------------------------------------

    public void calcLookahead(PDA env) {
        Iterator pos;
        Reduce r;

        pos = reduces.iterator();
        while (pos.hasNext()) {
            r = (Reduce) pos.next();
            r.calcLookahead();
        }
    }

    //---------------------------------------------------------------------

    public String toString(PDA env, Grammar grammar) {
        StringBuilder result;
        Item item;
        Iterator pos;
        Shift sh;
        Reduce r;
        StringArrayList symbolTable;

        symbolTable = grammar.getSymbolTable();
        result = new StringBuilder();
        result.append("\n------------------------------\n");
        result.append("[state " + id + "]\n");
        pos = core.iterator();
        while (pos.hasNext()) {
            item = (Item) pos.next();
            result.append(item.toString(env, symbolTable));
        }
        result.append('\n');
        pos = closure.iterator();
        while (pos.hasNext()) {
            item = (Item) pos.next();
            if (!core.contains(item)) {
                result.append(item.toString(env, symbolTable));
            }
        }
        result.append('\n');
        pos = shifts.iterator();
        while (pos.hasNext()) {
            sh = (Shift) pos.next();
            result.append(sh.toString(env, symbolTable));
        }
        result.append('\n');
        pos = reduces.iterator();
        while (pos.hasNext()) {
            r = (Reduce) pos.next();
            result.append(r.toString(grammar));
        }
        result.append("\n");
        return result.toString();
    }
}
