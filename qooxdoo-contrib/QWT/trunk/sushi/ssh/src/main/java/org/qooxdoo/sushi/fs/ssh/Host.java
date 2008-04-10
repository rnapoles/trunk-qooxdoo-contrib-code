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

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.fs.Settings;
import org.qooxdoo.sushi.fs.file.FileNode;
import org.qooxdoo.sushi.io.MultiOutputStream;
import org.qooxdoo.sushi.util.ExitCode;

import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.UserInfo;

/** A session factory with convenience methods to invoke command */
public class Host implements UserInfo {
    private static final Settings SETTINGS = new Settings();
    
    public static Host createLocal(IO io) throws JSchException, IOException {
        return create(io, "localhost", "localhost", null, 0);
    }

    public static Host create(IO io, String machine, String user, String passphrase, int timeout) throws JSchException, IOException {
        Node dir;
        Node file;
        Node privateKey;

        if (user == null) {
            user = io.getHome().getName();
        }
        dir = io.getHome().join(".ssh");
        if (passphrase == null) {
            if (passphrase == null) {
                file = dir.join("passphrase");
                if (file.exists()) {
                    passphrase = file.readString().trim();
                } else {
                    passphrase = "";
                }
            }
        }
        privateKey = dir.join("id_dsa");
        if (!privateKey.exists()) {
            privateKey = dir.join("id_rsa");
        }
        return new Host(machine, user, (FileNode) privateKey, passphrase, timeout, io.settings);
    }
    
    private final String user;
    private final FileNode privateKey;
    private final String passphrase;
    private final String machine;
    private final Session session;
    private final Settings settings;
    
    public Host(String machine, String user, FileNode privateKey, String passphrase, int timeout, Settings settings) 
    throws JSchException {
        JSch jsch;

        if (user == null) {
            throw new IllegalArgumentException();
        }
        this.user = user;
        this.privateKey = privateKey;
        this.passphrase = passphrase;
        this.machine = machine;
        this.settings = settings;
        
        jsch = new JSch();
        this.session = login(jsch, machine);
        session.connect(timeout);
    }
    
    public void close() {
        session.disconnect();
    }

    /** @return a connected channel; automatically closed when the connection is closed */
    public ChannelSftp open() throws JSchException {
        ChannelSftp channel;
        
        channel = (ChannelSftp) session.openChannel("sftp");
        channel.connect();
        return channel;
    }

    public Exec begin(boolean tty, String ... command) throws JSchException {
        return begin(tty, MultiOutputStream.createNullStream(), command);
    }
    
    public Exec begin(boolean tty, OutputStream out, String ... command) throws JSchException {
        return Exec.begin(this, tty, (ChannelExec) session.openChannel("exec"), out, command);
    }
    
    public String exec(String ... command) throws JSchException, ExitCode {
        return exec(true, command);
    }
    
    public String exec(boolean tty, String ... command) throws JSchException, ExitCode {
        ByteArrayOutputStream out;

        out = new ByteArrayOutputStream();
        try {
            begin(tty, out, command).end();
        } catch (ExitCode e) {
            throw new ExitCode(e.call, e.code, settings.string(out));
        }
        return settings.string(out);
    }
    
    public String getUser() {
        return user;
    }

    public Session login(JSch jsch, String machine) throws JSchException {
        Session session;
        
        jsch.addIdentity(privateKey.getAbsolute());
        session = jsch.getSession(user, machine, 22);
        session.setUserInfo(this);
        return session;
    }

    
    public String getMachine() {
        return machine;
    }
    
    //-- interface implementation 
    
    public String getPassphrase(String message) {
        throw new IllegalStateException(message);
    }

    public String getPassword() {
        throw new IllegalStateException();
    }

    public boolean prompt(String str) {
        throw new IllegalStateException(str);
    }

    public String getPassphrase() {
        return passphrase;
    }

    public boolean promptPassphrase(String prompt) {
        return true; // use passphrase auth
    }

    public boolean promptPassword(String prompt) {
        return false; // don't use password
    }

    public boolean promptYesNo(String message) {
        return true;
    }

    public void showMessage(String message) {
        System.out.println("showMessage " + message);
    }
}
