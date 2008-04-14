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

package org.qooxdoo.sushi.metadata.reflect;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.Collection;

import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.metadata.ComplexType;
import org.qooxdoo.sushi.metadata.Item;
import org.qooxdoo.sushi.metadata.Schema;
import org.qooxdoo.sushi.metadata.simpletypes.NodeType;

public class ReflectSchema extends Schema {
    public ReflectSchema() {
    }

    public ReflectSchema(IO io) {
        this();
        add(new NodeType(this, io));
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
            } else if (fieldType.isArray()) {
                item = new ArrayItem<Object>(field, type(fieldType.getComponentType()));
            } else if (Collection.class.isAssignableFrom(fieldType)) {
                item = new CollectionItem(field, type(Object.class));
            } else {
                item = new ValueItem<Object>(field, type(fieldType));
            }
            if (item != null) {
                type.items().add(item);
            }
        }
    }
}
