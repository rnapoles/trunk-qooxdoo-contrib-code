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

import org.qooxdoo.sushi.misc.StringArrayList;
import org.qooxdoo.sushi.regexpr.RegExpr;
import java.io.Serializable;

/**
 * Defines a symbol by a redular expression.
 */

public class Rule implements Serializable {
    private int left;
    private RegExpr right;

    public Rule(int leftInit, RegExpr rightInit) {
        if (rightInit == null) {
            throw new NullPointerException();
        }
        left = leftInit;
        right = rightInit;
    }

    public int getLeft() {
        return left;
    }

    public RegExpr getRight() {
        return right;
    }

    public String toString(StringArrayList symTab) {
        return symTab.get(left) + "\t::= " + right.toString() + ";";
    }
}
