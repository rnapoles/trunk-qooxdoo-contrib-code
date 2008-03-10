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
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.qooxdoo.sushi.filter.Filter;
import org.qooxdoo.sushi.memory.Context;
import org.qooxdoo.sushi.memory.MemoryNode;
import org.qooxdoo.sushi.util.Reflect;
import org.qooxdoo.sushi.util.Strings;
import org.qooxdoo.sushi.xml.Xml;

/**
 * <p>Access to the filesystem, various default settings, default nodes and node factory. 
 * Not thread save, every thread should have it's own instance. </p>
 * 
 * <p>Name: I used to call this class Context, but there are way to many context classes around. 
 * Calling it Settings is not appropriate because of the various read and write methods.
 * And calling it Filesystem suggests a singleton, which is wrong, and it's longer than just IO.</p>
 */
public class IO {
    private static final TempFiles TEMP_FILES;
    static {
        TEMP_FILES = new TempFiles();
        Runtime.getRuntime().addShutdownHook(TEMP_FILES);
    }
    
    //--
    
    public final OS os;
    
    /** never null */
    public final Buffer buffer;
    
    public final Settings settings;
    
    /** never null */
    public final Xml xml;

    private FileNode home;
    private FileNode temp;
    private FileNode working;
    
    private final List<String> defaultExcludes;
    
    public final int maxInMemorySize;
    
    public IO() {
        this(OS.CURRENT, new Settings(), new Buffer(), 32 * 1024, new Xml(), "**/.svn", "**/.svn/**/*");
    }
    
    public IO(OS os, Settings settings, Buffer buffer, int maxInMemorySize, Xml xml, String... defaultExcludes) {
        this.os = os;
        this.settings = settings;
        this.buffer = buffer;
        this.maxInMemorySize = maxInMemorySize;

        this.temp = init("java.io.tmpdir");
        this.home = init("user.home");
        this.working = init("user.dir");
        
        this.xml = xml;
        this.defaultExcludes = new ArrayList<String>(Arrays.asList(defaultExcludes));
    }

    //--
    
    public FileNode getHome() {
        return home;
    }

    public IO setHome(FileNode home) {
        this.home = home;
        return this;
    }
    
    /** current working directory */
    public FileNode getWorking() {
        return working;
    }

    /** current working directory */
    public IO setWorking(FileNode working) {
        this.working = working;
        return this;
    }
    
    public FileNode getTemp() {
        return temp;
    }
    
    public IO setTemp(FileNode temp) {
        this.temp = temp;
        return this;
    }
    
    //--

    public Filter filter() {
        Filter filter;
        
        filter = new Filter();
        filter.exclude(defaultExcludes);
        return filter;
    }

    public List<String> defaultExcludes() {
        return defaultExcludes;
    }
    
    //-- Node creation helper
    
    public FileNode node(String path) {
        return node(new File(path));
    }

    /** CAUTION: relative to io.getCwd() */
    public FileNode node(File file) {
        if (".".equals(file.getPath())) {
            return new FileNode(this, getWorking(), getWorking().getFile());
        }
        if (file.isAbsolute()) {
            return new FileNode(this, null, file);
        } else {
            return new FileNode(this, getWorking(), new File(getWorking().getFile(), file.getPath()).getAbsoluteFile());
        }
    }
    
    // TODO: re-use context?
    public MemoryNode stringNode(String content) {
        try {
            return (MemoryNode) new Context(this).node("tmp").writeString(content);
        } catch (IOException e) {
            throw new RuntimeException("unexpected", e);
        }
    }
    
    /**
     * Returns a File from a given location. TODO: replace by java.net.Uri.
     *
     * @param url the given location of the file
     *
     * @return the file
     */
    public FileNode node(URL url) {
        try {
            return node(URLDecoder.decode(url.getFile(), 
                    Settings.UTF_8).replace('/', File.separatorChar)); // ' ' might be encoded by %20 on windows
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("expected on every platform", e);
        }
    }
    
    //-- 
    
    public List<FileNode> path(String path) {
        List<FileNode> result;
        
        result = new ArrayList<FileNode>();
        for (String str: Strings.split(os.listSeparator, path)) {
            result.add(node(str));
        }
        return result;
    }

