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

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.InvocationTargetException;
import java.net.URL;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.qooxdoo.sushi.fs.file.FileFilesystem;
import org.qooxdoo.sushi.fs.file.FileNode;
import org.qooxdoo.sushi.fs.filter.Filter;
import org.qooxdoo.sushi.fs.http.HttpFilesystem;
import org.qooxdoo.sushi.fs.http.HttpNode;
import org.qooxdoo.sushi.fs.memory.MemoryFilesystem;
import org.qooxdoo.sushi.fs.memory.MemoryNode;
import org.qooxdoo.sushi.fs.zip.ZipNode;
import org.qooxdoo.sushi.io.Buffer;
import org.qooxdoo.sushi.io.OS;
import org.qooxdoo.sushi.util.Reflect;
import org.qooxdoo.sushi.util.Strings;
import org.qooxdoo.sushi.xml.Xml;

/**
 * <p>Configures and creates nodes. You'll usually create a single IO instance in your application, configure it and 
 * afterwards use it through-out your application to create nodes via IO.node or 
 * IO.file. </p>
 * 
 * <p>Sushi's FS subsystem forms a tree: An IO object is the root, having filesystems as it's children, roots as 
 * grand-children and nodes as leafes. This tree is traversable from nodes up to the IO object via Node.getRoot(), 
 * Root.getFilesystem() and Filesystem.getIO(), which is used internally e.g. to pick default encoding settings 
 * from IO. (Traversing in reverse order is not implemented - to resource consuming)</p>
 * 
 * <p>You can creates as many IO objects as you which, but using nodes from different IO objectes cannot interact
 * so you'll usually stick with a single IO instance.</p>  
 * 
 * <p>TODO: Multi-Threading. Currently, you need to know fs system internals to propertly synchronized
 * multi-threaded applications.</p>
 */
public class IO {
    public final OS os;
    
    /** never null */
    private final Buffer buffer;
    
    private final Settings settings;
    
    /** never null */
    private final Xml xml;

    private Node home;
    
    /** Intentionally not a file -- see Tempfiles for a rationale */
    private FileNode temp;
    private Node working;
    
    private final List<String> defaultExcludes;
    
    private final Map<String, Filesystem> filesystems;
    private final FileFilesystem fileFilesystem;
    
    public IO() {
        this(OS.CURRENT, new Settings(), new Buffer(), "**/.svn", "**/.svn/**/*");
    }
    
