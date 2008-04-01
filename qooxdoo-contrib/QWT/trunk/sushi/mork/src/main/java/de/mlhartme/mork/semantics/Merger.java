// §{{header}}:
//
// This is file src/de/mlhartme/mork/semantics/Merger.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.semantics;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/** Stupid data container for CopyBuffer */
public class Merger {
    /** List of Copy */
    public final List source;

    /** attribute resulting from the merger */
    public final Attribute dest;

    // to have unique names
    private static int count = 0;

    public Merger(int destSymbol, Type destType) {
        source = new ArrayList();
        dest = new Attribute(destSymbol, "merged" + count, destType);
        count++;
    }

    public static Merger forSymbol(List mergers, int symbol) {
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

    public static Attribute map(Map mapping, Attribute attr) {
        Merger merger;

        merger = (Merger) mapping.get(attr);
        if (merger != null) {
            return merger.dest;
        } else {
            return attr;
        }
    }
}
