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

package java.util;

public class Date {
    private long millis;
    
    public Date() {
        this(System.currentTimeMillis());
    }

    public Date(long millis) {
        this.millis = millis;
    }

    public long getTime() {
        return millis;
    }


    @Override
    public boolean equals(Object obj) {
        return (obj instanceof Date) && millis == ((Date) obj).millis;
    }
    
    @Override 
    public int hashCode() {
        return (int) millis;
    }

    @Override
    public String toString() {
        return "TODO"; // "" + millis;
    }
}
