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
