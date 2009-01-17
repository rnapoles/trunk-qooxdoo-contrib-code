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

package org.qooxdoo.sushi.regexpr;

import org.qooxdoo.sushi.misc.StringArrayList;

/**
 * Symbol constant for a regular expression.
 */

public class Symbol extends RegExpr {
    private int symbol;

    public Symbol(int symbolInit) {
        symbol = symbolInit;
    }

    @Override
    public Object visit(Action action) {
        return action.symbol(symbol);
    }

    @Override
    public String toString() {
        return "" + symbol;
    }

    public String toString(StringArrayList symbolTable) {
        return symbolTable.get(symbol);
    }
}
