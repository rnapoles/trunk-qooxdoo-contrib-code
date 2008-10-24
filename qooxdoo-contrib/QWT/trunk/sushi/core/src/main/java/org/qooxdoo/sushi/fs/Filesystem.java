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


public abstract class Filesystem {
    /** separates file system name from rootPath in Locator strings */
    public static final char SEPARTOR = ':';

    private final IO io;
    private final String name;
    private final String separator;
    private final char separatorChar;
    
    public Filesystem(IO io, String name, char separatorChar) {
        this.io = io;
        this.name = name;
        this.separator = "" + separatorChar;
        this.separatorChar = separatorChar;
    }

    public IO getIO() {
        return io;
    }
    
    public String getName() {
        return name;
    }

    public String getSeparator() {
        return separator;
    }
    
    public char getSeparatorChar() {
        return separatorChar;
    }
    
    /** 
     * Returns a possibly new root. You'll normally not use this method directly, use
     * IO.node(Filesystem, rootpath) instead.
     * 
     * @param path is an out argument with the remaining path
     * @return null if rootPath does not contain a root
     */ 
    public abstract Root rootPath(String rootPath, StringBuilder path) throws RootPathException;

    //--
    
    public String join(String... names) {
        return Strings.join(separator, names);
    }
    
    public String join(String head, List<String> paths) {
        StringBuilder buffer;
        
        buffer = new StringBuilder(head);
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
