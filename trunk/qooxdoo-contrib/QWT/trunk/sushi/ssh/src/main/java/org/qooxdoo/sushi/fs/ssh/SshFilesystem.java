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
import org.qooxdoo.sushi.fs.RootPathException;

import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSchException;


public class SshFilesystem extends Filesystem {
    public String passphrase;
    public int timeout;
    
    public SshFilesystem(IO io) {
        super(io, "ssh", '/');
    }

    @Override
    public SshNode parse(String rootPath) throws RootPathException {
        int idx;
        String machine;
        String user;
        String path;
        IO io;
        
        io = getIO();
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
                return forChannel(Host.create(io, machine, user, passphrase, timeout).open(), path);
            } catch (JSchException e) {
                throw new RootPathException(e);
            }
        } catch (IOException e) {
            throw new RootPathException(e);
        }
    }

    public SshNode forChannel(ChannelSftp channel, String path) throws IOException {
        return new SshNode(new SshRoot(this, channel), path);
    }
}