    public IO(OS os, Settings settings, Buffer buffer, String... defaultExcludes) {
        this.os = os;
        this.settings = settings;
        this.buffer = buffer;
        this.filesystems = new HashMap<String, Filesystem>();
        try {
            initFilesystems();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        this.fileFilesystem = getFilesystem(FileFilesystem.class);
        this.temp = init("java.io.tmpdir");
        this.home = init("user.home");
        this.working = init("user.dir");
        
        this.xml = new Xml();
        this.defaultExcludes = new ArrayList<String>(Arrays.asList(defaultExcludes));
    }

    //-- configuration
    
    public Node getHome() {
        return home;
    }

    public IO setHome(Node home) {
        this.home = home;
        return this;
    }
    
    /** current working directory */
    public Node getWorking() {
        return working;
    }

    /** current working directory */
    public IO setWorking(Node working) {
        this.working = working;
        return this;
    }
    
    public FileNode getTemp() {
        return temp;
    }

    // TODO: node
    public IO setTemp(FileNode temp) {
        this.temp = temp;
        return this;
    }
    
    public Buffer getBuffer() {
        return buffer;
    }

    public Settings getSettings() {
        return settings;
    }

    public Xml getXml() {
        return xml;
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
    
    //-- Node creation

    public FileNode file(File file) {
        return file(file.getAbsolutePath());
    }
    
    public FileNode file(String rootPath) {
        return (FileNode) node(fileFilesystem, rootPath);
    }
    
    public Node node(String locatorOrDot) throws LocatorException {
        Node result;
        int idx;
        String name;
        Filesystem fs;
        
        if (locatorOrDot.equals(".")) {
            result = node(working.getLocator());
            result.setBase(working);
            return result;
        }
        idx = locatorOrDot.indexOf(Filesystem.SEPARTOR);
        if (idx == -1) {
            fs = defaultFs(working);
        } else {
            name = locatorOrDot.substring(0, idx);
            fs = filesystems.get(name);
            if (fs == null) {
                fs = defaultFs(working);
            }
        }
        return node(fs, locatorOrDot.substring(idx + 1));
    }
    
    /** Creates a node if you already know the file system */
    public Node node(Filesystem fs, String rootPath) throws LocatorException {
        Root root;
        Node result;
        StringBuilder pathBuilder;
        String path;
        String separator;
        
        separator = fs.getSeparator();
        pathBuilder = new StringBuilder();
        try {
            root = fs.rootPath(rootPath, pathBuilder);
        } catch (RootPathException e) {
            throw new LocatorException(fs.getName() + ":" + rootPath, e.getMessage(), e.getCause());
        }
        if (root == null) {
            if (working == null || fs != working.getRoot().getFilesystem()) {
                throw new LocatorException(fs.getName() + ":" + rootPath, "no working directory for filesystem " + fs.getName());
            }
            result = working.join(rootPath);
            result.setBase(working);
        } else {
            path = pathBuilder.toString();
            if (path.endsWith(separator)) {
                throw new LocatorException(fs.getName() + ":" + rootPath, "unexpected tailing " + separator);
            }
            if (path.startsWith(separator)) {
                throw new LocatorException(fs.getName() + ":" + rootPath, "unexpected heading " + separator);
            }
            result = root.node(path);
        }
        return result;
    }
    
    // TODO: re-use root?
    public MemoryNode stringNode(String content) {
        MemoryFilesystem memFs;
        
        memFs = getMemoryFilesystem();
        try {
            return (MemoryNode) memFs.root().node("tmp").writeString(content);
        } catch (IOException e) {
            throw new RuntimeException("unexpected", e);
        }
    }
    
    public MemoryFilesystem getMemoryFilesystem() {
        return getFilesystem(MemoryFilesystem.class);
    }

    public FileFilesystem getFileFilesystem() {
        return fileFilesystem;
    }
    
    /**
     * Returns a File from a given location. TODO: replace by java.net.Uri.
     *
     * @param url the given location of the file
     *
     * @return the file
     */
    public Node node(URL url) {
        String protocol;
        HttpFilesystem fs;
        String filename;
        int idx;
        ZipNode zip;
        
        protocol = url.getProtocol();
        if ("http".equals(protocol)) {
            fs = getFilesystem(HttpFilesystem.class);
            return fs.root(url).node(HttpNode.getPath(url));
        } else if ("file".equals(protocol)) {
            try {
                return node(URLDecoder.decode(url.getFile(), 
                        Settings.UTF_8).replace('/', File.separatorChar)); // ' ' might be encoded by %20 on windows
            } catch (UnsupportedEncodingException e) {
                throw new RuntimeException("expected on every platform", e);
            }
        } else if (url.getProtocol().equals("jar")) {
            filename = url.getFile();
            if (!filename.startsWith("file:")) {
                throw new IllegalArgumentException(filename);
            }
            filename = filename.substring(5);
            idx = filename.indexOf('!');
            if (idx == -1) {
                throw new RuntimeException("! not found: " + filename);
            }
            try {
                zip = file(filename.substring(0, idx)).openZip();
            } catch (IOException e) {
                throw new InstantiateException(url.toString() + ": " + e.getMessage(), e);
            }
            filename = filename.substring(idx + 1);
            if (!filename.startsWith("/")) {
                throw new IllegalArgumentException(filename);
            }
            return zip.join(filename.substring(1));
        } else {
            throw new UnsupportedOperationException("" + url);
        }
    }
    
    //-- 
    
    public List<Node> path(String path) throws LocatorException {
        List<Node> result;
        
        result = new ArrayList<Node>();
        for (String str: Strings.split(os.listSeparator, path)) {
            result.add(node(str));
        }
        return result;
    }

    public List<Node> classpath(String path) throws IOException {
        List<Node> result;
        
        result = path(path);
        for (Node node : result) {
            node.checkExists();
        }
        return result;
    }

    //-- 
    
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
            file = (FileNode) node(url);
            filename = file.getAbsolute();
            if (!filename.endsWith(resourcename.replace('/', File.separatorChar))) {
                throw new RuntimeException("classname not found in file url: " + filename + " " + resourcename);
            }
            file = file(filename.substring(0, filename.length() - resourcename.length()));
        } else if ("jar".equals(protocol)) {
            filename = url.getFile();
            if (!filename.startsWith("file:")) {
                throw new IllegalArgumentException(filename);
            }
            filename = filename.substring(5);
            idx = filename.indexOf('!');
            if (idx == -1) {
                throw new RuntimeException("! not found: " + filename);
            }
            filename = filename.substring(0, idx);
            file = file(filename);
        } else {
            throw new RuntimeException("protocol not supported: " + protocol);
        }
        return file;
    }
    
