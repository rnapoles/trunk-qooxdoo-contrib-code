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

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

import org.junit.Test;

/** TODO: move more tests into NodeTest */
public class FileNodeTest extends NodeTest {
    private static final IO IO = new IO();
    
    @Override
    protected Node createWork() throws IOException {
        return IO.createTempDirectory();
    }
    
    @Test
    public void constrcutor() throws Exception {
        try {
            new FileNode(IO, new File("foo"));
            fail();
        } catch (IllegalArgumentException e) {
            // ok
        }
    }

    @Test
    public void normalizeSlashAfterDirectory() {
        if (OS.CURRENT == OS.WINDOWS) {
            assertEquals("WINDOWS", IO.node("c:\\WINDOWS\\").getPath());
        } else {
            assertEquals("usr", IO.node("/usr/").getPath());
        }
    }

    @Test
    public void renameFile() throws IOException {
        FileNode src;
        FileNode dest;
        
        src = (FileNode) work.join("src");
        dest = (FileNode) work.join("dest");
        try {
            src.rename(dest);
            fail();
        } catch (FileNotFoundException e) {
            // ok
        }
        src.mkfile();
        src.rename(dest);
        assertFalse(src.exists());
        assertTrue(dest.exists());
        src.mkfile();
        try {
            dest.rename(src);
            fail();
        } catch (IOException e) {
            // ok
        }
    }

    @Test
    public void mkfile() throws IOException {
        FileNode file;
        
        file = (FileNode) work.join("mkfile");
        assertFalse(file.exists());
        file.mkfile();
        assertTrue(file.exists());
        assertTrue(file.isFile());
        try {
            file.mkfile();
            fail();
        } catch (IOException e) {
            // ok
        }
        try {
            file.mkdir();
            fail();
        } catch (IOException e) {
            // ok
        }
        file.delete();
    }
    
    @Test
    public void modeFile() throws IOException {
        checkMode(IO.createTempFile());
    }

    @Test
    public void modeDir() throws IOException {
        checkMode(IO.createTempDirectory());
    }

    private void checkMode(FileNode node) throws IOException {
        if (node.io.os == OS.WINDOWS) {
            return; // TODO
        }
        checkMode(node, 0644);
        checkMode(node, 0700);
        assertTrue(node.getFile().canRead());
        assertTrue(node.getFile().canWrite());
        checkMode(node, 0000);
        assertFalse(node.getFile().canRead());
        assertFalse(node.getFile().canWrite());
        checkMode(node, 0777);
        assertTrue(node.getFile().canRead());
        assertTrue(node.getFile().canWrite());
    }
    
    private void checkMode(FileNode node, int mode) throws IOException {
        node.setMode(mode);
        assertEquals(mode, node.getMode());
    }
    
    //--
    
    @Test
    public void linkNormal() throws IOException {
        FileNode file;
        
        file = IO.createTempFile();
        assertTrue(file.isFile());
        assertFalse(file.isLink());
    }

    @Test
    public void link() throws IOException {
        FileNode orig;
        FileNode link;
        
        if (IO.os == OS.WINDOWS) {
            return;
        }
        orig = IO.createTempFile();
        link = (FileNode) IO.getTemp().join("foo");

        assertTrue(orig.exists());
        assertFalse(link.exists());
        
        orig.link(link);
        assertTrue(link.exists());
        assertTrue(link.isLink());
        
        link.delete();
        assertTrue(orig.exists());
        assertFalse(link.exists());
    }

    @Test
    public void moveDirectory() throws IOException {
        doMove((FileNode) work.join("old").mkdir(), (FileNode) work.join("moved"));
    }

    @Test
    public void moveFile() throws IOException {
        doMove(((FileNode) work.join("old")).mkfile(), (FileNode) work.join("moved"));
    }

    @Test
    public void moveToExistingDir() throws IOException {
        FileNode destdir;
        
        destdir = (FileNode) work.join("subdir").mkdir();
        doMove(((FileNode) work.join("old")).mkfile(), (FileNode) destdir.join("moved"));
    }

    @Test(expected=IOException.class)
    public void moveToNonexistingDir() throws IOException {
        doMove(((FileNode) work.join("old")).mkfile(), (FileNode) work.join("nosuchdir/moved"));
    }

    @Test(expected=IOException.class)
    public void moveOverExisting() throws IOException {
        FileNode dest;
        
        dest = ((FileNode) work.join("moved")).mkfile();
        doMove(((FileNode) work.join("old")).mkfile(), dest);
    }

    @Test(expected=IOException.class)
    public void moveToSame() throws IOException {
        FileNode node;
        
        node = (FileNode) work.join("old").mkdir();
        doMove(node, node);
    }

    private void doMove(FileNode src, FileNode dest) throws IOException {
        src.move(dest);
        src.checkNotExists();
        dest.checkExists();
    }
    
    //--
    
    @Test
    public void filesystem() {
        assertEquals(File.separator, work.fs.separator);
        assertEquals(File.separatorChar, work.fs.separatorChar);
    }
}

