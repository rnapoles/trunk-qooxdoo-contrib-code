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

import org.qooxdoo.sushi.fs.Filesystem;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.ParseException;


public class MemoryFilesystem extends Filesystem {
    public static final MemoryFilesystem INSTANCE = new MemoryFilesystem();
    
    private MemoryFilesystem() {
        super("mem");
    }

    @Override
    public MemoryNode parse(IO io, String rootPath) throws ParseException {
        if (!rootPath.startsWith("/")) {
            throw new ParseException(rootPath);
        }
        return createRoot(io).newInstance(rootPath.substring(1));
    }

    public MemoryNode createRoot(IO io) {
        return new Context(io).node("");
    }

}
