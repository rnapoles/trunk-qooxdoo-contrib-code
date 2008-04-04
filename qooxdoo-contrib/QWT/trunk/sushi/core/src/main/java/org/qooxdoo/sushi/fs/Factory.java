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
import java.net.URL;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import org.qooxdoo.sushi.io.Buffer;
import org.qooxdoo.sushi.util.Strings;

/** Knows the availeable filesystems and how to create them */
public class Factory {
    private final Map<String, Filesystem> map;
    
    public Factory() {
        this.map = new HashMap<String, Filesystem>();
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
                    add(line);
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
            fs = (Filesystem) clazz.getDeclaredField("INSTANCE").get(null);
        } catch (IllegalAccessException e) {
            throw new IllegalArgumentException("cannot get instance", e);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("cannot get instance", e);
        } catch (SecurityException e) {
            throw new IllegalArgumentException("cannot get instance", e);
        } catch (NoSuchFieldException e) {
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
    
    public Node parse(IO io, String locator) throws IOException {
        int idx;
        String name;
        Filesystem fs;
        
        idx = locator.indexOf(Filesystem.SEPARTOR);
        if (idx == -1) {
            throw new ParseException("unkown file system: " + locator);
        }
        name = locator.substring(0, idx);
        fs = map.get(name);
        if (fs == null) {
            throw new ParseException("unkown file system: " + locator);
        }
        
        return fs.parse(io, locator.substring(idx + 1));
    }
}
