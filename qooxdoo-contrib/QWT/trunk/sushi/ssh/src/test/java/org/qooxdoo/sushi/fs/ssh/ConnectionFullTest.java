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

package org.qooxdoo.sushi.fs.ssh;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.util.ExitCode;

import com.jcraft.jsch.JSchException;

public class ConnectionFullTest {
    private static final IO IO_OBJ = new IO();
    
    public static Host open() throws JSchException, IOException {
        String hostname;
        String username;
        
        hostname = prop("sushi.ssh.test.host");
        if (hostname == null) {
            try {
                InetAddress addr = InetAddress.getLocalHost();
                hostname = addr.getHostName();
            } catch (UnknownHostException e) {
                hostname = "localhost";
            }        
        }
        username = prop("sushi.ssh.test.user");
        return Host.create(IO_OBJ, hostname, username, null, 0);
    }
    
    private static String prop(String key) {
        String value;
        
        value = System.getProperty(key);
        if (value != null && value.startsWith("$")) {
            return null;
        } else {
            return value;
        }
    }
    
    private Host host;

    @Before
    public void setUp() throws Exception {
        host = open();
    }
    
    @After
    public void tearDown() throws Exception {
        if (host != null) {
            host.close();
        }
    }
    
    @Test
    public void normal() throws Exception {
        assertEquals("\r\n", host.exec("echo"));
        assertEquals("hello\r\n", host.exec("echo", "hello"));
        assertEquals("again\r\n", host.exec("echo", "again"));
        try {
            host.exec("commandnotfound");
            fail();
        } catch (ExitCode e) {
            assertTrue(e.output.contains("commandnotfound"));
        }

        assertEquals("alive\r\n", host.exec("echo", "alive"));
    }

    @Test
    public void variablesLost() throws Exception {
        assertEquals("\r\n", host.exec("echo", "$FOO"));
        host.exec("export", "FOO=bar");
        assertEquals("\r\n", host.exec("echo", "$FOO"));
    }

    @Test
    public void directoryLost() throws Exception {
        String start;
        
        start = host.exec("pwd");
        assertEquals("/usr\r\n", host.exec("cd", "/usr", "&&", "pwd"));
        assertEquals(start, host.exec("pwd"));
    }

    @Test
    public void shell() throws Exception {
        host.exec("echo", "-e", "\\003320l");

        assertEquals("", host.exec("exit", "0", "||", "echo", "dontprintthis"));
        assertEquals("a\r\nb\r\n", host.exec("echo", "a", "&&", "echo", "b"));
        assertEquals("a\r\n", host.exec("echo", "a", "||", "echo", "b"));
        assertEquals("file\r\n", host.exec(
                "if", "test", "-a", "/etc/profile;", 
                "then", "echo", "file;",
                "else", "echo", "nofile;", "fi"));
        assertEquals("nofile\r\n", host.exec(
                "if", "test", "-a", "nosuchfile;", 
                "then", "echo", "file;",
                "else", "echo", "nofile;", "fi"));
    }

    @Test
    public void timeout() throws Exception {
        Exec exec;
        
        exec = host.begin(true, "sleep", "5");
        try {
            exec.end(1000);
            fail();
        } catch (TimeoutException e) {
            // ok
        }
    }

    @Test
    public void longline() throws Exception {
        String longline = "1234567890" +
            "1234567890" +
            "1234567890" +
            "1234567890" +
            "1234567890" +
            "1234567890" +
            "1234567890" +
            "1234567890" +
            "1234567890" +
            "1234567890";
        assertEquals(longline + "\r\n", host.exec("echo", longline));
    }

    @Test
    public void cancel() throws Exception {
        String tmp = "/tmp/cancel-sushi";

        host.exec("rm", "-f", tmp);
        host.begin(true, "sleep", "2", "&&", "echo", "hi", ">" + tmp);
        Thread.sleep(500);
        tearDown();
        Thread.sleep(3000);
        setUp();
        try {            
            host.exec("ls", tmp);
            fail();
        } catch (ExitCode e) {
            assertTrue(e.getMessage().contains("No such file"));
        }
    }

    @Test
    public void erroroutput() throws Exception {
        try {
            host.exec("echo", "foo", "&&", "exit", "1");
            fail();
        } catch (ExitCode e) {
            assertEquals(1, e.code);
            assertEquals("foo\r\n", e.output);
        }
    }

    @Test
    public void duration() throws Exception {
        Exec exec;
        
        exec = host.begin(true, "sleep", "2");
        exec.end();
        assertTrue(exec.duration() >= 2000);
        assertTrue(exec.duration() <= 2200);
    }
}
