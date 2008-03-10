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

package org.qooxdoo.sushi.memory;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

import org.qooxdoo.sushi.io.DeleteException;
import org.qooxdoo.sushi.io.ExistsException;
import org.qooxdoo.sushi.io.Filesystem;
import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.io.MkdirException;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.io.SetLastModifiedException;

/** You'll normally use IO.stringNode() to create instances */
public class MemoryNode extends Node {
    private static final Filesystem FS = new Filesystem("mem:/", '/');
    
    public static MemoryNode createRoot(IO io) {
        return new Context(io).node("");
    }

    //--
    
    /** never null */
    private final Context context;

    /** never null */
    private final String path;

    /** never null */
    private Type type;
    
    private long lastModified;
    
    /** Do not call - use create instead. */
    public MemoryNode(Context context, String path, Type type, byte[] data) {
        super(context.io, FS);
        if (path.endsWith("/")) {
            throw new IllegalArgumentException(path);
        }
        this.context = context;
        this.path = path;
        this.type = type;
        this.lastModified = System.currentTimeMillis();
    }

    public Context getContext() {
        return context;
    }
    
    @Override
    public Node getBase() {
        return null;
    }
    
    public Type getType() {
        return type;
    }
    
    @Override
    public MemoryNode newInstance(String path) {
        return context.node(path);
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
    public long lastModified() {
        return lastModified;
    }
    
    @Override
    public long length() {
        return context.length(path);
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
            return context.list(path);
        } catch (IOException e) {
            throw new RuntimeException("TODO", e);
        }
    }

    @Override
    public InputStream createInputStream() throws IOException {
        if (type != Type.FILE) {
            throw new FileNotFoundException(path);
        }
        return context.open(path);
    }

    @Override
    public OutputStream createOutputStream() throws IOException {
        if (type == Type.DIRECTORY) {
            throw new IOException("cannot write file over directory: " + path);
        }
        getParent().checkDirectory();
        return new ByteArrayOutputStream() {
            @Override
            public void close() throws IOException {
                type = Type.FILE;
                context.store(path, this.buf, this.count);
                super.close();
            }
        };
    }

    @Override
    protected boolean equalsNode(Node node) {
        return context == (((MemoryNode) node).context);
    }

    @Override
    public String getPath() {
        return path;
    }
}
