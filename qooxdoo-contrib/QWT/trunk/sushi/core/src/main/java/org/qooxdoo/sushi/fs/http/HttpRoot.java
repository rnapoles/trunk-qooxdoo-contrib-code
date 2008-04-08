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

package org.qooxdoo.sushi.fs.http;

import org.qooxdoo.sushi.fs.Filesystem;
import org.qooxdoo.sushi.fs.Root;


public class HttpRoot implements Root {
    private final Filesystem filesystem;
    private final String id;
    
    public HttpRoot(Filesystem filesystem, String id) {
        this.filesystem = filesystem;
        this.id = id;
        if (!id.endsWith(filesystem.getSeparator())) {
            throw new IllegalArgumentException();
        }
    }

    @Override
    public String toString() {
        return id;
    }
    
    //--
 
    @Override
    public boolean equals(Object obj) {
        HttpRoot root;
        
        if (obj instanceof HttpRoot) {
            root = (HttpRoot) obj;
            return filesystem == root.filesystem && id.equals(root.id);
        }
        return false;
    }
    
    @Override
    public int hashCode() {
        return id.hashCode();
    }

    public Filesystem getFilesystem() {
        return filesystem;
    }

    public String getId() {
        return id;
    }
}
