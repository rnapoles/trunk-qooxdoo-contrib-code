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

package org.qooxdoo.sushi.compiler;

import org.qooxdoo.sushi.misc.GenericException;

import java.io.File;
import junit.framework.TestCase;

public class JobTest extends TestCase {
    private Job a;
    private Job b;

    public void testFields() throws GenericException {
        a = new Job(".", false, "a");
        assertEquals(new File("a"), a.source);
        assertEquals(new File("."), a.outputPath);
        assertNull(a.listing);
    }

    public void testListing() throws GenericException {
        a = new Job(null, true, "a");
        assertNotNull(a.listing);
        assertTrue(!a.listing.equals(a.source));
        assertTrue(a.listing.getName().endsWith(Job.LST_SUFFIX));

        a = new Job(null, true, "a.xy");
        assertNotNull(a.listing);
        assertTrue(!a.listing.equals(a.source));
        assertTrue(a.listing.getName().endsWith(Job.LST_SUFFIX));

        a = new Job(null, true, "a" + Job.LST_SUFFIX);
        assertNotNull(a.listing);
        assertTrue(!a.listing.equals(a.source));
        assertTrue(a.listing.getName().endsWith(Job.LST_SUFFIX));
    }

    public void testEqual() throws GenericException {
        a = new Job("a");
        b = new Job("a");
        assertEquals(a, b);

        a = new Job(null, true, "a");
        b = new Job(null, true, "a");
        assertEquals(a, b);

        a = new Job(".", true, "a");
        b = new Job(".", true, "a");
        assertEquals(a, b);
    }

    public void testOutputDiff() throws GenericException {
        a = new Job(".", true, "a");
        b = new Job(new File(".").getParent(), true, "a");
        assertTrue(!a.equals(b));

        a = new Job(".", true, "a");
        b = new Job(null, true, "a");
        assertTrue(!a.equals(b));

        a = new Job(null, true, "a");
        b = new Job(".", true, "a");
        assertTrue(!a.equals(b));
    }

    public void testSourceDiff() throws GenericException {
        a = new Job("a");
        b = new Job("b");
        assertTrue(!a.equals(b));
    }

    public void testFlagDiff() throws GenericException {
        a = new Job(null, true, "a");
        b = new Job(null, false, "a");
        assertTrue(!a.equals(b));
    }
}
