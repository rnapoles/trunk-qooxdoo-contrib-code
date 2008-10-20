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
    private Node privateKey;
    private String passphrase;
    private int timeout;
    private JSch jsch;
    
    public SshFilesystem(IO io) {
        super(io, "ssh", '/');
        
        privateKey = null;
        passphrase = null;
        timeout = 0;
        jsch = new JSch();
    }

    public void setPrivateKey(Node privateKey) {
        this.privateKey = privateKey;
    }
    
    public Node getPrivateKey() {
        return privateKey;
    }
    
    public void setPassphrase(String passphrase) {
        this.passphrase = passphrase;
    }

    public String getPassphrase() {
        return passphrase;
    }

    /** millis */
    public void setTimeout(int timeout) {
        this.timeout = timeout;
    }

    /** millis */
    public int getTimeout() {
        return timeout;
    }

    public JSch getJSch() {
        return jsch;
    }
    
    @Override
    public SshRoot rootPath(String rootPath, StringBuilder path) throws RootPathException {
        int idx;
        String host;
        String user;
        
        if (!rootPath.startsWith("//")) {
            throw new RootPathException("invalid root");
        }
        idx = rootPath.indexOf('/', 2);
        if (idx == -1) {
            throw new RootPathException("invalid root");
        }
        host = rootPath.substring(2, idx);
        path.append(rootPath.substring(idx + 1));
        idx = host.indexOf('@');
        try {
            if (idx == -1) {
                user = null;
            } else {
                user = host.substring(0, idx);
                host = host.substring(idx + 1);
            }
            try {
                return root(host, user);
            } catch (JSchException e) {
                throw new RootPathException(e);
            }
        } catch (IOException e) {
            throw new RootPathException(e);
        }
    }

    public SshRoot localRoot() throws JSchException, IOException {
        return root("localhost", getIO().getWorking().getName());
    }

    public SshRoot root(String host, String user) throws JSchException, IOException {
        IO io;
        Node dir;
        Node file;
        Node key;
        String pp;
        
        io = getIO();
        if (user == null) {
            user = io.getHome().getName();
        }
        dir = io.getHome().join(".ssh");
        if (passphrase != null) {
            pp = passphrase;
        } else {
            file = dir.join("passphrase");
            if (file.exists()) {
                pp = file.readString().trim();
            } else {
                pp = "";
            }
        }
        if (privateKey != null) {
            key = privateKey;
        } else {
            key = dir.join("id_dsa");
            if (!key.exists()) {
                key = dir.join("id_rsa");
            }
        }
        if (!key.isFile()) {
            throw new IOException("private key not found: " + key);
        }
        if (!(key instanceof FileNode)) {
            // TODO: what about security?
            key = key.copyFile(io.getTemp().createTempFile());
        }
        return new SshRoot(this, host, user, (FileNode) key, pp, timeout);
    }
}
