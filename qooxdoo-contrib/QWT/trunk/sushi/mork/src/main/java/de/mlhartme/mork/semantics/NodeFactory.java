// §{{header}}:
//
// This is file src/de/mlhartme/mork/semantics/NodeFactory.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.semantics;

import de.mlhartme.mork.parser.Parser;
import de.mlhartme.mork.scanner.Position;
import de.mlhartme.mork.scanner.Scanner;

public class NodeFactory {
    private final Node[] pool;
    private int used;

    private final int children;
    private final int[] internalAttrs;
    private final Visits visits;

    private static final Visits NO_VISITS = new Visits(new Object[0]);

    /** terminal **/
    public NodeFactory(int size, int[] internalAttrs) {
        this(size, 0, internalAttrs, NO_VISITS);
    }

    public NodeFactory(int size, int children, int[] internalAttrs, Visits visits) {
        this.pool = new Node[size];

        this.children = children;
        this.internalAttrs = internalAttrs;
        this.visits = visits;
    }

    private Node allocate() {
        Node node;

        if (used == 0) {
            return new Node(this, children, internalAttrs.length, visits);
        } else {
            used--;
            node = pool[used];
            node.init();
            return node;
        }
    }

    public void free(Node node) {
        if (used == pool.length) {
            return;
        }
        pool[used] = node;
        used++;
    }

    public Node allocateTerminal(Scanner scanner, Object environment) {
        Position pos;
        Node node;
        Object[] attrs;
        int i;
        int max;

        node = allocate();
        pos = node.position;
        scanner.getPosition(pos);
        attrs = node.attrs;
        max = attrs.length;
        for (i = 0; i < max; i++) {
            switch (internalAttrs[i]) {  // TODO: duplicated code
                case TEXT:
                    attrs[i] = scanner.getText();
                    break;
                case LINE:
                    attrs[i] = new Integer(pos.getLine());
                    break;
                case COLUMN:
                    attrs[i] = new Integer(pos.getColumn());
                    break;
                case OFFSET:
                    attrs[i] = new Integer(pos.getOffset());
                    break;
                case ENVIRONMENT:
                    attrs[i] = environment;
                    break;
                case NONE:  // attribute computed by non-internal constructor
                    attrs[i] = null;
                    break;
                default:
                    throw new IllegalArgumentException();
            }
        }
        return node;
    }

    public Node allocateNonterminal(Parser parser, Object environment) {
        Node node;
        Object[] attrs;
        int i;
        int max;
        Node[] children;
        Position pos;

        node = allocate();
        children = node.children;
        pos = node.position;
        i = children.length;
        if (i == 0) {
            // TODO
        } else {
            do {
                children[--i] = (Node) parser.pop();
            } while (i > 0);
            pos.set(children[0].position);
        }
        attrs = node.attrs;
        max = attrs.length;
        for (i = 0; i < max; i++) {
            switch (internalAttrs[i]) {  // TODO: duplicated code
                case TEXT:
                    attrs[i] = node.getText();
                    break;
                case LINE:
                    attrs[i] = new Integer(pos.getLine());
                    break;
                case COLUMN:
                    attrs[i] = new Integer(pos.getColumn());
                    break;
                case OFFSET:
                    attrs[i] = new Integer(pos.getOffset());
                    break;
                case ENVIRONMENT:
                    attrs[i] = environment;
                    break;
                case NONE:  // attribute computed by non-internal constructor
                    attrs[i] = null;
                    break;
                default:
                    throw new IllegalArgumentException();
            }
        }
        return node;
    }

    //--

    public static final int NONE = 0;
    public static final int TEXT = 1;
    public static final int LINE = 2;
    public static final int COLUMN = 3;
    public static final int OFFSET = 4;
    public static final int ENVIRONMENT = 5;

    public static int lookupAttribute(String name) {
        if ("text".equals(name)) {
            return TEXT;
        } else if ("line".equals(name)) {
            return LINE;
        } else if ("column".equals(name)) {
            return COLUMN;
        } else if ("offset".equals(name)) {
            return OFFSET;
        } else if ("env".equals(name)) {
            return ENVIRONMENT;
        } else {
            return -1;
        }
    }

    public static Class getDeclaration(int no) {
        switch (no) {
            case TEXT:
                return String.class;
            case LINE:
            case COLUMN:
            case OFFSET:
                return Integer.class;
            case ENVIRONMENT:
                return Object.class;
            default:
                throw new IllegalArgumentException();
        }
    }
}
