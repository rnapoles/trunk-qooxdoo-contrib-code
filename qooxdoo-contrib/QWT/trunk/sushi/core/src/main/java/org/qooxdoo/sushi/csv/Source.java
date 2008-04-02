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

package org.qooxdoo.sushi.csv;

public class Source {
    public static final int END = -1;
    
    private final String line;
    private int idx;
    private final int max;

    public Source(String line) {
        this.line = line;
        this.idx = 0;
        this.max = line.length();
    }
    
    public int peek() {
        return idx < max ? line.charAt(idx) : END;        
    }
    
    public int peekNext() {
        return idx + 1 < max ? line.charAt(idx + 1) : END;
    }
    
    public void eat() {
        idx++;
    }
    
    public boolean eat(String keyword, char separator) {
        int end;
        
        if (line.indexOf(keyword, idx) == idx) {
            end = idx + keyword.length();
            if (end == max || line.charAt(end) == separator) {
                idx = end;
                return true;
            }
        }
        return false;
    }
}
