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

package org.qooxdoo.sushi.grammar;

import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.util.IntArrayList;

/**
 * Helper class to instantiate symbols.
 */

public class PreSymbol {
    /** productions for this symbol */
    private IntArrayList alternatives;

    /** productions using this symbol. */
    private IntArrayList users;

    /** ofsets in the using productions. List of IntArrayLists. */
    private List<IntArrayList> userOfs;

    public PreSymbol() {
        alternatives = new IntArrayList();
        users = new IntArrayList();
        userOfs = new ArrayList<IntArrayList>();
    }

    public void addAlternative(int prod) {
        alternatives.add(prod);
    }

    public void addUser(int prod, int ofs) {
        int i;
        IntArrayList ofsArray;

        i = users.indexOf(prod);
        if (i == -1) {
            i = users.size();
            users.add(prod);
            userOfs.add(new IntArrayList());
        }

        ofsArray = (IntArrayList) userOfs.get(i);
        ofsArray.add(ofs);
    }

    public Symbol createSymbol() {
        int[][] ofss;
        int i;
        IntArrayList ofsArray;

        ofss = new int[users.size()][];
        for (i = 0; i < ofss.length; i++) {
            ofsArray = (IntArrayList) userOfs.get(i);
            ofss[i] = ofsArray.toArray();
        }

        return new Symbol(alternatives.toArray(), users.toArray(), ofss);
    }
}
