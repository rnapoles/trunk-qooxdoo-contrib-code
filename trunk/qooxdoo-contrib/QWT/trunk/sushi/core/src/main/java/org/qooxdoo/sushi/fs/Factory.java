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

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.InvocationTargetException;
import java.net.URL;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import org.qooxdoo.sushi.io.Buffer;
import org.qooxdoo.sushi.util.Strings;

/** Knows the available filesystems and how to create them */
public class Factory {
    private final IO io;
    private final Map<String, Filesystem> map;
    private Filesystem dflt;
    
    public Factory(IO io) {
        this.io = io;
        this.map = new HashMap<String, Filesystem>();
        this.dflt = null;
    }

    // cannot use Nodes/IO because they're not yet initialized
    public void scan() throws IOException {
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
                        add(line);
                    } catch (IllegalArgumentException e2) {
                        System.out.println("TODO: " + url + ":" + e2.getMessage());
                    }
                }
            }
            src.close();
        }
    }
    
    public void add(String filesystemClass) {
        Class<?> clazz;
        Filesystem fs;
        
        try {
            clazz = Class.forName(filesystemClass);
        } catch (ClassNotFoundException e) {
            throw new IllegalArgumentException("unkown class: " + filesystemClass, e);
        }
        try {
            fs = (Filesystem) clazz.getConstructor(IO.class).newInstance(io);
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
        add(fs);
    }

    public void add(Filesystem filesystem) {
        String name;
        
        name = filesystem.getName();
        if (map.containsKey(name)) {
            throw new IllegalArgumentException("duplicate filesystem name: " + name);
        }
        map.put(name, filesystem);
    }
    
    public int size() {
        return map.size();
    }
    
    public Node parse(Node working, String locator) throws LocatorException {
        int idx;
        String name;
        Filesystem fs;
        Node result;
        String rootPath;
        
        idx = locator.indexOf(Filesystem.SEPARTOR);
        if (idx == -1) {
            fs = defaultFs(working);
        } else {
            name = locator.substring(0, idx);
            fs = map.get(name);
            if (fs == null) {
                fs = defaultFs(working);
            }
        }
        rootPath = locator.substring(idx + 1);
        try {
            result = fs.parse(rootPath);
        } catch (RootPathException e) {
            throw new LocatorException(locator, e.getMessage(), e.getCause());
        }
        if (result == null) {
            if (working == null || fs != working.getRoot().getFilesystem()) {
                throw new LocatorException(locator, "no working directory for filesystem " + fs.getName());
            }
            result = working.join(locator.substring(idx + 1));
            result.setBase(working);
        }
        return result;
    }

    public <T extends Filesystem> T get(Class<T> c) {
        T result;
        
        result = lookup(c);
        if (result == null) {
            throw new IllegalArgumentException("no such filesystem: " + c.getName());
        }
        return result;
    }

    public <T extends Filesystem> T lookup(Class<T> c) {
        for (Filesystem fs : map.values()) {
            if (fs.getClass().equals(c)) {
                return (T) fs;
            }
        }
        return null;
    }
    
    public void setDefault(Filesystem fs) {
        dflt = fs;
    }
    
    private Filesystem defaultFs(Node working) { 
        if (working == null) {
            return dflt;
        } else {
            return working.getRoot().getFilesystem();
        }
    }
}
