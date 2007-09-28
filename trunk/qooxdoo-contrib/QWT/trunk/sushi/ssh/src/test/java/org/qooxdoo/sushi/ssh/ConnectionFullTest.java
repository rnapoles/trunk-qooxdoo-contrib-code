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

package org.qooxdoo.sushi.ssh;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.net.InetAddress;
import java.net.UnknownHostException;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.util.ExitCode;

public class ConnectionFullTest {
    public static String hostname() {
        try {
            InetAddress addr = InetAddress.getLocalHost();
            return addr.getHostName();
        } catch (UnknownHostException e) {
            throw new RuntimeException(e);
        }        
    }
    
    private static final IO IO_OBJ = new IO();
    
    private Connection con;

    @Before
    public void setUp() throws Exception {
        Host host;
        
        host = new Host(hostname(), User.withUserKey(IO_OBJ));
        con = host.connect();
    }
    
    @After
    public void tearDown() throws Exception {
        con.close();
    }
    
    @Test
    public void normal() throws Exception {
        assertEquals("hello\n", con.exec("echo", "hello"));
        assertEquals("again\n", con.exec("echo", "again"));
        try {
            con.exec("commandnotfound");
            fail();
        } catch (ExitCode e) {
            assertTrue(e.output.contains("commandnotfound"));
        }

        assertEquals("alive\n", con.exec("echo", "alive"));
    }

    @Test
    public void variablesLost() throws Exception {
        assertEquals("\n", con.exec("echo", "$FOO"));
        con.exec("export", "FOO=bar");
        assertEquals("\n", con.exec("echo", "$FOO"));
    }

    @Test
    public void directoryLost() throws Exception {
        String start;
        
        start = con.exec("pwd");
        assertEquals("/home\n", con.exec("cd", "/home", "&&", "pwd"));
        assertEquals(start, con.exec("pwd"));
    }

    @Test
    public void shell() throws Exception {
        assertEquals("", con.exec("exit", "0", "||", "echo", "dontprintthis"));
        assertEquals("a\nb\n", con.exec("echo", "a", "&&", "echo", "b"));
        assertEquals("a\n", con.exec("echo", "a", "||", "echo", "b"));
        assertEquals("file\n", con.exec(
                "if", "test", "-a", "/etc/profile;", 
                "then", "echo", "file;",
                "else", "echo", "nofile;", "fi"));
        assertEquals("nofile\n", con.exec(
                "if", "test", "-a", "nosuchfile;", 
                "then", "echo", "file;",
                "else", "echo", "nofile;", "fi"));
    }

    @Test
    public void timeout() throws Exception {
        Exec exec;
        
        exec = con.begin("sleep", "5");
        try {
            exec.end(1000);
            fail();
        } catch (TimeoutException e) {
            // ok
        }
    }

    @Test
    public void erroroutput() throws Exception {
        try {
        	con.exec("echo", "foo", "&&", "exit", "1");
        	fail();
        } catch (ExitCode e) {
        	assertEquals(1, e.code);
        	assertEquals("foo\n", e.output);
        }
    }

    @Test
    public void duration() throws Exception {
        Exec exec;
        
        exec = con.begin("sleep", "2");
        exec.end();
        assertTrue(exec.duration() >= 2000);
        assertTrue(exec.duration() <= 2200);
    }
}
