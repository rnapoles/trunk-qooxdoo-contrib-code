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

import java.io.PrintStream;

public final class System {
    private System() {
    }

    /**
     * @native  return new Date().getTime();
     */
    public static native long currentTimeMillis();

    /**
     * @native 
       if (src === dest && srcPos > destPos) {
         for (var i = 0; i < length; i++) { 
           dest[destPos + i] = src[srcPos + i]; 
         }
       } else {
         while (length-- > 0) {  dest[destPos + length] = src[srcPos + length]; }
       }
     */
    public static native void arraycopy(Object src,  int  srcPos, Object dest, int destPos, int length);

    public static String getProperty(String key) {
        return null;
    }
    
    public static final PrintStream out = new PrintStream();
    public static final PrintStream err = out;
}
