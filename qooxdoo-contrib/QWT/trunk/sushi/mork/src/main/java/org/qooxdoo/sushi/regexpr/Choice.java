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

import java.util.ArrayList;
import java.util.List;

/** Left | Right, a little bit more general. */

public class Choice extends RegExpr {
    private RegExpr[] body;

    //----------------------------------------------------------------

    /**
     * Zero alternatives, can't be matched.
     */
    public Choice() {
        this(new RegExpr[] {});
    }

    public Choice(RegExpr one) {  // somewhat artificial
        this(new RegExpr[] { one });
    }

    public static RegExpr createRightOptional(RegExpr left, RegExpr right) {
        if (right == null) {
            return left;
        } else {
            return new Choice(left, right);
        }
    }

    public static RegExpr createLeftOptional(RegExpr left, RegExpr right) {
        if (left == null) {
            return right;
        } else {
            return new Choice(left, right);
        }
    }

    public Choice(RegExpr left, RegExpr right) {
        this(new RegExpr[] { left, right });
    }

    public Choice(RegExpr[] body) {
        this.body = body;
    }


    public static Choice createOption(RegExpr e) {
        return new Choice(e, new Sequence());
    }

    public static Choice createNot(RegExpr expr) {
        List ranges, result;
        int i, max;
        RegExpr[] args;

        ranges = new ArrayList();
        if (!getRanges(expr, ranges)) {
            throw new IllegalArgumentException();
        }
        result = new ArrayList();
        result.add(Range.ALL);
        max = ranges.size();
        for (i = 0; i < max; i++) {
            Range.remove(result, (Range) ranges.get(i));
        }
        args = new RegExpr[result.size()];
        result.toArray(args);
        return new Choice(args);
    }

    public static boolean getRanges(RegExpr expr, List result) {
        int i;
        Choice alt;

        if (expr instanceof Range) {
            result.add(expr);
            return true;
        } else if (expr instanceof Choice) {
            alt = (Choice) expr;
            for (i = 0; i < alt.body.length; i++) {
                if (!getRanges(alt.body[i], result)) {
                    return false;
                }
            }
            return true;
        } else if (expr instanceof Sequence) {
            return ((Sequence) expr).getRanges(result);
        } else {
            return false;
        }
    }

    @Override
    public Object visit(Action action) {
        Object[] tmps;
        int i;

        tmps = new Object[body.length];
        for (i = 0; i < tmps.length; i++) {
            tmps[i] = body[i].visit(action);
        }
        return action.choice(tmps);
    }

    @Override
    public String toString() {
        StringBuilder buf;
        int i;

        buf = new StringBuilder();
        buf.append('(');
        for (i = 0; i < body.length; i++) {
            buf.append('|');
            buf.append(body[i].toString());
        }
        buf.append("|)");
        return buf.toString();
    }
}
