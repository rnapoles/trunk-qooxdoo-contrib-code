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

package org.qooxdoo.sushi.io;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

public class ResourceNode extends Node {
    public static final Filesystem FS = new Filesystem("resource:/", '/');
    
    private final ClassLoader loader;
    private final String path;
    
    public ResourceNode(IO io, String path) {
        this(io, ResourceNode.class.getClassLoader(), path);
    }

    public ResourceNode(IO io, ClassLoader loader, String path) {
        super(io, FS);
        if (path.startsWith("/")) {
            throw new IllegalArgumentException(path);
        }
        this.loader = loader;
        this.path = path;
    }

    @Override
    public long length() {
        throw new UnsupportedOperationException();
    }

    @Override 
    public long lastModified() {
        return 0;
    }
    
    @Override
    public void setLastModified(long millis) throws SetLastModifiedException {
        throw new SetLastModifiedException(this);
    }
    
    @Override
    public Node getBase() {
        return null;
    }
    
    public ClassLoader getLoader() {
        return loader;
    }
    
    @Override
    public ResourceNode newInstance(String path) {
        return new ResourceNode(io, loader, path);
    }
    
    @Override
    protected boolean equalsNode(Node node) {
        return loader == (((ResourceNode) node).loader);
    }
    
    @Override
    public boolean exists() {
        return inputStream() != null;
    }

    @Override
    public boolean isFile() {
        return exists();
    }

    @Override
    public boolean isDirectory() {
        return false;
    }
    
    @Override
    public InputStream createInputStream() throws IOException {
        InputStream src;

        src = inputStream();
        if (src == null) {
            throw new FileNotFoundException("resource not found: " + path);
        }
        return src;
    }

    @Override
    public OutputStream createOutputStream() throws IOException {
        throw new IOException("cannot write: " + this);
    }

    @Override
    public Node mkdir() throws MkdirException {
        throw new MkdirException(this);
    }

    @Override
    public ResourceNode delete() throws DeleteException {
        throw new DeleteException(this);
    }

    private InputStream inputStream() {
        // TODO: ResourceNode.class.getLoader() doesn't work for SshNode's billy loading ...
        if (loader == null) {
            return ClassLoader.getSystemResourceAsStream(path);
        } else {
            return loader.getResourceAsStream(path);
        }
    }

    @Override
    public List<ResourceNode> list() {
        return null;
    }

    @Override
    public String getPath() {
        return path;
    }
}
