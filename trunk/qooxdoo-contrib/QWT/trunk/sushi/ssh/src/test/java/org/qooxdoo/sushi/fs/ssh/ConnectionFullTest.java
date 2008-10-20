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
    
    public static SshRoot open() throws JSchException, IOException {
        String host;
        String user;
        
        host = prop("sushi.ssh.test.host");
        if (host == null) {
            try {
                InetAddress addr = InetAddress.getLocalHost();
                host = addr.getHostName();
            } catch (UnknownHostException e) {
                host = "localhost";
            }        
        }
        user = prop("sushi.ssh.test.user");
        return IO_OBJ.getFilesystem(SshFilesystem.class).root(host, user);
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
    
    private SshRoot root;

    @Before
    public void setUp() throws Exception {
        root = open();
    }
    
    @After
    public void tearDown() throws Exception {
        if (root != null) {
            root.close();
        }
    }
    
    @Test
    public void normal() throws Exception {
        assertEquals("\r\n", root.exec("echo"));
        assertEquals("hello\r\n", root.exec("echo", "hello"));
        assertEquals("again\r\n", root.exec("echo", "again"));
        try {
            root.exec("commandnotfound");
            fail();
        } catch (ExitCode e) {
            assertTrue(e.output.contains("commandnotfound"));
        }

        assertEquals("alive\r\n", root.exec("echo", "alive"));
    }

    @Test
    public void variablesLost() throws Exception {
        assertEquals("\r\n", root.exec("echo", "$FOO"));
        root.exec("export", "FOO=bar");
        assertEquals("\r\n", root.exec("echo", "$FOO"));
    }

    @Test
    public void directoryLost() throws Exception {
        String start;
        
        start = root.exec("pwd");
        assertEquals("/usr\r\n", root.exec("cd", "/usr", "&&", "pwd"));
        assertEquals(start, root.exec("pwd"));
    }

    @Test
    public void shell() throws Exception {
        root.exec("echo", "-e", "\\003320l");

        assertEquals("", root.exec("exit", "0", "||", "echo", "dontprintthis"));
        assertEquals("a\r\nb\r\n", root.exec("echo", "a", "&&", "echo", "b"));
        assertEquals("a\r\n", root.exec("echo", "a", "||", "echo", "b"));
        assertEquals("file\r\n", root.exec(
                "if", "test", "-a", "/etc/profile;", 
                "then", "echo", "file;",
                "else", "echo", "nofile;", "fi"));
        assertEquals("nofile\r\n", root.exec(
                "if", "test", "-a", "nosuchfile;", 
                "then", "echo", "file;",
                "else", "echo", "nofile;", "fi"));
    }

    @Test
    public void timeout() throws Exception {
        Process process;
        
        process = root.start(true, "sleep", "5");
        try {
            process.waitFor(1000);
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
        assertEquals(longline + "\r\n", root.exec("echo", longline));
    }

    @Test
    public void cancel() throws Exception {
        String tmp = "/tmp/cancel-sushi";

        root.exec("rm", "-f", tmp);
        root.start(true, "sleep", "2", "&&", "echo", "hi", ">" + tmp);
        Thread.sleep(500);
        tearDown();
        Thread.sleep(3000);
        setUp();
        try {            
            root.exec("ls", tmp);
            fail();
        } catch (ExitCode e) {
            assertTrue(e.getMessage().contains("No such file"));
        }
    }

    @Test
    public void erroroutput() throws Exception {
        try {
            root.exec("echo", "foo", "&&", "exit", "1");
            fail();
        } catch (ExitCode e) {
            assertEquals(1, e.code);
            assertEquals("foo\r\n", e.output);
        }
    }

    @Test
    public void duration() throws Exception {
        Process process;
        
        process = root.start(true, "sleep", "2");
        process.waitFor();
        assertTrue(process.duration() >= 2000);
        assertTrue(process.duration() <= 2600);
    }
}
