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

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

import org.junit.Test;
import org.qooxdoo.sushi.fs.GetLastModifiedException;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.fs.file.FileNode;

public class DiffTest {
    @Test
    public void empty() {
        assertEquals("", Diff.diff("", ""));
        assertEquals("", Diff.diff("\n\n", "\n\n"));
    }

    @Test
    public void addall() {
        assertEquals("+abc", Diff.diff("", "abc"));
        assertEquals("+abc\n", Diff.diff("", "abc\n"));
        assertEquals("+abc\n+xyz", Diff.diff("", "abc\nxyz"));
        assertEquals("+\n+\n+\n", Diff.diff("", "\n\n\n"));
    }

    @Test
    public void addone() {
        assertEquals("+b\n", Diff.diff("a\nc\n", "a\nb\nc\n"));
    }

    @Test
    public void removeall() {
        assertEquals("-abc", Diff.diff("abc", ""));
        assertEquals("-abc\n", Diff.diff("abc\n", ""));
        assertEquals("-abc\n-xyz", Diff.diff("abc\nxyz", ""));
        assertEquals("-\n-\n-\n", Diff.diff("\n\n\n", ""));
    }

    @Test
    public void removeone() {
        assertEquals("-b\n", Diff.diff("a\nb\nc\n", "a\nc\n"));
    }

    @Test
    public void changeall() {
        assertEquals("-a\n-b\n+1\n+2\n", Diff.diff("0\na\nb\nc\n", "0\n1\n2\nc\n"));
    }
    
    @Test
    public void mixed() {
        assertEquals("-b\n-B\n+d\n+D\n", Diff.diff("a\nb\nB\nc\n", "a\nc\nd\nD\n"));
    }
    
    @Test
    public void replace() {
        assertEquals("-before\n+after\n", Diff.diff("before\nsame\n", "after\nsame\n"));
    }

    @Test
    public void context() {
        assertEquals(" 3\n-before\n+after\n X\n Y\n-in\n 4\n", Diff.diff("1\n2\n3\nbefore\nX\nY\nin\n4\n5\n6\n7\n", "1\n2\n3\nafter\nX\nY\n4\n5\n6\n7\n", false, 1));
        assertEquals(" 2\n 3\n-before\n+after\n X\n Y\n-in\n 4\n 5\n", Diff.diff("1\n2\n3\nbefore\nX\nY\nin\n4\n5\n6\n7\n", "1\n2\n3\nafter\nX\nY\n4\n5\n6\n7\n", false, 2));
        assertEquals(" 1\n 2\n 3\n-before\n+after\n X\n Y\n-in\n 4\n 5\n 6\n", Diff.diff("1\n2\n3\nbefore\nX\nY\nin\n4\n5\n6\n7\n", "1\n2\n3\nafter\nX\nY\n4\n5\n6\n7\n", false, 3));
        assertEquals(" 1\n 2\n 3\n-before\n+after\n X\n Y\n-in\n 4\n 5\n 6\n 7\n", Diff.diff("1\n2\n3\nbefore\nX\nY\nin\n4\n5\n6\n7\n", "1\n2\n3\nafter\nX\nY\n4\n5\n6\n7\n", false, 4));
    }

    @Test
    public void files() throws IOException {
        IO io;
        Node dir;
        Node right;
        String expected;
        String actual;

        io = new IO();
        dir = io.guessProjectHome(getClass()).join("src/test/resources/diff");
        for (Node left : dir.find("*.left")) {
            right = dir.join(Strings.replaceEnd(left.getName(), ".left", ".right"));
            try {
                expected = new Program((FileNode) io.getHome(), "diff", "-u", left.getAbsolute(), right.getAbsolute()).exec();
            } catch (ExitCode e) {
                expected = e.output;
            }
            actual = Diff.diff(left.readString(), right.readString(), true, 3);
            actual = "--- " + file(left) + "+++ " + file(right) + actual;
            assertEquals(left.getPath(), expected, actual);
            // System.out.println(expected);
        }
    }

    private static final SimpleDateFormat FMT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    
    private static String file(Node file) throws GetLastModifiedException {
        // TODO: ms, timezone
        return file.getAbsolute() + "\t" + FMT.format(new Date(file.getLastModified())) + ".000000000 +0200\n";
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
