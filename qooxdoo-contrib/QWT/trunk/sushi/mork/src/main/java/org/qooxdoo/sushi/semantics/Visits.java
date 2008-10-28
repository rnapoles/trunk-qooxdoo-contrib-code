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
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.qooxdoo.sushi.misc.GenericException;
import org.qooxdoo.sushi.graph.Graph;
import org.qooxdoo.sushi.graph.EdgeIterator;
import org.qooxdoo.sushi.util.Util;

/**
 * Build visit sequence for ordered attribute grammar. Based on the paper
 * Uwe Kastens: "Ordered Attribute Grammars", Acta Informatics, 1980.
 */
public class Visits {
    /** Attributions or Integer objects. */
    private final Object[] visits;

    public static Visits forEDP(int prod, Graph<AttributeOccurrence> edp, Ag sems, List<Attribute>[][] as, Layout layout) throws GenericException {
        EdgeIterator<AttributeOccurrence> iter;
        AttributeOccurrence left;
        AttributeOccurrence right;
        int i;
        int max;
        Graph visitRelation;  // Attribute, AttributionBuffer, or Integer
        Set all;
        Object leftMapped;
        Object rightMapped;
        Object obj;
        List lst;

        visitRelation = new Graph();
        iter = edp.edges();
        while (iter.step()) {
            left = iter.left();
            right = iter.right();
            leftMapped = map(prod, left, sems, as);
            rightMapped = map(prod, right, sems, as);
            visitRelation.edge(leftMapped, rightMapped);
        }
        all = new LinkedHashSet<AttributionBuffer>();
        sems.getProduction(prod, all);
        visitRelation.getDomain(all);
        visitRelation.getImage(all);

        lst = new ArrayList();
        for (Object data : all) {
        	if (!visitRelation.contains(data)) {
        		lst.add(data);
        	}
        }
        all.removeAll(lst);
        lst.addAll(visitRelation.sort(all));
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

    public static Object map(int prod, AttributeOccurrence ao, Ag sems, List<Attribute>[][] as) {
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

    @Override
    public String toString() {
        StringBuilder buffer;
        int i;
        int max;
        Object obj;
        int no;
        int ofs;

        buffer = new StringBuilder();
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
