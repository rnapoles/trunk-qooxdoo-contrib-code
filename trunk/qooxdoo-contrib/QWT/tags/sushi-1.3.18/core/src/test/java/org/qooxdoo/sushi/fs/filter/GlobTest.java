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

package org.qooxdoo.sushi.fs.filter;

import java.util.regex.Pattern;

import org.junit.Test;

import static org.junit.Assert.*;

public class GlobTest {
    private Pattern p;
    
    @Test
    public void empty() {
        assertEquals("", Glob.compile("", false));
    }

    @Test
    public void ignoreCase() {
        p = (Pattern) Glob.compile("a", true);
        assertTrue(Glob.matches(p, "a"));
        assertTrue(Glob.matches(p, "A"));
        assertFalse(Glob.matches(p, "b"));
    }

    @Test
    public void suffix() {
        p = (Pattern) Glob.compile("*.java", false);
        assertTrue(Glob.matches(p, "foo.java"));
        assertFalse(Glob.matches(p, "foo.txt"));
        assertTrue(Glob.matches(p, ".java"));
    }

    @Test
    public void all() {
        p = (Pattern) Glob.compile("*.*", true);
        assertFalse(Glob.matches(p, ""));
        assertTrue(Glob.matches(p, "."));
        assertTrue(Glob.matches(p, "foo.bar"));
    }
    
    @Test
    public void x() {
        p = (Pattern) Glob.compile("g.a-*.jar", true);
        assertTrue(Glob.matches(p, "g.a-0.2.jar"));
        assertTrue(Glob.matches(p, "g.A-0.2.jar"));
    }
}

