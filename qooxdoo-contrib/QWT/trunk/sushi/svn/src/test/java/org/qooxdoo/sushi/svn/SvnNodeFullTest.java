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

package org.qooxdoo.sushi.svn;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.junit.BeforeClass;
import org.junit.Test;
import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.io.NodeTest;
import org.tmatesoft.svn.core.SVNException;
import org.tmatesoft.svn.core.SVNURL;
import org.tmatesoft.svn.core.io.SVNRepositoryFactory;

public class SvnNodeFullTest extends NodeTest {
    // created manually with 
    //    emerge --config =dev-util/subversion-1.3.1
    // (see http://gentoo-wiki.com/HOWTO_Subversion)
    private static SVNURL URL;

    @BeforeClass
    public static void setUpClass() throws Exception {
        Node repo;

        repo = IO.guessProjectHome(SvnNodeFullTest.class).join("target/svnrepo");
        repo.deleteOpt();
        URL = SVNRepositoryFactory.createLocalRepository(new File(repo.getAbsolute()), null, true, true, true);
    }
    
    @Override
    public Node createWork() throws IOException {
        SvnNode node;

        try {
            node = SvnNode.create(IO, URL + "/work");
            node.deleteOpt();
            node.mkdir();
            return node;
        } catch (SVNException e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    public void path() throws SVNException {
        assertEquals("", SvnNode.create(IO, URL.toString()).getPath());
        // assertEquals("test", SvnNode.create(IO, TEST).getPath());
        assertEquals("work", work.getPath());
    }
 
    @Test
    public void invalid() throws SVNException {
        try {
            SvnNode.create(IO, URL + "/tailingslash/");
            fail();
        } catch (IllegalArgumentException e) {
            // ok
        }
    }
 
    @Test
    public void connectionRefused() throws SVNException {
        try {
            SvnNode.create(IO, "https://heise.de/svn");
            fail();
        } catch (SVNException e) {
            // ok
        }
    }

    @Test
    public void revisions() throws SVNException {
        SvnNode root;
        long rootRevision;
        long fileRevision;
        
        root = SvnNode.create(IO, URL.toString());
        rootRevision = root.getLatestRevision();
        fileRevision = ((SvnNode) root.join("work")).getLatestRevision();
        assertTrue(fileRevision <= rootRevision);
    }

    @Test
    public void find() throws SVNException, IOException {
        SvnNode root;
        List<Node> lst;
        
        root = SvnNode.create(IO, URL.toString());
        lst = IO.filter().include("*").collect(root);
        assertEquals(1, lst.size());
    }
    
    @Test
    public void log() throws Exception {
        final String comment = "my comment";
        SvnNode root;
        long revision;
        
        root = (SvnNode) work;
        revision = ((SvnNode) root.join("file")).save("welcome".getBytes(), comment);
        assertTrue(root.changelog(revision, "viewsvn").contains(comment));
    }
    
    @Test
    public void export() throws IOException, SVNException {
        SvnNode root;
        FileNode dir;
        
        root = (SvnNode) work;
        root.join("file").writeString("foo");
        root.join("dir").mkdir().join("sub").writeString("bar");
        root.join("dir/dir1/dir2").mkdirs();
        root.join("dir/dir1/dir2").join("sub1").writeString("baz");

        dir = work.io.createTempDirectory();
        root.export(dir);
        assertEquals("foo", dir.join("file").readString());
        assertEquals("bar", dir.join("dir/sub").readString());
        assertEquals("baz", dir.join("dir/dir1/dir2/sub1").readString());

        dir = work.io.createTempDirectory();
        ((SvnNode) root.join("dir")).export(dir);
        assertEquals("bar", dir.join("sub").readString());

        dir = work.io.createTempDirectory();
        ((SvnNode) root.join("dir/dir1/dir2")).export(dir);
        assertEquals("baz", dir.join("sub1").readString());
    }

    // TODO: application doesn't work ...
    @Test
    public void exportLongPath() throws IOException, SVNException {
        Node dir;
        SvnNode svn;
        
        dir = IO.createTempDirectory();
        svn = SvnNode.create(IO, "https://qooxdoo-contrib.svn.sourceforge.net/svnroot/qooxdoo-contrib/trunk/qooxdoo-contrib/QWT/branches/0.7.x");
        svn.export(dir);
    }
}
