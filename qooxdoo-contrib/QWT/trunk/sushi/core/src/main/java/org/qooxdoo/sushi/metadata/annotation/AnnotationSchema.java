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

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;

import org.qooxdoo.sushi.metadata.ComplexType;
import org.qooxdoo.sushi.metadata.Schema;

/** Metadata based on annotations */
public class AnnotationSchema extends Schema {
    @Override
    public void complex(ComplexType type) {
        Class<?> clazz;
        int modifier;
        Constructor<?> constr;

        clazz = type.getType();
        if (clazz.getAnnotation(org.qooxdoo.sushi.metadata.annotation.Type.class) == null) {
            throw new IllegalArgumentException("missing type annotation: " + clazz);
        }

        modifier = clazz.getModifiers();
        if (Modifier.isAbstract(modifier)) {
            constr = null;
        } else {
            if (!Modifier.isPublic(modifier)) {
                throw new IllegalArgumentException(clazz.getName());
            }
            try {
                constr = clazz.getConstructor(new Class[] {});
            } catch (NoSuchMethodException e) {
                throw new IllegalArgumentException(clazz.getName());
            }
            if (!Modifier.isPublic(constr.getModifiers())) {
                throw new IllegalArgumentException(clazz.getName());
            }
        }
        for (Field field : clazz.getDeclaredFields()) {
            if (field.getAnnotation(org.qooxdoo.sushi.metadata.annotation.Value.class) != null) {
                type.items().add(ValueItem.create(this, field));
            } else if (field.getAnnotation(Option.class) != null) {
                type.items().add(OptionItem.create(this, field));
            } else if (field.getAnnotation(Sequence.class) != null) {
                type.items().add(ListItem.create(this, field));
            }
        }
    }
}
