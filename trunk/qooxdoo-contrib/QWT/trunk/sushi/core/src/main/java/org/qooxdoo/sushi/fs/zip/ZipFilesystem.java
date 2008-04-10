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

package org.qooxdoo.sushi.fs.zip;

import java.io.IOException;
import java.util.zip.ZipFile;

import org.qooxdoo.sushi.fs.Filesystem;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.LocatorException;
import org.qooxdoo.sushi.fs.RootPathException;
import org.qooxdoo.sushi.fs.file.FileNode;

public class ZipFilesystem extends Filesystem {
    public ZipFilesystem(IO io) {
        super(io, "zip", '/');
    }

    @Override
    public ZipRoot rootPath(String rootPath, StringBuilder path) throws RootPathException {
        int idx;
        FileNode jar;
        
        idx = rootPath.indexOf("!/");
        if (idx == -1) {
            throw new RootPathException("invalid root");
        }
        try {
            jar = getIO().file(rootPath.substring(0, idx));
        } catch (LocatorException e) {
            throw new RootPathException(e);
        }
        path.append(rootPath.substring(idx + 2));
        try {
            return root(jar);
        } catch (IOException e) {
            throw new RootPathException(e);
        }
    }

    public ZipNode node(FileNode jar, String path) throws IOException {
        return root(jar).node(path);
    }

    public ZipRoot root(FileNode jar) throws IOException {
        return new ZipRoot(this, new ZipFile(jar.getAbsolute()));
    }
}
