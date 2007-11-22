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

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.io.DeleteException;
import org.qooxdoo.sushi.io.ExistsException;
import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.Filesystem;
import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.io.LastModifiedException;
import org.qooxdoo.sushi.io.LengthException;
import org.qooxdoo.sushi.io.ListException;
import org.qooxdoo.sushi.io.Misc;
import org.qooxdoo.sushi.io.MkdirException;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.io.SetLastModifiedException;

import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.SftpException;

public class SshNode extends Node {
    private static final Filesystem FS = new Filesystem("ssh:/", '/');
    
    private final ChannelSftp channel;
    private final String slashPath;
    
    public SshNode(IO io, ChannelSftp channel, String path) {
        super(io, FS);
        
        if (path.startsWith("/")) {
            throw new IllegalArgumentException();
        }
        if (path.endsWith("/")) {
            throw new IllegalArgumentException(path);
        }
        if (channel == null) {
            throw new IllegalArgumentException();
        }
        this.channel = channel;
        this.slashPath = "/" + path;
    }

    @Override
    public long length() throws LengthException {
        try {
            return channel.stat(slashPath).getSize();
        } catch (SftpException e) {
            throw new LengthException(this, e);
        }
    }

    @Override
    public Node getBase() {
        return null;
    }
    
    @Override
    public SshNode newInstance(String path) {
        return new SshNode(io, channel, path);
    }

    @Override
    public String getPath() {
        return slashPath.substring(1);
    }

    //--
    
    @Override
    public List<SshNode> list() throws ListException {
        List<SshNode> nodes;
        ChannelSftp.LsEntry entry;
        String name;
        boolean dir;
        
        try {
            nodes = new ArrayList<SshNode>();
            dir = false;
            for (Object obj : channel.ls(slashPath)) {
                try {
                    entry = (ChannelSftp.LsEntry) obj;
                    name = entry.getFilename();
                    if (".".equals(name) || "..".equals(name)) {
                        dir = true;
                    } else {
                        nodes.add((SshNode) join(name));
                    }
                } catch (IllegalArgumentException e) {
                    throw new IllegalArgumentException("illegal name: " + obj, e);
                }
            }
            if (!dir && nodes.size() == 1) {
                return null;
            } else {
                return nodes;
            }
        } catch (SftpException e) {
            throw new ListException(this, e);
        }
    }
    
    //--

    @Override
    public SshNode delete() throws DeleteException {
        try {
            if (channel.stat(slashPath).isDir()) {
                for (Node child : list()) {
                    child.delete();
                }
                channel.rmdir(slashPath);
            } else {
                channel.rm(slashPath);
            }
        } catch (SftpException e) {
            if (e.id == 2 || e.id == 4) {
                throw new DeleteException(this, new FileNotFoundException());
            }
            throw new DeleteException(this, e);
        } catch (ListException e) {
            throw new DeleteException(this, e);
        }
        return this;
    }

    @Override
    public Node mkdir() throws MkdirException {
        try {
            channel.mkdir(slashPath);
            return this;
        } catch (SftpException e) {
            throw new MkdirException(this, e);
        }
    }

    @Override
    public boolean exists() throws ExistsException {
        try {
            channel.stat(slashPath);
            return true;
        } catch (SftpException e) {
            return false;
        }
    }
    
    @Override
    public boolean isFile() throws ExistsException {
        try {
            return !channel.stat(slashPath).isDir();
        } catch (SftpException e) {
            return false;
        }
    }

    @Override
    public boolean isDirectory() throws ExistsException {
        try {
            return channel.stat(slashPath).isDir();
        } catch (SftpException e) {
            return false;
        }
    }

    @Override
    public long lastModified() throws LastModifiedException {
        try {
            return 1000L * channel.stat(slashPath).getMTime();
        } catch (SftpException e) {
            throw new LastModifiedException(this, e);
        }
    }

    
    @Override
    public void setLastModified(long millis) throws SetLastModifiedException {
        try {
            channel.setMtime(slashPath, (int) (millis / 1000));
        } catch (SftpException e) {
            throw new SetLastModifiedException(this, e);
        }
    }
    
    @Override
    public InputStream createInputStream() throws IOException {
        FileNode tmp;
        
        tmp = io.createTempFile();
        try {
            get(tmp);
        } catch (SftpException e) {
            if (e.id == 2 || e.id == 4) {
                throw new FileNotFoundException(slashPath);
            }
            throw Misc.exception("ssh: get failed", e);
        }
        return tmp.createInputStream();
    }
    
    @Override
    public OutputStream createOutputStream() throws IOException {
        return new ByteArrayOutputStream() {
            @Override
            public void close() throws IOException {
                super.close();
                try {
                    put(toByteArray());
                } catch (JSchException e) {
                    throw Misc.exception("ssh write failed", e);
                } catch (SftpException e) {
                    throw Misc.exception("ssh write failed", e);
                }
            }
        };
    }

    public void get(Node dest) throws IOException, SftpException {
        OutputStream out;
                
        out = dest.createOutputStream();
        channel.get(slashPath, out);
        out.close();
    }

    public void put(final byte[] data) throws JSchException, IOException, SftpException {
        channel.put(new ByteArrayInputStream(data), slashPath);
    }
    
    @Override
    protected boolean equalsNode(Node node) {
        return channel == ((SshNode) node).channel;
    }
}
