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

/**
 * A stupid data container for Grammar.
 */

public class Symbol {
    /** productions for this symbol */
    public final int[] alternatives;

    /** productions using this symbol. */
    public final int[] users;

    /** ofsets in the using productions. */
    public final int[][] userOfs;

    public Symbol(int[] alternatives, int[] users, int[][] userOfs) {
        this.alternatives = alternatives;
        this.users = users;
        this.userOfs = userOfs;
    }
}
