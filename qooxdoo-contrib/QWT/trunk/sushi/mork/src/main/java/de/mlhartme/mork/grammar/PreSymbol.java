// §{{header}}:
//
// This is file src/de/mlhartme/mork/grammar/PreSymbol.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.grammar;

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
    private List userOfs;

    public PreSymbol() {
        alternatives = new IntArrayList();
        users = new IntArrayList();
        userOfs = new ArrayList();
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
