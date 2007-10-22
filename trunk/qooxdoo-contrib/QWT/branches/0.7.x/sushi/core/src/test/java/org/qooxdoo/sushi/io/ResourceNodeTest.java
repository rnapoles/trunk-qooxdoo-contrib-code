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
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.fail;

import org.junit.Test;

public class ResourceNodeTest {
    private static final IO IO = new IO();

    @Test
    public void existing() throws Exception {
        assertEquals("hello", new ResourceNode(IO, "testresource").readString());
    }
    
    @Test
    public void noneExisting() throws Exception {
        assertFalse(new ResourceNode(IO, "nosuchresource").exists());
    }

    @Test
    public void absolutePath() throws Exception {
        try {
            new ResourceNode(IO, "/absolute");
            fail();
        } catch (IllegalArgumentException e) {
            // ok
        }
    }
}

