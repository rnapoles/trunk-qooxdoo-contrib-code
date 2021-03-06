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

package org.qooxdoo.sushi.semantics;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.qooxdoo.sushi.grammar.Grammar;
import org.qooxdoo.sushi.mapping.Transport;
import org.qooxdoo.sushi.reflect.Function;
import org.qooxdoo.sushi.reflect.Identity;
import org.qooxdoo.sushi.util.IntArrayList;

/**
 * Attribute grammar, supports >=0 synthesized and inherited attributes.
 * Uses lazy evaluation to calculate attributes. There are no pre-calculated
 * computation sequence and no checks for cyclic dependencies are done at
 * run-time.
 */
public class State implements Compare {
    /** inv: seed or size() > 0.  Productions are sorted! */
    private List<Alternative> alternatives;

    // TODO: private
    public int minOcc;
    public int maxOcc;

    public Attribute transportAttribute;

    public State(Attribute attribute) {
        this.transportAttribute = attribute;
        this.alternatives = new ArrayList<Alternative>();
    }

    // TODO: attributions are shared
    public State(State orig) {
        int i;
        int max;

        transportAttribute = orig.transportAttribute;
        alternatives = new ArrayList<Alternative>();
        max = orig.alternatives.size();
        for (i = 0; i < max; i++) {
            alternatives.add(orig.alternatives.get(i));
        }
    }

    public static State cloneEmpty(State orig) {
        State clone;
        int i;
        int max;
        Alternative old;
        Attribute attr;

        attr = new Attribute(orig.transportAttribute);
        clone = new State(attr);
        max = orig.alternatives.size();
        for (i = 0; i < max; i++) {
            old = orig.alternatives.get(i);
            clone.alternatives.add(new Alternative(old.production, old.resultOfs));
        }
        return clone;
    }

    public State(boolean up, Attribute attr, Grammar grm) {
        transportAttribute = attr;
        alternatives = new ArrayList<Alternative>();
        if (up) {
            addSynthesized(attr.symbol, grm);
        } else {
            addInherited(attr.symbol, grm);
        }
    }

    private void addSynthesized(int symbol, Grammar grm) {
        int i;
        int max;
        Alternative ab;

        max = grm.getAlternativeCount(symbol);
        for (i = 0; i < max; i++) {
            ab = new Alternative(grm.getAlternative(symbol, i), -1);
            alternatives.add(ab);
        }
    }

    private void addInherited(int symbol, Grammar grm) {
        int user;
        int maxUser;
        int prod;
        int idx;
        int maxIdx;
        int ofs;
        Alternative ab;

        maxUser = grm.getUserCount(symbol);
        for (user = 0; user < maxUser; user++) {
            prod = grm.getUser(symbol, user);
            maxIdx = grm.getUserOfsCount(symbol, user);
            for (idx = 0; idx < maxIdx; idx++) {
                ofs = grm.getUserOfs(symbol, user, idx);
                ab = new Alternative(prod, ofs);
                alternatives.add(ab);
            }
        }
    }

    public void addUpTransport(int prod, int ofs, Attribute child) {
        int i;
        int max;
        Alternative ab;

        max = alternatives.size();
        for (i = 0; i < max; i++) {
            ab = alternatives.get(i);
            if (ab.production == prod) {
                ab.add(ofs, child);
            }
        }
    }

    public void addDownTransport(int prod, int ofs, Attribute parent) {
        int i;
        int max;
        Alternative ab;

        max = alternatives.size();
        for (i = 0; i < max; i++) {
            ab = alternatives.get(i);
            if (ab.resultOfs == ofs && ab.production == prod) {
                ab.add(-1, parent);
            }
        }
    }

    public Attribute getAttribute() {
        return transportAttribute;
    }

    //---------------------------------------------------------------------------
    private static final Function TMP_FUNCTION = new Identity("tmp", Object.class);
    
    public void createSemanticsBuffer(Ag sems, Transport transport) {
        int i;
        int max;
        AttributionBuffer replacement;
        Alternative old;
        Attribute tmp;
        int j;
        int maxJ;
        List<Attribute> args;

        max = alternatives.size();
        for (i = 0; i < max; i++) {
            old = alternatives.get(i);
            replacement = new AttributionBuffer(old.production, TMP_FUNCTION,
                                        new AttributeOccurrence(transportAttribute, old.resultOfs));
            maxJ = old.getArgCount();
            args = new ArrayList<Attribute>();  // TODO: improve getTransportFn
            for (j = 0; j < maxJ; j++) {
                tmp = old.getArgAttribute(j);
                replacement.add(new AttributeOccurrence(tmp, old.getArgOfs(j)));
                args.add(tmp);
            }
            replacement.function = transport.getTransportFn(args, transportAttribute.type.card);
            sems.add(replacement);
        }
    }

