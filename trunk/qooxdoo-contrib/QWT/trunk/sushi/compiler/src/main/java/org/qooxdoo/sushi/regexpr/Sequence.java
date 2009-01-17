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

import java.util.List;

public class Sequence extends RegExpr {
    private RegExpr[] body;

    public Sequence() {  // Epsilon
        body = new RegExpr[0];
    }

    public Sequence(RegExpr[] bodyInit) {
        body = bodyInit;
    }

    public Sequence(RegExpr left, RegExpr right) {
        if ((left == null) || (right == null)) {
            throw new NullPointerException();
        }

        body = new RegExpr[2];
        body[0] = left;
        body[1] = right;
    }

    // returns a Range for strings of length 1
    public static RegExpr createKeyword(String str) {
        int i;
        RegExpr[] chars;

        if (str.length() == 1) {
            return new Range(str.charAt(0));
        } else {
            chars = new RegExpr[str.length()];
            for (i = 0; i < chars.length; i++) {
                chars[i] = new Range(str.charAt(i));
            }
            return new Sequence(chars);
        }
    }

    public static Sequence createTimes(RegExpr body, int count) {
        RegExpr[] seq;
        int i;

        seq = new RegExpr[count];
        for (i = 0; i < count; i++) {
            seq[i] = body;
        }
        return new Sequence(seq);
    }

    public boolean getRanges(List result) {
        if (body.length != 1) {
            return false;
        }
        return Choice.getRanges(body[0], result);
    }

    @Override
    public Object visit(Action action) {
        Object[] tmps;
        int i;

        tmps = new Object[body.length];
        for (i = 0; i < tmps.length; i++) {
            tmps[i] = body[i].visit(action);
        }
        return action.sequence(tmps);
    }

    @Override
    public String toString() {
        StringBuilder buf;
        int i;

        buf = new StringBuilder();
        buf.append('(');
        for (i = 0; i < body.length; i++) {
            buf.append(' ');
            buf.append(body[i].toString());
        }
        buf.append(" )");
        return buf.toString();
    }
}
