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
import java.lang.reflect.Method;

public class Class<T> {
    /**
     * @native
         if (typeof(clazz.metadata) == "string") {
             clazz.metadata = newObject(java.lang.Class, java.lang.Class.init1, [clazz.metadata, clazz]);
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
     * @native
          var ifcs = this.jsClass.$$$$implements;
          var max = ifcs.length;
          var result = newEmptyArray(max);
          for (var i = 0; i < max; i++) {
              result[i] = java.lang.Class.forJsClass(ifcs[i]);
          }
          return result;
     */
    public native Class<?>[] getInterfaces();
    
    /**
     * TODO
     * @native return new (this.jsClass)();
     */
    public native Object newInstance();
    
    /**
     * @native
        var props = this.jsClass.prototype;
        var result = new Array();
        for (name in props) {
          if (name != 'classname') { // TODO
            if (!(props[name] instanceof Function)) {
              result.push(name);
            }
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

    /**
     * TODO: overloading; Java method name may be different
     * TODO: contains base class methods
     * 
     * @native
        var props = this.jsClass.prototype;
        var result = new Array();
        for (name in props) {
          if (props[name] instanceof Function) {
            result.push(name);
          }
        }
        return newInitializedArray.apply(null, result);
     */
    public native String[] getDeclaredMethodNames();

    public Method[] getDeclaredMethods() {
        String[] names;
        Method[] methods;
        
        names = getDeclaredMethodNames();
        methods = new Method[names.length];
        for (int i = 0; i < names.length; i++) {
            methods[i] = new Method(names[i]);
        }
        return methods;
    }
    
    public ClassLoader getClassLoader() {
        return null;
    }
}
