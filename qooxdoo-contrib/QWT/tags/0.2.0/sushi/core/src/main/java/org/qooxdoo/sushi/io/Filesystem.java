/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2007 1&1 Internet AG, Germany, http://www.1and1.org
   
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
   
   Authors:
     * Michael Hartmeier (mlhartme)
   
 ************************************************************************ */

package org.qooxdoo.sushi.io;

import java.util.List;

import org.qooxdoo.sushi.util.Strings;

public class Filesystem {
    public final String root;
    public final char separatorChar;
    public final String separator;
    
    public Filesystem(String root, char separatorChar) {
        this.root = root;
        this.separatorChar = separatorChar;
        this.separator = "" + separatorChar;
        
        if (!root.endsWith(separator)) {
            throw new IllegalArgumentException();
        }
    }

    @Override
    public String toString() {
        return root;
    }
    
    //-- path handling

    public String join(String... names) {
        return Strings.join(separator, names);
    }
    
    // TODO: move to Node class
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
}
