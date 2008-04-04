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

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.IOException;

import org.junit.Test;
import org.qooxdoo.sushi.cli.ConsoleNode;
import org.qooxdoo.sushi.fs.memory.MemoryNode;

public class FactoryTest {
    private Factory f = new Factory();
    
    @Test
    public void scan() throws IOException {
        assertEquals(0, f.size());
        f.scan();
        assertEquals(5, f.size());
    }

    @Test(expected=IllegalArgumentException.class)
    public void duplicate() throws IOException {
        assertEquals(0, f.size());
        f.add(FileFilesystem.INSTANCE);
        f.add(FileFilesystem.INSTANCE);
    }

    @Test(expected=IllegalArgumentException.class)
    public void unkownClass() throws IOException {
        assertEquals(0, f.size());
        f.add("unkown");
    }
    
    @Test
    public void parse() throws IOException {
        Node node;
        
        f.scan();
        node = f.parse(new IO(), "file:/usr");
        assertEquals("usr", node.getPath());
        node = f.parse(new IO(), "resource:META-INF/sushi/filesystems");
        assertTrue(node.isFile());
        node = f.parse(new IO(), "http:http://heise.de");
        assertTrue(node instanceof HttpNode);
        node = f.parse(new IO(), "console:");
        assertTrue(node instanceof ConsoleNode);
        node = f.parse(new IO(), "mem:/foo");
        assertTrue(node instanceof MemoryNode);
    }
}
