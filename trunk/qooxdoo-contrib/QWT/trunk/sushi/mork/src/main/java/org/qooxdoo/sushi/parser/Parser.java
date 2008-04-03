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

package org.qooxdoo.sushi.parser;

import java.io.IOException;
import java.io.PrintStream;
import java.io.Reader;

import org.qooxdoo.sushi.mapping.ErrorHandler;
import org.qooxdoo.sushi.scanner.Position;
import org.qooxdoo.sushi.scanner.Scanner;
import org.qooxdoo.sushi.scanner.ScannerFactory;
import org.qooxdoo.sushi.semantics.SemanticError;

/**
 * Push down automaton, performing LR parsing
 */

public class Parser {
    private final ParserTable table;
    private final ScannerFactory scannerFactory;
    private ErrorHandler errorHandler;

    // TODO: dynamically grow the Stack
    private static final int STACK_SIZE = 10240;

    private int top;          // index of the topmost state, might be -1
    private final int[] states;
    private final Object[] nodes;

    /** operand is one of the SPECIAL_xx values */
    public static final char SPECIAL = 0;
    public static final char SHIFT   = 1;
    public static final char REDUCE  = 2;
    public static final char SKIP    = 3;

    public static final char SPECIAL_ERROR  = 0;
    public static final char SPECIAL_ACCEPT = 1;

    static {
        if (SPECIAL_ERROR != 0) {
            throw new RuntimeException(
                "table packing relies on the fact that error states are code as 0");
        }
    }

    public Parser(ParserTable table, ScannerFactory scannerFactory) {
        this.table = table;
        this.scannerFactory = scannerFactory;
        this.errorHandler = null;

        states = new int[STACK_SIZE];
        nodes = new Object[STACK_SIZE];
        top = -1;
    }

    public ParserTable getTable() {
        return table;
    }

    public void setErrorHandler(ErrorHandler errorHandler) {
        this.errorHandler = errorHandler;
    }

    public Parser newInstance() {
        return new Parser(table, scannerFactory);
    }

    public Object run(Position position, Reader src, TreeBuilder treeBuilder, PrintStream verbose) {
        int terminal;
        int production;
        int state;
        int value;
        Object node;
        Position pos;
        Scanner scanner;

        try {
            scanner = scannerFactory.newInstance(position, src);
            treeBuilder.open(scanner, this);
            try {
                state = table.getStartState();
                push(state, null);      // this state is never poped; thus, null is ok:
                while (true) {
                    terminal = scanner.eat(table.getMode(state));
                    if (terminal == -1) {
                        pos = new Position();
                        scanner.getPosition(pos);
                        errorHandler.lexicalError(pos);
                        return null;
                    }
                lookupLoop:
                    while (true) {
                        value = table.lookup(state, terminal);
                        switch (table.getAction(value)) {
                            case SPECIAL:
                                if (table.getOperand(value) == SPECIAL_ACCEPT) {
                                    return pop();
                                } else {
                                    pos = new Position();
                                    scanner.getPosition(pos);
                                    errorHandler.syntaxError(pos, table.getShifts(state));
                                }
                            case SHIFT:
                                if (verbose != null) {
                                    verbose.print("[" + state + "] ");
                                    verbose.println("shift " +  table.getOperand(value));
                                }
                                state = table.getOperand(value);
                                push(state, treeBuilder.createTerminal(terminal));
                                break lookupLoop;
                            case REDUCE:
                                production = table.getOperand(value);
                                if (verbose != null) {
                                    verbose.print("[" + state + "] ");
                                    verbose.println("reduce " + production);
                                }

                                try {
                                    node = treeBuilder.createNonterminal(production);
                                } catch (SemanticError e) {
                                    errorHandler.semanticError(e.position, e.exception);
                                    return null;
                                }
                                // state != getState() because createNonterminnal removes nodes
                                state = table.lookupShift(getState(), production);
                                push(state, node);
                                break;
                            case SKIP:
                                if (verbose != null) {
                                    verbose.print("[" + state + "] ");
                                    verbose.println("skip " + terminal);
                                }
                                break lookupLoop;
                            default:
                                throw new RuntimeException();
                        }
                    }
                }
            } finally {
                top = -1;
            }
        } catch (IOException e) {
            errorHandler.ioError(position.toString(), null, e);  // TODO
            return null;
        }
    }

    /** returns the subject symbol of the production */
    public int getLeft(int production) {
        return table.getLeft(production);
    }

    public int getState() {
        return states[top];
    }

    public Object pop() {
        return nodes[top--];
    }

    public void push(int state, Object node) {
        top++;
        states[top] = state;
        nodes[top] = node;
    }
}
