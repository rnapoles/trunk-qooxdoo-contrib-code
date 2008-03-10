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

import java.io.IOException;

import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.io.Settings;
import org.qooxdoo.sushi.util.ExitCode;

import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;

/** A session factory with convenience methods to invoke command */
public class Host {
    private static final Settings SETTINGS = new Settings();
    
    public static Host createLocal(IO io) throws JSchException, IOException {
        return new Host("localhost", User.withUserKey(io, io.getHome().getName()));
    }
    
    private final String machine;
    private final User user;
    private final int timeout;

    public Host(String machine, User user) throws JSchException {
        this(machine, user, 0);
    }
    
    public Host(String machine, User user, int timeout) throws JSchException {
        this.machine = machine;
        this.user = user;
        this.timeout = timeout;
    }

    public String getMachine() {
        return machine;
    }
    
    public User getUser() {
        return user;
    }
    
    /**
     * @return never null 
     */ 
    public String exec(String ... command) throws JSchException, ExitCode {
        Connection con;
        
        con = connect();
        try {
            return con.exec(command);
        } finally {
            con.close();
        }
    }

    public Connection connect() throws JSchException {
        JSch jsch;
        Session session;
        
        jsch = new JSch();
        session = user.login(jsch, machine);
        session.connect(timeout);
        return new Connection(this, session, SETTINGS);
    }
}
