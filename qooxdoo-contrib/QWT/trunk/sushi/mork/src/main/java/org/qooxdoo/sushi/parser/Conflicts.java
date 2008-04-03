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

package org.qooxdoo.sushi.parser;

import org.qooxdoo.sushi.util.StringArrayList;
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
