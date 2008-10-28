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

package org.qooxdoo.sushi.compiler;

import org.qooxdoo.sushi.util.IntBitSet;

import org.qooxdoo.sushi.grammar.Grammar;
import org.qooxdoo.sushi.grammar.GrammarBuilder;
import org.qooxdoo.sushi.grammar.Rule;
import org.qooxdoo.sushi.misc.GenericException;
import org.qooxdoo.sushi.misc.StringArrayList;
import org.qooxdoo.sushi.parser.Conflicts;
import org.qooxdoo.sushi.parser.PDA;
import org.qooxdoo.sushi.parser.Parser;
import org.qooxdoo.sushi.parser.ParserTable;
import org.qooxdoo.sushi.scanner.FABuilder;
import org.qooxdoo.sushi.scanner.GrammarScannerFactory;
import org.qooxdoo.sushi.scanner.Modes;

/**
 * Grammar syntax specification. Represents a grammar syntax file with
 * parser and scanner section.
 *
 * Design issues: whitespace handling is performed in the parser, not in the
 * scaner. This is because I might a features access the "[text]" of white space.
 */

public class GrammarSyntax extends Syntax {
    private Grammar grammar;
    private boolean priorities;
    private IntBitSet whiteSymbols;
    private Rule[] scannerRules;
    
    public GrammarSyntax(
        StringArrayList symbolTable, Rule[] parserRules,
        boolean priorities, IntBitSet whiteSymbols, Rule[] scannerRules)
        throws GenericException {
        if (parserRules.length == 0) {
            throw new GenericException("empty parser section, at least one rule is needed");
        }
        this.grammar = GrammarBuilder.createGrammar(parserRules, symbolTable);
        this.priorities = priorities;
        if (whiteSymbols != null) {
            this.whiteSymbols = whiteSymbols;
        } else {
            this.whiteSymbols = new IntBitSet();
        }
        this.scannerRules = scannerRules;
    }

    @Override
    public Grammar getGrammar() {
        return grammar;
    }

    /**
     * Translate specification.
     *
     * @return null for errors.
     */
    @Override
    public Parser translate(Output output) throws GenericException {
        FABuilder builder;
        Conflicts conflicts;
        PDA pda;
        ParserTable parserTable;
        int eof;
        GrammarScannerFactory scannerFactory;
        IntBitSet usedTerminals;
        IntBitSet usedSymbols;
        int symbolCount;
        StringArrayList symbolTable;

        output.verbose("processing parser section");

        pda = new PDA(grammar, grammar.getStart());
        conflicts = new Conflicts();
        symbolCount = Math.max(grammar.getSymbolCount(), whiteSymbols.last() + 1);
        parserTable = pda.createTable(conflicts, symbolCount);
        parserTable.addWhitespace(whiteSymbols, conflicts);
        symbolTable = grammar.getSymbolTable();
        if (!conflicts.isEmpty()) {
            output.error("TODO", LALR_CONFLICT + conflicts.toString(symbolTable));
        }
        if (output.listing != null) {
            output.listing.println("\nSymbols:");
            output.listing.println(symbolTable.toString());
            output.listing.println("\nGrammar:");
            output.listing.println(grammar.toString());
            output.listing.println("\nAutomaton:");
            pda.print(grammar, output.listing);
        }
        output.statistics();
        output.statistics("parser statistics");
        output.statistics("  states: " + pda.size());
        output.statistics("  table: [symbols=" + parserTable.getSymbolCount()
                      + "][states=" + parserTable.getStateCount() + "]");
        eof = pda.eof;

        // free memory before computing FA
        pda = null;

        output.verbose("processing scanner section");

        usedTerminals = new IntBitSet();
        grammar.getUsedTerminals(usedTerminals);
        usedTerminals.addAll(whiteSymbols);

        output.verbose("generating scanner");
        builder = FABuilder.run(scannerRules, usedTerminals, symbolTable, output.verbose);
        output.listing("inline symbols: " + builder.getInlines());

        if (priorities) {
            output.verbose("use priorities");
            Modes.resolveScannerConflicts(builder.getFA(), scannerRules);
        }
        scannerFactory = GrammarScannerFactory.create(
            builder.getFA(), builder.getErrorState(), parserTable, scannerRules,
            whiteSymbols, output.verbose, output.listing, eof);

        output.statistics();
        output.statistics("scanner statistics");
        output.statistics("  fa states : " + builder.getFA().size());
        output.statistics("  table: char[" + scannerFactory.size() + "]");
        output.verbose("scanner done");

        usedSymbols = new IntBitSet(whiteSymbols);
        usedSymbols.addAll(builder.getInlines());
        grammar.check(grammar.getStart(), usedSymbols, symbolTable.toList());

        return new Parser(parserTable, scannerFactory);
    }
}
