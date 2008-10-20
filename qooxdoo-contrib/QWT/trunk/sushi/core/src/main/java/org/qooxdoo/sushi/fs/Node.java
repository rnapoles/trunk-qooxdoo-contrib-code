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

package org.qooxdoo.sushi.fs;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.io.Serializable;
import java.io.Writer;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

import javax.xml.transform.Templates;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.sax.SAXSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;

import org.qooxdoo.sushi.fs.filter.Filter;
import org.qooxdoo.sushi.io.Buffer;
import org.qooxdoo.sushi.util.Strings;
import org.qooxdoo.sushi.xml.Serializer;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

/**
 * <p>Abstraction from a file: something stored under a path and you can get an input or output stream from. 
 * FileNode is probably the most prominent example of a node. Provides more methods compared to java.io.File, 
 * especially for scripting. Also, it removes some redundant methods to simplify the api (in particular the 
 * constructors).</p>

 * <p>A node is identified by a locator. It has a root, and a path. A node can have child nodes and a base.</p>
 *
 * <p>A locator is similar to a URL, it has the form filesystem ":" root separator path.</p>
 * 
 * <p>The Root is, e.g. "/" on a unix machine, a drive letter on windows, or a hostname with login
 * information for ssh nodes.</p>
 *
 * <p>The path is a sequence of names separated by the filesystem separator. It never starts 
 * or ends with a separator. It does not include the root, but it always includes the path
 * of the base. A node with an empty path is called root node.
 *   
 * <p>The base is a node this node is relative to. It's optional, a node without base is called absolute.
 * It's use to simplify (shorten!) toString output.</p>
 * 
 * <p>You application usually creates some "working-directory" nodes with <code>io.node(locator)</code>.
 * They will be used to create actual working nodes with <code>node.join(path)</code>. The constructor 
 * of the respective node class is rarely used directly, it's used indirectly by the filesystem. </p>
 * 
 * <p>A node is immutable, except for its base.</p>
 */
public abstract class Node {
    /** may be null */
    private Node base;
    
    public Node() {
        this.base = null;
    }
    
    protected void unsupported(String op) {
        throw new UnsupportedOperationException(getLocator() + ":" + op);
    }
    
    public abstract Root getRoot();
    
    public IO getIO() {
        return getRoot().getFilesystem().getIO();
    }

    public abstract InputStream createInputStream() throws IOException;

    public OutputStream createOutputStream() throws IOException {
        return createOutputStream(false);
    }
    public OutputStream createAppendStream() throws IOException {
        return createOutputStream(true);
    }
    
    public abstract OutputStream createOutputStream(boolean append) throws IOException;

    /** lists child nodes or null if this is not a directory */
    public abstract List<? extends Node> list() throws ListException;

    /**
     * Fails if the directory already exists. TODO: atomic operation
     * @return this
     */ 
    public abstract Node mkdir() throws MkdirException;
    
    /**
     * Fails if the directory already exists. TODO: this is not an atomic implementation;
     * FileNode overrides it for that reason.
     * @return this
     */
    public Node mkfile() throws MkfileException {
    	try {
			if (exists()) {
				throw new MkfileException(this);
			}
			writeBytes();
		} catch (IOException e) {
			throw new MkfileException(this, e);
		}
		return this;
    }
    
    
    /** @return this */ 
    public abstract Node delete() throws DeleteException;

    //-- status methods
    
    public abstract long length() throws LengthException;
    public abstract boolean exists() throws ExistsException;
    public abstract boolean isFile() throws ExistsException;
    public abstract boolean isDirectory() throws ExistsException;
    
    public abstract long getLastModified() throws LastModifiedException;
    public abstract void setLastModified(long millis) throws SetLastModifiedException;
    
    //-- path functionality

    /**
     * The node to which this node is relative to, aka kind of a working directory. Mostly affects 
     * toString(). There's currently no setBase, although it would generalize "base" handling to arbitrary 
     * node implementations ...
     * 
     * @return null for absolute file
     */
    public Node getBase() {
        return base;
    }

    public void setBase(Node base) {
        if (base != null && !getRoot().equals(base.getRoot())) {
            throw new IllegalArgumentException(getRoot() + " conflicts " + base.getRoot());
        }
        this.base = base;
    }

    public abstract String getPath();
    
    public String getLocator() {
        return getRoot().getFilesystem().getName() + ":" + getRoot().getId() + getPath();
    }

