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

package org.qooxdoo.sushi.ssh;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.io.IOException;
import java.util.Date;

import org.junit.Test;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.io.NodeTest;

import com.jcraft.jsch.JSchException;

public class SshNodeFullTest extends NodeTest {
    @Override
    protected Node createWork() throws IOException {
        SshNode node;
        
        try {
            node = create("tmp/sushifullworkdir");
            if (node.exists()) {
                node.delete();
            }
            node.mkdir();
            return node;
        } catch (JSchException e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    public void root() throws Exception {
        SshNode root;
        
        root = create("");
        assertEquals("", root.getPath());
        assertEquals("", root.getName());
        assertTrue(root.children().length > 0);
    }

    private SshNode create(String path) throws IOException, JSchException {
        Host host;
        
        host = new Host("localhost", User.withUserKey(IO));
        return new SshNode(IO, host, path);
    }
}
