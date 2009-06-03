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

package org.qooxdoo.sushi.util;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.io.IOException;

import org.junit.Test;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.file.FileNode;
import org.qooxdoo.sushi.io.OS;

public class ProgramTest {
    private static final IO IO_OBJ = new IO();

    @Test
    public void normal() throws IOException {
        p("hostname").exec();
    }

    @Test
    public void echo() throws IOException {
        assertEquals("foo", p("echo", "foo").exec().trim());
    }

    @Test
    public void variableSubstitution() throws IOException {
        String var;
        String output;

        var = OS.CURRENT.variable("PATH");
        output = p("echo", var).exec().trim();
        assertTrue(output + " vs " + var, OS.CURRENT != OS.WINDOWS == var.equals(output));
    }

    @Test
    public void noRedirect() throws IOException {
        if (OS.CURRENT != OS.WINDOWS) {
            assertEquals("foo >file\n", p("echo", "foo", ">file").exec());
        } else {
            // TODO
        }
    }

    @Test
    public void env() throws IOException {
        assertTrue(p(environ()).exec().contains("PATH="));
    }

    @Test
    public void myEnv() throws IOException {
        Program p;
        
        p = p(environ());
        p.builder.environment().put("bar", "foo");
        assertTrue(p.exec().contains("bar=foo"));
    }

    @Test
    public void output() throws IOException {
        assertEquals("foo", p("echo", "foo").exec().trim());
    }
    
    private String environ() {
        if (OS.CURRENT == OS.WINDOWS) {
            return "set";
        } else {
            return "env";
        }
    }
    
    public void failure() throws IOException {
        try {
            p("ls", "nosuchfile").exec();
            fail();
        } catch (ExitCode e) {
            // ok
        }
    }

    @Test
    public void notfoundexecFailure() throws IOException {
        try {
            p("nosuchcommand").exec();
            fail();
        } catch (ExitCode e) {
            assertEquals(OS.WINDOWS, OS.CURRENT);
        } catch (IOException e) {
            assertTrue(OS.WINDOWS != OS.CURRENT);
        }
    }
    
    private Program p(String ... args) {
        Program p;
        
        p = new Program((FileNode) IO_OBJ.getHome());
        if (OS.CURRENT == OS.WINDOWS) {
            p.add("cmd", "/C");
        }
        p.add(args);
        return p;
    }
}
