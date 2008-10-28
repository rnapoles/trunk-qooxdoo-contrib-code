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

import org.qooxdoo.sushi.misc.GenericException;
import org.qooxdoo.sushi.graph.Graph;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import junit.framework.TestCase;

public class PartitionTest extends TestCase {
    private static final String A = "A";
    private static final String B = "B";
    private static final String C = "C";
    private static final String D = "D";
    private static final String E = "E";

    private List left;
    private List right;
    private Set inherited;
    private Set synthesized;
    private Graph relation;

    @Override
    protected void setUp() throws Exception {
        super.setUp();

        left = new ArrayList();
        right = new ArrayList();
        inherited = new HashSet();
        synthesized = new HashSet();
        relation = new Graph();
    }

    //--- disconnected

    public void testSimpleDisconnection() {
        List disconnected;

        left.add(A);
        left.add(B);
        right.add(C);
        right.add(D);
        relation.edge(A, C);
        relation.edge(B, D);
        disconnected = Partition.getDisconnected(left, relation, right);
        assertEquals(2, disconnected.size());
        assertSame(A, disconnected.get(0));
        assertSame(B, disconnected.get(1));
    }

    public void testTransitiveDisconnection() {
        List connected;

        left.add(A);
        right.add(C);
        relation.edge(A, B);
        relation.edge(B, C);
        connected = Partition.getDisconnected(left, relation, right);
        assertEquals(0, connected.size());
    }

    public void testWithoutDisconnections() {
        List disconnected;

        left.add(A);
        left.add(D);
        right.add(B);
        // relation is empty
        disconnected = Partition.getDisconnected(left, relation, right);
        assertEquals(2, disconnected.size());
        assertSame(A, disconnected.get(0));
        assertSame(D, disconnected.get(1));
    }

    public void testDisconnected() {
        List disconnected;

        left.add(A);
        left.add(D);
        right.add(B);
        relation.edge(A, B);
        relation.edge(A, C);
        relation.edge(B, D);
        relation.edge(D, D);
        disconnected = Partition.getDisconnected(left, relation, right);
        assertEquals(0, disconnected.size());
    }

    //--- createA

    public void testEmpty() throws GenericException {
        List[] partitions;

        partitions = Partition.createA(synthesized, inherited, relation);
        assertEquals(0, partitions.length);
    }

    public void testSynthesizedOnly() throws GenericException {
        List[] partitions;

        synthesized.add(A);
        partitions = Partition.createA(synthesized, inherited, relation);
        assertEquals(1, partitions.length);
        assertEquals(1, partitions[0].size());
        assertSame(A, partitions[0].get(0));
    }

    public void testInheritedOnly() throws GenericException {
        List[] partitions;

        inherited.add(A);
        partitions = Partition.createA(synthesized, inherited, relation);
        assertEquals(2, partitions.length);
        assertEquals(0, partitions[0].size());
        assertEquals(1, partitions[1].size());
        assertSame(A, partitions[1].get(0));
    }

    public void testInheritedBeforeSynthesized() throws GenericException {
        List[] partitions;

        synthesized.add(A);
        inherited.add(B);
        relation.edge(A, B);
        partitions = Partition.createA(synthesized, inherited, relation);
        assertEquals(3, partitions.length);
        assertEquals(0, partitions[0].size());
        assertEquals(1, partitions[1].size());
        assertSame(B, partitions[1].get(0));
        assertEquals(1, partitions[2].size());
        assertSame(A, partitions[2].get(0));
    }

    public void testTwoInOnePartition() throws GenericException {
        List[] partitions;

        synthesized.add(A);
        synthesized.add(B);
        relation.edge(A, B);
        inherited.add(C);
        inherited.add(D);
        relation.edge(D, C);
        partitions = Partition.createA(synthesized, inherited, relation);
        assertEquals(2, partitions.length);
        assertTrue(partitions[0].contains(A));
        assertTrue(partitions[0].contains(B));
        assertEquals(2, partitions[1].size());
        assertTrue(partitions[1].contains(C));
        assertTrue(partitions[1].contains(D));
    }
}
