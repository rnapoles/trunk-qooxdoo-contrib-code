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
import java.io.OutputStream;

import org.qooxdoo.sushi.fs.InstantiateException;
import org.qooxdoo.sushi.fs.Root;
import org.qooxdoo.sushi.fs.OnShutdown;
import org.qooxdoo.sushi.fs.file.FileNode;
import org.qooxdoo.sushi.io.MultiOutputStream;
import org.qooxdoo.sushi.util.ExitCode;

import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.UserInfo;

public class SshRoot implements Root, UserInfo, Runnable {
    private final SshFilesystem filesystem;
    private final String user;
    private final FileNode privateKey;
    private final String passphrase;
    private final String host;
    private final Session session;
    
    // created on demand because it's only needed for nodes, for "exec" stuff
    private ChannelSftp channelFtp;
    
    public SshRoot(SshFilesystem filesystem, String host, String user, FileNode privateKey, String passphrase, int timeout) 
    throws JSchException {
        this.filesystem = filesystem;
        this.user = user;
        this.privateKey = privateKey;
        this.passphrase = passphrase;
        this.host = host;
        this.session = login(filesystem.getJSch(), host);
        this.session.connect(timeout);
        this.channelFtp = null;
        OnShutdown.get().onShutdown(this);
    }

    //-- Root interface
    
    public SshFilesystem getFilesystem() {
        return filesystem;
    }

    public String getId() {
        return "//" + session.getUserName() + "@" + session.getHost() + "/";
    }

    public SshNode node(String path) throws InstantiateException {
        try {
            return new SshNode(this, path);
        } catch (JSchException e) {
            throw new InstantiateException(toString(), e);
        }
    }
    
    @Override
    public boolean equals(Object obj) {
        SshRoot root;
        
        if (obj instanceof SshRoot) {
            root = (SshRoot) obj;
            return getId().equals(root.getId());
        }
        return false;
    }
    
    @Override
    public int hashCode() {
        return getId().hashCode();
    }

    @Override
    public String toString() {
        return "SshNode host=" + host + ", user=" + user + ", privateKey=" + privateKey + ", passphrase=" + passphrase;  
    }
    
    //--
    
    public ChannelSftp getChannelFtp() throws JSchException {
        if (channelFtp == null) {
            channelFtp = (ChannelSftp) session.openChannel("sftp");
            channelFtp.connect();
        }
        return channelFtp;
    }
    
    public ChannelExec createChannelExec() throws JSchException {
        return (ChannelExec) session.openChannel("exec");
    }
    
    public void close() {
        session.disconnect();
    }

    public Process start(boolean tty, String ... command) throws JSchException {
        return start(tty, MultiOutputStream.createNullStream(), command);
    }
    
    public Process start(boolean tty, OutputStream out, String ... command) throws JSchException {
        return Process.start(this, tty, out, command);
    }
    
    public String exec(String ... command) throws JSchException, ExitCode {
        return exec(true, command);
    }
    
    public String exec(boolean tty, String ... command) throws JSchException, ExitCode {
        ByteArrayOutputStream out;

        out = new ByteArrayOutputStream();
        try {
            start(tty, out, command).waitFor();
        } catch (ExitCode e) {
            throw new ExitCode(e.call, e.code, filesystem.getIO().getSettings().string(out));
        }
        return filesystem.getIO().getSettings().string(out);
    }
    
    public String getUser() {
        return user;
    }

    public Session login(JSch jsch, String host) throws JSchException {
        Session session;
        
        jsch.addIdentity(privateKey.getAbsolute());
        session = jsch.getSession(user, host, 22);
        session.setUserInfo(this);
        return session;
    }

    
    public String getHost() {
        return host;
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

    // executes on shutdown
    public void run() {
        close();
    }
}
