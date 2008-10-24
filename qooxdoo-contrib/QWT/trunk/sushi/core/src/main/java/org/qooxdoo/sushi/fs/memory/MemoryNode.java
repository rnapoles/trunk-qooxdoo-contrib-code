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

package org.qooxdoo.sushi.fs.memory;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

import org.qooxdoo.sushi.fs.DeleteException;
import org.qooxdoo.sushi.fs.ExistsException;
import org.qooxdoo.sushi.fs.LastModifiedException;
import org.qooxdoo.sushi.fs.MkdirException;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.fs.SetLastModifiedException;

/** You'll normally use IO.stringNode() to create instances */
public class MemoryNode extends Node {
    /** never null */
    private final MemoryRoot root;

    /** never null */
    private final String path;

    /** never null */
    private Type type;
    
    private long lastModified;
    
    /** Do not call - use create instead. */
    public MemoryNode(MemoryRoot root, String path, Type type, byte[] data) {
        super();
        this.root = root;
        this.path = path;
        this.type = type;
        this.lastModified = 0;
    }

    @Override
    public MemoryRoot getRoot() {
        return root;
    }
    
    public Type getType() {
        return type;
    }
    
    @Override
    public boolean exists() {
        return type != Type.NONE;
    }

    @Override
    public boolean isFile() {
        return type == Type.FILE;
    }

    @Override
    public boolean isDirectory() {
        return type == Type.DIRECTORY;
    }
    
    @Override 
    public long getLastModified() throws LastModifiedException {
        if (type == Type.NONE) {
            throw new LastModifiedException(this, null);
        }
        return lastModified;
    }
    
    @Override
    public long length() {
        return root.length(path);
    }

    @Override
    public void setLastModified(long millis) throws SetLastModifiedException {
        lastModified = millis;
    }
    
    
    @Override
    public Node mkdir() throws MkdirException {
        boolean parentDir;
        
        if (type != Type.NONE) {
            throw new MkdirException(this);
        }
        try {
            parentDir = getParent().isDirectory();
        } catch (ExistsException e) {
            throw new IllegalStateException(e);
        }
        if (!parentDir) {
            throw new MkdirException(this);
        }
        type = Type.DIRECTORY;
        lastModified = System.currentTimeMillis();
        return this;
    }
    
    @Override
    public MemoryNode delete() throws DeleteException {
        if (type == Type.NONE) {
            throw new DeleteException(this, new FileNotFoundException());
        }
        if (type == Type.DIRECTORY) {
            for (MemoryNode obj : list()) {
                ((MemoryNode) obj).delete();
            }
        }
        type = Type.NONE;
        return this;
    }

    @Override
    public List<MemoryNode> list() {
        if (type != Type.DIRECTORY) {
            return null;
        }
        try {
            return root.list(path);
        } catch (IOException e) {
            throw new RuntimeException("TODO", e);
        }
    }

    @Override
    public InputStream createInputStream() throws IOException {
        if (type != Type.FILE) {
            throw new FileNotFoundException(path);
        }
        return root.open(path);
    }

    @Override
    public OutputStream createOutputStream(boolean append) throws IOException {
        if (append) {
            unsupported("createOutputStream(true)");
        }
        if (type == Type.DIRECTORY) {
            throw new IOException("cannot write file over directory: " + path);
        }
        getParent().checkDirectory();
        return new ByteArrayOutputStream() {
            @Override
            public void close() throws IOException {
                type = Type.FILE;
                root.store(path, this.buf, this.count);
                super.close();
                lastModified = System.currentTimeMillis();
            }
        };
    }

    @Override
    public String getPath() {
        return path;
    }
}
