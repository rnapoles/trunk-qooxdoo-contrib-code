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

import java.io.IOException;

import org.junit.Before;
import org.junit.Test;
import org.qooxdoo.sushi.io.Buffer;
import org.qooxdoo.sushi.io.OS;
import org.qooxdoo.sushi.xml.Xml;

public abstract class NodeReadOnlyTest {
    protected static final IO IO = new IO(OS.CURRENT, new Settings(), new Buffer(), new Xml(), "**/.svn/**/*");
    
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
        
        locator = work.getLocator();
        again = IO.node(locator);
        assertEquals(work, again);
        assertEquals(locator, again.getLocator());
    }
}
