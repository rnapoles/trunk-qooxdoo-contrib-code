/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2007 1&1 Internet AG, Germany, http://www.1and1.org
   
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
   
   Authors:
     * Michael Hartmeier (mlhartme)
   
 ************************************************************************ */

package de.mlhartme.mork.parser;

import junit.framework.TestCase;

import de.mlhartme.mork.grammar.Grammar;
import de.mlhartme.mork.parser.PDA;
import de.mlhartme.mork.util.GenericException;
import de.mlhartme.mork.util.StringArrayList;

/**
 ** Test that pda tables are generated without exceptions.
 ** TODO: Test the generated parser on some input
 **/
public class ParserTest extends TestCase {
    public void testMult() throws GenericException {
        check(new String[][] {
            { "S",  "A", "A" },
            { "A",  "B", "B" },
            { "B",  "I" }
        });
    }

    /** LALR(0) grammar */
    public void testExpr() throws GenericException {
        check(new String[][] {
            { "S", "G", "#" },
            { "G", "E", "=", "E" },
            { "G", "f" },
            { "E", "T" },
            { "E", "E", "+", "T" },
            { "T", "f" },
            { "T", "T", "*", "f" }
        });
    }

    /** SLR(0) example */
    public void testExpr2() throws GenericException {
        check(new String[][] {
            { "S", "E", "#" },
            { "E", "E", "-", "T" },
            { "E", "T" },
            { "T", "F", "^", "T" },
            { "T", "F" },
            { "F", "(", "E", ")" },
            { "F", "i" }
        });
    }

    /** Tremblay Sorenson, exercise 7-4.6.1 */
    public void testExercise1() throws GenericException {
        check(new String[][] {
            { "S", "a", "A", "d" },
            { "S", "a", "e", "c" },
            { "S", "b", "A", "c" },
            { "A", "e" }
        });
    }

    public void testExercise2() throws GenericException {
        check(new String[][] {
            { "S", "A" },
            { "B" },
            { "C" },
            { "A", "B", "C", "A" },
            { "A", "a" }
        });
    }

    public void testBlocks() throws GenericException {
        check(new String[][] {
            { "S", "E", "$" },
            { "E", "E", "E" },
            { "E", "(", ")" }
        });
    }

    public static StringArrayList symbolTable;

    /**
     * Start symbol must be "S", symbol with example attribute
     * must be "I"
     */
    public static void check(String[][] src) throws GenericException {
        Grammar grammar;
        int startSymbol;
        PDA pda;
        ParserTable table;
        Conflicts conflicts;

        grammar = Grammar.forSymbols(src);
        symbolTable = grammar.getSymbolTable();
        startSymbol = symbolTable.indexOf("S");

        pda = new PDA(grammar, startSymbol);

        conflicts = new Conflicts();
        table = pda.createTable(conflicts, grammar.getSymbolCount());

        // TODO:
        //   assertTrue("no conflicts", conflicts.isEmpty() );
        // there are conflicts in testExercise2 and testBlocks

        // TODO: more tests
    }
}
