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

package org.qooxdoo.toolkit.engine;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.fail;

import org.junit.Test;
import org.qooxdoo.toolkit.engine.MimeTypes;

public class MimeTypeTest {
    @Test
    public void normal() throws Exception {
        MimeTypes mt = MimeTypes.create();
        
        assertEquals("text/xml", mt.get("foo.xml"));
        assertNotNull(mt.get("foo.html"));
        assertNotNull(mt.get("foo.gif"));
        assertNotNull(mt.get("bar.png"));
        try {
            mt.get("foo.nosuchext");
            fail();
        } catch (IllegalArgumentException e) {
            // ok
        }
    }

}
