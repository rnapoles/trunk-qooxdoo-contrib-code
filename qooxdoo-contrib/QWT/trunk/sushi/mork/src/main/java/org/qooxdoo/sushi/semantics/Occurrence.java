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

import java.util.List;

public class Occurrence {
    public static final int UNBOUNDED = Integer.MAX_VALUE;

    public static final Occurrence ONE = new Occurrence(1, 1);

    public final int min;
    public final int max;

    public Occurrence(int min, int max) {
        this.min = min;
        this.max = max;
    }

    public int card() {
        if (max > 1) {
            return Type.SEQUENCE;
        }
        if (min == 0) {
            return Type.OPTION;
        }
        return Type.VALUE;
    }

    public static Occurrence sequence(List occs) {
        int i;
        int size;
        Occurrence occ;
        int min;
        int max;
        int recursion;

        size = occs.size();
        min = 0;
        max = 0;
        recursion = 0;
        for (i = 0; i < size; i++) {
            occ = (Occurrence) occs.get(i);
            if (occ == null) {
                recursion++;
            } else {
                min += occ.min;
                if (occ.max == UNBOUNDED) {
                    max = UNBOUNDED;
                } else {
                    max += occ.max;
                }
            }
        }
        if (recursion > 0) {
            if (recursion == size) {
                return null;
            } else {
                return new Occurrence(min, UNBOUNDED);
            }
        } else {
            return new Occurrence(min, max);
        }
    }

    public static Occurrence alternate(List occs) {
        int i;
        int size;
        Occurrence occ;
        int min;
        int max;
        boolean defined;

        size = occs.size();
        if (size == 0) {
            throw new IllegalArgumentException();
        }
        min = Integer.MAX_VALUE;
        max = Integer.MIN_VALUE;
        defined = false;
        for (i = 0; i < size; i++) {
            occ = (Occurrence) occs.get(i);
            if (occ != null) {
                min = Math.min(occ.min, min);
                max = Math.max(occ.max, max);
                defined = true;
            }
        }
        if (defined) {
            return new Occurrence(min, max);
        } else {
            return null;
        }
    }

    @Override
    public String toString() {
        return min + ":" + max;
    }
}
