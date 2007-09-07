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

public class Object {
    public Class<? extends Object> getClass() {
        return Class.forJsClass(getJsClass());
    }

    /**
     * @native 
         return this.__proto__.constructor;
     */
    public native final Object getJsClass();

    public int hashCode() {
        return 1;
    }
    
    public boolean equals(Object obj) {
        return this == obj;
    }
    
    public String toString() {
        return "foo"; // TODO getClass().getName() + "@" + hashCode();
    }
}
