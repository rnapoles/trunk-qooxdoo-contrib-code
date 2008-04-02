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

package java.lang.reflect;

public class Field {
    private final String name;
    
    public Field(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
    
    public void setAccessible(boolean value) {
        // do nothing
    }

    /**
     * @native 
         obj[this.name] = value;
     */
    public native void set(Object obj, Object value);

    /**
     * @native 
         return obj[this.name];
     */
    public native Object get(Object obj);
}
