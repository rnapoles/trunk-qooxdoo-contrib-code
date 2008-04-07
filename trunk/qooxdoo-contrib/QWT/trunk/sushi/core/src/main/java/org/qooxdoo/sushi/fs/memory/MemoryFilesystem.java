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
import org.qooxdoo.sushi.fs.ParseException;


public class MemoryFilesystem extends Filesystem {
    public static final MemoryFilesystem INSTANCE = new MemoryFilesystem();
    
    private final WeakHashMap<Integer, MemoryRoot> contexts;
    
    private MemoryFilesystem() {
        super("mem");
        
        this.contexts = new WeakHashMap<Integer, MemoryRoot>();
    }

    @Override
    public MemoryNode parse(IO io, String rootPath) throws ParseException {
        int idx;
        int id;
        
        if (!rootPath.startsWith("//")) {
            throw new ParseException(rootPath);
        }
        idx = rootPath.indexOf('/', 2);
        if (idx == -1) {
            throw new ParseException(rootPath);
        }
        try {
            id = Integer.parseInt(rootPath.substring(2, idx));
        } catch (NumberFormatException e) {
            throw new ParseException(rootPath, e);
        }
        return getRoot(io, id).newInstance(rootPath.substring(idx + 1));
    }

    public MemoryNode getRoot(IO io, int id) {
        MemoryRoot context;
        
        context = contexts.get(id);
        if (context == null) {
            context = new MemoryRoot(io, id);
            contexts.put(id, context);
        }
        return context.node("");
    }

    public MemoryNode createRoot(IO io) {
        MemoryRoot context;
        
        for (int id = 0; true; id++) {
            if (!contexts.containsKey(id)) {
                context = new MemoryRoot(io, id);
                contexts.put(id, context);
                return context.node("");
            }
        }
    }
}
