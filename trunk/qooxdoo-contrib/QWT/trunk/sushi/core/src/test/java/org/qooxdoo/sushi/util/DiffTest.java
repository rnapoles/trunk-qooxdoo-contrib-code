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

import static org.junit.Assert.assertEquals;

import java.util.Arrays;

import org.junit.Test;

public class DiffTest {
    @Test
    public void empty() {
        assertEquals("", Diff.diff("", ""));
        assertEquals("", Diff.diff("\n\n", "\n\n"));
    }

    @Test
    public void addall() {
        assertEquals("+ abc", Diff.diff("", "abc"));
        assertEquals("+ abc\n", Diff.diff("", "abc\n"));
        assertEquals("+ abc\n+ xyz", Diff.diff("", "abc\nxyz"));
        assertEquals("+ \n+ \n+ \n", Diff.diff("", "\n\n\n"));
    }

    @Test
    public void addone() {
        assertEquals("+ b\n", Diff.diff("a\nc\n", "a\nb\nc\n"));
    }

    @Test
    public void removeall() {
        assertEquals("- abc", Diff.diff("abc", ""));
        assertEquals("- abc\n", Diff.diff("abc\n", ""));
        assertEquals("- abc\n- xyz", Diff.diff("abc\nxyz", ""));
        assertEquals("- \n- \n- \n", Diff.diff("\n\n\n", ""));
    }

    @Test
    public void removeone() {
        assertEquals("- b\n", Diff.diff("a\nb\nc\n", "a\nc\n"));
    }

    @Test
    public void changeall() {
        assertEquals("- a\n- b\n+ 1\n+ 2\n", Diff.diff("0\na\nb\nc\n", "0\n1\n2\nc\n"));
    }
    
    @Test
    public void mixed() {
        assertEquals("- b\n- B\n+ d\n+ D\n", Diff.diff("a\nb\nB\nc\n", "a\nc\nd\nD\n"));
    }
    
    @Test
    public void replace() {
        assertEquals("- before\n+ after\n", Diff.diff("before\nsame\n", "after\nsame\n"));
    }

    //--

    @Test
    public void lines() {
        lines("");
        lines("\n", "\n");
        lines("abcde", "abcde");
        lines("a\n", "a\n");
        lines("a\nb", "a\n", "b");
        lines("a\nb\n", "a\n", "b\n");
    }
    
    private void lines(String str, String ... lines) {
        assertEquals(Arrays.asList(lines), Strings.lines(str));
    }
}