    /** Add all argument attributes to next (if not already contained in next) */
    public void addArgAttrs(List<Attribute> result) {
        int i;
        int max;
        Alternative ab;

        max = alternatives.size();
        for (i = 0; i < max; i++) {
            ab = alternatives.get(i);
            ab.addArgAttrs(result);
        }
    }

    /**
     * Is down optional.
     * pre:   this is kind of reduced (e.g. results from createReduced
     */
    public boolean isDownOptional() {
        int i;
        int max;
        Alternative ab;

        max = alternatives.size();
        for (i = 0; i < max; i++) {
            ab = alternatives.get(i);
            if (ab.getArgCount() == 0) {
                return true;
            }
        }
        return false;
    }

    public int compare(State rightState, List<Attribute> nextLefts, List<Attribute> nextRights) {
        Alternative left;
        Alternative right;
        int result;
        int i;
        int max;

        max = alternatives.size();
        if (max != rightState.alternatives.size()) {
            throw new IllegalStateException("different number of productions");
        }
        result = 0;
        for (i = 0; i < max; i++) {
            left = alternatives.get(i);
            right = rightState.alternatives.get(i);
            result |= left.compare(right);
            if ((result & NE) == NE || ((result & (LT|GT)) == (LT|GT))) {
                return NE;
            }
        }
        if ((result & LT) == LT) {
            return LT;
        }
        if ((result & GT) == GT) {
            return GT;
        }
        if (result == ALT) {
            return EQ;
        }
        if (result != 0 && ((result & EQ) == 0)) {
            throw new IllegalStateException();
        }

        // equals implies that all Alternatives have arguments from the same
        // offsets, ending in the same symbols
        for (i = 0; i < max; i++) {
            // there may be alt Alternative ... see ArgumentTest.testEmptyAlt ...
            // only add equals ab's ... TODO: this test is somehow redundant

            left = alternatives.get(i);
            right = rightState.alternatives.get(i);

            if ((left.getArgCount() == 1) && (right.getArgCount() == 1)) {
                left.addArgAttrs(nextLefts);
                right.addArgAttrs(nextRights);
                if (nextLefts.size() != nextRights.size()) {
                    System.err.println("TODO: left.size() != right.size()");
                    return NE;
                    // TODO: throw new IllegalStateException();
                }
            }
        }
        return EQ;
    }

    public State cloneAttributeTransport(Map<Attribute, Attribute> map, AgBuffer orig) {
        int i;
        int max;
        Alternative replacement;
        Alternative old;
        Attribute tmp;
        int j;
        int maxJ;
        Attribute replacedResult;
        State result;
        Attribute replacedArg;

        replacedResult = map.get(getAttribute());
        max = alternatives.size();
        result = new State(replacedResult);
        for (i = 0; i < max; i++) {
            old = alternatives.get(i);
            replacement = new Alternative(old.production, old.resultOfs);
            maxJ = old.getArgCount();
            for (j = 0; j < maxJ; j++) {
                tmp = old.getArgAttribute(j);
                replacedArg = map.get(tmp);
                replacement.add(old.getArgOfs(j), (replacedArg != null)? replacedArg : tmp);
            }
            result.alternatives.add(replacement);
        }
        return result;
    }

    //----------------------------------------------------------------------------

    public Occurrence calcOccurrence(AgBuffer copyBuffer, List stack, Attribute start) {
        Alternative ab;
        int i;
        int j;
        int max;
        List seq;
        List alt;
        Attribute next;
        Occurrence occ;

        alt = new ArrayList();
        for (i = 0; i < alternatives.size(); i++) {
            ab = alternatives.get(i);
            max = ab.getArgCount();
            seq = new ArrayList();
            for (j = 0; j < max; j++) {
                next = ab.getArgAttribute(j);
                if (stack.indexOf(next) == -1) {
                    seq.add(copyBuffer.calcOccurrence(stack, next));
                } else {
                    seq.add(null);
                }
            }
            occ = Occurrence.sequence(seq);
            alt.add(occ);
        }
        return Occurrence.alternate(alt);
    }

    //-----------------------

