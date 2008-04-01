// §{{header}}:
//
// This is file src/de/mlhartme/mork/semantics/Visits.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.semantics;

import de.mlhartme.mork.util.GenericException;
import de.mlhartme.mork.util.Relation;
import de.mlhartme.mork.util.RelationIterator;
import de.mlhartme.mork.util.Util;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Build visit sequence for ordered attribute grammar. Based on the paper
 * Uwe Kastens: "Ordered Attribute Grammars", Acta Informatics, 1980.
 */
public class Visits {
    /** Attributions or Integer objects. */
    private final Object[] visits;

    public static Visits forEDP(
        int prod, Relation edp, Ag sems, List[][] as, Layout layout)
        throws GenericException
    {
        RelationIterator iter;
        AttributeOccurrence left;
        AttributeOccurrence right;
        int i;
        int max;
        Relation visitRelation;
        Set all;
        Visits visits;
        Object leftMapped;
        Object rightMapped;
        Object obj;
        List lst;

        visitRelation = new Relation();
        iter = edp.iterate();
        while (iter.step()) {
            left = (AttributeOccurrence) iter.left();
            right = (AttributeOccurrence) iter.right();
            leftMapped = map(prod, left, sems, as);
            rightMapped = map(prod, right, sems, as);
            visitRelation.add(leftMapped, rightMapped);
        }
        all = new HashSet();
        sems.getProduction(prod, all);
        visitRelation.addDomain(all);
        visitRelation.addImage(all);
        lst = visitRelation.sort(new ArrayList(all));
        if (lst == null) {
            throw new GenericException("cyclic dependency in prod " + prod);
        }
        if (layout != null) {
            max = lst.size();
            for (i = 0; i < max; i++) {
                obj = lst.get(i);
                if (obj instanceof AttributionBuffer) {
                    lst.set(i, layout.createAttribution((AttributionBuffer) obj));
                }
            }
        }

        // remove internal attributes and turn pre-visits into visits
        for (i = lst.size() - 1; i >= 0; i--) {
            obj = lst.get(i);
            if (obj instanceof Attribute) {
                lst.remove(i);
            } else if (obj instanceof Integer) {
                if (Visits.getPreNo(obj) == 0) {
                    // a visit that has happend implicitly before because to the
                    // bottom-up tree construction strategy:
                    if (Visits.getPreOfs(obj) == -1) {
                        throw new IllegalStateException();
                    }
                    lst.remove(i);
                } else {
                    lst.set(i, Visits.createVisit(Visits.getPreOfs(obj)));
                }
            } else if (obj instanceof Attribution) {
                // do nothing
            }
        }
        return new Visits(lst.toArray());
    }

    public Visits(Object[] visits) {
        this.visits = visits;
    }

    public Object get(int idx) {
        return visits[idx];
    }

    public int size() {
        return visits.length;
    }

    public static Object map(int prod, AttributeOccurrence ao, Ag sems, List[][] as) {
        AttributionBuffer ab;
        int symbol;
        int m;
        int no;
        int fx;

        if (sems.isInternal(ao.attr)) {
            return ao.attr;
        }
        ab = sems.findDefinition(prod, ao);
        if (ab != null) {
            return ab;
        }
        symbol = ao.attr.symbol;
        m = Util.find(as[symbol], ao.attr);
        if (m == -1) {
            throw new IllegalArgumentException("not found: " + ao.attr);
        }
        m++;  // the paper starts numbering with 1
        fx = as[symbol].length;  // BC case -- smalled odd >= m_x
        if ((fx & 1) == 0) {
            fx++;
        }
        no = (fx - m + 1) / 2;
        return createPreVisit(no, ao.ofs);
    }

    public String toString() {
        StringBuffer buffer;
        int i;
        int max;
        Object obj;
        int no;
        int ofs;

        buffer = new StringBuffer();
        max = visits.length;
        for (i = 0; i < max; i++) {
            if (i > 0) {
                buffer.append(' ');
            }
            obj = visits[i];
            if (obj instanceof Integer) {
                ofs = getPreOfs(obj);
                no = getPreNo(obj);
                buffer.append(no);
                buffer.append(':');
                if (ofs == -1) {
                    buffer.append('^');
                } else {
                    buffer.append('!');
                    buffer.append(ofs);
                }
            } else {
                buffer.append(obj.toString());
            }
        }
        return buffer.toString();
    }

    public static Integer createVisit(int ofs) {
        return new Integer(ofs);
    }

    public static int getOfs(Object visit) {
        return ((Integer) visit).intValue();
    }

    /**
     * @param ofs -1 for left-hand side
     */
    public static Integer createPreVisit(int no, int ofs) {
        return new Integer((ofs << 16) + no);
    }

    public static int getPreNo(Object preVisit) {
        return ((Integer) preVisit).intValue() & 0xffff;
    }

    /**
     * @return -1 for left-hand side
     */
    public static int getPreOfs(Object preVisit) {
        return ((Integer) preVisit).intValue() >> 16;  // no >>> to keep sign
    }
}
