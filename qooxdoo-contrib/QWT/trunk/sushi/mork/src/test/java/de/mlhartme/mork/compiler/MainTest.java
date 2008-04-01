// §{{header}}:
//
// This is file tests/junit/de/mlhartme/mork/compiler/MainTest.java,
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
import junit.framework.TestCase;

/**
 * Test parsing command line options.
 */
public class MainTest extends TestCase {
    private Main main;
    private Job[] jobs;
    private Output output;

    @Override
    protected void setUp() throws Exception {
        super.setUp();

        output = new Output();
        output.normal = null;
        main = new Main(output);
        jobs = null;
    }

    public void testHelp() {
        assertEquals(Main.HELP, main.run(new String[] {}));
        assertEquals(Main.HELP, main.run(new String[] { "-help" }));
    }

    public void testNoJobForHelp() throws GenericException {
        jobs = main.parseOptions(new String[] { "-help" });
        assertEquals(0, jobs.length);
    }

    public void testOneJob() throws GenericException {
        jobs = main.parseOptions(new String[] { "a" });
        assertEquals(1, jobs.length);
        assertEquals(new Job("a"), jobs[0]);
    }

    public void testTwoJobs() throws GenericException {
        jobs = main.parseOptions(new String[] { "a", "b" });
        assertEquals(2, jobs.length);
        assertEquals(new Job("a"), jobs[0]);
        assertEquals(new Job("b"), jobs[1]);
    }

    public void testListing() throws GenericException {
        jobs = main.parseOptions(new String[] { "-lst", "a", "b" });
        assertEquals(2, jobs.length);
        assertEquals(new Job(null, true, "a"), jobs[0]);
        assertEquals(new Job(null, true, "b"), jobs[1]);
    }

    public void testOutputPath() throws GenericException {
        jobs = main.parseOptions(new String[] { "-d", ".", "a", "b" });
        assertEquals(2, jobs.length);
        assertEquals(new Job(".", false, "a"), jobs[0]);
        assertEquals(new Job(".", false, "b"), jobs[1]);
    }
}
