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

package org.qooxdoo.sushi.fs.resource;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

import org.qooxdoo.sushi.fs.DeleteException;
import org.qooxdoo.sushi.fs.MkdirException;
import org.qooxdoo.sushi.fs.MoveException;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.fs.SetLastModifiedException;

public class ResourceNode extends Node {
    private final ResourceFilesystem filesystem;
    private final String path;
    
    public ResourceNode(ResourceFilesystem filesystem, String path) {
        this.filesystem = filesystem;
        this.path = path;
    }

    @Override
    public ResourceFilesystem getRoot() {
        return filesystem;
    }
    
    @Override
    public long length() {
        throw new UnsupportedOperationException();
    }

    @Override 
    public long getLastModified() {
        return 0;
    }
    
    @Override
    public void setLastModified(long millis) throws SetLastModifiedException {
        throw new SetLastModifiedException(this);
    }
    
    @Override 
    public int getMode() {
        throw unsupported("getMode()");
    }

    @Override
    public void setMode(int mode) {
        throw unsupported("setMode()");
    }

    @Override 
    public int getUid() {
        throw unsupported("getUid()");
    }

    @Override
    public void setUid(int uid) {
        throw unsupported("setUid()");
    }

    @Override 
    public int getGid() {
        throw unsupported("getGid()");
    }

    @Override
    public void setGid(int gid) {
        throw unsupported("setGid()");
    }

    @Override
    public boolean exists() {
        return filesystem.inputStream(path) != null;
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

        src = filesystem.inputStream(path);
        if (src == null) {
            throw new FileNotFoundException("resource not found: " + path);
        }
        return src;
    }

    @Override
    public OutputStream createOutputStream(boolean append) throws IOException {
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

    @Override
    public Node move(Node dest) throws MoveException {
    	throw new MoveException(this, dest, "ResourceNode cannot be moved");
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