    /** @return the last path segment (or an empty string for the root node */ 
    public String getName() {
        String path;
        
        path = getPath();
        // ok for -1: 
        return path.substring(path.lastIndexOf(getRoot().getFilesystem().getSeparatorChar()) + 1);
    }
    
    public Node getParent() {
        String path;
        int idx;
        
        path = getPath();
        if ("".equals(path)) {
            return null;
        }
        idx = path.lastIndexOf(getRoot().getFilesystem().getSeparatorChar());
        if (idx == -1) {
            return getRoot().node("");
        } else {
            return getRoot().node(path.substring(0, idx));
        }
    }

    public boolean hasAnchestor(Node anchestor) {
        Node current;
        
        current = this;
        while (true) {
            current = current.getParent();
            if (current == null) {
                return false;
            }
            if (current.equals(anchestor)) {
                return true;
            }
        }
    }
    
    /** @return kind of a path, with . and .. where appropriate. */
    public String getRelative(Node base) {
        String startfilepath;
        String destpath;
        String common;
        StringBuilder result;
        int len;
        int ups;
        int i;
        Filesystem fs;
        
        if (base.equals(this)) {
            return ".";
        }
        fs = getRoot().getFilesystem();
        startfilepath = base.join("foo").getPath();
        destpath = getPath();
        common = Strings.getCommon(startfilepath, destpath);
        common = common.substring(0, common.lastIndexOf(fs.getSeparatorChar()) + 1);  // ok for idx == -1
        len = common.length();
        startfilepath = startfilepath.substring(len);
        destpath = destpath.substring(len);
        result = new StringBuilder();
        ups = Strings.count(startfilepath, fs.getSeparator());
        for (i = 0; i < ups; i++) {
            result.append(".." + fs.getSeparator());
        }
        result.append(Strings.replace(destpath, getIO().os.lineSeparator, "" + getIO().os.lineSeparator));
        return result.toString();
    }

    /** @return root.id + getPath, but not the filesystem name. Note that it's not a path! */ 
    public String getAbsolute() {
        return getRoot().getId() + getPath();
    }
    
    public Node join(List<String> paths) {
        Node result;
        
        result = getRoot().node(getRoot().getFilesystem().join(getPath(), paths));
        result.setBase(getBase());
        return result;
    }
    
    public Node join(String... names) {
        return join(Arrays.asList(names));
    }

    //-- input stream functionality
    
    public NodeReader createReader() throws IOException {
        return NodeReader.create(this);
    }

    public ObjectInputStream createObjectInputStream() throws IOException {
        return new ObjectInputStream(createInputStream());
    }

    public byte[] readBytes() throws IOException {
        InputStream src;
        byte[] result;
        
        src = createInputStream();
        result = getIO().getBuffer().readBytes(src);
        src.close();
        return result;
    }

    // TODO: expensive - both string and byte in memory
    public String readString() throws IOException {
        return getIO().getSettings().string(readBytes());
    }
    
    public List<String> readLines() throws IOException {
        return new LineCollector(LineProcessor.INITIAL_BUFFER_SIZE, false, true, null).collect(this);
    }

