package org.qooxdoo.sushi.graph;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.Arrays;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class GraphTest {
    private Graph<String> g;

    @Before
    public void setUp() {
        g = new Graph<String>();
    }

    @After
    public void after() {
        g.check();
    }
    
    //--
    
    @Test
    public void nodes() {
        assertTrue(g.node("foo"));
        assertFalse(g.node("foo"));
        assertEquals(1, g.size());
        assertTrue(g.node("bar"));
        assertEquals(2, g.size());
    }
    
    @Test
    public void arrows() {
        assertTrue(g.edge("foo", "bar"));
        assertFalse(g.edge("foo", "bar"));
        assertTrue(g.edge("bar", "foo"));
        assertEquals(2, g.size());
    }

    //--
    
    @Test
    public void sortEmpty() throws CyclicDependency {
        sort();
    }

    @Test
    public void sortIsolated() throws CyclicDependency {
        g.node("a");
        g.node("b");
        sort("b", "a");
    }

    @Test
    public void sortTransitive() throws CyclicDependency {
        g.edge("a", "b");
        g.edge("b", "c");
        sort("a", "b", "c");
    }

    @Test
    public void sortTransitiveMore() throws CyclicDependency {
        g.edge("a", "b");
        g.edge("b", "c");
        g.edge("c", "d");
        sort("a", "b", "c", "d");
    }

    @Test
    public void sortFork() throws CyclicDependency {
        g.edge("a", "b");
        g.edge("a", "c");
        g.edge("b", "c");
        sort("a", "b", "c");
    }

    @Test(expected = CyclicDependency.class)
    public void sortCycle() throws CyclicDependency {
        g.edge("a", "a");
        sort();
    }

    @Test(expected = CyclicDependency.class)
    public void sortIndirectCycle() throws CyclicDependency {
        g.edge("a", "b");
        g.edge("b", "a");
        sort();
    }

    @Test
    public void sortTriangle() throws CyclicDependency {
        g.edge("a", "b");
        g.edge("b", "c");
        g.edge("a", "c");
        sort("a", "b", "c");
    }

    private void sort(String ... strings) throws CyclicDependency {
        assertEquals(Arrays.asList(strings), g.sort());
    }

    //--
    
    @Test
    public void closure() {
        g.edge("a", "b");
        closure("a",  "a", "b");
    }

    
    @Test
    public void closureOne() {
        g.edge("a", "b");
        g.edge("a", "c");
        closure("a",  "a", "b", "c");
        closure("b",  "b");
    }

    @Test
    public void closureTwo() {
        g.edge("a", "b");
        g.edge("c", "d");
        closure("a",  "a", "b");
        closure("b",  "b");
    }

    private void closure(String start, String ... expected) {
        assertEquals(Arrays.asList(expected), g.closure(start));
    }
    
    //--
    
    @Test
    public void string() {
        g.edge("a", "b");
        g.edge("a", "c");
        assertEquals("[a-b|c, b, c]", g.toString());
    }
    
}
