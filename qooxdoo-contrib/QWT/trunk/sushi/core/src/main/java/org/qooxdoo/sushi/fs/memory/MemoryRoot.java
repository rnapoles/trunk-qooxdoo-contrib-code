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

package org.qooxdoo.sushi.fs.memory;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.qooxdoo.sushi.fs.Root;
import org.qooxdoo.sushi.fs.file.FileNode;

public class MemoryRoot implements Root {
    public final MemoryFilesystem filesystem;
    public final int id;
    private final Map<String, MemoryNode> nodes;
    private final Map<String, Object> store;
    
    public MemoryRoot(MemoryFilesystem filesystem, int id) {
        this.filesystem = filesystem;
        this.id = id;
        this.nodes = new HashMap<String, MemoryNode>();
        this.store = new HashMap<String, Object>();
        add(new MemoryNode(this, "", Type.DIRECTORY, null));
    }

    public MemoryFilesystem getFilesystem() {
        return filesystem;
    }

    public String getId() {
        return "//" + id + "/";
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
    
    public void add(MemoryNode node) {
        nodes.put(node.getPath(), node);
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
            idx = child.lastIndexOf(node.getRoot().getFilesystem().getSeparatorChar());
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
        if (used > filesystem.maxInMemorySize) {
            file = filesystem.getIO().getTemp().createTempFile();
            file.writeBytes(data, 0, used, false);
            store.put(path, file);
        } else {
            copy = new byte[used];
            System.arraycopy(data, 0, copy, 0, used);
            store.put(path, copy);
        }
    }
}
