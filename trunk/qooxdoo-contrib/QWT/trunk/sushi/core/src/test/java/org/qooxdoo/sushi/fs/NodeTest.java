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
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertSame;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.qooxdoo.sushi.io.Buffer;
import org.qooxdoo.sushi.io.OS;
import org.qooxdoo.sushi.xml.Xml;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;

public abstract class NodeTest {
    protected static final IO IO = new IO(OS.CURRENT, new Settings(), new Buffer(), 3, new Xml(), "**/.svn/**/*");
    
    /** creates a new empty directory */
    protected abstract Node createWork() throws IOException;

    protected Node work;
    protected String sep;
    
    @Before
    public void setUp() throws Exception {
        work = createWork();
        sep = work.getRoot().separator;
    }
    
    @Test
    public void work() throws IOException {
        List<?> children;
        
        assertNull(work.getBase());
        assertTrue(work.exists());
        assertFalse(work.isFile());
        assertTrue(work.isDirectory());
        children = work.list();
        assertNotNull(children);
        assertEquals(0, children.size());
    }
    
    //--

    @Test
    public void joinWithSlash() {
        try {
            work.join(sep, "a");
            fail();
        } catch (IllegalArgumentException e) {
            // ok
        }
    }
    
    @Test
    public void parent() {
        assertEquals(work, work.join("a").getParent());
        assertEquals("a", work.join("a/b").getParent().getName());
    }

    @Test
    public void anchestor() {
        Node file;
        
        file = work.join("foo/bar");
        assertFalse(file.hasAnchestor(file));
        assertTrue(file.hasAnchestor(file.getParent()));
        assertTrue(file.hasAnchestor(work));
    }

    @Test
    public void relative() {
        Node parent;
        Node file;
        
        parent = work.join("foo");
        file = parent.join("bar");
        assertEquals(".", file.getRelative(file));
        assertEquals("bar", file.getRelative(parent));
        assertEquals("foo" + sep + "bar", file.getRelative(work));
        assertEquals(".." + sep + "foo" + sep + "bar", file.getRelative(work.join("baz")));
        assertEquals(".." + sep + "bar", file.getRelative(work.join("foo/baz")));
    }

    @Test
    public void nameAndPath() throws IOException {
        Node node;
        
        node = work.join("foo");
        assertFalse(node.exists());
        assertTrue(node.getPath().endsWith("foo"));
        assertEquals("foo", node.getName());
        node = work.join("a/b");
        assertFalse(node.exists());
        assertTrue(node.getPath().endsWith("a" + sep + "b"));
        assertEquals("b", node.getName());
        node = work.join("x/y/z");
        assertFalse(node.exists());
        assertTrue(node.getPath().endsWith("x" + sep + "y" + sep + "z"));
        assertEquals("z", node.getName());
    }
    
    @Test
    public void hidden() throws IOException {
        List<? extends Node> files;
        
        work.join(".dotfile").writeString("foo");
        files = work.list();
        assertEquals(1, files.size());
        assertEquals(".dotfile", files.get(0).getName());
    }

    //-- status methods: exists, isFile, isDirectory
    
    @Test
    public void statusFile() throws IOException {
        Node file;
        
        file = work.join("foo");
        assertFalse(file.exists());
        assertFalse(file.isFile());
        assertFalse(file.isDirectory());
        file.writeBytes();
        assertTrue(file.exists());
        assertTrue(file.isFile());
        assertFalse(file.isDirectory());
        file.delete();
        assertFalse(file.exists());
        assertFalse(file.isFile());
        assertFalse(file.isDirectory());
    }

    @Test
    public void statusDirectory() throws IOException {
        Node dir;
        
        dir = work.join("foo");
        assertFalse(dir.exists());
        assertFalse(dir.isFile());
        assertFalse(dir.isDirectory());
        dir.mkdir();
        assertTrue(dir.exists());
        assertFalse(dir.isFile());
        assertTrue(dir.isDirectory());
        dir.delete();
        assertFalse(dir.exists());
        assertFalse(dir.isFile());
        assertFalse(dir.isDirectory());
    }

    //--
    
    @Test
    public void childrenOfFile() throws IOException {
        Node file;
        
        file = work.join("foo").writeBytes();
        assertTrue(file.isFile());
        assertNull(file.list());
    }

    //
    
