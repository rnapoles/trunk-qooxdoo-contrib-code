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

import org.qooxdoo.sushi.regexpr.Range;

/**
 * Adds tranisitions to a specified state for all input not defined
 * in the given automaton. Transitions are sorted and concatenated if
 * possible.
 */

public class CompleteFA {
    /**
     * The last state of the automaton returned is the error state.
     */
    public static FA create(FA fa, int errorSi) {
        FA cfa; // result
        int[] sorted;
        int si;
        int idx;
        int faSize;
        State faState;
        State cfaState;
        int nextChar;
        int width;
        Range range;
        int nextSi;

        faSize = fa.size();
        cfa = new FA();
        for (si = 0; si < faSize; si++) {
            faState = fa.get(si);
            if (cfa.add(faState.getLabel()) != si) {
                throw new RuntimeException();
            }
            cfaState = cfa.get(si);
            if (fa.getStart() == si) {
                cfa.setStart(si);
            }
            if (fa.isEnd(si)) {
                cfa.setEnd(si);
            }

            sorted = faState.sortRanges();
            nextChar = 0;
            for (idx = 0; idx < sorted.length; idx += width) {
                width = countConsecutive(faState, sorted, idx);
                range = firstToLast(faState, sorted, idx, width);
                nextSi = faState.getEnd(sorted[idx]);
                if (nextChar < range.getFirst()) {
                    cfaState.add(errorSi, new Range((char) nextChar, (char) (range.getFirst() - 1)));
                }
                cfaState.add(faState.getEnd(sorted[idx]), range);
                nextChar = range.getLast() + 1;
            }
            if (nextChar <= Character.MAX_VALUE) {
                cfaState.add(errorSi, new Range((char) nextChar, Character.MAX_VALUE));
            }
        }

        return cfa;
    }

    private static int countConsecutive(State state, int[] tis, int ofs) {
        int i;
        int endSi;
        int nextChar;
        Range tmp;

        endSi = state.getEnd(tis[ofs]);
        nextChar = ((Range) state.getInput(tis[ofs])).getLast() + 1;
        for (i = ofs + 1; i < tis.length; i++) {
            if (state.getEnd(tis[i]) != endSi) {
                break;
            }
            tmp = (Range) state.getInput(tis[i]);
            if (tmp.getFirst() != nextChar) {
                break;
            }
            nextChar = tmp.getLast() + 1;
        }
        return i - ofs;
    }

    private static Range firstToLast(State state, int[] tis, int ofs, int width) {
        Range left, right;

        left = (Range) state.getInput(tis[ofs]);
        right = (Range) state.getInput(tis[ofs + width - 1]);
        return new Range(left.getFirst(), right.getLast());
    }
}
