// §{{header}}:
//
// This is file tests/junit/de/mlhartme/mork/compiler/JobTest.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.compiler;

import de.mlhartme.mork.util.GenericException;
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
