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

import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.UserInfo;

import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.io.Node;

public class User implements UserInfo {
    public static User withUserKey(IO io) throws IOException {
        return withUserKey(io, io.getHome().getName());
    }

    public static User withUserKey(IO io, String name) throws IOException {
        return withUserKey(io, name, null);
    }

    public static User withUserKey(IO io, String name, String passphrase) throws IOException {
        Node dir;
        Node file;
        Node privateKey;
        
        dir = io.getHome().join(".ssh");
        if (passphrase == null) {
            file = dir.join("passphrase");
            if (file.exists()) {
                passphrase = file.readString().trim();
            } else {
                passphrase = "";
            }
        }
        privateKey = dir.join("id_dsa");
        if (!privateKey.exists()) {
            privateKey = dir.join("id_rsa");
        }
        return new User(name, (FileNode) privateKey, passphrase);
    }

    //--
    
    private final String name;
    private final FileNode privateKey;
    private final String passphrase;

    public User(String name, FileNode privateKey, String passphrase) {
        if (name == null) {
            throw new IllegalArgumentException();
        }
        this.name = name;
        this.privateKey = privateKey;
        this.passphrase = passphrase;
    }

    public String getName() {
        return name;
    }

    public Session login(JSch jsch, String machine) throws JSchException {
        Session session;
        
        jsch.addIdentity(privateKey.getAbsolute());
        session = jsch.getSession(name, machine, 22);
        session.setUserInfo(this);
        return session;
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
