/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2007 1&1 Internet AG, Germany, http://www.1and1.org
   
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
   
   Authors:
     * Michael Hartmeier (mlhartme)
   
 ************************************************************************ */

package de.mlhartme.mork.scanner;

import java.io.PrintStream;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.util.IntBitSet;

import de.mlhartme.mork.grammar.Rule;
import de.mlhartme.mork.parser.ParserTable;
import de.mlhartme.mork.regexpr.Range;
import de.mlhartme.mork.util.GenericException;

/**
 * <p>An immutable FA. Instances are used for acual scanning. I would call
 * it FA if FA could be called FABuffer. But in this case, FABuilder
 * would become FABufferBuilder ...</p>
 *
 * <pre>
 * TODO
 * o binary search in TableFA?
 *  o Java Scanner needs up to 60 comparisons
 * </pre>
 */
public class GrammarScannerFactory implements ScannerFactory {
    public static final String SCANNER_TOO_BIG = "scanner too big";

    /** finite deterministic automaton */
    private final int start;

    private final int modeCount;

    /**
     * First index is the mode.
     * list of states with the following structure:
     *    terminals  per mode: terminal for end states; NO_TERMINAL otherwise
     *    range[size] with
     *       last    last, not first
     *       state   pc for next state or ERROR_PC
     * Notes:
     * o I could get smaller constants in "last" by using values relative
     *   to the previous last -- but this slightly slows down the scanner
     *   and the Java scanner is just 3.5k smaller
     * o I could get smaller constants by using "first" instead of "last",
     *   but this saves just 300bytes in the Java scanner an scanning is
     *   slightly slower. It seems that lower ranges should be testet first.
     * o the Java ranges has states with more than 60 ranges ...
     */
    private final char[] data;

    private final int eofSymbol;

    //-----------------------------------------------------------------

    /**
     * @param inlineSymbols   all symbols that became expanded
     */
    public static GrammarScannerFactory create(
        FA fa, int errorSi, ParserTable parserTable, Rule[] all, IntBitSet whites,
        PrintStream verbose, PrintStream listing, int eofSymbol)
        throws GenericException
    {
        List modes;  // list of IntSets
        char[] data;
        int i;

        if (listing != null) {
            listing.println("Scanner\n");
            listing.println(fa.toString());
        }
        if (verbose != null) {
            verbose.println("computing scanner modes");
        }
        modes = Modes.generate(fa, parserTable, whites, listing);
        if (verbose != null) {
            verbose.println("building table fa");
        }
        data = createData(fa, errorSi, modes);
        return new GrammarScannerFactory(fa.getStart(), modes.size(), eofSymbol, data);
    }

    /**
     * @param inlineSymbols   all symbols that became expanded
     */
    public static GrammarScannerFactory createSimple(FA fa, int errorSi, IntBitSet terminals, int eofSymbol)
        throws GenericException
    {
        char[] data;
        int i;
        List modes;  // list of IntSets

        modes = new ArrayList();
        modes.add(new IntBitSet(terminals));
        data = createData(fa, errorSi, modes);
        return new GrammarScannerFactory(fa.getStart(), 1, eofSymbol, data);
    }

    private static char[] createData(FA fa, int errorSi, List modes) throws GenericException {
        char[] data;
        int ti, si;
        int maxTi, maxSi;
        State state;
        Range range;
        int pc;
        int[] ofs;  // index by si; contains pc for this state
        int start;
        int endSymbol;
        int modeCount;
        int i;

        modeCount = modes.size();

        // determin size and ofs
        maxSi = fa.size();
        ofs = new int[maxSi];
        pc = 0;
        for (si = 0; si < maxSi; si++) {
            if (si != errorSi) {
                ofs[si] = pc;
                pc += modeCount; // one terminal or NO_TERMINAL per mode
                pc += fa.get(si).size() * 2;
            }
        }
        if (pc >= Character.MAX_VALUE) {
            throw new GenericException(SCANNER_TOO_BIG);
        }

        // copy fa into data
        data = new char[pc];
        pc = 0;
        start = ofs[fa.getStart()];
        for (si = 0; si < maxSi; si++) {
            if (si != errorSi) {
                if (ofs[si] != pc) {
                    throw new RuntimeException();
                }
                state = fa.get(si);
                for (i = 0; i < modeCount; i++) {
                    data[pc] = getEndSymbol(fa, si, (IntBitSet) modes.get(i));
                    pc++;
                }

                // ranges
                maxTi = state.size();
                if (maxTi == 0) {
                    throw new RuntimeException();
                }
                for (ti = 0; ti < maxTi; ti++) {
                    range = (Range) state.getInput(ti);

                    data[pc] = range.getLast();
                    pc++;

                    if (state.getEnd(ti) == errorSi) {
                        data[pc] = GrammarScanner.ERROR_PC;
                    } else {
                        // this cast is safe because max pc was tested above
                        data[pc] = (char) ofs[state.getEnd(ti)];
                    }
                    pc++;
                }
            }
        }
        if (pc != data.length) {
            throw new RuntimeException();
        }
        return data;
    }

    private static char getEndSymbol(FA fa, int si, IntBitSet modeSymbols) throws GenericException {
        Label label;
        int endSymbol;
        State state;

        if (!fa.isEnd(si)) {
            return GrammarScanner.NO_TERMINAL;
        }
        state = fa.get(si);
        label = (Label) state.getLabel();
        if (label == null) {
            throw new RuntimeException();
        }
        endSymbol = label.getSymbol(modeSymbols);
        if (endSymbol == -1) {
            return GrammarScanner.NO_TERMINAL;
        }
        if (endSymbol >= GrammarScanner.NO_TERMINAL) {
            throw new GenericException(SCANNER_TOO_BIG);
        }
        return (char) endSymbol;
    }

    public GrammarScannerFactory(int start, int modeCount, int eofSymbol, char[] data) {
        if (start == -1) {
            throw new IllegalArgumentException();
        }
        this.start = start;
        this.modeCount = modeCount;
        this.data = data;
        this.eofSymbol = eofSymbol;
    }

    public Scanner newInstance(Position pos, Reader src) {
        return new GrammarScanner(start, modeCount, eofSymbol, data, pos, src);
    }

    public int size() {
        return data.length;
    }
}
