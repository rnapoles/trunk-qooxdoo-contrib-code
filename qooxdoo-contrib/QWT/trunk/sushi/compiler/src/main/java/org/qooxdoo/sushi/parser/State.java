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

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;

import org.qooxdoo.sushi.grammar.Grammar;
import org.qooxdoo.sushi.misc.StringArrayList;
import org.qooxdoo.sushi.util.IntBitSet;

/** LR-PDAs are generated using these states */

public class State {
    /** number representing this state in the resulting table. */
    public final int id;

    /** Set of Items. Subset of closure. Sorted in order to speed up equals(). */
    private final SortedSet<Item> core;

    /** Contains core. */
    private final List<Item> closure;

    /** List of Shifts. */
    private final List<Shift> shifts;

    /** List of Reduces. */
    private final List<Reduce> reduces;

    //------------------------------------------------------------------

    public static State create(PDA env, int symbol) {
        Collection<Item> coreCol;

        coreCol = new ArrayList<Item>();
        Item.addExpansion(env, symbol, coreCol);
        return new State(env, coreCol);
    }

    public State(PDA env, Collection<Item> coreCol) {
        int i;
        List<Item> todo;
        Item item;

        id = env.states.size();
        shifts = new ArrayList<Shift>();
        reduces = new ArrayList<Reduce>();

        core = new TreeSet<Item>(coreCol); // adds, sorts and removes duplicates
        todo = new ArrayList<Item>(core); // avoid duplicates - don't use coreCol
        closure = new ArrayList<Item>();

        // start loop with empty closure
        // note: loop grows its upper bound
        for (i = 0; i < todo.size(); i++) {
            item = todo.get(i);
            if (closure.contains(item)) {
                // item is already known: do nothing
            } else {
                closure.add(item);
                item.addExpansion(env, todo);
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
    
    @Override
    public int hashCode() {
        return core.size();
    }

    //-----------------------------------------------------------------

    public State createShifted(PDA env, int symbol) {
        State end;

        end = new State(env, Collections.<Item>emptyList());
        shifts.add(new Shift(symbol, end));
        env.states.add(end);
        return end;
    }

    /** one step in LR(0) construction */
    public void expand(PDA env) {
        List<Item> remaining;
        Item item;
        List<Item> lst;
        State next;
        int idx;
        Iterator<Item> pos;
        int shift;

        remaining = new ArrayList<Item>(closure);
        while (!remaining.isEmpty()) {
            pos = remaining.iterator();
            item = pos.next();
            pos.remove();
            shift = item.getShift(env);
            if (shift == -1) {
                reduces.add(new Reduce(item.production));
            } else {
                lst = new ArrayList<Item>();
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
    public void prepare(PDA env, List<Shift> allShifts) {
        Iterator<Shift> pos;
        Shift sh;
        int prod, alt, maxAlt;
        State end;
        Reduce r;

        pos = shifts.iterator();
        while (pos.hasNext()) {
            sh = pos.next();
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
        Iterator<Shift> pos;
        Shift sh;

        pos = shifts.iterator();
        while (pos.hasNext()) {
            sh = pos.next();
            if (!(sh.isSymbol(env.grm) && env.grm.isNonterminal(sh.symbol))) {
                // negative test - eof!
                result.add(sh.symbol);
            }
        }
    }

    public void addReadImplies(PDA env, Set<Shift> result) {
        Iterator<Shift> pos;
        Shift sh;

        pos = shifts.iterator();
        while (pos.hasNext()) {
            sh = pos.next();
            if (env.nullable.contains(sh.symbol)) {
                result.add(sh);
            }
        }
    }

    //------------------------------------------------------------------

    public void addLookahead() {
        Reduce r;
        Iterator<Reduce> pos;

        pos = reduces.iterator();
        while (pos.hasNext()) {
            r = pos.next();
            r.calcLookahead();
        }
    }

    //------------------------------------------------------------------

    public Shift findShift(int symbol) {
        Shift sh;
        Iterator<Shift> pos;

        pos = shifts.iterator();
        while (pos.hasNext()) {
            sh = pos.next();
            if (sh.symbol == symbol) {
                return sh;
            }
        }
        return null;
    }

    public Reduce findReduce(int prod) {
        Reduce r;
        Iterator<Reduce> pos;

        pos = reduces.iterator();
        while (pos.hasNext()) {
            r = pos.next();
            if (r.production == prod) {
                return r;
            }
        }
        return null;
    }

    /**
     * @param result  list of Shifts
     */
    public boolean trace(PDA env, int prod, List<Shift> result) {
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
        Iterator<Shift> p1;
        Iterator<Reduce> p2;
        Shift sh;
        Reduce r;
        int term;

        p1 = shifts.iterator();
        while (p1.hasNext()) {
            sh = p1.next();
            result.addShift(id, sh.symbol, sh.end.id, conflicts);
        }
        p2 = reduces.iterator();
        while (p2.hasNext()) {
            r = p2.next();
            for (term = r.lookahead.first(); term != -1; term = r.lookahead.next(term)) {
                result.addReduce(id, term, r.production, conflicts);
            }
        }
    }

    //-------------------------------------------------------------------

    public void calcLookahead(PDA env) {
        Iterator<Reduce> pos;
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
        Iterator<Item> p1;
        Iterator<Shift> p2;
        Iterator<Reduce> p3;
        Shift sh;
        Reduce r;
        StringArrayList symbolTable;

        symbolTable = grammar.getSymbolTable();
        result = new StringBuilder();
        result.append("\n------------------------------\n");
        result.append("[state " + id + "]\n");
        p1 = core.iterator();
        while (p1.hasNext()) {
            item = (Item) p1.next();
            result.append(item.toString(env, symbolTable));
        }
        result.append('\n');
        p1 = closure.iterator();
        while (p1.hasNext()) {
            item = (Item) p1.next();
            if (!core.contains(item)) {
                result.append(item.toString(env, symbolTable));
            }
        }
        result.append('\n');
        p2 = shifts.iterator();
        while (p2.hasNext()) {
            sh = p2.next();
            result.append(sh.toString(env, symbolTable));
        }
        result.append('\n');
        p3 = reduces.iterator();
        while (p3.hasNext()) {
            r = p3.next();
            result.append(r.toString(grammar));
        }
        result.append("\n");
        return result.toString();
    }
}
