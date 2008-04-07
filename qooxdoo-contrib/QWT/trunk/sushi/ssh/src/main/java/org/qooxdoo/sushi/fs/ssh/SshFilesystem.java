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
import org.qooxdoo.sushi.fs.ParseException;

import com.jcraft.jsch.JSchException;


public class SshFilesystem extends Filesystem {
    public static final SshFilesystem INSTANCE = new SshFilesystem();
    
    private SshFilesystem() {
        super("ssh");
    }

    @Override
    public SshNode parse(IO io, String rootPath) throws IOException {
        int idx;
        String hostname;
        User user;
        String path;
        
        if (!rootPath.startsWith("//")) {
            throw new ParseException(rootPath);
        }
        idx = rootPath.indexOf('/', 2);
        if (idx == -1) {
            throw new ParseException(rootPath);
        }
        hostname = rootPath.substring(2, idx);
        path = rootPath.substring(idx + 1);
        idx = hostname.indexOf('@');
        if (idx == -1) {
            user = User.withUserKey(io);
        } else {
            user = User.withUserKey(io, hostname.substring(0, idx));
            hostname = hostname.substring(idx + 1);
        }
        try {
            return new SshNode(io, Connection.create(hostname, user).open(), path);
        } catch (JSchException e) {
            throw new ParseException("cannot connect", e);
        }
    }
}
