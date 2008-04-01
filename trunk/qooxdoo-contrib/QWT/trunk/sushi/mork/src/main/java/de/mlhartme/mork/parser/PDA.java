// §{{header}}:
//
// This is file src/de/mlhartme/mork/parser/PDA.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.parser;

import de.mlhartme.mork.grammar.Grammar;
import de.mlhartme.mork.util.GenericException;
import de.mlhartme.mork.util.IntBitSet;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.List;

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
    public final List states;      // states built so far


    private State end;

    //----------------------------------------------------------------

    public PDA(Grammar grm, int start) {
        List allShifts;

        this.grm = grm;
        this.nullable = new IntBitSet();
        this.states = new ArrayList();
        this.start = start;
        this.eof = grm.getSymbolCount();
        this.grm.addRemoveable(nullable);

        calcLR0();
        allShifts = new ArrayList();
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

    private void prepare(List shifts) {
        int i, max;
        State state;

        max = states.size();
        for (i = 0; i < max; i++) {
            state = getState(i);
            state.prepare(this, shifts);
        }
    }

    private void calc(List shifts) {
        int i, max;
        Shift sh;
        List stack;

        max = shifts.size();
        for (i = 0; i < max; i++) {
            sh = (Shift) shifts.get(i);
            sh.initReadCalc();
        }
        stack = new ArrayList();
        for (i = 0; i < max; i++) {
            sh = (Shift) shifts.get(i);
            sh.digraph(stack);
        }
        for (i = 0; i < max; i++) {
            sh = (Shift) shifts.get(i);
            sh.saveReadCalc();
            sh.initFollowCalc();
        }

        stack = new ArrayList();
        for (i = 0; i < max; i++) {
            sh = (Shift) shifts.get(i);
            sh.digraph(stack);
        }
        for (i = 0; i < max; i++) {
            sh = (Shift) shifts.get(i);
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
