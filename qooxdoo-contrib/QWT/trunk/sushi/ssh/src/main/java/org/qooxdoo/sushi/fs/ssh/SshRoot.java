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

import org.qooxdoo.sushi.fs.Root;

import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.Session;

public class SshRoot implements Root {
    private final SshFilesystem filesystem;
    private final ChannelSftp channel;
    
    public SshRoot(SshFilesystem filesystem, ChannelSftp channel) {
        this.filesystem = filesystem;
        this.channel = channel;
    }
    
    public SshFilesystem getFilesystem() {
        return filesystem;
    }

    public String getId() {
        Session session;
        
        session = channel.getSession();
        return "//" + session.getUserName() + "@" + session.getHost() + "/";
    }

    public SshNode newInstance(String path) {
        return new SshNode(this, path);
    }
    
    public ChannelSftp getChannel() {
        return channel;
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
}
