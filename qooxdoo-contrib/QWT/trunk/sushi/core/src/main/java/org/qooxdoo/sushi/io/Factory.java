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

package org.qooxdoo.sushi.io;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

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
        Properties p;
        
        descriptor = "META-INF/sushi/filesystem.properties";
        e = getClass().getClassLoader().getResources(descriptor);
        while (e.hasMoreElements()) {
            url = e.nextElement();
            src = url.openStream();
            p = new Properties();
            p.load(src);
            for (Map.Entry<Object, Object> entry : p.entrySet()) {
                add((String) entry.getKey(), (String) entry.getValue());
            }
            src.close();
        }
    }
    
    public void add(String name, String filesystemClass) {
        Class<?> clazz;
        Filesystem fs;
        
        try {
            clazz = Class.forName(filesystemClass);
        } catch (ClassNotFoundException e) {
            throw new IllegalArgumentException("unkown class: " + filesystemClass, e);
        }
        try {
            fs = (Filesystem) clazz.newInstance();
        } catch (InstantiationException e) {
            throw new IllegalArgumentException("cannot instantiate", e);
        } catch (IllegalAccessException e) {
            throw new IllegalArgumentException("cannot instantiate", e);
        }
        add(name, fs);
    }

    public void add(String name, Filesystem filesystem) {
        if (map.containsKey(name)) {
            throw new IllegalArgumentException("duplicate name: " + name);
        }
        map.put(name, filesystem);
    }
    
    public int size() {
        return map.size();
    }
    
    public Node parse(IO io, String str) throws ParseException {
        int idx;
        String name;
        Filesystem fs;
        
        idx = str.indexOf(':');
        if (idx == -1) {
            throw new ParseException("unkown file system: " + str);
        }
        name = str.substring(0, idx);
        fs = map.get(name);
        if (fs == null) {
            throw new ParseException("unkown file system: " + str);
        }
        
        return fs.parse(io, str.substring(idx + 1));
    }
}
