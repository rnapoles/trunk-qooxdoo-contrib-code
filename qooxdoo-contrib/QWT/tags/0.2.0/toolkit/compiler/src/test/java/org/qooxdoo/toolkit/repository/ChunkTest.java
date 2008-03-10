/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2007 1&1 Internet AG, Germany, http://www.1and1.org
   
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
   
   Authors:
     * Michael Hartmeier (mlhartme)
   
 ************************************************************************ */

package org.qooxdoo.toolkit.repository;

import java.util.Arrays;
import java.util.List;

import org.junit.Test;
import static org.junit.Assert.*;

public class ChunkTest {
    @Test
    public void fromEmpty() {
        assertEquals(0, Chunk.fromString("").size());
    }
    @Test
    public void reject() {
        try {
            Chunk.fromString("\n");
            fail();
        } catch (RepositoryException e) {
            // ok
        }
    }
    @Test
    public void fromOne() {
        List<Chunk> chunks;
        Chunk chunk;
        
        chunks = Chunk.fromString("//++ foxy lady []\n");
        assertEquals(1, chunks.size());
        chunk = chunks.get(0);
        assertEquals("[]", chunk.deps.toString());
        assertEquals("foxy", chunk.name);
        assertEquals(Arrays.asList("lady"), chunk.vnames);
        assertEquals("", chunk.getCode());
    }

    @Test
    public void fromTwo() {
        List<Chunk> chunks;
        Chunk chunk;
        
        chunks = Chunk.fromString("//++ my.module []\n//++second[ab] \nxyz\n");
        assertEquals(2, chunks.size());
        chunk = chunks.get(1);
        assertEquals("[ab]", chunk.deps.toString());
        assertEquals("xyz\n", chunk.getCode());
        assertEquals("second", chunk.name);
        assertEquals(0, chunk.vnames.size());
    }

    @Test
    public void toStrinG() {
        assertEquals("//++ foo.bar xy 12 []\n", new Chunk("foo.bar", Arrays.asList("xy", "12"), new Dependencies(), "").toString());
        assertEquals("//++ xy []\n\n1", new Chunk("xy", "\n1").toString());
    }
}
