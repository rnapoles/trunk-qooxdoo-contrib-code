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

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URI;

import org.qooxdoo.sushi.util.Program;

/**
 * <p>File, directory, symlink or something not yet created. Relacement java.io.File.</p>
 * <p>Some redundant methods from java.io.File are not provided to simplify the api (in
 * particular: some constructors and getXxxPath/getXxxFile). </p>
 */
public class FileNode extends Node {
    /** null for absolute files */
    private final FileNode base;
    
    /** never null */
    private final File file;

    public FileNode(IO io, File file) {
        this(io, null, file);
    }

    /** 
     * Rarely used, usually you'll start with one of the Nodes from IO (e.g. the current working
     * directory) and use the join method to create new nodes. Use IO.node to create nodes for
     * a given path.
     */
    public FileNode(IO io, FileNode base, File file) {
        super(io);
        
        if (!file.isAbsolute()) {
            throw new IllegalArgumentException(file.toString());
        }
        this.base = base;
        this.file = file;
    }
    
    @Override
    public Node getBase() {
        return base;
    }
    
    @Override
    public Node newInstance(String path) {
        return new FileNode(io, base, new File("/" + path));
    }
    
    public URI toURI() {
        return file.toURI();
    }

    public IO getIO() {
        return io;
    }
    

    
    /** Avoid calling this method, should be used to interact with 'legary' code only */
    public File getFile() {
        return file;
    }
    
    @Override
    public String getPath() {
        return file.getPath().substring(1);
    }
    
    //--
    
    @Override
    public boolean exists() {
        return file.exists();
    }

    @Override
    public boolean isFile() {
        return file.isFile();
    }
    
    @Override
    public boolean isDirectory() {
        return file.isDirectory();
    }

    public boolean isLink() throws IOException {
        return isLink(file);
    }
    
    private static boolean isLink(File file) throws IOException {
        String name;
        File parent;
        
        name = file.getName();
        parent = file.getAbsoluteFile().getParentFile();
        File toTest = new File(parent.getCanonicalPath(), name);
        return !toTest.getAbsolutePath().equals(toTest.getCanonicalPath());
    }
    
    public boolean canWrite() {
        return file.canWrite();
    }

    public boolean canRead() {
        return file.canRead();
    }
    
    public long length() {
        return file.length();
    }

    @Override
    public long lastModified() {
        return file.lastModified();
    }
    
    public void setLastModified(long time) throws IOException {
        if (!file.setLastModified(time)) {
            throw new IOException(file + ": setLastModified failed");
        }
    }

    //-- locating
    
    @Override
    public Node[] children() {
        return list();
    }
    
    /** @return null when called for a file; non-null otherwise */
    public FileNode[] list() {
        File[] children;
        FileNode[] result;
        
        children = file.listFiles();
        if (children == null) {
            return null;
        }
        result = new FileNode[children.length];
        for (int i = 0; i < result.length; i++) {
            result[i] = new FileNode(io, base, children[i]);
        }
        return result;
    }

    //-- read and writeBytes
    
    @Override
    public FileOutputStream createOutputStream() throws IOException {
        return new FileOutputStream(file);
    }

    @Override
    public FileInputStream createInputStream() throws IOException {
        return new FileInputStream(file);
    }

    //-- create
    
    /** this is not a touch because it fails if the file exists */
    public FileNode mkfile() throws IOException {
        if (exists()) {
            throw new IOException(this + ": file exists");
        }
        createOutputStream().close();
        return this;
    }
    
    @Override
    public Node mkdir() throws MkdirException {
        if (!file.mkdir()) {
            throw new MkdirException(this);
        }
        return this;
    }

    //--

    /** @return dest */
    public FileNode link(FileNode dest) throws IOException {
        FileNode dir;
        
        dir = (FileNode) dest.getParent();
        dir.checkDirectory();
        dest.checkNotExists();
        new Program(dir, "ln", "-s", file.getAbsolutePath(), dest.getName()).execNoOutput();
        return dest;
    }
    
    //-- move

    /** @return dest */
    public FileNode move(FileNode dest) throws IOException {
        dest.checkNotExists();
        new Program((FileNode) dest.getParent(), "mv", getAbsolute(), dest.getName()).execNoOutput();
        return dest;
    }

    //-- rename 
    
    public void rename(FileNode target) throws IOException {
        if (target.exists()) {
            throw new IOException("target exists: " + target);
        }
        rename(file, target.file);
    }
    
    private static void rename(File src, File target) throws IOException {
        if (!src.exists()) {
            throw new FileNotFoundException("" + src);
        }
        // the target may exist, it will be overwritten!
        File parent = target.getAbsoluteFile().getParentFile();
        if (parent != null && !parent.isDirectory()) {
            throw new IOException("not a directory: " + parent);
        }
        if (!src.renameTo(target)) {
            throw new IOException("Failed to rename " + src + " to " + target);
        }
    }

    //-- delete
    
    /**
     * Deletes a file or directory. Directories are deleted recursively. Handles Links.
     *
     * @throws IOException if a file cannot be deleted
     */
    @Override
    public void delete() throws DeleteException {
        try {
            delete(file);
        } catch (IOException e) {
            throw new DeleteException(this, e);
        }
    }
    
    protected static void delete(File file) throws IOException {
        File[] files;
        
        if (isLink(file)) {
            deleteLink(file);
            return;
        } 
        files = file.listFiles();
        if (files != null) {
            for (File child : files) {
                delete(child);
            }
        } else {
            // not a directory
        }
        if (!file.delete()) {
            throw new FileNotFoundException("cannot delete file " + file);
        }
    }
    
    private static void deleteLink(File link) throws IOException {
        File target; // where the link point to
        File dir;
        File renamed;
        boolean wasDeleted;
        
        if (!link.exists()) {
            throw new FileNotFoundException("No such link: " + link);
        }
        target = link.getCanonicalFile();
        dir = target.getAbsoluteFile().getParentFile();
        renamed = File.createTempFile("link", ".tmp", dir);
        delete(renamed);
        try {
            rename(target, renamed);
        } catch (IOException e) {
            throw new IOException("Cannot delete link " + link + ": rename target " + target + " -> " + renamed 
                    + " failed: " + e.getMessage());
        }
        wasDeleted = link.delete();
        try {
            rename(renamed, target);
        } catch (IOException e) {
            throw new IOException("Couldn't return target " + renamed + " to its original name " + target
                                  + ":\n THE RESOURCE'S NAME ON DISK HAS BEEN CHANGED BY THIS ERROR!\n" + e);
        }
        if (!wasDeleted) {
            throw new IOException("Couldn't delete link: " + link + " (was it a real file? is this not a UNIX system?)");
        }
    }

    //--
    
    @Override
    public boolean diff(Node right, Buffer rightBuffer) throws IOException {
        if (right instanceof FileNode) {
            if (length() != ((FileNode) right).length()) {
                return true;
            }
        }
        return super.diff(right, rightBuffer);
    }

    //--
    
    public int getMode() throws IOException {
        Program stat;
        
        stat = new Program(io.getWorking(), "stat");
        stat.add(IO.OS_INSTANCE.stat);
        stat.add(getAbsolute());
        return Integer.parseInt(stat.exec().trim(), 8) & 0777;
    }

    public void setMode(int mode) throws IOException {
        new Program(io.getWorking(), "chmod", Integer.toOctalString(mode), getAbsolute()).execNoOutput();
    }
    
    //-- Object methods
    
    /** TODO: compare canonical paths? */
    @Override
    protected boolean equalsNode(Node node) {
        return file.equals(((FileNode) node).file);
    }
}

