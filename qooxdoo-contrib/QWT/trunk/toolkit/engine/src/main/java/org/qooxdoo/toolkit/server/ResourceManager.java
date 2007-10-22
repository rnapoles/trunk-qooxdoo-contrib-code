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

package org.qooxdoo.toolkit.server;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.io.ResourceNode;

public class ResourceManager {
    public static ResourceManager create(FileNode basedir, MimeTypes mimeTypes) throws IOException {
        return new ResourceManager(new IO().setWorking(basedir), mimeTypes);
    }
    
    public static final String TEMP_PREFX = "/temp/";
    
    private final IO io;
    private final MimeTypes mimeTypes;
    private final Map<String, Resource> statics;
    private final List<String> resourcePrefixes;
    private final List<String> filePrefixes;
    
    public ResourceManager(IO io, MimeTypes mimeTypes) {
        this.io = io;
        this.mimeTypes = mimeTypes;
        this.statics = new HashMap<String, Resource>();
        this.resourcePrefixes = new ArrayList<String>();
        this.filePrefixes = new ArrayList<String>();
    }
    
    public IO getIO() {
        return io;
    }
    
    public void addStatic(String path, Node normal, Node compressed) {
        if (statics.containsKey(path)) {
            throw new IllegalArgumentException(path);
        }
        statics.put(path, new Resource(normal, compressed, mimeTypes.get(normal)));
    }

    public void addResourcePrefix(String prefix) {
        addPrefix(resourcePrefixes, prefix);
    }
    
    public void addFilePrefix(String prefix) {
        addPrefix(filePrefixes, prefix);
    }
    
    private static void addPrefix(List<String> prefixes, String prefix) {
        if (prefix.startsWith("/")) {
            throw new IllegalArgumentException(prefix);
        }
        if (!prefix.endsWith("/")) {
            throw new IllegalArgumentException(prefix);
        }
        prefixes.add(prefix);
    }

    public boolean render(String path, boolean compress, HttpServletResponse httpResponse) throws IOException {
        Resource resource;
        
        resource = lookup(path);
        if (resource != null) {
            resource.copy(compress, httpResponse);
            return true;
        } else {
            return false;
        }
    }

    public Resource lookup(String path) throws IOException {
        Node node;
        
        if (path == null) {
            node = null;
        } else if (matches(filePrefixes, path)) {
            node = io.getWorking().join(path);
        } else if (matches(resourcePrefixes, path)) {
            node = new ResourceNode(io, path);
        } else {
            return statics.get(path);
        }
        if (node == null) {
            return null;
        } else {
            return new Resource(node, null, mimeTypes.get(node));
        }
    }

    private static boolean matches(List<String> prefixes, String path) {
        for (String prefix : prefixes) {
            if (path.startsWith(prefix)) {
                return true;
            }
        }
        return false;
    }
}
