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

import org.qooxdoo.sushi.filter.Filter;
import org.qooxdoo.sushi.util.Strings;
import org.qooxdoo.sushi.xml.Serializer;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

/**
 * <p>Node with optional children. Something you can get an input or output stream from.</p> 
 */
public abstract class Node {
    /** never null */
    public final IO io;
    public final Filesystem fs;
    
    public Node(IO io, Filesystem fs) {
        this.io = io;
        this.fs = fs;
    }
    
    /** @return node with the specified path */
    public abstract Node newInstance(String path);

    public abstract Node getBase();
    public abstract String getPath();
    
    public abstract InputStream createInputStream() throws IOException;
    public abstract OutputStream createOutputStream() throws IOException;

    public abstract List<? extends Node> list() throws ListException;

    /** @return this */ 
    public abstract Node mkdir() throws MkdirException;
    
    /** @return this */ 
    public abstract Node delete() throws DeleteException;

    // status methods
    
    public abstract long length() throws LengthException;
    public abstract boolean exists() throws ExistsException;
    public abstract boolean isFile() throws ExistsException;
    public abstract boolean isDirectory() throws ExistsException;
    
    public abstract long lastModified() throws LastModifiedException;
    public abstract void setLastModified(long millis) throws SetLastModifiedException;
    
    //-- path functionality
    
    public String getName() {
        String path;
        
        path = getPath();
        // ok for -1: 
        return path.substring(path.lastIndexOf(fs.separatorChar) + 1);
    }
    
    public Node join(List<String> paths) {
        return newInstance(fs.join(getPath(), paths));
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
        result = io.buffer.readBytes(src);
        src.close();
        return result;
    }

    public String readString() throws IOException {
        return io.settings.string(readBytes());
    }
    
    public List<String> readLines() throws IOException {
        return Strings.split(io.settings.lineSeparator, readString());
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
        return io.xml.builder.parse(this);
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
    
    public void checkExists() throws IOException {
        if (!exists()) {
            throw new IOException("no such file or directory: " + this);
        }
    }

    public void checkNotExists() throws IOException {
        if (exists()) {
            throw new IOException("file or directory already exists: " + this);
        }
    }

    public void checkDirectory() throws IOException {
        if (isDirectory()) {
            return;
        }
        if (exists()) {
            throw new IOException("directory expected: " + this);
        } else {
            throw new IOException("no such directory: " + this);
        }
    }
    
    public void checkFile() throws IOException {
        if (isFile()) {
            return;
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
        return copyDirectory(io.filter().includeAll(), dest);
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

    //--
    
    /** uses default excludes */
    public List<Node> find(String... includes) throws IOException {
        return find(io.filter().include(includes));
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

    public Node getParent() {
        String path;
        int idx;
        
        path = getPath();
        if ("".equals(path)) {
            return null;
        }
        idx = path.lastIndexOf(fs.separatorChar);
        if (idx == -1) {
            return newInstance("");
        } else {
            return newInstance(path.substring(0, idx));
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
    
    public String getRelative(Node base) {
        String startfilepath;
        String destpath;
        String common;
        StringBuilder result;
        int len;
        int ups;
        int i;
        
        if (base.equals(this)) {
            return ".";
        }
        startfilepath = base.join("foo").getPath();
        destpath = getPath();
        common = Strings.getCommon(startfilepath, destpath);
        common = common.substring(0, common.lastIndexOf(fs.separatorChar) + 1);  // ok for idx == -1
        len = common.length();
        startfilepath = startfilepath.substring(len);
        destpath = destpath.substring(len);
        result = new StringBuilder();
        ups = Strings.count(startfilepath, fs.separator);
        for (i = 0; i < ups; i++) {
            result.append(".." + fs.separator);
        }
        result.append(Strings.replace(destpath, io.os.lineSeparator, "" + io.os.lineSeparator));
        return result.toString();
    }

    //--
    
    public Node deleteOpt() throws IOException {
        if (exists()) {
            delete();
        }
        return this;
    }
    
    public Node mkdirOpt() throws IOException {
        if (!exists()) {
            mkdir();
        }
        return this;
    }

    public Node mkdirsOpt() throws IOException {
        Node parent;
        
        if (!exists()) {
            parent = getParent();
            if (parent != null) {
                parent.mkdirsOpt();
            }
            mkdir();
        }
        return this;
    }

    public Node mkdirs() throws IOException {
        if (exists()) {
            throw new IOException("cannot create directories: " + this);
        }
        return mkdirsOpt();
    }

    //-- output create functionality
    
    public NodeWriter createWriter() throws IOException {
        return NodeWriter.create(this);
    }

    public ObjectOutputStream createObjectOutputStream() throws IOException {
        return new ObjectOutputStream(createOutputStream());
    }

    public Node writeBytes(byte ... bytes) throws IOException {
        return writeBytes(bytes, 0, bytes.length);
    }

    public Node writeBytes(byte[] bytes, int ofs, int len) throws IOException {
        OutputStream out;
        
        out = createOutputStream();
        out.write(bytes, ofs, len);
        out.close();
        return this;
    }
    
    public Node writeChars(char ... chars) throws IOException {
        Writer w;
        
        w = createWriter();
        w.write(chars);
        w.close();
        return this;
    }
    
    public Node writeString(String txt) throws IOException {
        Writer w;
        
        w = createWriter();
        w.write(txt);
        w.close();
        return this;
    }
    
    public Node writeLines(String ... line) throws IOException {
        return writeLines(Arrays.asList(line));
    }
    
    public Node writeLines(List<String> lines) throws IOException {
        return writeString(Strings.join(io.settings.lineSeparator, lines));
    }

    public Node writeObject(Serializable obj) throws IOException {
        ObjectOutputStream out;

        out = createObjectOutputStream();
        out.writeObject(obj);
        out.close();
        return this;
    }

    public Node writeXml(org.w3c.dom.Node node) throws IOException {
        io.xml.serializer.serialize(node, this);
        return this;
    }

    //-- copy
    
    /** overwrites existing files */
    public void copyFile(Node dest) throws IOException {
        InputStream in;
        
        in = createInputStream();
        io.buffer.copy(in, dest);
        in.close();
    }

    //-- other

    public void gzip(Node dest) throws IOException {
        InputStream in;
        OutputStream out;
        
        in = createInputStream();
        out = new GZIPOutputStream(dest.createOutputStream());
        io.buffer.copy(in, out);
        in.close();
        out.close();
    }

    public void gunzip(Node dest) throws IOException {
        InputStream in;
        OutputStream out;
        
        in = new GZIPInputStream(createInputStream());
        out = dest.createOutputStream();
        io.buffer.copy(in, out);
        in.close();
        out.close();
    }

    public String md5() throws IOException {
        InputStream src;
        StringBuilder result;
        
        src =  createInputStream();
        MessageDigest complete;
        try {
            complete = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        io.buffer.digest(src, complete);
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
        return diff(right, new Buffer(io.buffer));
    }
    
    public boolean diff(Node right, Buffer rightBuffer) throws IOException {
        InputStream leftSrc;
        InputStream rightSrc;
        Buffer leftBuffer;
        int leftChunk;
        int rightChunk;
        
        leftBuffer = io.buffer;
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
        return equalsNode(node);
    }

    // called if node type and path have already been checked
    protected abstract boolean equalsNode(Node node);

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
    
    public String getAbsolute() {
        return fs.root + getPath();  // TODO: this is ok for FileNodes only ...
    }
}
