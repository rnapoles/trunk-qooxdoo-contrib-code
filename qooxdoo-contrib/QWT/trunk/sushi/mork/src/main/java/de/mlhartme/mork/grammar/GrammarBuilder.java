// §{{header}}:
//
// This is file src/de/mlhartme/mork/grammar/GrammarBuilder.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.grammar;

import de.mlhartme.mork.regexpr.Action;
import de.mlhartme.mork.util.GenericException;
import de.mlhartme.mork.util.StringArrayList;

/**
 * <p>Translate regular expressions to context free grammars.
 * Operates on Grammars.</p>
 *
 * <p>Note: The Grammar start symbol is always expandable
 * (i.e.: it is never used at the right-hand-side). Recursion usually
 * expands the right-hand-side symbol.</p>
 */

public class GrammarBuilder extends Action {
    private int helper;   // Helper symbols
    private GenericException exception;

    public GrammarBuilder(int helper) {
        this.helper = helper;
        this.exception = null;
    }

    public GenericException getException() {
        return exception;
    }

    public int getHelper() {
        return helper;
    }

    @Override
    public Object choice(Object[] body) {
        Grammar result;
        Grammar tmp;
        int i;

        result = new Grammar(helper);
        for (i = 0; i < body.length; i++) {
            tmp = (Grammar) body[i];
            result.add(helper, tmp.getStart());
            result.addProductions(tmp);
            result.expandSymbol(tmp.getStart());
            result.removeProductions(tmp.getStart());
        }
        helper++;
        return result;
    }

    @Override
    public Object sequence(Object[] body) {
        Grammar result;
        Grammar tmp;
        int[] right;
        int i;

        result = new Grammar(helper);
        right = new int[body.length];
        for (i = 0; i < body.length; i++) {
            tmp = (Grammar) body[i];
            right[i] = tmp.getStart();
        }
        result.add(helper, right);
        for (i = 0; i < body.length; i++) {
            tmp = (Grammar) body[i];
            result.addProductions(tmp);
            result.expandSymbol(tmp.getStart());
            result.removeProductions(tmp.getStart());
        }
        helper++;

        return result;
    }

    @Override
    public Object loop(Object rawBody) {
        Grammar result;
        Grammar body;

        body = (Grammar) rawBody;
        result = new Grammar(helper + 1);
        result.add(helper + 1, helper);

        // generate left-recursive rule, even though this would
        // cause problems for LL parsers
        result.add(helper,   helper, body.getStart());
        result.add(helper,   body.getStart());

        result.addProductions(body);
        result.expandSymbol(body.getStart());
        result.removeProductions(body.getStart());
        helper += 2;

        return result;
    }

    @Override
    public Object symbol(int symbol) {
        Grammar result;

        result = new Grammar(helper);
        result.add(helper, symbol);
        helper++;
        return result;
    }

    @Override
    public Object range(char first, char last) {
        if (first == last) {
            exception = new GenericException("illegal character literal in parser section: " +
                "char code=" + (int) first +
                ":\nuse a string literal (double quotes instead of single quotes!)");
        } else {
            exception = new GenericException("illegal range in parser section: "
                                             + (int) first + ".." + (int) last +
                ":\ndefine a helper symbol for this range in the scanner section and use\n" +
                "the helper symbol instead. ");
        }
        return new Grammar(helper);
    }

    @Override
    public Object without(Object left, Object right) {
        exception = new GenericException("illegal without operator");
        return new Grammar(helper);
    }

    //-----------------------------------------------------------------------

    /** helper symbols are added without gaps, starting with freeHelper. */
    public static Grammar createGrammar(Rule[] rules, StringArrayList symbolTable)
        throws GenericException
    {
        int i;
        GrammarBuilder builder;
        Grammar tmp;
        Grammar buffer;
        GenericException e;
        int firstHelper;
        int lastHelper;

        firstHelper = symbolTable.size();
        buffer = new Grammar(rules[0].getLeft(), symbolTable);
        builder = new GrammarBuilder(firstHelper);
        for (i = 0; i < rules.length; i++) {
            tmp = (Grammar) rules[i].getRight().visit(builder);
            e = builder.getException();
            if (e != null) {
                throw e;
            }
            buffer.add(rules[i].getLeft(), tmp.getStart());
            buffer.addProductions(tmp);
            buffer.expandSymbol(tmp.getStart());
            buffer.removeProductions(tmp.getStart());
        }
        lastHelper = builder.getHelper() - 1;
        buffer.removeDuplicateSymbols(firstHelper, lastHelper);
        buffer.removeDuplicateRules();
        buffer.packSymbols(firstHelper, lastHelper + 1);
        return buffer;
    }
}
