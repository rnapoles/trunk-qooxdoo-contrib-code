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

package org.qooxdoo.sushi.io;

import java.io.IOException;
import java.util.List;

import org.junit.Test;
import static org.junit.Assert.*;
import org.qooxdoo.sushi.util.Reflect;

public class IOTest {
    // TODO
    private static Filesystem fs(IO io) {
        return io.getWorking().fs;
    }
    
    @Test
    public void nodeRoot() {
        IO io;
        FileNode node;
        
        io = new IO();
        node = io.node(fs(io).root);
        assertEquals("", node.getName());
        assertEquals(fs(io).root, node.getAbsolute());
        assertEquals(".", node.getRelative(node));
        assertTrue(node.isDirectory());
    }

    @Test
    public void nodeAbsolute() {
        IO io;
        FileNode node;

        io = new IO();
        node = io.node(fs(io).root + "a");
        assertNull(node.getBase());
        assertEquals("a", node.getName());
        assertEquals("a", node.getPath());
        assertEquals("", node.getParent().getPath());
        assertEquals(fs(io).root + "a", node.toString());
    }

    @Test
    public void nodeAbsoluteSubdir() {
        IO io;
        FileNode node;

        io = new IO();
        node = io.node(fs(io).root + "x" + fs(io).separator + "y");
        assertNull(node.getBase());
        assertEquals("y", node.getName());
        assertEquals("x" + fs(io).separator + "y", node.getPath());
        assertEquals("x", node.getParent().getPath());
        assertEquals(fs(io).root + "x" + fs(io).separator + "y", node.toString());
    }

    
    @Test
    public void nodeRelative() {
        IO io;
        FileNode node;
        
        io = new IO();
        node = io.node("a");
        assertNotNull(node.getBase());
        assertTrue(node.getPath().endsWith(fs(io).separator + "a"));
        assertEquals(io.getWorking(), node.getParent());
        assertEquals("a", node.toString());
    }

    @Test
    public void nodeDot() {
        IO io;
        FileNode dot;

        io = new IO();
        dot = io.node(".");
        assertNotNull(dot.getBase());
        assertEquals(io.getWorking(), dot);
        assertFalse(".".equals(dot.getName()));
    }

    @Test
    public void nodeEmpty() {
        IO io;

        io = new IO();
        assertEquals(io.node(""), io.node("."));
    }

    //

    @Test
    public void path() {
        IO io;
        List<FileNode> path;
        
        io = new IO();
        assertEquals(0, io.path("").size());
        path = io.path("foo" + io.os.listSeparator + fs(io).root + "bar");
        assertEquals(2, path.size());
        assertEquals("foo", path.get(0).toString());
        assertEquals(io.getWorking().fs.root + "bar", path.get(1).toString());
        try {
            io.classpath("nosuchfile.jar");
            fail();
        } catch (IOException e) {
            // ok
        }
    }

    //--

    @Test
    public void locate() throws IOException {
        IO io;
        
        io = new IO();
        io.locateClasspathItem(IO.class).checkDirectory();
        io.locateClasspathItem(Reflect.resourceName(IOTest.class)).checkDirectory();
        io.locateClasspathItem(Object.class).checkFile();
        io.locateClasspathItem("/java/lang/Object.class").checkFile();
        try {
            assertNull(io.locateClasspathItem("/nosuchresource"));
            fail();
        } catch (RuntimeException e) {
            // ok
        }
    }

    @Test
    public void locateRuntime() throws IOException {
        IO io;
        
        io = new IO();
        io.locateClasspathItem("/java/lang/Object.class").checkExists();
    }

    @Test
    public void locateFromJar() throws IOException {
        IO io;
        
        io = new IO();
        io.locateClasspathItem("/org/junit/Test.class").checkExists();
    }

    @Test
    public void projectHome() {
        check(IO.class);
        check(IOTest.class);
    }

    private void check(Class<?> clazz) {
        IO io;
        FileNode home;
        String name;
        
        io = new IO();
        home = io.guessProjectHome(clazz);
        assertNotNull(home);
        name = home.getName();
        try {
            Integer.parseInt(name);
            // when checked-out by continuum ...
            assertTrue(true);
        } catch (NumberFormatException e) {
            // allow pre and suffixes
            assertTrue(name.contains("core") || name.contains("sushi"));
        }
    }
}
