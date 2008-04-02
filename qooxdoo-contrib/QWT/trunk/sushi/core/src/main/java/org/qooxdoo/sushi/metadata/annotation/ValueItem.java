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

package org.qooxdoo.sushi.metadata.annotation;

import java.lang.reflect.AnnotatedElement;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Collection;
import java.util.Collections;

import org.qooxdoo.sushi.metadata.Cardinality;
import org.qooxdoo.sushi.metadata.Item;
import org.qooxdoo.sushi.metadata.ItemException;
import org.qooxdoo.sushi.metadata.Schema;
import org.qooxdoo.sushi.metadata.Type;

public class ValueItem<T> extends Item<T> {
    public static ValueItem create(Schema metadata, Field field) {
        String name;
        Class type;
        Class fieldType;
        
        name = field.getName();
        type = field.getDeclaringClass();
        fieldType = field.getType();
        return new ValueItem(name, fieldType,  metadata.type(fieldType), 
                lookup(type, "get" + name), lookup(type, "set" + name),
                field);
    }
    
    
    private final Method getter;
    private final Method setter;
    
    public ValueItem(String name, Class typeRaw, Type type, Method getter, Method setter, AnnotatedElement definition) {
        super(name, Cardinality.VALUE, type, definition);
        
        checkSetter(typeRaw, setter);
        checkGetter(typeRaw, getter);
        
        this.getter = getter;
        this.setter = setter;
    }

    @Override
    public Collection<T> get(Object src) {
        T result;
        
        result = (T) invoke(getter, src);
        return Collections.singletonList(result);
    }
    
    @Override
    public void set(Object dest, Collection<T> values) {
        if (values.size() != 1) {
            throw new ItemException("1 value expected, got " + values.size());
        }
        invoke(setter, dest, values.iterator().next());
    }
}
