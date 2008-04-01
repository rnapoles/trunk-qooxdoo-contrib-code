// §{{header}}:
//
// This is file src/de/mlhartme/mork/scanner/Expander.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.scanner;

import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.util.IntBitSet;

import de.mlhartme.mork.grammar.IllegalSymbols;
import de.mlhartme.mork.grammar.Rule;
import de.mlhartme.mork.regexpr.Action;
import de.mlhartme.mork.regexpr.Choice;
import de.mlhartme.mork.regexpr.Loop;
import de.mlhartme.mork.regexpr.Range;
import de.mlhartme.mork.regexpr.RegExpr;
import de.mlhartme.mork.regexpr.Sequence;
import de.mlhartme.mork.regexpr.Symbol;
import de.mlhartme.mork.regexpr.Without;

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

    public Object range(char first, char last) {
        return new Range(first, last);
    }

    public Object choice(Object[] body) {
        RegExpr[] args;

        args = new RegExpr[body.length];
        System.arraycopy(body, 0, args, 0, body.length);
        return new Choice(args);
    }

    public Object sequence(Object[] body) {
        RegExpr[] args;

        args = new RegExpr[body.length];
        System.arraycopy(body, 0, args, 0, body.length);
        return new Sequence(args);
    }

    public Object loop(Object rawBody) {
        return new Loop((RegExpr) rawBody);
    }

    public Object without(Object left, Object right) {
        return new Without((RegExpr) left, (RegExpr) right);
    }
}
