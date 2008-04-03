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

package org.qooxdoo.sushi.semantics;

import java.io.PrintStream;

import org.qooxdoo.sushi.scanner.Position;

/**
 * Node of the syntax tree. A stupid data contained for Semantics.
 */

public class Node {
    private final NodeFactory pool;

    public final Position position;
    public final Node[] children; // always != null
    public final Object[] attrs;  // always != null
    private final Visits visits;  // always != null

    // current position in visit sequence
    private int ofs;

    private static final Node[] NO_CHILDREN = new Node[0];

    private static final Object[] NO_ATTRIBUTES = new Object[0];

    //---------------------------------------------------------------------
    // Construction

    public Node(NodeFactory pool, int children, int attributes, Visits visits) {
        this.pool = pool;
        if (children == 0) {
            this.children = NO_CHILDREN;
        } else {
            this.children = new Node[children];
        }
        if (attributes == 0) {
            this.attrs = NO_ATTRIBUTES;
        } else {
            this.attrs = new Object[attributes];
        }
        this.visits = visits;
        this.position = new Position();
    }

    public void init() {
        this.ofs = 0;
    }

    //---------------------------------------------------------------------
    // access

    public String getText() {
        return "TODO";
    }

    public Node get(int ofs) {
        if (ofs == -1) {
            return this;
        } else {
            return children[ofs];
        }
    }

    public void compute(PrintStream log) throws SemanticError {
        Object visit;
        int next;
        int max;
        int i;
        Node n;

        if (log != null) {
            log.println("visit " + hashCode());
        }
        max = visits.size();
        while (ofs < max) {
            visit = visits.get(ofs++);
            if (visit instanceof Attribution) {
                ((Attribution) visit).eval(this, log);
            } else {
                next = Visits.getOfs(visit);
                if (next == -1) {
                    return;  // compute attributes in parent, come back later
                }
                children[next].compute(log);
            }
        }
        max = children.length;
        for (i = 0; i < max; i++) {
            n = children[i];
            n.pool.free(n);
        }
    }
}
