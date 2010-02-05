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

import java.io.PrintStream;
import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.util.IntBitSet;

import org.qooxdoo.sushi.grammar.Grammar;
import org.qooxdoo.sushi.misc.GenericException;

public class PDA {
    /** start symbol */
    public final int start;

    /**
     * Pseudo-symbol, indicates end-of-file (or an empty word
     * if lookahead is seen as a set of words of length <= 1)
     */
    public final int eof;


    // environment for computation; final but the objects
    // change over time
    public final Grammar grm;      // grammar
    public final IntBitSet nullable;  // nullable symbols
    public final List<State> states;      // states built so far


    private State end;

    //----------------------------------------------------------------

    public PDA(Grammar grm, int start) {
        List<Shift> allShifts;

        this.grm = grm;
        this.nullable = new IntBitSet();
        this.states = new ArrayList<State>();
        this.start = start;
        this.eof = grm.getSymbolCount();
        this.grm.addRemoveable(nullable);

        calcLR0();
        allShifts = new ArrayList<Shift>();
        prepare(allShifts);
        calc(allShifts);
        finish();
    }

    //-------------------------------------------------------------------

    private void calcLR0() {
        int i;
        State state;

        states.add(State.create(this, start));
        // note: the loop grows its upper bound
        for (i = 0; i < states.size(); i++) {
            state = getState(i);
            state.expand(this);
        }
        end = getState(0).createShifted(this, start);
        end.createShifted(this, eof);
    }

    private void prepare(List<Shift> shifts) {
        int i, max;
        State state;

        max = states.size();
        for (i = 0; i < max; i++) {
            state = getState(i);
            state.prepare(this, shifts);
        }
    }

    private void calc(List<Shift> shifts) {
        int i, max;
        Shift sh;
        List<Shift> stack;

        max = shifts.size();
        for (i = 0; i < max; i++) {
            sh = shifts.get(i);
            sh.initReadCalc();
        }
        stack = new ArrayList<Shift>();
        for (i = 0; i < max; i++) {
            sh = shifts.get(i);
            sh.digraph(stack);
        }
        for (i = 0; i < max; i++) {
            sh = shifts.get(i);
            sh.saveReadCalc();
            sh.initFollowCalc();
        }

        stack = new ArrayList<Shift>();
        for (i = 0; i < max; i++) {
            sh = shifts.get(i);
            sh.digraph(stack);
        }
        for (i = 0; i < max; i++) {
            sh = shifts.get(i);
            sh.saveFollowCalc();
        }
    }

    private void finish() {
        int i, max;
        State state;

        max = states.size();
        for (i = 0; i < max; i++) {
            state = getState(i);
            state.calcLookahead(this);
        }
    }

    //----------------------------------------------------------------


    /**
     * @param conflicts  returns conflicts found
     */
    public ParserTable createTable(Conflicts conflicts, int lastSymbol) throws GenericException {
        // the initial syntaxnode created by the start action is ignoed!
        ParserTable result;
        int i, max;

        result = new ParserTable(0, states.size(), lastSymbol + 1 /* +1 for EOF */, grm, null);
        max = states.size();
        for (i = 0; i < max; i++) {
            getState(i).addActions(this, result, conflicts);
        }
        result.addAccept(end.id, eof);
        return result;
    }

    //----------------------------------------------------------------

    public int size() {
        return states.size();
    }

    public State getState(int idx) {
        return (State) states.get(idx);
    }


    /**
     * I'd like to implement toString instead, but memory consumption
     * is to high for large automatons.
     */
    public void print(Grammar grammar, PrintStream dest) {
        int i, max;

        max = states.size();
        for (i = 0; i < max; i++) {
            dest.println(getState(i).toString(this, grammar));
        }
    }
}
