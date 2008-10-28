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

package org.qooxdoo.toolkit.repository;

import java.util.Arrays;

import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

public class DependencyGraphTest {
    private DependencyGraph g;
    
    @Before
    public void setUp() {
        g = new DependencyGraph();
    }

    @Test
    public void empty() {
        assertEquals(0, g.sort().size());
    }

    @Test
    public void one() {
        g.arrow("a", "b");
        sort("a", "b");
    }

    @Test
    public void transitive() {
        g.arrow("a", "b");
        g.arrow("b", "c");
        sort("a", "b", "c");
    }

    @Test
    public void fork() {
        g.arrow("a", "b");
        g.arrow("a", "c");
        g.arrow("b", "c");
        sort("a", "b", "c");
    }

    @Test
    public void directCycle() {
        g.arrow("a", "a");
        try {
            sort();
            fail();
        } catch (DependencyException e) {
            // ok
        }
    }

    @Test
    public void indirectCycle() {
        g.arrow("a", "b");
        g.arrow("b", "a");
        try {
            sort();
            fail();
        } catch (DependencyException e) {
            // ok
        }
    }

    @Test
    public void closureOne() {
        g.arrow("a", "b");
        g.arrow("a", "c");
        closure("a",  "a", "b", "c");
        closure("b",  "b");
    }

    @Test
    public void closureTwo() {
        g.arrow("a", "b");
        g.arrow("c", "d");
        closure("a",  "a", "b");
        closure("b",  "b");
    }

    //--
    
    private void sort(String ... strings) {
        assertEquals(Arrays.asList(strings), g.sort());
    }

    private void closure(String start, String ... expected) {
        assertEquals(Arrays.asList(expected), g.closure(start));
    }
}
