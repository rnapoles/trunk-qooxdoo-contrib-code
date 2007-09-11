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

import java.lang.reflect.Field;

public class Class<T> {
    /**
     * @native
         if (typeof(clazz.metadata) == "string") {
             clazz.metadata = newObject(java.lang.Class, java.lang.Class.init1, [clazz.metadata, class]);
         }
         return clazz.metadata;        
     */
    public static native Class<?> forJsClass(Object clazz);
    
    /**
     * @native 
         var result = ALL_CLASSES[name];
         if (result === undefined) {
           return null;
         } else {
           return result;
         }
     */
    public static native Object lookupJsClass(String name);

    public static Class<?> forName(String name) throws ClassNotFoundException {
        Object jsClass;
        
        jsClass = lookupJsClass(name);
        if (jsClass == null) {
            throw new ClassNotFoundException(name);
        }
        return forJsClass(jsClass);
    }

    //--
    
    private final String name;
    private final Object jsClass;
    
    private Class(String name, Object jsClass) {
        this.name = name;
        this.jsClass = jsClass;
    }

    public String getName() {
        return name;
    }

    /**
     * @native
          return java.lang.Class.forJsClass(getBase(this.jsClass))
     */
    public native Class<?> getSuperclass();

    /**
     * TODO
     * @native return new (this.jsClass)();
     */
    public native Object newInstance();
    
    /**
     * @native
        var props = this.jsClass.prototype;
        var result = new Array();
        var i = 0;
        for (name in props) {
          if (!(props[name] instanceof Function)) {
            result[i] = name;
            i++;
          }
        }
        return newInitializedArray.apply(null, result);
     */
    public native String[] getDeclaredFieldNames();

    public Field[] getDeclaredFields() {
        String[] names;
        Field[] fields;
        
        names = getDeclaredFieldNames();
        fields = new Field[names.length];
        for (int i = 0; i < names.length; i++) {
            fields[i] = new Field(names[i]);
        }
        return fields;
    }
}
