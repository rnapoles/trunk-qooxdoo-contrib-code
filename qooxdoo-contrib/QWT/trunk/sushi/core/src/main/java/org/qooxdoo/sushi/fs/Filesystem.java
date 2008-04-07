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

import java.io.IOException;


public abstract class Filesystem {
    /** separator file system name from rootPath in Locator strings */
    public static final char SEPARTOR = ':';

    private final String name;
    private final String separator;
    private final char separatorChar;
    
    public Filesystem(String name, char separatorChar) {
        this.name = name;
        this.separator = "" + separatorChar;
        this.separatorChar = separatorChar;
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
    
    public abstract Node parse(IO io, String rootPath) throws IOException;
}
