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

package org.qooxdoo.sushi.xml;

import java.io.IOException;
import java.io.Reader;

import org.qooxdoo.sushi.scanner.GrammarScanner;
import org.qooxdoo.sushi.scanner.GrammarScannerFactory;
import org.qooxdoo.sushi.scanner.Position;
import org.qooxdoo.sushi.scanner.Scanner;

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
        throw new RuntimeException("TODO");
        /*
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
        throw new RuntimeException("TODO");
        /*
        scanner.close();
        scanner = new GrammarScanner(table, eofSymbol);
         scanner.open(pos, new StringReader(replacement + remaining));*/
    }
}
