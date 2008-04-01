// §{{header}}:
//
// This is file src/de/mlhartme/mork/parser/Conflicts.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.parser;

import de.mlhartme.mork.util.StringArrayList;
import java.util.ArrayList;
import java.util.List;

public class Conflicts extends Exception {
    private List conflicts;

    public Conflicts() {
        conflicts = new ArrayList();
    }

    public boolean isEmpty() {
        return conflicts.isEmpty();
    }

    public void add(int state, int sym, int actionA, int actionB) {
        conflicts.add(new int[] { state, sym, actionA, actionB });
    }

    public String toString(StringArrayList symbolTable) {
        StringBuilder result;
        int i, max;
        int[] c;

        result = new StringBuilder();
        max = conflicts.size();
        for (i = 0; i < max; i++) {
            c = (int[]) conflicts.get(i);
            result.append("state " + c[0] + " on symbol "
                          + symbolTable.getOrIndex(c[1]) + "\n");
        }
        return result.toString();
    }
}