    public List<FileNode> classpath(String path) throws IOException {
        List<FileNode> result;
        
        result = path(path);
        for (FileNode node : result) {
            node.checkExists();
        }
        return result;
    }

    //-- 
    
    public FileNode createTempFile() throws IOException {
        FileNode file;
        
        file = new FileNode(this, File.createTempFile("sushifile", "tmp", temp.getFile()));
        TEMP_FILES.deleteAtExit(file);
        return file;
    }
    
    public FileNode createTempDirectory() throws IOException {
        FileNode dir;

        while (true) {
            dir = (FileNode) temp.join("sushidir" + TEMP_FILES.random() + "tmp");
            if (!dir.exists()) {
                // TODO: how to do this atomically?
                dir.mkdir();
                TEMP_FILES.deleteAtExit(dir);
                return dir;
            }
        }
    }

    /**
     * Returns the file or directory containing the specified resource.
     *
     * @param c the source class
     *
     * @return the physical file defining the class
     */
    public FileNode locateClasspathItem(String resourcename) {
        return locateClasspathItem(getClass(), resourcename);
    }

    /**
     * Returns the file or directory containing the specified class.
     *
     * @param c the source class
     *
     * @return the physical file defining the class
     */
    public FileNode locateClasspathItem(Class<?> c) {
        return locateClasspathItem(c, Reflect.resourceName(c));
    }

    /** Throws a RuntimeException if the resource is not found */
    public FileNode locateClasspathItem(Class<?> base, String resourcename) {
        URL url;
        FileNode file;
        
        url = base.getResource(resourcename);
        if (url == null) {
            throw new RuntimeException("no such resource: " + resourcename);
        }
        file = locateClasspathItem(url, resourcename);
        if (!file.exists()) {
            throw new RuntimeException("no such file or directory: " + file);
        }
        file = locateClasspathItem(url, resourcename);
        if (!file.exists()) {
            throw new RuntimeException("no such file or directory: " + file);
        }
        return file;
    }

    public FileNode guessProjectHome(Class<?> c) {
        FileNode node;
        
        node = locateClasspathItem(c);
        if (node.isDirectory()) {
            if (node.getName().endsWith("classes")) {
                node = (FileNode) node.getParent();
            }
        } else {
            if (node.getName().endsWith(".jar")) {
                node = (FileNode) node.getParent();
            }
        }
        if (node.getName().endsWith("target")) {
            node = (FileNode) node.getParent();
        }
        return node;
    }

    /**
     * Returns the file of a certain class at a special location. e.g. jar files
     *
     * @param url the destination path to the resource
     * @param resourcename  absolute resource name; redundant, but necessary to strip from urls
     *
     * @return the physical file referring to the class
     */
    public FileNode locateClasspathItem(URL url, String resourcename) {
        String filename;
        FileNode file;
        String protocol;
        int idx;
        
        if (!resourcename.startsWith("/")) {
            throw new IllegalArgumentException("absolute resourcename expected: " + resourcename);
        }
        protocol = url.getProtocol();
        if ("file".equals(protocol)) {
            file = node(url);
            filename = file.getAbsolute();
            if (!filename.endsWith(resourcename.replace('/', File.separatorChar))) {
                throw new RuntimeException("classname not found in file url: " + filename + " " + resourcename);
            }
            file = new FileNode(this, new File(filename.substring(0, filename.length() - resourcename.length())));
        } else if ("jar".equals(protocol)) {
            filename = url.getFile();
            idx = filename.indexOf('!');
            if (idx == -1) {
                throw new RuntimeException("! not found: " + filename);
            }
            filename = filename.substring(0, idx);
            try {
                file = node(new URL(filename));
            } catch (MalformedURLException e) {
                throw new RuntimeException(filename, e);
            }
        } else {
            throw new RuntimeException("protocol not supported: " + protocol);
        }
        return file;
    }
    
    private FileNode init(String name) {
        String value;
        File file;

        value = System.getProperty(name);
        if (value == null) {
            throw new IllegalStateException("property not found: " + name);
        }
        file = new File(value);
        if (!file.isDirectory()) { // TODO: move to Node?
            throw new IllegalStateException(
                "property " + name + " does not point to a directory: " + value);
        }
        return node(file);
    }
}
