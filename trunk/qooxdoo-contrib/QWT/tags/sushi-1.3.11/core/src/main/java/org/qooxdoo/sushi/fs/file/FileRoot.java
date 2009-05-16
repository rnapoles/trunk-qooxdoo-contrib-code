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

import org.qooxdoo.sushi.fs.Root;


public class FileRoot implements Root {
    private final FileFilesystem filesystem;
    private final String id;
    
    public FileRoot(FileFilesystem filesystem, String id) {
        this.filesystem = filesystem;
        this.id = id;
        if (!id.endsWith(filesystem.getSeparator())) {
            throw new IllegalArgumentException();
        }
    }

    public FileFilesystem getFilesystem() {
        return filesystem;
    }

    public String getId() {
        return id;
    }
    
    public FileNode node(String path) {
        return new FileNode(this, new File(id + path));
    }
}
