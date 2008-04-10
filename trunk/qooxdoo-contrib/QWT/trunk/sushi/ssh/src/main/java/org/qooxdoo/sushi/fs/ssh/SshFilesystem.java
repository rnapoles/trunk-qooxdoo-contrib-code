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

import java.io.IOException;

import org.qooxdoo.sushi.fs.Filesystem;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.fs.RootPathException;
import org.qooxdoo.sushi.fs.file.FileNode;

import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;


public class SshFilesystem extends Filesystem {
    private String passphrase;
    private int timeout;
    private JSch jsch;
    
    public SshFilesystem(IO io) {
        super(io, "ssh", '/');
        
        jsch = new JSch();
    }

    public void setPassphrase(String passphrase) {
        this.passphrase = passphrase;
    }

    public String getPassphrase() {
        return passphrase;
    }

    public void setTimeout(int timeout) {
        this.timeout = timeout;
    }

    public int getTimeout() {
        return timeout;
    }

    public JSch getJSch() {
        return jsch;
    }
    
    @Override
    public SshNode parse(String rootPath) throws RootPathException {
        int idx;
        String machine;
        String user;
        String path;
        
        if (!rootPath.startsWith("//")) {
            throw new RootPathException("invalid root");
        }
        idx = rootPath.indexOf('/', 2);
        if (idx == -1) {
            throw new RootPathException("invalid root");
        }
        machine = rootPath.substring(2, idx);
        path = rootPath.substring(idx + 1);
        idx = machine.indexOf('@');
        try {
            if (idx == -1) {
                user = null;
            } else {
                user = machine.substring(0, idx);
                machine = machine.substring(idx + 1);
            }
            try {
                return new SshNode(createRoot(machine, user), path);
            } catch (JSchException e) {
                throw new RootPathException(e);
            }
        } catch (IOException e) {
            throw new RootPathException(e);
        }
    }

    public SshRoot createLocalRoot() throws JSchException, IOException {
        return createRoot("localhost", "localhost");
    }

    public SshRoot createRoot(String machine, String user) throws JSchException, IOException {
        IO io;
        Node dir;
        Node file;
        Node privateKey;

        io = getIO();
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
        return new SshRoot(this, machine, user, (FileNode) privateKey, passphrase, timeout);
    }
}
