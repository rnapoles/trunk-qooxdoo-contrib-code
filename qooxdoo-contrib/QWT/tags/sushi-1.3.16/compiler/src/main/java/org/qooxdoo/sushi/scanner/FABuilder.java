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

import java.io.PrintStream;

import org.qooxdoo.sushi.util.IntBitSet;

import org.qooxdoo.sushi.grammar.IllegalSymbols;
import org.qooxdoo.sushi.grammar.Rule;
import org.qooxdoo.sushi.misc.GenericException;
import org.qooxdoo.sushi.misc.StringArrayList;
import org.qooxdoo.sushi.regexpr.Action;
import org.qooxdoo.sushi.regexpr.Choice;
import org.qooxdoo.sushi.regexpr.Range;
import org.qooxdoo.sushi.regexpr.RegExpr;

/** stores the result from visiting a node */

public class FABuilder extends Action {
    public static final String EMPTY_WORD =
      "scanner accepts the empty word. \n" +
      "This is illegal because it might cause infinite loops when scanning.";

    // result variables
    private FA fa;
    private int errorSi;
    private IntBitSet inlines;

    // temporary state during run()
    private IllegalSymbols exception;
    private IntBitSet terminals;

    /**
     * Translates only those rules where the left-hand.side is contained
     * in the specified terminals set. The remaining rules are used for inlining.
     */
    public static FABuilder run(
        Rule[] rules, IntBitSet terminals, StringArrayList symbolTable, PrintStream verbose)
            throws GenericException {
        String str;
        FA alt;
        int i;
        Expander expander;
        FABuilder builder;
        Label label;
        RegExpr expanded;
        Minimizer minimizer;

        expander = new Expander(rules);
        builder = new FABuilder(terminals);
        builder.fa = (FA) new Choice().visit(builder);
        if (builder.exception != null) {
            throw new RuntimeException();
        }
        if (verbose != null) {
            verbose.println("building NFA");
        }
        for (i = 0; i < rules.length; i++) {
            if (terminals.contains(rules[i].getLeft())) {
                expanded = (RegExpr) rules[i].getRight().visit(expander);
                alt = (FA) expanded.visit(builder);
                if (builder.exception!= null) {
                    str = symbolTable.getOrIndex(builder.exception.symbols.first());
                    throw new GenericException(builder.exception.getMessage() + ": " + str);
                }
                label = new Label(rules[i].getLeft());
                alt.setEndLabels(label);
                builder.fa.alternate(alt);
            }
        }
        if (verbose != null) {
            verbose.println("building DFA");
        }
        builder.fa = DFA.create(builder.fa);
        if (verbose != null) {
            verbose.println("complete DFA");
        }
        builder.errorSi = builder.fa.add(null);
        builder.fa = CompleteFA.create(builder.fa, builder.errorSi);
        if (verbose != null) {
            verbose.println("minimized DFA");
        }
        minimizer = new Minimizer(builder.fa);
        builder.fa = minimizer.run();
        builder.errorSi = minimizer.getNewSi(builder.errorSi);
        builder.inlines = expander.getUsed();

        if (builder.fa.isEnd(builder.fa.getStart())) {
            label = (Label) builder.fa.get(builder.fa.getStart()).getLabel();
            throw new GenericException(EMPTY_WORD + ". Symbol is " +
                                symbolTable.get(label.getSymbol()));
        }

        return builder;
    }

    //----------------
    // obtain results

    public FA getFA() {
        return fa;
    }

    public IntBitSet getInlines() {
        return inlines;
    }

    public int getErrorState() {
        return errorSi;
    }

    //----------------

    private FABuilder(IntBitSet terminals) {
        this.terminals = terminals;
        this.exception = null;

        // errorSi and fa will be assigned by run():
    }

    //-----------------------------------------------------------------
    // implement action interface

    @Override
    public Object symbol(int symbol) {
        exception = new IllegalSymbols("illegal symbol in scanner section", symbol);
        return new FA();
    }

    @Override
    public Object range(char first, char last) {
        int start, end;  // state indexes
        FA fa;

        fa = new FA();
        start = fa.add(null);
        fa.setStart(start);
        end = fa.add(null);
        fa.setEnd(end);
        fa.get(start).add(end, new Range(first, last));

        return fa;
    }

    @Override
    public Object choice(Object[] body) {
        FA result;
        FA tmp;
        int i;

        result = new FA();
        i = result.add(null);
        result.setStart(i);
        // don't set end state
        for (i = 0; i < body.length; i++) {
            tmp = (FA) body[i];
            result.alternate(tmp);
        }
        return result;
    }

    @Override
    public Object sequence(Object[] body) {
        FA result;
        FA tmp;
        int i;

        result = new FA();
        i = result.add(null);
        result.setStart(i);
        result.setEnd(i);
        for (i = 0; i < body.length; i++) {
            tmp = (FA) body[i];
            result.sequence(tmp);
        }
        return result;
    }

    @Override
    public Object loop(Object rawBody) {
        FA body;

        body = (FA) rawBody;
        body.plus();
        return body;
    }

    @Override
    public Object without(Object a, Object b) {
        FA result;

        // A \ B = A and not(B) = not(not(A and not(B))) = not(not(a) or B)

        result = DFA.create((FA) a);
        result.not();
        result.alternate((FA) b);
        result = DFA.create((FA) result);
        result.not();

        return result;
    }
}
