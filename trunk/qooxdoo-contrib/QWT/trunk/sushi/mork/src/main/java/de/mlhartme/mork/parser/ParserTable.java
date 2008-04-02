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

package de.mlhartme.mork.parser;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.util.IntBitSet;

import de.mlhartme.mork.grammar.Grammar;
import de.mlhartme.mork.util.GenericException;
import de.mlhartme.mork.util.StringArrayList;

/**
 * Shift-Reduce-Table realized by an (expensive) array.
 */

public class ParserTable implements Serializable {
    private static final int ACTION_BITS = 2;
    
    /** largest operand value possible */
    private static final int MAX_OPERAND = 0xbfff; // TODO: 0x3fff?
    
    /** Bit mask to obtain kind of action. */
    private static final int MASK  = 0x0003;
    
    
    //-----------------------------------------------------------------------
    // 'program for the parser'
    
    /** initial state for PDA */
    private final char startState;
    
    private final int symbolCount;
    
    /**
     * Values in the table. [state * symbolCount + symbol]. Each value
     * stores   operand << ACTION_BITS | action.
     */
    private final char[] values;
    
    /** length of productions; [production] */
    private final int[] lengths;
    
    /** left-hand-side of productions. */
    private final int[] lefts;
    
    /** index by states. TODO: final  */
    private char[] modes;
    
    //---------------------------------------------------------------------
    // object compilation
    
    /**
     * Constructor for compiled object.
     */
    public ParserTable(
        char startState, int symbolCount, char[] values, int[] lengths, int[] lefts, char[] modes)
    {
        this.startState = startState;
        this.symbolCount = symbolCount;
        this.values = values;
        this.lengths = lengths;
        this.lefts = lefts;
        this.modes = modes;
    }
    
    public ParserTable(
        char startState, int symbolCount, int stateCount,
        String[] packedValues, int[] lengths, int[] lefts, char[] modes)
    {
        this(startState, symbolCount, new char[stateCount * symbolCount], lengths, lefts, modes);
        unpackValues(packedValues);
    }
    
    public void setModes(char[] modes) {
        this.modes = modes;
    }
    
    //-----------------------------------------------------------------------
    // table creation
    
    public ParserTable(
        int startState, int stateCount, int symbolCount, Grammar grm, char[] modes)
        throws GenericException
    {
        int i;
        int max;
        
        if (stateCount >= MAX_OPERAND) {
            throw new GenericException("too may states");
        }
        this.startState = (char) startState;
        this.symbolCount = symbolCount;
        this.modes = modes;
        
        values = new char[stateCount * symbolCount];
        for (i = 0; i < values.length; i++) {
            values[i] = createValue(Parser.SPECIAL, Parser.SPECIAL_ERROR);
        }
        
        max = grm.getSymbolCount();
        if (max >= MAX_OPERAND) {
            throw new GenericException("too may symbols");
        }
        
        max = grm.getProductionCount();
        lengths = new int[max];
        lefts = new int[max];
        for (i = 0; i < max; i++) {
            lengths[i] = grm.getLength(i);
            lefts[i] = grm.getLeft(i);
        }
    }
    
    //------------------------------------------------------------------
    // building the table
    
    public void addWhitespace(IntBitSet whites, Conflicts conflicts) {
        int sym;
        int state;
        int stateCount;
        
        stateCount = getStateCount();
        for (sym = whites.first(); sym != -1; sym = whites.next(sym)) {
            for (state = 0; state < stateCount; state++) {
                setTested(createValue(Parser.SKIP), state, sym, conflicts);
            }
        }
    }
    
    public void addReduce(int state, int term, int prod, Conflicts conflicts) {
        setTested(createValue(Parser.REDUCE, prod), state, term, conflicts);
    }
    
    /** @param  sym  may be a nonterminal */
    public void addShift(int state, int sym, int nextState, Conflicts conflicts) {
        setTested(createValue(Parser.SHIFT, nextState), state, sym, conflicts);
    }
    
    public void addAccept(int state, int eof) {
        // value is assigned uncheck, overwrites shift on EOF
        values[state * symbolCount + eof] = createValue(Parser.SPECIAL, Parser.SPECIAL_ACCEPT);
    }
    
    private void setTested(int value, int state, int sym, Conflicts conflicts) {
        if (values[state * symbolCount + sym] == createValue(Parser.SPECIAL, Parser.SPECIAL_ERROR)) {
            values[state * symbolCount + sym] = (char) value;
        } else {
            conflicts.add(state, sym, value, (int) values[state * symbolCount + sym]);
        }
    }
    
    private char createValue(int action) {
        return createValue(action, 0);
    }
    
    private char createValue(int action, int operand) {
        return (char) (action | operand << ACTION_BITS);
    }
    
    //-------------------------------------------------------
    // create a representation to store the table effiziently
    
    /** has to be a unique value, i.e. something not produced by createValue. */
    private static final int COUNT_MARK = Parser.SKIP + 4;
    
    public String[] packValues() {
        StringBuilder difs;
        StringBuilder vals;
        int i;
        int prev;
        int count;
        int v;
        
        difs = new StringBuilder();
        vals = new StringBuilder();
        prev = 0;
        for (i = 0; i < values.length; i++) {
            v = values[i];
            if (v != createValue(Parser.SPECIAL, Parser.SPECIAL_ERROR)) {
                count = sameValues(i);
                difs.append((char) (i - prev));
                if (count <= 2) {
                    vals.append(values[i]);
                } else {
                    vals.append((char) COUNT_MARK);
                    difs.append((char) count);
                    vals.append(values[i]);
                    i += count - 1;  // 1 is added by loop-increment
                }
                prev = i;
            }
        }
        return packValue(difs, vals);
    }
    
