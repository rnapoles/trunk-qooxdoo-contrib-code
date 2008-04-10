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

package org.qooxdoo.sushi.fs.file;

import java.io.File;

import org.qooxdoo.sushi.fs.Filesystem;
import org.qooxdoo.sushi.fs.IO;

public class FileFilesystem extends Filesystem {
    private final FileRoot[] roots;
    
    public FileFilesystem(IO io) {
        super(io, "file", File.separatorChar);

        File[] rootFiles;
        
        rootFiles = File.listRoots();
        roots = new FileRoot[rootFiles.length];
        for (int i = 0; i < rootFiles.length; i++) {
            roots[i] = new FileRoot(this, rootFiles[i].getAbsolutePath());
        }
    }

    @Override
    public FileRoot rootPath(String rootPath, StringBuilder path) {
        FileRoot root;
        
        root = root(rootPath);
        if (root == null) {
            return null;
        } else {
            path.append(rootPath.substring(root.getId().length()));
            return root;
        }
    }

    public FileRoot root(String rootPath) {
        for (FileRoot fs : roots) {
            if (rootPath.startsWith(fs.getId())) {
                return fs;
            }
        }
        return null;
    }
}
