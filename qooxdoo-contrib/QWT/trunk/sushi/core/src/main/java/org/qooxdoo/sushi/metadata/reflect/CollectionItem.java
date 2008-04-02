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
import java.util.Collection;

import org.qooxdoo.sushi.metadata.Cardinality;
import org.qooxdoo.sushi.metadata.Item;
import org.qooxdoo.sushi.metadata.Type;

public class CollectionItem extends Item<Object> {
    private final Field field;
    
    public CollectionItem(Field field, Type type) {
        super(field.getName(), Cardinality.SEQUENCE, type, field);

        this.field = field;
    }

    @Override
    public Collection<Object> get(Object src) {
        try {
            return (Collection) field.get(src);
        } catch (IllegalAccessException e) {
            throw new RuntimeException("TODO", e);
        }
    }
    
    @Override
    public void set(Object dest, Collection<Object> values) {
        try {
            // TODO
            field.set(dest, values);
        } catch (IllegalAccessException e) {
            throw new RuntimeException("TODO", e);
        }
    }
}
