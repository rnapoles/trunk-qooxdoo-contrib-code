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

package org.qooxdoo.sushi.io;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.IOException;

import org.junit.Test;

public class FactoryTest {
    private Factory f = new Factory();
    
    @Test
    public void scan() throws IOException {
        assertEquals(0, f.size());
        f.scan();
        assertEquals(2, f.size());
    }

    @Test(expected=IllegalArgumentException.class)
    public void duplicate() throws IOException {
        assertEquals(0, f.size());
        f.add(new FileFilesystem());
        f.add(new FileFilesystem());
    }

    @Test(expected=IllegalArgumentException.class)
    public void unkownClass() throws IOException {
        assertEquals(0, f.size());
        f.add("unkown");
    }
    
    @Test
    public void parse() throws IOException {
        Node node;
        
        f.scan();
        node = f.parse(new IO(), "file:/usr");
        assertEquals("usr", node.getPath());
        node = f.parse(new IO(), "resource:META-INF/sushi/filesystems");
        assertTrue(node.isFile());
    }
}
