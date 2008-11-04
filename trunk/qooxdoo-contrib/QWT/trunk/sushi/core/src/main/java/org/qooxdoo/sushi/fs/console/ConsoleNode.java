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

package org.qooxdoo.sushi.fs.console;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

import org.qooxdoo.sushi.fs.DeleteException;
import org.qooxdoo.sushi.fs.MkdirException;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.fs.SetLastModifiedException;

public class ConsoleNode extends Node {
    private final ConsoleFilesystem root;
    
    public ConsoleNode(ConsoleFilesystem root) {
        super();
        
        this.root = root;
    }

    @Override
    public ConsoleFilesystem getRoot() {
        return root;
    }
    
    @Override
    public List<ConsoleNode> list() {
        return null;
    }

    @Override
    public InputStream createInputStream() throws IOException {
        return System.in;
    }

    /** @parem append is ignored */
    @Override
    public OutputStream createOutputStream(boolean append) throws IOException {
        return System.out;
    }

    @Override
    public Node delete() throws DeleteException {
        throw new DeleteException(this);
    }

    @Override
    public boolean exists() {
        return true;
    }

    @Override
    public String getPath() {
        return null;
    }

    @Override
    public boolean isDirectory() {
        return false;
    }

    @Override
    public boolean isFile() {
        return true;
    }

    @Override
    public long length() {
        throw unsupported("length()");
    }

    @Override
    public long getLastModified() {
        return System.currentTimeMillis();
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
    public Node mkdir() throws MkdirException {
        throw new MkdirException(this);
    }
}