    public static State merge(Map mapping, List copies) {
        State first;
        State result;
        int c;
        int copiesSize;
        int a;
        int attribSize;
        State current;
        Alternative firstAb;
        Alternative destAb;
        Alternative srcAb;

        if (copies.size() == 0) {
            throw new IllegalStateException();
        }
        first = (State) copies.get(0);
        result = new State(Merger.map(mapping, first.getAttribute()));
        attribSize = first.alternatives.size();
        copiesSize = copies.size();
        for (a = 0; a < attribSize; a++) {
            firstAb = first.alternatives.get(a);
            destAb = new Alternative(firstAb.production, firstAb.resultOfs);
            for (c = 0; c < copiesSize; c++) {
                current = (State) copies.get(c);
                srcAb = current.alternatives.get(a);
                addMappedArguments(srcAb, destAb, mapping);
            }
            result.alternatives.add(destAb);
        }
        return result;
    }

    // TODO: move to Alternative
    private static Alternative addMappedArguments(Alternative ab, Alternative dest, Map mapping) {
        int i;
        int max;
        Attribute attr;

        max = ab.getArgCount();
        for (i = 0; i < max; i++) {
            attr = Merger.map(mapping, ab.getArgAttribute(i));
            if (!dest.contains(ab.getArgOfs(i), attr)) {
                dest.add(ab.getArgOfs(i), attr);
            }
        }
        return ab;
    }

    //-----------------------------------------------------------------

    public void getSequence(int seq,
        List nextAttrs, IntArrayList nextOfss, IntArrayList nextSeqs, AgBuffer cb)
    {
        int i;
        int max;

        max = alternatives.size();
        for (i = 0; i < max; i++) {
            getSequence(alternatives.get(i), seq, nextAttrs, nextOfss, nextSeqs, cb);
        }
    }

    private static void getSequence(Alternative ab, int seq,
        List nextAttrs, IntArrayList nextOfss, IntArrayList nextSeqs, AgBuffer cb)
    {
        int i;
        int max;
        Attribute attr;
        int width;

        max = ab.getArgCount();
        for (i = 0; i < max; i++) {
            attr = ab.getArgAttribute(i);
            width = cb.getWidth(attr);
            if (seq < width) {
                nextAttrs.add(attr);
                nextOfss.add(ab.getArgOfs(i));
                nextSeqs.add(seq);
                return;
            }
            seq -= width;
        }
        nextAttrs.add(null);
        nextOfss.add(-1);
        nextSeqs.add(-1);
    }

    public void addBlind(int i, Attribute attr, int ofs) {
        Alternative ab;

        ab = alternatives.get(i);
        ab.add(ofs, attr);
    }

    /**
     * @return true if occurrences has changed
     */
    public boolean recalcOccurrence(AgBuffer cb) {
        int oldMin;
        int oldMax;
        int i;
        int max;
        Alternative ab;

        oldMin = minOcc;
        oldMax = maxOcc;
        max = alternatives.size();
        minOcc = calcOcc(alternatives.get(0), false, cb);
        maxOcc = calcOcc(alternatives.get(0), true, cb);
        for (i = 1; i < max; i++) {
            ab = alternatives.get(i);
            minOcc = Math.min(calcOcc(ab, false, cb), minOcc);
            maxOcc = Math.max(calcOcc(ab, true, cb), maxOcc);
        }
        return (oldMin != minOcc || oldMax != maxOcc);
    }

    // TODO: move to Alternative
    private static int calcOcc(Alternative ab, boolean calcMax, AgBuffer cb) {
        int occ;
        int i;
        int max;
        State state;

        occ = 0;
        max = ab.getArgCount();
        for (i = 0; i < max; i++) {
            state = cb.lookup(ab.getArgAttribute(i));
            if (state != null) {
                occ += (calcMax)? state.maxOcc : state.minOcc;
            } else {
                occ += 1;
            }
        }
        return occ;
    }

    //------------------

    public String toRawString() {
        return toString(true);
    }

    @Override
    public String toString() {
        return toString(false);
    }

    public String toString(boolean raw) {
        StringBuilder buf;
        int i;
        int max;

        Alternative ab;

        buf = new StringBuilder();
        max = alternatives.size();
        for (i = 0; i < max; i++) {
            ab = alternatives.get(i);
            buf.append("  ");
            if (raw) {
                buf.append(ab.toRawString());
            } else {
                buf.append(ab.toString());
            }
            buf.append('\n');
        }
        return buf.toString();
    }
}
