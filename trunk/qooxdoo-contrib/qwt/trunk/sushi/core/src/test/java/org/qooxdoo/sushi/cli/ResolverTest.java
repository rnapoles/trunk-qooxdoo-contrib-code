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

package org.qooxdoo.sushi.cli;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.io.IOException;

import org.junit.Before;
import org.junit.Test;

import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.memory.MemoryNode;

public class ResolverTest {
    private Resolver resolver;
    private MemoryNode root;
    
    @Before
    public void setUp() throws Exception {
        IO io;
        
        io = new IO();
        resolver = new Resolver(io);
        root = MemoryNode.createRoot(io);
        root.join("fsb.xml").writeBytes();
        resolver.add("mem", root);
    }

    @Test
    public void file() throws Exception {
        Node node;
        
        node = resolver.node("notfound");
        assertTrue(node instanceof FileNode);
        assertFalse(node.exists());
        
    }

    @Test
    public void console() throws Exception {
        assertTrue(resolver.node("-") instanceof ConsoleNode);
    }

    @Test
    public void files() throws Exception {
        int count;
        
        count = 0;
        for (String view : resolver.files()) {
            count++;
            assertNotNull(resolver.node(view));
        }
        assertTrue(count > 0);
    }

    //--
    
    @Test
    public void svnExistingExplicit() throws Exception {
        Node node;
        
        node = resolver.node("mem:fsb.xml");
        assertTrue(node instanceof MemoryNode);
        assertTrue(node.exists());
    }
    
    @Test
    public void svnExistingImplicit() throws Exception {
        Node node;
        
        node = resolver.node(":fsb.xml");
        assertTrue(node instanceof MemoryNode);
        assertTrue(node.exists());
    }
    
    @Test
    public void svnNew() throws Exception {
        Node node;
        
        node = resolver.node("mem:nosuchfile");
        assertTrue(node instanceof MemoryNode);
        assertFalse(node.exists());
    }
    
    @Test(expected=IOException.class)
    public void notfound() throws Exception {
        resolver.node(":notfound");
    }
}
