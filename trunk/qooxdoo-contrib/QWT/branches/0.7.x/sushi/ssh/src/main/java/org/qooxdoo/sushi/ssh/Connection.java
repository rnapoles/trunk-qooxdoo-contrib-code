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

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;

import org.qooxdoo.sushi.io.Buffer;
import org.qooxdoo.sushi.io.MultiOutputStream;
import org.qooxdoo.sushi.util.ExitCode;

/** a session with a buffer */
public class Connection {
    public static Connection create(String host, User user) throws JSchException {
        return new Host(host, user).connect();
    }
    
    private final Host host;
    private final Session session;
    private final Buffer buffer;
    /** null if not probed yet */
    private Boolean mac;
    
    public Connection(Host host, Session session, Buffer buffer) {
        this.host = host;
        this.session = session;
        this.buffer = buffer;
    }

    public boolean isMac() throws ExitCode, JSchException {
        if (mac == null) {
            mac = "Darwin\n".equals(exec("uname"));
        }
        return mac;
    }
    
    public Host getHost() {
        return host;
    }
    
    public void invoke(Transfer ... commands) throws JSchException, IOException {
        for (Transfer command : commands) {
            command.invoke(buffer, session);
        }
    }

    public void close() {
        session.disconnect();
    }
    
    public Exec begin(String ... command) throws JSchException {
        return begin(MultiOutputStream.createNullStream(), command);
    }
    
    public Exec begin(OutputStream out, String ... command) throws JSchException {
        return Exec.begin(this, (ChannelExec) session.openChannel("exec"), out, command);
    }
    
    public String exec(String ... command) throws JSchException, ExitCode {
        ByteArrayOutputStream out;

        out = new ByteArrayOutputStream();
        try {
            begin(out, command).end();
        } catch (ExitCode e) {
            throw new ExitCode(e.call, e.code, buffer.string(out));
        }
        return buffer.string(out);
    }
}
