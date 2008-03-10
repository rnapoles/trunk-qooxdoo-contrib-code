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

package org.qooxdoo.sushi.cli;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

import org.qooxdoo.sushi.io.DeleteException;
import org.qooxdoo.sushi.io.Filesystem;
import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.io.MkdirException;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.io.SetLastModifiedException;

public class ConsoleNode extends Node {
    public static final Filesystem FS = new Filesystem("console:/", '/');
    
    public ConsoleNode(IO io) {
        super(io, FS);
    }

    @Override
    public List<ConsoleNode> list() {
        return null;
    }

    @Override
    public InputStream createInputStream() throws IOException {
        return System.in;
    }

    @Override
    public OutputStream createOutputStream() throws IOException {
        return System.out;
    }

    @Override
    public Node delete() throws DeleteException {
        throw new DeleteException(this);
    }

    @Override
    protected boolean equalsNode(Node node) {
        return true;
    }

    @Override
    public boolean exists() {
        return true;
    }

    @Override
    public Node getBase() {
        return null;
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
    public long lastModified() {
        return System.currentTimeMillis();
    }

    @Override
    public long length() {
        throw new UnsupportedOperationException();
    }

    @Override
    public void setLastModified(long millis) throws SetLastModifiedException {
        throw new SetLastModifiedException(this);
    }
    
    @Override
    public Node mkdir() throws MkdirException {
        throw new MkdirException(this);
    }

    @Override
    public Node newInstance(String path) {
        throw new UnsupportedOperationException();
    }

}
