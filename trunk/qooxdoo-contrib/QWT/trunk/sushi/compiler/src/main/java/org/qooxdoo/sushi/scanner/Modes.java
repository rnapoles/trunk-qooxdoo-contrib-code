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

package org.qooxdoo.sushi.scanner;

import java.io.PrintStream;
import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.util.IntBitSet;

import org.qooxdoo.sushi.grammar.Rule;
import org.qooxdoo.sushi.misc.GenericException;
import org.qooxdoo.sushi.parser.ParserTable;

public class Modes {
    public static void setNone(ParserTable table) throws GenericException {
        int max;
        char[] parserModes;

        max = table.getStateCount();
        parserModes = new char[max];  // initialized to 0
        table.setModes(parserModes);
    }

    public static List generate(FA fa, ParserTable table, IntBitSet whites, PrintStream listing) throws GenericException {
        int i;
        int max;
        IntBitSet shifts;
        List modes;  // scanner modes: list of set of symbols
        IntBitSet conflicts;
        char[] parserModes;

        modes = new ArrayList();
        if (hasConflicts(fa, whites) != null) {
            throw new GenericException("scanner conflict in whitespace");
        }
        max = table.getStateCount();
        parserModes = new char[max];
        for (i = 0; i < max; i++) {
            shifts = table.getShifts(i);
            shifts.addAll(whites);
            conflicts = hasConflicts(fa, shifts);
            if (conflicts != null) {
                throw new GenericException("scanner conflict in state " + i + ": " + conflicts);
            }
            parserModes[i] = chooseState(fa, modes, shifts);
        }
        if (listing != null) {
            listing.println("scanner modes: " + modes.size());
            for (i = 0; i < modes.size(); i++) {
                listing.println(" mode " + i + " " + modes.get(i));
            }
            listing.println("modes for parser states: ");
            for (i = 0; i < max; i++) {
                listing.println(" " + i + " " + (int) parserModes[i]);
            }
        }
        table.setModes(parserModes);
        return modes;
    }

    private static char chooseState(FA fa, List modes, IntBitSet shifts) {
        int i;
        int max;
        IntBitSet test;

        max = modes.size();
        for (i = 0; i < max; i++) {
            test = (IntBitSet) modes.get(i);
            test = new IntBitSet(test);
            test.addAll(shifts);
            if (hasConflicts(fa, test) == null) {
                modes.set(i, test);
                return (char) i;
            }
        }
        // create a new scanner state
        modes.add(new IntBitSet(shifts));
        return (char) (modes.size() - 1);
    }

    private static IntBitSet hasConflicts(FA fa, IntBitSet symbols) {
        int si;
        int max;
        Label label;
        IntBitSet conflict;

        max = fa.size();
        for (si = 0; si < max; si++) {
            label = (Label) fa.get(si).getLabel();
            if (label != null) {
                conflict = label.getConflict(symbols);
                if (conflict != null) {
                    return conflict;
                }
            }
        }
        return null;
    }

    public static void resolveScannerConflicts(FA fa, Rule[] rules) {
        int[] prios;
        int i;

        prios = new int[rules.length];
        for (i = 0; i < prios.length; i++) {
            prios[i] = rules[i].getLeft();
        }
        Label.resolveConflicts(fa, prios);
    }
}