    //--
    
    // cannot use Nodes/IO because they're not yet initialized
    public void initFilesystems() throws IOException {
        String descriptor;
        Enumeration<URL> e;
        URL url;
        InputStream src;
        Buffer buffer;
        String content;
        
        descriptor = "META-INF/sushi/filesystems";
        buffer = new Buffer();
        e = getClass().getClassLoader().getResources(descriptor);
        while (e.hasMoreElements()) {
            url = e.nextElement();
            src = url.openStream();
            content = buffer.readString(src, Settings.UTF_8);
            for (String line : Strings.split("\n", content)) {
                line = line.trim();
                if (line.length() > 0) {
                    try {
                        addFilesystem(line.trim());
                    } catch (IllegalArgumentException e2) {
                        System.out.println("TODO: " + url + ":" + e2.getMessage());
                    }
                }
            }
            src.close();
        }
    }
    
    public void addFilesystem(String filesystemClass) {
        Class<?> clazz;
        Filesystem fs;
        
        try {
            clazz = Class.forName(filesystemClass);
        } catch (ClassNotFoundException e) {
            throw new IllegalArgumentException("unkown class: " + filesystemClass, e);
        }
        try {
            fs = (Filesystem) clazz.getConstructor(IO.class).newInstance(this);
        } catch (InstantiationException e) {
            throw new IllegalArgumentException("cannot get instance", e);
        } catch (InvocationTargetException e) {
            throw new IllegalArgumentException("cannot get instance", e);
        } catch (NoSuchMethodException e) {
            throw new IllegalArgumentException("cannot get instance", e);
        } catch (IllegalAccessException e) {
            throw new IllegalArgumentException("cannot get instance", e);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("cannot get instance", e);
        } catch (SecurityException e) {
            throw new IllegalArgumentException("cannot get instance", e);
        }
        addFilesystem(fs);
    }

    public void addFilesystem(Filesystem filesystem) {
        String name;
        
        name = filesystem.getName();
        if (filesystems.containsKey(name)) {
            throw new IllegalArgumentException("duplicate filesystem name: " + name);
        }
        filesystems.put(name, filesystem);
    }
    
    private Filesystem defaultFs(Node working) {
        if (working == null) {
            return fileFilesystem;
        } else {
            return working.getRoot().getFilesystem();
        }
    }

    public <T extends Filesystem> T getFilesystem(Class<T> c) {
        T result;
        
        result = lookupFilesystem(c);
        if (result == null) {
            throw new IllegalArgumentException("no such filesystem: " + c.getName());
        }
        return result;
    }

    public <T extends Filesystem> T lookupFilesystem(Class<T> c) {
        for (Filesystem fs : filesystems.values()) {
            if (fs.getClass().equals(c)) {
                return (T) fs;
            }
        }
        return null;
    }
    
    //--
    
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
        return (FileNode) node(file.getAbsolutePath());
    }
}
