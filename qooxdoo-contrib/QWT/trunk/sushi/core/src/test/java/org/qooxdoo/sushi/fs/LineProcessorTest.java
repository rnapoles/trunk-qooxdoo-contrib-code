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

package org.qooxdoo.sushi.fs;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.junit.Test;
import static org.junit.Assert.*;

public class LineProcessorTest {
    IO io = new IO();
    
    @Test
    public void empty() throws IOException {
        check("");
    }

    @Test
    public void one() throws IOException {
        check("abc\n", "abc");
    }

    @Test
    public void oneWithoutNewline() throws IOException {
        check("ab", "ab");
    }

    @Test
    public void two() throws IOException {
        check("abc\n\n123\n", "abc", "", "123");
    }

    @Test
    public void longline() throws IOException {
        String ll = "1234567890abcdefghijklmnopqrstuvwxyz";
        
        ll = ll + ll + ll;
        check(ll + "\n" + ll, ll, ll);
    }

    @Test
    public void comment() throws IOException {
        LineCollector collector;
        List<String> result;
        
        collector = new LineCollector(100, true, false, "//");
        result = collector.collect(io.stringNode("first\n // \n\n//comment\nlast"));
        assertEquals(Arrays.asList("first", "last"), result);
    }

    //--
    
    private void check(String str, String ... expected) throws IOException {
        check(1024, str, expected);
        check(10, str, expected);
        check(1, str, expected);
    }

    private void check(int initialSize, String str, String ... expected) throws IOException {
        LineCollector collector;
        List<String> result;
        
        collector = new LineCollector(initialSize, false, true, null);
        result = collector.collect(io.stringNode(str));
        assertEquals(Arrays.asList(expected), result);
        assertEquals(expected.length + 1, collector.getLine());
    }
}
