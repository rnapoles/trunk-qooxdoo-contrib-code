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

package org.qooxdoo.sushi.fs.console;

import org.qooxdoo.sushi.fs.Filesystem;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Root;
import org.qooxdoo.sushi.fs.RootPathException;

public class ConsoleFilesystem extends Filesystem implements Root {
    public ConsoleFilesystem(IO io) {
        super(io, "console", '/');
    }

    @Override
    public ConsoleFilesystem rootPath(String rootPath, StringBuilder path) throws RootPathException {
        if (rootPath.length() != 0) {
            throw new RootPathException("unexpected path");
        }
        return this;
    }

    //-- root methods
    
    public Filesystem getFilesystem() {
        return this;
    }

    public String getId() {
        return "/";
    }

    public ConsoleNode node(String path) {
        if (path.length() > 0) {
            throw new UnsupportedOperationException();
        }
        return new ConsoleNode(this);
    }
}
