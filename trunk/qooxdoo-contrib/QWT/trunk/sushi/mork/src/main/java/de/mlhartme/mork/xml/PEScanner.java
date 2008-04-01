// §{{header}}:
//
// This is file src/de/mlhartme/mork/xml/PEScanner.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.xml;

import de.mlhartme.mork.scanner.GrammarScanner;
import de.mlhartme.mork.scanner.Position;
import de.mlhartme.mork.scanner.Scanner;
import de.mlhartme.mork.scanner.GrammarScannerFactory;
import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;
import java.net.URL;

/**
 * Wraps a GrammarScanner to recognize PEReferences. Used internally by the DocumentBuilder.
 */
public class PEScanner implements Symbols, Scanner {
    /** scanner mode that scanns PEReference. TODO: obtain automatically. */
    private static final int PE_MODE = 1;

    private DocumentBuilder context;

    private GrammarScannerFactory table;
    private int eofSymbol;

    private GrammarScanner scanner;

    /** where PERefenrences can be matched */
    private boolean everywhere;

    //-------------------------------------------------------------------

    public PEScanner(
        DocumentBuilder context, GrammarScannerFactory table, int eofSymbol, boolean everywhere)
    {
        this.context = context;
        this.table = table;
        this.eofSymbol = eofSymbol;
        this.everywhere = everywhere;
    }

    public Scanner newInstance() {
        return new PEScanner(context, table, eofSymbol, everywhere);
    }

    public void open(Position position, Reader src) throws IOException {
        throw new RuntimeException("TODO");/*
        this.scanner = null; // new GrammarScanner(table, eofSymbol);
         this.scanner.open(position, src);*/
    }

    public void close() {
        scanner = null;
    }

    //----------------------------------------------------------------------
    // query state

    public void getPosition(Position result) {
        scanner.getPosition(result);
    }

    public String getText() {
        return scanner.getText();
    }

    public int getEofSymbol() {
        return eofSymbol;
    }

    //----------------------------------------------------------------------

    /** never returns PE_REFERENCE. */
    public int eat(int mode) throws IOException {
        int terminal;
        String name;
        Object replacement;
        URL url;
        Position pos;

        while (true) {
            terminal = doEat(mode);
            // System.out.println("eat " + terminal + " text " + scanner.getText());
            if (terminal != PE_REFERENCE) {
                return terminal;
            }
            // TODO: check for recursion
            name = scanner.getText();
            name = name.substring(1, name.length() - 1);
            replacement = context.getParameterEntities().lookup(name);
            if (replacement == null) {
                pos = new Position();
                scanner.getPosition(pos);
                throw new IllegalToken(pos, "undefined parameter entity: " + name);
            }
            if (replacement instanceof Buffer) {
                prepend(((Buffer) replacement).getAllText());
            } else {
                prepend((String) replacement);
            }
        }
    }

    private int doEat(int mode) throws IOException {
        if (everywhere) {
            // TODO: find conflicting terminals and correct them if necessary
            return scanner.eat(mode);
        } else {
            // TODO: doEat might return PE_REFENRECE resulting from error correction
            return scanner.eat(mode);
        }
    }

    private void prepend(String replacement) throws IOException {
        // input has to be prepended -- just pushing scanners doesn't help since
        // a stack scanner cannot scan into the next scanner - which causes some
        // input split into multiple token where a single token would be correct.
        // In particular, whitespace does not get merged.
        GrammarScanner s;
        Position pos;
        String remaining;

        pos = new Position();
        scanner.getPosition(pos);  // TODO: wrong position
        remaining = scanner.getRemainingInput();
        throw new RuntimeException("TODO");/*
        scanner.close();
        scanner = new GrammarScanner(table, eofSymbol);
         scanner.open(pos, new StringReader(replacement + remaining));*/
    }
}
