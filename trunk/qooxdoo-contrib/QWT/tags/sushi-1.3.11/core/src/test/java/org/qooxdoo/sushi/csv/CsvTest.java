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

package org.qooxdoo.sushi.csv;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.io.IOException;
import java.util.Arrays;

import org.junit.Test;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Node;

public class CsvTest {
    private static final Format FMT = new Format();
    private static final IO IO_OBJ = new IO();
    
    @Test
    public void empty() throws IOException {
        check("");
    }

    @Test
    public void oneWithoutNewline() throws IOException {
        check("a", "a");
    }

    @Test
    public void oneWithNewline() throws IOException {
        check("Abc\n", "Abc");
    }

    @Test
    public void two() throws IOException {
        check("a\nbc\r\n\rd\n", 
              "a", "bc", "", "d");
    }

    @Test
    public void twoError() throws IOException {
        String msg;
        int idx;
        
        try {
            check("\"\n\"");
            fail();
        } catch (CsvExceptions e) {
            msg = e.getMessage();
            idx = msg.indexOf("quote not closed");
            assertTrue(idx != -1);
            idx = msg.indexOf("quote not closed", idx + 1);
            assertTrue(idx != -1);
        }
    }

    //--
    
    private Csv read(String str) throws IOException {
        return Csv.read(FMT, node(str));
    }
    
    private Node node(String str) throws IOException {
        return IO_OBJ.stringNode(str);
    }
    
    private void check(String orig, String ... lines) throws IOException {
        Csv csv = read(orig);
        lines(csv, lines);
    }
    
    private void lines(Csv csv, String ... lines) {
        assertEquals(lines.length, csv.size());
        for (int i = 0; i < lines.length; i++) {
            assertEquals(1, csv.get(i).size());
            assertEquals(Arrays.asList(lines[i]), csv.get(i).get(0));
        }
    }
}
