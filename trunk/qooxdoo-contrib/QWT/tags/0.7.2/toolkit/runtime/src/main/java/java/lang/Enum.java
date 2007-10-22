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

public class Enum<E extends Enum<E>> {
    public static <T extends Enum<T>> T valueOf(Class<T> enumType, String name) {
        return null; // TODO
    }

    private final String name;
    private final int ordinal;
    
    protected Enum(String name, int ordinal) {        
        this.name = name;
        this.ordinal = ordinal;
    }
    
    public String name() {
        return name;
    }
    
    public int ordinal() {
        return ordinal;
    }
    
    @Override
    public String toString() {
        return name;
    }
}
