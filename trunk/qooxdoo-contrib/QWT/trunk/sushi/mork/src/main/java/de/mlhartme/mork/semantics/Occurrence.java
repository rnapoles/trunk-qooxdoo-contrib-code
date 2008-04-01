// §{{header}}:
//
// This is file src/de/mlhartme/mork/semantics/Occurrence.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.semantics;

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
