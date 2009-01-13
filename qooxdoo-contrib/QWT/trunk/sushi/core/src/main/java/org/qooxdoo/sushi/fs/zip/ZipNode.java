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

package org.qooxdoo.sushi.fs.zip;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import org.qooxdoo.sushi.fs.DeleteException;
import org.qooxdoo.sushi.fs.MkdirException;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.fs.SetLastModifiedException;

/** 
 * Use http networking properties to specify proxies:
 * http://java.sun.com/j2se/1.5.0/docs/guide/net/properties.html
 */
public class ZipNode extends Node {
    private final ZipRoot root;
    private final String path;
    
    public ZipNode(ZipRoot root, String path) {
        super();
        this.root = root;
        this.path = path;
    }

    @Override
    public ZipRoot getRoot() {
        return root;
    }
    
    @Override
    public long length() {
        throw new UnsupportedOperationException();
    }

    @Override 
    public long getLastModified() {
        return root.getLastModified();
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
    public Node delete() throws DeleteException {
        throw new DeleteException(this);
    }

    @Override
    public Node mkdir() throws MkdirException {
        throw new MkdirException(this);
    }
    
    @Override
    public boolean exists() {
        return root.getZip().getEntry(path)  != null;
    }

    @Override
    public boolean isFile() {
        ZipEntry entry;
        
        entry = root.getZip().getEntry(path);
        return entry == null ? false : !entry.isDirectory();
    }

    @Override
    public boolean isDirectory() {
        ZipFile zip;
        ZipEntry entry;
        Enumeration<? extends ZipEntry> e;
        String name;
        String separator;
        String prefix;
        
        zip = root.getZip();
        e = zip.entries();
        separator = root.getFilesystem().getSeparator();
        prefix = getPath() + separator;
        // TODO: expensive
        while (e.hasMoreElements()) {
            entry = e.nextElement();
            name = entry.getName();
            if (name.startsWith(prefix)) {
                return true;
            }
        }
        return false;
    }

    @Override
    public InputStream createInputStream() throws IOException {
        ZipFile zip;
        ZipEntry entry;
        
        zip = root.getZip();
        entry = zip.getEntry(path);
        if (entry == null) {
            return null;
        }
        return zip.getInputStream(entry);
    }

    @Override
    public OutputStream createOutputStream(boolean append) throws IOException {
        throw new IOException(this + ": cannot write");
    }

    @Override
    public List<ZipNode> list() {
        ZipEntry entry;
        Enumeration<? extends ZipEntry> e;
        String name;
        String separator;
        String prefix;
        int length;
        List<ZipNode> result;
        List<String> done;
        int idx;
        
        // TODO: expensive
        e = root.getZip().entries();
        separator = root.getFilesystem().getSeparator();
        prefix = path.length() == 0 ? "" : path + separator;
        length = prefix.length();
        result = new ArrayList<ZipNode>();
        done = new ArrayList<String>();
        done.add(path);
        while (e.hasMoreElements()) {
            entry = e.nextElement();
            name = entry.getName();
            if (name.length() > length && name.startsWith(prefix)) {
                idx = name.indexOf(separator, length);
                name = (idx == -1 ? name : name.substring(0, idx));
                if (!done.contains(name)) {
                    done.add(name);
                    result.add(root.node(name));
                }
            }
        }
        return result;
    }

    @Override
    public String getPath() {
        return path;
    }
}
