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

    //--
    
    private void check(String str, String ... expected) throws IOException {
        LineCollector c;
        List<String> result;
        
        c = new LineCollector();
        result = c.collect(io.stringNode(str));
        assertEquals(Arrays.asList(expected), result);
    }
}
