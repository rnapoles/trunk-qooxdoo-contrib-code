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

import java.io.IOException;
import java.util.List;

import org.junit.Test;
import static org.junit.Assert.*;
import org.tmatesoft.svn.core.SVNException;

import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.io.NodeTest;

@org.junit.Ignore // TODO
public class SvnNodeFullTest extends NodeTest {
    // created manually with 
    //    emerge --config =dev-util/subversion-1.3.1
    // (see http://gentoo-wiki.com/HOWTO_Subversion)
    private static final String ROOT = "file:////var/svn/repos";
    private static final String TEST = ROOT + "/test";

    @Override
    public Node createWork() throws IOException {
        SvnNode node;

        try {
            node = SvnNode.create(IO, TEST + "/work");
            node.deleteOpt();
            node.mkdir();
            return node;
        } catch (SVNException e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    public void path() throws SVNException {
        assertEquals("", SvnNode.create(IO, ROOT).getPath());
        assertEquals("test", SvnNode.create(IO, TEST).getPath());
        assertEquals("test/work", work.getPath());
    }
 
    @Test
    public void invalid() throws SVNException {
        try {
            SvnNode.create(IO, TEST + "/");
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
        
        root = SvnNode.create(IO, TEST);
        rootRevision = root.getLatestRevision();
        fileRevision = ((SvnNode) root.join("work")).getLatestRevision();
        assertTrue(fileRevision <= rootRevision);
    }

    @Test
    public void find() throws SVNException, IOException {
        SvnNode root;
        List<Node> lst;
        
        root = SvnNode.create(IO, TEST);
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
}
