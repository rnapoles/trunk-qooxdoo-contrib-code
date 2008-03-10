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

package org.qooxdoo.toolkit.engine;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.qooxdoo.sushi.io.Buffer;
import org.qooxdoo.sushi.io.ExistsException;
import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.io.ResourceNode;

public class ResourceManager {
    public static ResourceManager create(FileNode basedir) {
        return new ResourceManager(new IO().setWorking(basedir));
    }
    
    private final IO io;
    private final Map<String, Node> prefixes;
    
    public ResourceManager(IO io) {
        this.io = io;
        this.prefixes = new HashMap<String, Node>();
    }
    
    public void addFilePrefix(String prefix) {
        addPrefix(prefix, io.getWorking().join(trim(prefix)));
    }

    public void addResourcePrefix(String prefix) {
        addPrefix(prefix, new ResourceNode(io, trim(prefix)));
    }

    private static String trim(String str) {
        if (str.length() == 0) {
            return str;
        } if (str.endsWith("/")) {
            return str.substring(0, str.length() - 1);
        } else {
            throw new IllegalArgumentException(str);
        }
    }
    
    public void addPrefix(String prefix, Node root) {
        if (prefix.length() > 0) {
            if (prefix.startsWith("/")) {
                throw new IllegalArgumentException(prefix);
            }
            if (!prefix.endsWith("/")) {
                throw new IllegalArgumentException(prefix);
            }
        }
        if (prefixes.put(prefix, root) != null) {
            throw new IllegalArgumentException(prefix);
        }
    }

    public boolean render(Buffer buffer, String path, boolean compress, HttpServletResponse httpResponse) throws IOException {
        Resource resource;
        
        resource = lookup(path);
        if (resource != null) {
            resource.copy(buffer, compress, httpResponse);
            return true;
        } else {
            return false;
        }
    }

    public Resource lookup(String path) throws ExistsException {
        String suffix;
        Node dir;
        Node normal;
        Node compressed;
        int idx;
        String prefix;
        MimeType type;

        if (path == null) {
            return null;
        }
        idx = path.indexOf('/');
        if (idx == -1) {
            prefix = "";
            suffix = path;
        } else {
            prefix = path.substring(0, idx + 1);
            suffix = path.substring(idx + 1);
        }
        dir = prefixes.get(prefix);
        if (dir == null) {
            return null;
        }
        normal = dir.join(suffix);
        if (!normal.exists()) {
            return null;
        }
        type = MimeType.get(normal);
        if (type.compressable) {
            compressed = normal.getParent().join(normal.getName() + ".gz");
            if (!compressed.exists()) {
                compressed = null;
            }
        } else {
            compressed = null;
        }
        return new Resource(normal, compressed, type);
    }
}
