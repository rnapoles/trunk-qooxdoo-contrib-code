// §{{header}}:
//
// This is file src/de/mlhartme/mork/regexpr/Sequence.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.regexpr;

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

    public Object visit(Action action) {
        Object[] tmps;
        int i;

        tmps = new Object[body.length];
        for (i = 0; i < tmps.length; i++) {
            tmps[i] = body[i].visit(action);
        }
        return action.sequence(tmps);
    }

    public String toString() {
        StringBuffer buf;
        int i;

        buf = new StringBuffer();
        buf.append('(');
        for (i = 0; i < body.length; i++) {
            buf.append(' ');
            buf.append(body[i].toString());
        }
        buf.append(" )");
        return buf.toString();
    }
}
