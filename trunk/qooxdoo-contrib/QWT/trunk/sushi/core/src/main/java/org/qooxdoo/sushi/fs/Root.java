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
    public final Filesystem filesystem;
    public final String id;
    public final char separatorChar;
    public final String separator;
    
    public Root(Filesystem filesystem, String id, char separatorChar) {
        this.filesystem = filesystem;
        this.id = id;
        this.separatorChar = separatorChar;
        this.separator = "" + separatorChar;
        
        if (!id.endsWith(separator)) {
            throw new IllegalArgumentException();
        }
    }

    @Override
    public String toString() {
        return id;
    }
    
    //-- path handling

    public String join(String... names) {
        return Strings.join(separator, names);
    }
    
    public String join(String head, List<String> paths) {
        StringBuffer buffer;
        
        buffer = new StringBuffer(head);
        for (String path : paths) {
            if (path.startsWith(separator)) {
                throw new IllegalArgumentException(path);
            }
            // TODO: Svn nodes ...
            if (buffer.length() > 0) {
                buffer.append(separatorChar);
            }
            buffer.append(path);
        }
        return buffer.toString();
    }

    public List<String> split(String path) {
        return Strings.split(separator, path);
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
}