    @Test
    public void modified() throws Exception {
        Node file;
        long modified;
        
        file = work.join("file");
        file.writeBytes();
        sameTime(file.getLastModified(), System.currentTimeMillis());
        modified = System.currentTimeMillis() - 1000 * 60 * 5;
        try {
            file.setLastModified(modified);
        } catch (SetLastModifiedException e) {
            // setLastModified is not supported - ignore
            return;
        }
        sameTime(modified, file.getLastModified());
    }
    private static void sameTime(long left, long right) {
        if (Math.abs(left - right) > 2000) {
            fail("expected: " + time(left) + ", got " + time(right));
        }
    }
    private static String time(long time) {
        return time + " (" + new Date(time) + ")";
    }

    //-- read/write
    
    @Test
    public void readNonexisting() throws IOException {
        Node file;
        
        file = work.join("doesnotexist");
        assertFalse(file.exists());
        try {
            file.createInputStream();
            fail();
        } catch (FileNotFoundException e) {
            // ok
        }
    }

    @Test
    public void readDirectory() throws IOException {
        Node dir;
        
        dir = work.join("dir");
        dir.mkdir();
        assertTrue(dir.isDirectory());
        try {
            dir.createInputStream();
            fail();
        } catch (FileNotFoundException e) {
            // ok
        }
    }

    @Test
    public void readEmpty() throws IOException {
        Node file;
        byte[] data;
        byte[] data1 = {};
        
        file = work.join("foo").writeBytes(data1);
        data = file.readBytes();
        assertEquals(0L, file.length());
        assertNotNull(data);
        assertEquals(0, data.length);
    }

    @Test
    public void readNormal() throws IOException {
        Node file;
        
        file = work.join("foo").writeString("some data");
        assertEquals("some data", file.readString());
        assertEquals(9L, file.length());
        // read again
        assertEquals("some data", file.readString());
    }

    @Test
    public void readerWriter() throws IOException {
        Node file;
        NodeWriter writer;
        NodeReader reader;
        
        file = work.join("foo");
        writer = file.createWriter();
        assertSame(file, writer.getNode());
        writer.write("hi");
        writer.close();
        
        reader = file.createReader();
        assertSame(file, reader.getNode());
        assertEquals((int) 'h', reader.read());
        assertEquals((int) 'i', reader.read());
        assertEquals(-1, reader.read());
        reader.close();
    }

    @Test
    public void readWriteString() throws IOException {
        Node file;
        
        file = work.join("foo");
        file.writeString("");
        assertTrue(file.exists());
        assertEquals("", file.readString());
        file.writeString("more");
        assertEquals("more", file.readString());
    }

    @Test
    public void readWriteObject() throws IOException, ClassNotFoundException {
        final String obj = "hello";
        Node file;

        file = work.join("foo");
        file.writeObject(obj);
        assertTrue(file.exists());
        assertFalse(obj.equals(file.readString()));
        assertEquals(obj, file.readObject());
    }

    @Test
    public void readWriteLines() throws IOException {
        final String[] data = { "", " ", "a", "\t a\r", "hello, world" };
        Node file;

        file = work.join("foo");
        file.writeLines(data);
        assertEquals(Arrays.asList(data), file.readLines());
    }

    @Test
    public void readWriteXml() throws IOException, SAXException {
        Document doc;
        Node file;

        doc = IO.xml.builder.literal("<a><b/></a>");        
        file = work.join("foo");
        file.writeXml(doc);
        assertEquals(IO.settings.join("<a>", "<b/>", "</a>", ""), file.readString());
        doc = file.readXml();
        assertEquals("a", doc.getDocumentElement().getLocalName());
    }

    @Test
    public void writeToNonexistingDirectory() throws IOException {
        try {
            work.join("nosuchdir/file").writeString("");
            fail();
        } catch (IOException e) {
            // ok
        }
    }
    
    @Test
    public void mkdirToNonexistingDirectory() throws IOException {
        try {
            work.join("nosuchdir/file").mkdir();
            fail();
        } catch (IOException e) {
            // ok
        }
    }

    //-- mkdir
    
    @Test
    public void mkdir() throws IOException {
        Node dir;
        
        dir = work.join("dir");
        assertSame(dir, dir.mkdir());
        assertTrue(dir.exists());
        assertFalse(dir.isFile());
        assertTrue(dir.isDirectory());
    }

    @Test
    public void mkdirsOnExisting() throws IOException {
        try {
            work.mkdirs();
            fail();
        } catch (IOException e) {
            // ok
        }
    }
    
    @Test
    public void mkdirs() throws IOException {
        Node dir;
        
        dir = work.join("dir/sub");
        dir.mkdirs();
        assertTrue(dir.isDirectory());
        try {
            dir.mkdirs();
            fail();
        } catch (IOException e) {
            // ok
        }
        assertTrue(dir.isDirectory());
    }

