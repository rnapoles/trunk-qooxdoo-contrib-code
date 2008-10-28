package org.qooxdoo.sushi.graph;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.Arrays;
import java.util.List;

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
        assertTrue(g.arrow("foo", "bar"));
        assertFalse(g.arrow("foo", "bar"));
        assertTrue(g.arrow("bar", "foo"));
        assertEquals(2, g.size());
    }

    @Test
    public void sortIsolated() throws CyclicDependency {
        List<String> lst;
        
        g.node("a");
        g.node("b");
        lst = g.sort();
        assertEquals(2, lst.size());
    }

    @Test
    public void sortTransitive() throws CyclicDependency {
        g.arrow("a", "b");
        g.arrow("b", "c");
        assertEquals(Arrays.asList("a", "b", "c"), g.sort());
    }

    @Test
    public void sortTransitiveMore() throws CyclicDependency {
        g.arrow("a", "b");
        g.arrow("b", "c");
        g.arrow("c", "d");
        assertEquals(Arrays.asList("a", "b", "c", "d"), g.sort());
    }

    @Test
    public void sortTriangle() throws CyclicDependency {
        g.arrow("a", "b");
        g.arrow("b", "c");
        g.arrow("a", "c");
        assertEquals(Arrays.asList("a", "b", "c"), g.sort());
    }

    @Test(expected = CyclicDependency.class)
    public void sortCycle() throws CyclicDependency {
        g.arrow("a", "a");
        g.sort();
    }
}
