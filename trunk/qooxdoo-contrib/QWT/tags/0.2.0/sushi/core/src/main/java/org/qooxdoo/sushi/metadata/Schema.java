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

package org.qooxdoo.sushi.metadata;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.qooxdoo.sushi.metadata.simpletypes.BooleanType;
import org.qooxdoo.sushi.metadata.simpletypes.CharacterType;
import org.qooxdoo.sushi.metadata.simpletypes.ClassType;
import org.qooxdoo.sushi.metadata.simpletypes.DoubleType;
import org.qooxdoo.sushi.metadata.simpletypes.EnumType;
import org.qooxdoo.sushi.metadata.simpletypes.FloatType;
import org.qooxdoo.sushi.metadata.simpletypes.IntType;
import org.qooxdoo.sushi.metadata.simpletypes.LongType;
import org.qooxdoo.sushi.metadata.simpletypes.MethodType;
import org.qooxdoo.sushi.metadata.simpletypes.StringType;
import org.qooxdoo.sushi.metadata.simpletypes.VoidType;
import org.qooxdoo.sushi.util.Reflect;
import org.qooxdoo.sushi.util.Strings;

/** 
 * A set of Types. Initially, the set consists of simple types only. Complex types
 * can be created explicitly by invoking the add method or implictly by overriding the complex 
 * method. Thus, Metadata can be used a factory for complex types.
 */
public class Schema {
    private final Map<Class<?>, Type> map;
    
    public Schema() {
        map = new HashMap<Class<?>, Type>();
        add(new StringType(this));
        add(new IntType(this));
        add(new LongType(this));
        add(new FloatType(this));
        add(new DoubleType(this));
        add(new BooleanType(this));
        add(new CharacterType(this));
        add(new VoidType(this));
        add(new ClassType(this));
        add(new MethodType(this));
    }
    
    public ComplexType complex(Class<?> clazz) {
        return (ComplexType) type(clazz);
    }

    public SimpleType simple(Class<?> clazz) {
        return (SimpleType) type(clazz);
    }

    /**
     * This method is the main purpose of this class.
     * @return never null 
     */
    public Type type(Class<?> clazz) {
        Type type;
        
        if (clazz.isPrimitive()) {
            clazz = Reflect.getWrapper(clazz);
        }
        type = map.get(clazz);
        if (type == null) {
            if (Enum.class.isAssignableFrom(clazz)) {
                type = EnumType.create(this, (Class) clazz);
            } else {
                type = new ComplexType(this, clazz, typeName(clazz));
            }
            map.put(clazz, type);
            if (Enum.class.isAssignableFrom(clazz)) {
                // nothing
            } else {
                complex((ComplexType) type);
            }
        }
        return type;
    }

    public Type type(String name) {
        for (Type type : map.values()) {
            if (name.equals(type.getName())) {
                return type;
            }
        }
        throw new IllegalArgumentException(name);
    }
    
    public <T> Instance<T> instance(T obj) {
        Type type;
        
        type = type(obj.getClass());
        return new Instance<T>(type, obj);
    }
    
    public <T> List<Instance<T>> instances(Collection<T> col) {
        List<Instance<T>> result;
        
        result = new ArrayList<Instance<T>>();
        for (T obj : col) {
            result.add(instance(obj));
        }
        return result;
    }

    public void add(Type type) {
        map.put(type.getType(), type);
    }
    
    public void complex(ComplexType type) {
        throw new UnsupportedOperationException(type.getName());
    }

    public static String typeName(Class<?> clazz) {
        String name;
        
        name = clazz.getName();
        name = name.substring(name.lastIndexOf(".") + 1); // ok for -1
        // simplify inner class names ... 
        name = name.substring(name.indexOf('$') + 1); // ok for -1
        return Strings.decapitalize(name);
    }
}
