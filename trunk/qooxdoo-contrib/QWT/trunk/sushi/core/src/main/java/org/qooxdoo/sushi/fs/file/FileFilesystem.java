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
import org.qooxdoo.sushi.fs.ParseException;

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
    public FileNode parse(String rootPath) throws ParseException {
        File file;
        
        file = new File(rootPath);
        if (file.isAbsolute()) {
            return forFile(file);
        } else {
            return null;
        }
    }

    public FileNode forFile(File file) {
        if (file.isAbsolute()) {
            return new FileNode(root(file), file);
        } else {
            throw new IllegalArgumentException("absolute file expected: " + file.toString());
        }
    }

    public FileRoot root(File file) {
        String str;
        
        str = file.getAbsolutePath().toUpperCase();
        for (FileRoot fs : roots) {
            if (str.startsWith(fs.getId())) {
                return fs;
            }
        }
        throw new IllegalArgumentException(str);
    }
}