    private static final int MAX_UTF8_LENGTH = 0xffff - 2 / 3;
    
    public String[] packValue(StringBuilder difs, StringBuilder vals) {
        List lst = new ArrayList();
        String[] array;
        
        if (difs.length() != vals.length()) {
            throw new IllegalArgumentException();
        }
        lst = new ArrayList();
        split(difs, MAX_UTF8_LENGTH, lst);
        split(vals, MAX_UTF8_LENGTH, lst);
        array = new String[lst.size()];
        lst.toArray(array);
        return array;
    }
    
    private static void split(StringBuilder str, int chunkLength, List result) {
        int i;
        int max;
        
        max = str.length();
        for (i = 0; i < max; i += chunkLength) {
            result.add(str.substring(i, Math.min(max, i + chunkLength)));
        }
    }
    
    
    private void unpackValues(String[] packed) {
        int chunk;
        int chunkCount;
        String difs;
        String vals;
        int idx;
        int i;
        int max;
        char ch;
        int end;
        boolean marked;
        
        idx = 0;
        marked = false;
        // this method takes about 1/20 of the time to load
        // the jp Analyzer in Mork 0.2.x
        chunkCount = packed.length / 2;
        for (chunk = 0; chunk < chunkCount; chunk++) {
            difs = packed[chunk];
            vals = packed[chunk + chunkCount];
            max = difs.length();
            for (i = 0; i < max; i++) {
                ch = vals.charAt(i);
                if (marked) {
                    for (end = idx + difs.charAt(i); idx < end; idx++) {
                        values[idx] = ch;
                    }
                    idx--;
                    // idx point to the last value assigned
                    marked = false;
                } else if (ch == COUNT_MARK) {
                    idx += difs.charAt(i);
                    marked = true;
                } else {
                    idx += difs.charAt(i);
                    values[idx] = ch;
                }
            }
        }
    }
    
    private int sameValues(int ofs) {
        char cmp;
        int i;
        
        cmp = values[ofs];
        for (i = ofs + 1; i < values.length; i++) {
            if (values[i] != cmp) {
                return i - ofs;
            }
        }
        return values.length - ofs;
    }
    
    //------------------------------------------------------------------
    
    public int getSymbolCount() {
        return symbolCount;
    }
    
    public int getStateCount() {
        return values.length / symbolCount;
    }
    
    public int getStartState() {
        return startState;
    }
    
    public int getProductionCount() {
        return lefts.length; // same as "return lengths.length;"
    }
    
    public int getLeft(int prod) {
        return lefts[prod];
    }
    
    public int getLength(int prod) {
        return lengths[prod];
    }
    
    //-------------------------------------------------------------------
    // using the table
    
    public int getAction(int value) {
        return value & MASK;
    }
    
    public int getOperand(int value) {
        return value >>> ACTION_BITS;
    }
    
    public int lookup(int state, int symbol) {
        return values[state * symbolCount + symbol];
    }
    
    public int lookupShift(int state, int production) {
        return values[state * symbolCount + lefts[production]] >>> ACTION_BITS;
    }
    
    public char getMode(int state) {
        return modes[state];
    }
    
    public void print() {
        int i;
        
        for (i = 0; i < values.length; i++) {
            if (i % 30 == 0) {
                System.out.println();
            }
            System.out.print(" " + (int) values[i]);
        }
    }
    
    public IntBitSet getShifts(int state) {
        int i;
        int value;
        IntBitSet result;
        int symbolCount;
        int action;
        
        symbolCount = getSymbolCount();
        result = new IntBitSet();
        for (i = 0; i < symbolCount; i++) {
            value = lookup(state, i);
            action = getAction(value);
            if (action == Parser.SHIFT || action == Parser.REDUCE) {
                result.add(i);
            }
        }
        return result;
    }
    
    
    public int[] getLengths() {
        int[] result;
        int i;
        
        result = new int[getProductionCount()];
        for (i = 0; i < result.length; i++) {
            result[i] = getLength(i);
        }
        return result;
    }
    
    public int[] getLefts() {
        int[] result;
        int i;
        
        result = new int[getProductionCount()];
        for (i = 0; i < result.length; i++) {
            result[i] = getLeft(i);
        }
        return result;
    }
    
    //---------------------------------------------------------------
    
    public String toString(StringArrayList symbolTable) {
        int symbol;
        int state;
        int stateCount;
        int symbolCount;
        StringBuilder result;
        int value;
        
        stateCount = getStateCount();
        symbolCount = getSymbolCount();
        result = new StringBuilder();
        result.append('\t');
        for (symbol = 0; symbol < symbolCount; symbol++) {
            result.append(symbolTable.getOrIndex(symbol));
            result.append('\t');
        }
        result.append("\n\n");
        
        for (state = 0; state < stateCount; state++) {
            result.append(state);
            result.append('\t');
            for (symbol = 0; symbol < symbolCount; symbol++) {
                value = lookup(state, symbol);
                switch (getAction(value)) {
                    case Parser.SHIFT:
                        result.append("S" + getOperand(value) + "\t");
                        break;
                    case Parser.REDUCE:
                        result.append("R" + getOperand(value) + "\t");
                        break;
                    case Parser.SPECIAL:
                        if (getOperand(value) == Parser.SPECIAL_ACCEPT) {
                            result.append("A\t");
                        } else {
                            result.append(" \t");
                        }
                        break;
                    default:
                        throw new RuntimeException("unkown action: " + getAction(value));
                }
            }
            result.append('\n');
        }
        return result.toString();
    }
}
