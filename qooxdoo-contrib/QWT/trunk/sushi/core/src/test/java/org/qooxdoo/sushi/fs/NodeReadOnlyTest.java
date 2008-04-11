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
import static org.junit.Assert.assertNull;

import java.io.IOException;

import org.junit.Before;
import org.junit.Test;
import org.qooxdoo.sushi.io.Buffer;
import org.qooxdoo.sushi.io.OS;

public abstract class NodeReadOnlyTest {
    protected static final IO IO = new IO(OS.CURRENT, new Settings(), new Buffer(), "**/.svn/**/*");
    
    /** creates a new empty directory */
    protected abstract Node createWork() throws IOException;

    protected Node work;
    protected String sep;
    
    @Before
    public void setUp() throws Exception {
        work = createWork();
        sep = work.getRoot().getFilesystem().getSeparator();
    }

    @Test
    public void locator() throws Exception {
        String locator;
        Node again;
        Filesystem fs;
        
        fs = work.getRoot().getFilesystem();
        locator = work.getLocator();
        assertEquals(locator, fs.getName() + ":" + work.getIO().node(fs.getName() + 
                ":" + work.getRoot().getId() + work.getPath()));
        again = IO.node(locator);
        assertEquals(work, again);
        assertEquals(locator, again.getLocator());
    }

    @Test
    public void rootCreatesNodeWithoutBase() throws Exception {
        assertNull(work.getRoot().node("foo").getBase());
    }
    
    @Test
    public void base() throws Exception {
        Node node;

        work.setBase(work);
        assertEquals(work, work.getBase());
        node = work.join("subdir");
        assertEquals(work, node.getBase());
    }

    @Test(expected=LocatorException.class)
    public void headingSlash() throws Exception {
        Filesystem fs;
        
        fs = work.getRoot().getFilesystem();
        work.getIO().node(fs.getName() + ":" + work.getRoot().getId() + fs.getSeparator() + work.getPath());
    }

    @Test(expected=LocatorException.class)
    public void tailingSlash() throws Exception {
        Filesystem fs;
        
        fs = work.getRoot().getFilesystem();
        work.getIO().node(fs.getName() + ":" + work.getRoot().getId() + work.getPath() + fs.getSeparator());
    }

    @Test
    public void rootCreatedNodeWithoutBase() throws Exception {
        Node node;
        
        node = work.getRoot().node("foo");
        assertNull(node.getBase());
    }
}
