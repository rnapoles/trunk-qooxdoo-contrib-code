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

package java.lang;

public class Math {
    public static int max(int left, int right) {
        return left > right ? left : right;
    }
    
    public static int min(int left, int right) {
        return left < right ? left : right;
    }
    
    /** @native return Math.floor(d); */
    public static native double floor(double d);
}
