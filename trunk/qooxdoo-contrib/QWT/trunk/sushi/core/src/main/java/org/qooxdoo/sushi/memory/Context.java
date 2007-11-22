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

package org.qooxdoo.sushi.memory;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.IO;

public class Context {
    public final IO io;
    private final Map<String, MemoryNode> nodes;
    private final Map<String, Object> store;
    
    public Context(IO io) {
        this.io = io;
        this.nodes = new HashMap<String, MemoryNode>();
        this.store = new HashMap<String, Object>();
        add(new MemoryNode(this, "", Type.DIRECTORY, null));
    }

    public void add(MemoryNode node) {
        nodes.put(node.getPath(), node);
    }
    
    public MemoryNode node(String path) {
        MemoryNode node;
        
        node = nodes.get(path);
        if (node == null) {
            node = new MemoryNode(this, path, Type.NONE, null);
            nodes.put(node.getPath(), node);
        }
        return node;
    }
    
    public long length(String path) {
        Object obj;
        
        obj = store.get(path);
        if (obj instanceof FileNode) {
            return ((FileNode) obj).length();
        } else {
            return ((byte[]) obj).length;
        }
    }
    
    public List<MemoryNode> list(String path) throws IOException {
        String child;
        int idx;
        List<MemoryNode> result;
        
        result = new ArrayList<MemoryNode>();
        for (MemoryNode node : nodes.values()) {
            child = node.getPath();
            idx = child.lastIndexOf(node.fs.separatorChar);
            if (!path.equals(child) && path.equals(idx == -1 ? "" : child.substring(0, idx))) {
                if (node.exists()) {
                    result.add(node);
                }
            }
        }     
        return result;
    }
    
    //--
    
    InputStream open(String path) throws IOException {
        Object obj;
        
        obj = store.get(path);
        if (obj instanceof FileNode) {
            return ((FileNode) obj).createInputStream();
        } else {
            return new ByteArrayInputStream((byte[]) obj);
        }
    }
    
    void store(String path, byte[] data, int used) throws IOException {
        Object old;
        FileNode file;
        byte[] copy;
        
        old = store.get(path);
        if (old instanceof FileNode) {
            ((FileNode) old).delete();
        }
        if (used > io.maxInMemorySize) {
            file = io.createTempFile();
            file.writeBytes(data, 0, used);
            store.put(path, file);
        } else {
            copy = new byte[used];
            System.arraycopy(data, 0, copy, 0, used);
            store.put(path, copy);
        }
    }
}
