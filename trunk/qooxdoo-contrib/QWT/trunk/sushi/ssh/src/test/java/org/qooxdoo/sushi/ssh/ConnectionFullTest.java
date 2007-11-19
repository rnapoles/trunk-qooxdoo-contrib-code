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

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.util.ExitCode;

import com.jcraft.jsch.JSchException;

public class ConnectionFullTest {
    private static final IO IO_OBJ = new IO();
    
    public static Connection open() throws JSchException, IOException {
        String hostname;
        String username;
        User user;
        
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
        if (username != null) {
            user = User.withUserKey(IO_OBJ, username);
        } else {
            user = User.withUserKey(IO_OBJ);
        }
        return Connection.create(hostname, user);
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
    
    private Connection connection;

    @Before
    public void setUp() throws Exception {
        connection = open();
    }
    
    @After
    public void tearDown() throws Exception {
        if (connection != null) {
            connection.close();
        }
    }
    
    @Test
    public void normal() throws Exception {
        assertEquals("hello\n", connection.exec("echo", "hello"));
        assertEquals("again\n", connection.exec("echo", "again"));
        try {
            connection.exec("commandnotfound");
            fail();
        } catch (ExitCode e) {
            assertTrue(e.output.contains("commandnotfound"));
        }

        assertEquals("alive\n", connection.exec("echo", "alive"));
    }

    @Test
    public void variablesLost() throws Exception {
        assertEquals("\n", connection.exec("echo", "$FOO"));
        connection.exec("export", "FOO=bar");
        assertEquals("\n", connection.exec("echo", "$FOO"));
    }

    @Test
    public void directoryLost() throws Exception {
        String start;
        
        start = connection.exec("pwd");
        assertEquals("/usr\n", connection.exec("cd", "/usr", "&&", "pwd"));
        assertEquals(start, connection.exec("pwd"));
    }

    @Test
    public void shell() throws Exception {
        assertEquals("", connection.exec("exit", "0", "||", "echo", "dontprintthis"));
        assertEquals("a\nb\n", connection.exec("echo", "a", "&&", "echo", "b"));
        assertEquals("a\n", connection.exec("echo", "a", "||", "echo", "b"));
        assertEquals("file\n", connection.exec(
                "if", "test", "-a", "/etc/profile;", 
                "then", "echo", "file;",
                "else", "echo", "nofile;", "fi"));
        assertEquals("nofile\n", connection.exec(
                "if", "test", "-a", "nosuchfile;", 
                "then", "echo", "file;",
                "else", "echo", "nofile;", "fi"));
    }

    @Test
    public void timeout() throws Exception {
        Exec exec;
        
        exec = connection.begin("sleep", "5");
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
        	connection.exec("echo", "foo", "&&", "exit", "1");
        	fail();
        } catch (ExitCode e) {
        	assertEquals(1, e.code);
        	assertEquals("foo\n", e.output);
        }
    }

    @Test
    public void duration() throws Exception {
        Exec exec;
        
        exec = connection.begin("sleep", "2");
        exec.end();
        assertTrue(exec.duration() >= 2000);
        assertTrue(exec.duration() <= 2200);
    }
}