    public Object readObject() throws IOException {
        ObjectInputStream src;
        Object result;
        
        src = createObjectInputStream();
        try {
            result = src.readObject();
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
        src.close();
        return result;
    }

    public Document readXml() throws IOException, SAXException {
        return getIO().getXml().builder.parse(this);
    }

    public Transformer readXsl() throws IOException, TransformerConfigurationException {
        InputStream in;
        Templates templates;

        in = createInputStream();
        templates = Serializer.templates(new SAXSource(new InputSource(in)));
        in.close();
        return templates.newTransformer();
    }

    public void xslt(Transformer transformer, Node dest) throws IOException, TransformerException {
        InputStream in;
        OutputStream out;
            
        in = createInputStream();
        out = dest.createOutputStream();
        transformer.transform(new StreamSource(in), new StreamResult(out));
        out.close();
        in.close();
    }

    //--
    
    public Node checkExists() throws IOException {
        if (!exists()) {
            throw new IOException("no such file or directory: " + this);
        }
        return this;
    }

    public Node checkNotExists() throws IOException {
        if (exists()) {
            throw new IOException("file or directory already exists: " + this);
        }
        return this;
    }

    public Node checkDirectory() throws IOException {
        if (isDirectory()) {
            return this;
        }
        if (exists()) {
            throw new IOException("directory expected: " + this);
        } else {
            throw new IOException("no such directory: " + this);
        }
    }
    
    public Node checkFile() throws IOException {
        if (isFile()) {
            return this;
        }
        if (exists()) {
            throw new IOException("file expected: " + this);
        } else {
            throw new IOException("no such file: " + this);
        }
    }
    
    //--
    
    public void copy(Node dest) throws IOException {
        if (isDirectory()) {
            dest.mkdirOpt(); 
            copyDirectory(dest);
        } else {
            copyFile(dest);
        }
    }

    public List<Node> copyDirectory(Node dest) throws IOException {
        return copyDirectory(getIO().filter().includeAll(), dest);
    }

    /**
     * Overwrites existing files
     * @return source files actually copied, no directories 
     */
    public List<Node> copyDirectory(Filter filter, Node destRoot) throws IOException {
        String relative;
        Node dest;
        List<Node> result;
        
        if (!destRoot.isDirectory()) {
            throw new FileNotFoundException("no such directory: " + destRoot);
        }
        result = new ArrayList<Node>();
        for (Node src : find(filter)) {
            relative = src.getRelative(this);
            dest = destRoot.join(relative);
            if (src.isDirectory()) {
                dest.mkdirs();
            } else {
                dest.getParent().mkdirsOpt();
                src.copyFile(dest);
                result.add(src);
            }
        }
        return result;
    }

    //-- search for child nodes
    
    /** uses default excludes */
    public List<Node> find(String... includes) throws IOException {
        return find(getIO().filter().include(includes));
    }
    
    public Node findOne(String include) throws IOException {
        Node found;
        
        found = findOpt(include);
        if (found == null) {
            throw new FileNotFoundException(toString() + ": not found: " + include);
        }
        return found;
    }

    public Node findOpt(String include) throws IOException {
        List<Node> found;
        
        found = find(include);
        switch (found.size()) {
        case 0: 
            return null;
        case 1:
            return found.get(0);
        default: 
            throw new IOException(toString() + ": ambiguous: " + include); 
        }
    }

    public List<Node> find(Filter filter) throws IOException {
        return filter.collect(this);
    }
    
    //--
    
    public Node deleteOpt() throws IOException {
        if (exists()) {
            delete();
        }
        return this;
    }
    
    public Node mkdirOpt() throws MkdirException {
        try {
			if (!exists()) {
			    mkdir();
			}
		} catch (ExistsException e) {
			throw new MkdirException(this, e);
		}
        return this;
    }

    public Node mkdirsOpt() throws MkdirException {
        Node parent;
        
        try {
			if (!exists()) {
			    parent = getParent();
			    if (parent != null) {
			        parent.mkdirsOpt();
			    }
			    mkdir();
			}
		} catch (ExistsException e) {
			throw new MkdirException(this, e);
		}
        return this;
    }

    public Node mkdirs() throws MkdirException {
    	try {
    		if (exists()) {
    			throw new MkdirException(this);
    		}
    	    return mkdirsOpt();
    	} catch (IOException e) {
    		throw new MkdirException(this, e);
    	}
    }

    //-- output create functionality
    
    public NodeWriter createWriter() throws IOException {
        return createWriter(false);
    }

    public NodeWriter createAppender() throws IOException {
        return createWriter(true);
    }

    public NodeWriter createWriter(boolean append) throws IOException {
        return NodeWriter.create(this, append);
    }

    public ObjectOutputStream createObjectOutputStream() throws IOException {
        return new ObjectOutputStream(createOutputStream());
    }

    public Node writeBytes(byte ... bytes) throws IOException {
        return writeBytes(bytes, 0, bytes.length, false);
    }

    public Node appendBytes(byte ... bytes) throws IOException {
        return writeBytes(bytes, 0, bytes.length, true);
    }

    public Node writeBytes(byte[] bytes, int ofs, int len, boolean append) throws IOException {
        OutputStream out;
        
        out = createOutputStream(append);
        out.write(bytes, ofs, len);
        out.close();
        return this;
    }
    
    public Node writeChars(char ... chars) throws IOException {
        return writeChars(chars, 0, chars.length, false);
    }
    
    public Node appendChars(char ... chars) throws IOException {
        return writeChars(chars, 0, chars.length, true);
    }
    
    public Node writeChars(char[] chars, int ofs, int len, boolean append) throws IOException {
        Writer out;
        
        out = createWriter(append);
        out.write(chars, ofs, len);
        out.close();
        return this;
    }
    
    public Node writeString(String txt) throws IOException {
        Writer w;
        
        w = createWriter();
        w.write(txt);
        w.close();
        return this;
    }
    
    public Node appendString(String txt) throws IOException {
        Writer w;
        
        w = createAppender();
        w.write(txt);
        w.close();
        return this;
    }
    
    public Node writeLines(String ... line) throws IOException {
        return writeLines(Arrays.asList(line));
    }
    
    public Node writeLines(List<String> lines) throws IOException {
        return writeString(Strings.join(getIO().getSettings().lineSeparator, lines));
    }

    public Node appendLines(String ... line) throws IOException {
        return appendLines(Arrays.asList(line));
    }
    
    public Node appendLines(List<String> lines) throws IOException {
        return appendString(Strings.join(getIO().getSettings().lineSeparator, lines));
    }

    public Node writeObject(Serializable obj) throws IOException {
        ObjectOutputStream out;

        out = createObjectOutputStream();
        out.writeObject(obj);
        out.close();
        return this;
    }

    public Node writeXml(org.w3c.dom.Node node) throws IOException {
        getIO().getXml().serializer.serialize(node, this);
        return this;
    }

    //-- copy
    
    /** 
     * Overwrites existing files.
     * @return dest 
     */
    public Node copyFile(Node dest) throws IOException {
        InputStream in;
        
        in = createInputStream();
        getIO().getBuffer().copy(in, dest);
        in.close();
        return dest;
    }

    //-- other

    public void gzip(Node dest) throws IOException {
        InputStream in;
        OutputStream out;
        
        in = createInputStream();
        out = new GZIPOutputStream(dest.createOutputStream());
        getIO().getBuffer().copy(in, out);
        in.close();
        out.close();
    }

    public void gunzip(Node dest) throws IOException {
        InputStream in;
        OutputStream out;
        
        in = new GZIPInputStream(createInputStream());
        out = dest.createOutputStream();
        getIO().getBuffer().copy(in, out);
        in.close();
        out.close();
    }

    public String sha() throws IOException {
        try {
            return digest("SHA");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    public String md5() throws IOException {
        try {
            return digest("MD5");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
    
    public String digest(String name) throws IOException, NoSuchAlgorithmException {
        InputStream src;
        StringBuilder result;
        
        src =  createInputStream();
        MessageDigest complete;

        complete = MessageDigest.getInstance(name);
        getIO().getBuffer().digest(src, complete);
        src.close();
        result = new StringBuilder();
        for (byte b : complete.digest()) {
            // two parts to head leading zeros
            result.append(Integer.toString(b >> 4 & 0xf, 16));
            result.append(Integer.toString(b & 0xf, 16));
        }
        return result.toString();
    }
    
    public boolean diff(Node right) throws IOException {
        return diff(right, new Buffer(getIO().getBuffer()));
    }
    
    public boolean diff(Node right, Buffer rightBuffer) throws IOException {
        InputStream leftSrc;
        InputStream rightSrc;
        Buffer leftBuffer;
        int leftChunk;
        int rightChunk;
        
        leftBuffer = getIO().getBuffer();
        leftSrc = createInputStream();
        rightSrc = right.createInputStream();
        do {
            leftChunk = leftBuffer.fill(leftSrc);
            rightChunk = rightBuffer.fill(rightSrc);
            if (leftChunk != rightChunk) {
                return true;
            }
            if (leftBuffer.diff(rightBuffer, leftChunk)) {
                return true;
            }
        } while (leftChunk > 0);
        return false;
    }
    
    //-- Object functionality
    
    @Override
    public boolean equals(Object obj) {
        Node node;
        
        if (obj == null || !getClass().equals(obj.getClass())) {
            return false;
        }
        node = (Node) obj;
        if (!getPath().equals(node.getPath())) {
            return false;
        }
        return getRoot().equals(node.getRoot());
    }

    @Override
    public int hashCode() {
        return getPath().hashCode();
    }

    /**
     * Returns a String representation suitable for messages.
     * 
     * CAUTION: don't use to convert to a string, use getRelative and getAbsolute() instead. 
     * Also call the respective getter if the difference matters for your representation. 
     */
    @Override
    public final String toString() {
        Node base;
        
        base = getBase();
        if (base == null) {
            return getAbsolute();
        } else {
            return getRelative(base);
        }
    }
}
