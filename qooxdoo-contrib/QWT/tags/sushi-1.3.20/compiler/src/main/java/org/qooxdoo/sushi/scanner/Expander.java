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

package org.qooxdoo.sushi.scanner;

import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.util.IntBitSet;

import org.qooxdoo.sushi.grammar.IllegalSymbols;
import org.qooxdoo.sushi.grammar.Rule;
import org.qooxdoo.sushi.regexpr.Action;
import org.qooxdoo.sushi.regexpr.Choice;
import org.qooxdoo.sushi.regexpr.Loop;
import org.qooxdoo.sushi.regexpr.Range;
import org.qooxdoo.sushi.regexpr.RegExpr;
import org.qooxdoo.sushi.regexpr.Sequence;
import org.qooxdoo.sushi.regexpr.Symbol;
import org.qooxdoo.sushi.regexpr.Without;

/** stores the result from visiting a node */

public class Expander extends Action {
    private IllegalSymbols exception;

    private Rule[] rules;

    /** symbols actually used for expanding */
    private IntBitSet used;

    private IntBitSet expanding;

    public Expander(Rule[] rules) {
        this.rules = rules;
        this.used = new IntBitSet();
        this.expanding = new IntBitSet();
        this.exception = null;
    }

    public IntBitSet getUsed() {
        return used;
    }

    public RegExpr run(RegExpr re) throws IllegalSymbols {
        RegExpr result;

        result = (RegExpr) re.visit(this);
        if (exception != null) {
            throw exception;
        }
        return result;
    }

    //-----------------------------------------------------------------

    @Override
    public Object symbol(int symbol) {
        List lst;
        int i;
        int max;
        RegExpr re;
        RegExpr[] args;

        if (expanding.contains(symbol)) {
            exception = new IllegalSymbols("illegal recursion in scanner section", symbol);
            return new Symbol(symbol);
        }
        used.add(symbol);

        lst = new ArrayList();
        for (i = 0; i < rules.length; i++) {
            if (rules[i].getLeft() == symbol) {
                lst.add(rules[i].getRight());
            }
        }
        max = lst.size();
        if (max == 0) {
            exception = new IllegalSymbols(
                "illegal reference to parser symbol from scanner section", symbol);
            return new Symbol(symbol);
        } else if (max == 1) {
            re = (RegExpr) lst.get(0);
        } else {
            args = new RegExpr[max];
            lst.toArray(args);
            re = new Choice(args);
        }
        expanding.add(symbol);
        re = (RegExpr) re.visit(this);
        expanding.remove(symbol);
        return re;
    }

    @Override
    public Object range(char first, char last) {
        return new Range(first, last);
    }

    @Override
    public Object choice(Object[] body) {
        RegExpr[] args;

        args = new RegExpr[body.length];
        System.arraycopy(body, 0, args, 0, body.length);
        return new Choice(args);
    }

    @Override
    public Object sequence(Object[] body) {
        RegExpr[] args;

        args = new RegExpr[body.length];
        System.arraycopy(body, 0, args, 0, body.length);
        return new Sequence(args);
    }

    @Override
    public Object loop(Object rawBody) {
        return new Loop((RegExpr) rawBody);
    }

    @Override
    public Object without(Object left, Object right) {
        return new Without((RegExpr) left, (RegExpr) right);
    }
}
