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
import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.net.URL;

import org.junit.Test;

/** Accesses external hosts and might need proxy configuration => Full test */
public class HttpNodeFullTest {
    private IO io = new IO();
    
    @Test
    public void normal() throws IOException {
        URL url;
        HttpNode node;
        
        url = new URL("http://qooxdoo.org/documentation/0.7");
        node = new HttpNode(io, url);
        assertEquals("documentation/0.7", node.getPath());
        assertTrue(node.isFile());
        assertTrue(node.exists());
        assertTrue(node.readString().length() > 1);
        assertEquals("documentation", node.getParent().getPath());
        assertEquals("", node.getParent().getParent().getPath());
    }

    @Test
    public void jarUrl() {
        URL url;
        HttpNode node;
        
        url = getClass().getResource("/java/lang/Object.class");
        assertEquals("jar", url.getProtocol());
        node = new HttpNode(io, url);
        assertEquals(url.toString().substring(4), node.getPath());
        assertTrue(node.exists());
        assertTrue(node.isFile());
        assertTrue(node.getParent().getPath().endsWith("/java/lang"));
        node = (HttpNode) node.getParent().join("Object.class");
        assertTrue(node.exists());
    }

    @Test
    public void ampersand() throws IOException {
        URL url;
        
        url = new URL("http://www.heise.de/?b=1&c=d");
        assertTrue(new HttpNode(io, url).readString().length() > 1); 
    }
}

