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

/** Stupid data container for CopyBuffer */
public class Merger {
    public final List<State> source;

    /** attribute resulting from the merger */
    public final Attribute dest;

    // to have unique names
    private static int count = 0;

    public Merger(int destSymbol, Type destType) {
        source = new ArrayList<State>();
        dest = new Attribute(destSymbol, "merged" + count, destType);
        count++;
    }

    public static Merger forSymbol(List<Merger> mergers, int symbol) {
        int i;
        int max;
        Merger merger;

        max = mergers.size();
        for (i = 0; i < max; i++) {
            merger = (Merger) mergers.get(i);
            if (merger.dest.symbol == symbol) {
                return merger;
            }
        }
        return null;
    }

    public static Attribute map(Map<Attribute, Merger> mapping, Attribute attr) {
        Merger merger;

        merger = mapping.get(attr);
        if (merger != null) {
            return merger.dest;
        } else {
            return attr;
        }
    }
}
