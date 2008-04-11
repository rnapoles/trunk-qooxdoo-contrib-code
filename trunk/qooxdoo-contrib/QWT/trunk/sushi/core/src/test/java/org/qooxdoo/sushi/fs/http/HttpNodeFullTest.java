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

package org.qooxdoo.sushi.fs.http;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.IOException;

import org.junit.Ignore;
import org.junit.Test;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.fs.NodeReadOnlyTest;

/** Accesses external hosts and might need proxy configuration => Full test */
public class HttpNodeFullTest extends NodeReadOnlyTest {
    @Test
    public void normal() throws IOException {
        HttpNode node;
    
        node = (HttpNode) IO.node("http://englishediting.de/index.html");
        assertTrue(node.isFile());
        assertTrue(node.exists());
        assertTrue(node.readString().length() > 1);
        assertEquals("//englishediting.de/", node.getRoot().getId());
        assertEquals("index.html", node.getPath());
        assertEquals("", node.getParent().getPath());
    }

    @Test
    public void node() throws IOException {
        String url;
        HttpNode node;
    
        url = "http://englishediting.de/index.html";
        node = (HttpNode) IO.node(url);
        assertEquals("index.html", node.getPath());
        assertEquals(url, node.getUrl().toString());
    }

    @Ignore // TODO
    public void ampersand() throws IOException {
        HttpNode node;

        node = (HttpNode) IO.node("http://www.heise.de/?b=1&c=d");
        assertEquals("", node.getPath());
        assertEquals("b=1&c=d", node.getUrl().getQuery());
        assertTrue(node.readString().length() > 1); 
        node = (HttpNode) node.join("foo");
        // overwrite query!
        assertEquals("foo", node.getPath());
        assertEquals("foo", node.getUrl().getPath());
        assertEquals(null, node.getUrl().getQuery());
    }

    @Override
    protected Node createWork() throws IOException {
        return IO.node("http://englishediting.de/foo");
    }
}

