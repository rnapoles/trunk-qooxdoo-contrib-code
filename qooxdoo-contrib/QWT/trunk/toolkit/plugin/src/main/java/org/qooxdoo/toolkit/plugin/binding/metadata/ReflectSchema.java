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

package org.qooxdoo.toolkit.plugin.binding.metadata;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.Collection;

import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.metadata.ComplexType;
import org.qooxdoo.sushi.metadata.Item;
import org.qooxdoo.sushi.metadata.Schema;
import org.qooxdoo.sushi.metadata.simpletypes.FileNodeType;
import org.qooxdoo.sushi.util.Strings;

public class ReflectSchema extends Schema {
    public ReflectSchema() {
    }

    public ReflectSchema(IO io) {
        this();
        add(new FileNodeType(this, io));
    }

    @Override
    public void complex(ComplexType type) {
        Class<?> fieldType;
        Item<?> item;
        
        for (Field field : type.getType().getDeclaredFields()) {
            fieldType = field.getType();
            field.setAccessible(true);
            if (Modifier.isStatic(field.getModifiers())) {
                item = null;
            } else if (field.isSynthetic()) {
                item = null;  // e.g. this$0
            } else if (Collection.class.isAssignableFrom(fieldType)) {
                item = new CollectionItem(field, type(guessCollectionType(type, field.getName())));
            } else {
                item = new ValueItem<Object>(field, type(fieldType));
            }
            if (item != null) {
                type.items().add(item);
            }
        }
    }
    
    private static Class<?> guessCollectionType(ComplexType parent, String field) {
        String prefix;
        Class<?> result; 
        
        prefix = parent.getType().getPackage().getName() + ".";
        result = get(prefix, field);
        if (result != null) {
            return result;
        }
        if (field.endsWith("ies")) {
            result = get(prefix, field.substring(0, field.length() - 3) + "y");
            if (result != null) {
                return result;
            }
        }
        if (field.endsWith("es")) {
            result = get(prefix, field.substring(0, field.length() - 2));
            if (result != null) {
                return result;
            }
        }
        if (field.endsWith("s")) {
            result = get(prefix, field.substring(0, field.length() - 1));
            if (result != null) {
                return result;
            }
        }
        throw new IllegalArgumentException("no class for " + prefix + field);
    }
    
    private static Class<?> get(String prefix, String name) {
        try {
            return Class.forName(prefix + Strings.capitalize(name));
        } catch (ClassNotFoundException e) {
            return null;
        }
    }
}
