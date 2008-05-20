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

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import org.qooxdoo.sushi.util.IntBitSet;

import org.qooxdoo.sushi.grammar.Grammar;

public class Reduce {
    public final int production;
    public final IntBitSet lookahead;

    public final Set<Shift> lookback;

    public Reduce(int productionInit) {
        production = productionInit;
        lookahead = new IntBitSet();

        lookback = new HashSet<Shift>();
    }

    public void calcLookahead() {
        Iterator<Shift> pos;
        Shift sh;

        pos = lookback.iterator();
        while (pos.hasNext()) {
            sh = pos.next();
            sh.addFollow(lookahead);
        }
    }

    //----------------------------------------------------------

    public String toString(Grammar grammar) {
        StringBuilder buffer;

        buffer = new StringBuilder();
        buffer.append("reduce ");
        grammar.prodToString(buffer, production);
        buffer.append(" on ");
        buffer.append(lookahead.toString(grammar.getSymbolTable().toList()));
        buffer.append('\n');

        return buffer.toString();
    }
    
    @Override
    public int hashCode() {
        return production;
    }
    
    @Override
    public boolean equals(Object obj) {
        return this == obj;
    }
}
