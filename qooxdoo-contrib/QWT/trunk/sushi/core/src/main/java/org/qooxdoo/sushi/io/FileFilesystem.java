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

import java.io.File;

public class FileFilesystem extends FS {
    public FileFilesystem() {
        super();
    }

    @Override
    public FileNode parse(IO io, String str) throws ParseException {
        File file;
        
        file = new File(str);
        if (!file.isAbsolute()) {
            throw new ParseException("TODO: " + str);
        }
        return new FileNode(io, null, file);
    }
}
