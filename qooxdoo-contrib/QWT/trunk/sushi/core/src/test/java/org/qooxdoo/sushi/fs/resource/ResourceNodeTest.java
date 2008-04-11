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

package org.qooxdoo.sushi.fs.resource;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;

import org.junit.Test;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.LocatorException;

public class ResourceNodeTest {
    private static final IO IO_OBJ = new IO();
    
    @Test
    public void existing() throws Exception {
        assertEquals("hello", IO_OBJ.node("resource:testresource").readString());
    }
    
    @Test
    public void noneExisting() throws Exception {
        assertFalse(IO_OBJ.node("resource:nosuchresource").exists());
    }

    @Test(expected=LocatorException.class)
    public void absolutePath() throws Exception {
        IO_OBJ.node("resource:/absolute");
    }
}

