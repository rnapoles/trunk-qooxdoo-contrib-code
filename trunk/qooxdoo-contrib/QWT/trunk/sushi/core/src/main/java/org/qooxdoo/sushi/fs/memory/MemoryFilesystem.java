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

import java.util.WeakHashMap;

import org.qooxdoo.sushi.fs.Filesystem;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.RootPathException;


public class MemoryFilesystem extends Filesystem {
    private final WeakHashMap<Integer, MemoryRoot> roots;
    
    public int maxInMemorySize;
    
    public MemoryFilesystem(IO io) {
        super(io, "mem", '/');
        
        this.roots = new WeakHashMap<Integer, MemoryRoot>();
        this.maxInMemorySize = 32 * 1024;
    }

    @Override
    public MemoryRoot rootPath(String rootPath, StringBuilder path) throws RootPathException {
        int idx;
        int id;
        
        if (!rootPath.startsWith("//")) {
            throw new RootPathException("invalid root");
        }
        idx = rootPath.indexOf('/', 2);
        if (idx == -1) {
            throw new RootPathException("invalid root");
        }
        try {
            id = Integer.parseInt(rootPath.substring(2, idx));
        } catch (NumberFormatException e) {
            throw new RootPathException(e);
        }
        path.append(rootPath.substring(idx + 1));
        return root(id);
    }

    public MemoryRoot root(int id) {
        MemoryRoot root;
        
        root = roots.get(id);
        if (root == null) {
            root = new MemoryRoot(this, id);
            roots.put(id, root);
        }
        return root;
    }

    public MemoryRoot root() {
        MemoryRoot root;
        
        for (int id = 0; true; id++) {
            if (!roots.containsKey(id)) {
                root = new MemoryRoot(this, id);
                roots.put(id, root);
                return root;
            }
        }
    }
}