    @Test
    public void mkdirsOpt() throws IOException {
        Node dir;
        
        dir = work.join("dir/sub");
        dir.mkdirsOpt();
        assertTrue(dir.isDirectory());
        dir.mkdirsOpt();
        assertTrue(dir.isDirectory());
    }

    //-- delete method
    
    @Test
    public void deleteFile() throws IOException {
        Node node;
        byte[] data = {};
        
        node = work.join("myfile");
        try {
            node.delete();
            fail();
        } catch (DeleteException e) {
            // ok
        }
        node.writeBytes(data);
        node.delete();
        assertFalse(node.exists());
        try {
            node.delete();
            fail();
        } catch (DeleteException e) {
            assertTrue(e.getCause() instanceof FileNotFoundException);
        }
    }

    @Test
    public void deleteDirectory() throws IOException {
        Node dir;
        Node child;
        
        dir = work.join("mydir");
        try {
            dir.delete();
            fail();
        } catch (DeleteException e) {
            // ok
        }
        dir.mkdir();
        child = dir.join("file").writeBytes();

        dir.delete();
        assertFalse(dir.exists());
        assertFalse(child.exists());
        try {
            dir.delete();
            fail();
        } catch (DeleteException e) {
            assertTrue(e.getCause() instanceof FileNotFoundException);
        }
    }

    //-- other ops

    @Test 
    public void gzip() throws IOException {
        final String str = "1234567890abc";
        Node normal;
        Node gzip;
        Node gunzip;

        normal = work.join("foo");
        gzip = work.join("foo.gz");
        gunzip = work.join("foo.gunzip");

        normal.writeString(str);
        normal.gzip(gzip);
        assertTrue(normal.diff(gzip));
        gzip.gunzip(gunzip);
        assertFalse(normal.diff(gunzip));
        assertEquals(str, gunzip.readString());
    }
    
    @Test
    public void md5() throws IOException {
        Node a;
        String digest;
        
        a = work.join("a");
        a.writeBytes();
        digest = a.md5();
        // string was computed my md5sum: 
        assertEquals("d41d8cd98f00b204e9800998ecf8427e", digest);
        a.writeBytes((byte) 0);
        assertFalse(a.equals(a.md5()));
    }

    @Test
    public void diff() throws IOException {
        Node left = work.join("left");
        Node right = work.join("right");
        left.writeString("a");
        right.writeString("a");
        assertFalse(left.diff(right));
        right.writeString("b");
        assertTrue(left.diff(right));
    }

    //-- copy
    
    @Test
    public void copyFile() throws IOException {
        Node a;
        Node b;
        
        a = work.join("a");
        b = work.join("b");
        a.writeString("xy");
        assertFalse(b.exists());
        a.copyFile(b);
        assertTrue(b.exists());
        assertEquals("xy", b.readString());
        a.writeString("123");
        a.copyFile(b);
        assertEquals("123", b.readString());
    }

    @Test
    public void copyDirectory() throws IOException {
        Node src;
        Node dest;
        
        src = work.join("src").mkdir();
        src.join("a").writeString("A");
        src.join("b").writeString("B");
        src.join("dir").mkdir();
        dest = work.join("dest");
        dest.mkdir();
        assertEquals(2, src.copyDirectory(dest).size());
        assertEquals("A", dest.join("a").readString());
        assertEquals("B", dest.join("b").readString());
        dest.join("dir").checkDirectory();
    }
    
    @Test
    public void lastModified() throws IOException {
        long last;
        Node node;
        
        node = work.join("foo").writeString("ab");
        last = node.getLastModified();
        assertTrue(last <= System.currentTimeMillis());
        node.readString();
        assertEquals(last, node.getLastModified());
        node.writeString("");
        assertTrue(node.getLastModified() >= last);
        assertTrue(node.getLastModified() <= System.currentTimeMillis());
    }
    
    //-- Object methods
    
    @Test
    public void equal() throws IOException {
        assertEquals(work, work.join());
        assertEquals(work.join("a"), work.join("a"));
        assertEquals(work.join("no/such/file"), work.join("no/such/file"));
        assertFalse(work.equals(work.join("a")));
        assertFalse(work.join("a").equals(work.join("b")));
    }

    @Test
    public void toStr() throws IOException {
        Node file;
        
        file = work.join("foo");
        assertEquals(file.getRoot().id + file.getPath(), file.toString());
    }
}
