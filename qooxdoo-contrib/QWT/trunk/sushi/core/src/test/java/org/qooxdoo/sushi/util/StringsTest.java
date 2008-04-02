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

package org.qooxdoo.sushi.util;

import org.junit.Test;
import static org.junit.Assert.*;

public class StringsTest {
    @Test
    public void stripExtension() {
        String f1 = "abc.xml";
        String f2 = ".xml";
        String f3 = "abc";
        String f4 = "abc.def.xml";
        
        assertTrue("abc".equals(Strings.stripExtension(f1)));
        assertTrue(".xml".equals(Strings.stripExtension(f2)));
        assertTrue("abc".equals(Strings.stripExtension(f3)));
        assertTrue("abc.def".equals(Strings.stripExtension(f4)));
    }
    
    //--
    
    @Test
    public void capitalize() {
        assertEquals("", Strings.capitalize(""));
        assertEquals("C", Strings.capitalize("c"));
        assertEquals("Cap", Strings.capitalize("Cap"));
        assertEquals("CaP", Strings.capitalize("caP"));
        assertEquals("1", Strings.capitalize("1"));
    }

    @Test
    public void decapitalize() {
        assertEquals("", Strings.decapitalize(""));
        assertEquals("c", Strings.decapitalize("c"));
        assertEquals("c", Strings.decapitalize("C"));
        assertEquals("caP", Strings.decapitalize("CaP"));
        assertEquals("1", Strings.decapitalize("1"));
    }

    //---
    
    @Test
    public void blockSimple() {
        assertEquals("", Strings.block("", "", 0, ""));
        assertEquals("foo", Strings.block("", "foo", 10, ""));
        assertEquals("foo bar", Strings.block("", "foo bar", 10, ""));
        assertEquals("barfoo", Strings.block("bar", "foo ", 10, ""));
        assertEquals("foobar", Strings.block("", "foo", 10, "bar"));
    }

    @Test
    public void blockNormalize() {
        assertEquals("foo", Strings.block("", " foo", 10, ""));
        assertEquals("foo", Strings.block("", "foo ", 10, ""));
        assertEquals("foo", Strings.block("", "foo\n", 10, ""));
        assertEquals("foo bar", Strings.block("", "foo  bar", 10, ""));
    }
    @Test
    public void blockBreak() {
        assertEquals("foo-bar-", Strings.block("", "foo bar", 3, "-"));
        assertEquals("foo-bar-", Strings.block("", "foo bar", 4, "-"));
        assertEquals("foo-bar-", Strings.block("", "foo bar", 6, "-"));
        assertEquals("foo bar-", Strings.block("", "foo bar", 7, "-"));
        assertEquals("foo bar-", Strings.block("", "foo  bar", 7, "-"));
    }

    @Test
    public void blockToSmall() {
        assertEquals("foo", Strings.block("", "foo", 0, ""));
        assertEquals("foo-bar-", Strings.block("", "foo bar", 0, "-"));
    }
    
    //--
    
    @Test
    public void next1() {
        int[] idx = { 0 };
        
        assertEquals("", Strings.next("abc", idx, "a", "b"));
        assertEquals("", Strings.next("abc", idx, "a", "b"));
        assertEquals("c", Strings.next("abc", idx, "a", "b"));
        assertEquals(null, Strings.next("abc", idx, "a", "b"));
    }

    @Test
    public void next2() {
        int[] idx = { 0 };
        
        assertEquals("", Strings.next("abc", idx, "ab", "c"));
        assertEquals("", Strings.next("abc", idx, "ab", "c"));
        assertEquals(null, Strings.next("abc", idx, "ab", "c"));
    }
}

