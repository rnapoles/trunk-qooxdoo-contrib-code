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

package org.qooxdoo.sushi.fs.file;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.fs.DeleteException;
import org.qooxdoo.sushi.fs.MkdirException;
import org.qooxdoo.sushi.fs.MkfileException;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.fs.SetLastModifiedException;
import org.qooxdoo.sushi.fs.OnShutdown;
import org.qooxdoo.sushi.fs.zip.ZipFilesystem;
import org.qooxdoo.sushi.fs.zip.ZipNode;
import org.qooxdoo.sushi.io.Buffer;
import org.qooxdoo.sushi.io.OS;
import org.qooxdoo.sushi.util.Program;

/**
 * <p>File, directory, symlink or something not yet created. Relacement java.io.File.</p>
 */
public class FileNode extends Node {
    private final FileRoot root;
    
    /** never null and always absolute */
    private final File file;

    public FileNode(FileRoot root, File file) {
        if (!file.isAbsolute()) {
            throw new IllegalArgumentException(file.toString());
        }
        if (file.getPath().endsWith(File.separator) && file.getParent() != null) {
            throw new IllegalArgumentException("should not happen because java.io.File normalizes paths: " + file.getPath());
        }
        this.root = root;
        this.file = file;
    }
    
    @Override
    public FileRoot getRoot() {
        return root;
    }

    public URI toURI() {
        return file.toURI();
    }

    /** Avoid calling this method, should be used to interact with 'legacy' code only */
    public File getFile() {
        return file;
    }
    
    @Override
    public String getPath() {
        return file.getPath().substring(getRoot().getId().length());
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
    
    public ZipNode openZip() throws IOException {
        return new ZipFilesystem(getIO()).node(this, "");
    }

    @Override
    public long length() {
        return file.length();
    }

    @Override
    public long getLastModified() {
        return file.lastModified();
    }
    
    @Override
    public void setLastModified(long time) throws SetLastModifiedException {
        if (!file.setLastModified(time)) {
            throw new SetLastModifiedException(this);
        }
    }

    //-- locating
    
    
    /** @return null when called for a file; non-null otherwise */
    @Override
    public List<FileNode> list() {
        File[] children;
        List<FileNode> result;
        FileNode child;
        
        children = file.listFiles();
        if (children == null) {
            return null;
        }
        result = new ArrayList<FileNode>(children.length);
        for (int i = 0; i < children.length; i++) {
            child = new FileNode(root, children[i]);
            child.setBase(getBase());
            result.add(child);
        }
        return result;
    }

    //-- read and writeBytes
    
    @Override
    public FileInputStream createInputStream() throws IOException {
        return new FileInputStream(file);
    }

    @Override
    public FileOutputStream createOutputStream(boolean append) throws IOException {
        return new FileOutputStream(file, append);
    }

    //-- create
    
    /** this is not a touch because it fails if the file exists */
    @Override
    public FileNode mkfile() throws MkfileException {
    	try {
			if (!file.createNewFile()) {
			    throw new MkfileException(this);
			}
		} catch (IOException e) {
			throw new MkfileException(this, e);
		}
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
        
        if (OS.CURRENT == OS.WINDOWS) {
            throw new UnsupportedOperationException("link " + this + " -> " + dest);
        }
        dir = (FileNode) dest.getParent();
        dir.checkDirectory();
        dest.checkNotExists();
        new Program(dir, "ln", "-s", file.getAbsolutePath(), dest.getName()).execNoOutput();
        return dest;
    }
    
    //-- move

    /** @return dest */
    public FileNode move(FileNode dest) throws IOException {
        Program p;
        String output;
        
        dest.checkNotExists();
        if (getIO().os == OS.WINDOWS) {
            p = new Program((FileNode) dest.getParent(), "cmd", "/C", "move");
        } else {
            p = new Program((FileNode) dest.getParent(), "mv");
        }
        p.add(getAbsolute(), dest.getName());
        output = p.exec();
        if (output.length() > 0 && getIO().os != OS.WINDOWS) {
            throw new IOException("unexpected output: " + output);
        }
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
    public FileNode delete() throws DeleteException {
        try {
            delete(file);
        } catch (IOException e) {
            throw new DeleteException(this, e);
        }
        return this;
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
        
        stat = new Program(dir(), "stat");
        stat.add(OS.CURRENT.stat);
        stat.add(getAbsolute());
        return Integer.parseInt(stat.exec().trim(), 8) & 0777;
    }

    public void setMode(int mode) throws IOException {
        new Program(dir(), "chmod", Integer.toOctalString(mode), getAbsolute()).execNoOutput();
    }
    
    private FileNode dir() {
        return (FileNode) getParent();
    }
    
    //--
    
    public FileNode createTempFile() throws IOException {
        return OnShutdown.get().createFile(this);
    }
    
    public FileNode createTempDirectory() throws IOException {
        return OnShutdown.get().createDirectory(this);
    }
}

