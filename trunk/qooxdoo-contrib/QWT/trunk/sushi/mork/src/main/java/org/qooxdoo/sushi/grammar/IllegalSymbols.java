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

import org.qooxdoo.sushi.util.IntBitSet;

/**
 * Indicate exceptions concering symbols.
 */

public class IllegalSymbols extends Exception {
    public final IntBitSet symbols;

    public IllegalSymbols(String msg, IntBitSet symbols) {
        super(msg);
        this.symbols = symbols;
    }
    public IllegalSymbols(String msg, int symbol) {
        super(msg);
        symbols = new IntBitSet();
        symbols.add(symbol);
    }
}
