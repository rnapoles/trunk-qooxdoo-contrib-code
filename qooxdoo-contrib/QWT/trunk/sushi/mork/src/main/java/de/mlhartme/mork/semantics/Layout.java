// §{{header}}:
//
// This is file src/de/mlhartme/mork/semantics/Layout.java,
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

/**
 * Helper to translate SemanticsBuffer into Semantics
 * TODO: merge this functionality into SemanticsBuffer?
 */
public class Layout {
    /** List of List of Attributes. Indexed by symbols. */
    private final List attrs;

    public Layout() {
        attrs = new ArrayList();
    }

    //-------------------------------------------------------------

    // returns location or -1
    public int locate(Attribute attr) {
        List lst;
        int i;
        int max;

        if (attr.symbol < attrs.size()) {
            lst = (List) attrs.get(attr.symbol);
            max = lst.size();
            for (i = 0; i < max; i++) {
                if (attr == lst.get(i)) {
                    return i;
                }
            }
        }
        return -1;
    }

    public int getLocationCount(int symbol) {
        if (symbol < attrs.size() ) {
            return ((List) attrs.get(symbol)).size();
        } else {
            return 0;
        }
    }

    public Attribution createAttribution(AttributionBuffer ab) {
        int resultLocation;
        int[] argsLocation;
        int i;
        int[] argsOfs;
        AttributeOccurrence arg;

        resultLocation = locate(ab.result.attr);
        if (resultLocation == -1) {
            throw new RuntimeException("invalid semantics");
        }
        argsLocation = new int[ab.getArgCount()];
        argsOfs = new int[ab.getArgCount()];
        for (i = 0; i < argsLocation.length; i++) {
            arg = ab.getArg(i);
            argsLocation[i] = locate(arg.attr);
            argsOfs[i] = arg.ofs;
            if (argsLocation[i] == -1) {
                throw new RuntimeException("invalid semantics");
            }
        }
        return new Attribution(ab.function, ab.result.ofs, resultLocation, argsOfs, argsLocation);
    }

    //-------------------------------------------------------------

    // adds if new ...
    public void add(Attribute attr) {
        int symbol;
        List lst;

        if (locate(attr) == -1) {
            symbol = attr.symbol;
            while (attrs.size() <= symbol) {
                attrs.add(new ArrayList());
            }
            lst = (List) attrs.get(symbol);
            lst.add(attr);
        }
    }

    public void add(AttributionBuffer ab) {
        int i;
        int max;

        add(ab.result.attr);
        max = ab.getArgCount();
        for (i = 0; i < max; i++) {
            add(ab.getArg(i).attr);
        }
    }
}
