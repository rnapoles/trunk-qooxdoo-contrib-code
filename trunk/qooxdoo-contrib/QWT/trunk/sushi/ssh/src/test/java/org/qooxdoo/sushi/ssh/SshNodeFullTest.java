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

import java.io.IOException;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.io.NodeTest;

import com.jcraft.jsch.JSchException;

public class SshNodeFullTest extends NodeTest {
    private static Connection connection;
    
    @BeforeClass
    public static void start() throws Exception {
        connection = ConnectionFullTest.open();
    }

    @AfterClass
    public static void stop() throws Exception {
        if (connection != null) {
            connection.close();
        }
    }
    
    private SshNode create(String path) throws IOException, JSchException {
        return new SshNode(IO, connection, path);
    }

    @Override
    protected Node createWork() throws IOException {
        SshNode node;
        
        try {
            node = create("tmp/sushisshworkdir");
            node.deleteOpt();
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
        assertTrue(root.list().length > 0);
    }
}
