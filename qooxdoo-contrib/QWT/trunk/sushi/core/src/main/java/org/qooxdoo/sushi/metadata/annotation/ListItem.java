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

import org.qooxdoo.sushi.metadata.Cardinality;
import org.qooxdoo.sushi.metadata.Item;
import org.qooxdoo.sushi.metadata.Schema;
import org.qooxdoo.sushi.metadata.Type;

public class ListItem<T> extends Item<T> {
    public static ListItem create(Schema metadata, Field field) {
        String name;
        Class<?> elementType;
        String singular;
        
        name = field.getName();
        if (!Collection.class.isAssignableFrom(field.getType())) {
            throw new IllegalArgumentException();
        }
        singular = getSingular(name);
        elementType = field.getAnnotation(Sequence.class).value();
        return new ListItem(singular,  
                metadata.type(elementType), 
                lookup(field.getDeclaringClass(), name),
                field);
    }
    
    private static final String[] PLURALS = { "List", "s" };

    public static String getSingular(String name) {
        for (String plural : PLURALS) {
            if (name.endsWith(plural) && !name.equals(plural)) {
                return name.substring(0, name.length() - plural.length());
            }
        }
        throw new IllegalArgumentException("invalid name: " + name);
    }
    
    //--
    
    private final Method list;
    
    public ListItem(String name, Type type, Method list, AnnotatedElement definition) {
        super(name, Cardinality.SEQUENCE, type, definition);
        if (list.getParameterTypes().length != 0) {
            fail(list);
        }
        if (!Collection.class.isAssignableFrom(list.getReturnType())) {
            fail(list);
        }
        check(list);
        
        this.list = list;
    }

    @Override
    public Collection<T> get(Object dest) {
        return (Collection<T>) invoke(list, dest);
    }

    @Override
    public void set(Object dest, Collection<T> values) {
        Collection<T> collection;
        
        collection = get(dest);
        collection.clear();
        collection.addAll(values);
    }
}
