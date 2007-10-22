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

package org.qooxdoo.sushi.util;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.io.IOException;

import org.junit.Test;

import org.qooxdoo.sushi.io.IO;

public class ProgramTest {
    private static final IO IO_OBJ = new IO();

    @Test
    public void normal() throws IOException {
        p("ls", "-la").exec();
    }

    @Test
    public void noVariableSubstitution() throws IOException {
        assertEquals("$PATH\n", p("echo", "$PATH").exec());
    }

    @Test
    public void noRedirect() throws IOException {
        assertEquals("foo >file\n", p("echo", "foo", ">file").exec());
    }

    @Test
    public void env() throws IOException {
        assertTrue(p("env").exec().contains("PATH="));
    }

    @Test
    public void myEnv() throws IOException {
        Program p;
        
        p = p("env");
        p.builder.environment().put("bar", "foo");
        assertTrue(p.exec().contains("bar=foo"));
    }

    @Test
    public void output() throws IOException {
        assertEquals("foo\n", p("echo", "foo").exec());
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
            fail();
        } catch (IOException e) {
            // ok
        }
    }
    
    private Program p(String ... args) {
        return new Program(IO_OBJ.getHome(), args);        
    }
}
