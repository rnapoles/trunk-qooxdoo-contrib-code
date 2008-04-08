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

package org.qooxdoo.sushi.fs;

import java.util.List;

import org.qooxdoo.sushi.util.Strings;

public class Root {
    private final Filesystem filesystem;
    private final String id;
    
    public Root(Filesystem filesystem, String id) {
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
    
    //-- path handling

    public String join(String... names) {
        return Strings.join(filesystem.getSeparator(), names);
    }
    
    public String join(String head, List<String> paths) {
        StringBuffer buffer;
        
        buffer = new StringBuffer(head);
        for (String path : paths) {
            if (path.startsWith(filesystem.getSeparator())) {
                throw new IllegalArgumentException(path);
            }
            // TODO: Svn nodes ...
            if (buffer.length() > 0) {
                buffer.append(filesystem.getSeparatorChar());
            }
            buffer.append(path);
        }
        return buffer.toString();
    }

    public List<String> split(String path) {
        return Strings.split(filesystem.getSeparator(), path);
    }
    
    //--
 
    @Override
    public boolean equals(Object obj) {
        Root root;
        
        if (obj instanceof Root) {
            root = (Root) obj;
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
