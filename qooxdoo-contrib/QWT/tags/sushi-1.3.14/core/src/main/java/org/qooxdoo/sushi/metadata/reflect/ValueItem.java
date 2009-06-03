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
import java.util.Collections;

import org.qooxdoo.sushi.metadata.Cardinality;
import org.qooxdoo.sushi.metadata.Item;
import org.qooxdoo.sushi.metadata.Type;

public class ValueItem<T> extends Item<T> {
    private final Field field;
    
    public ValueItem(Field field, Type type) {
        super(field.getName(), Cardinality.VALUE, type, field);

        this.field = field;
    }

    @Override
    public Collection<T> get(Object src) {
        T result;
        
        try {
            result = (T) field.get(src);
        } catch (IllegalAccessException e) {
            throw new RuntimeException("TODO", e);
        }
        return Collections.singletonList(result);
    }
    
    @Override
    public void set(Object dest, Collection<T> values) {
        if (values.size() != 1) {
            throw new IllegalArgumentException();
        }
        try {
            field.set(dest, values.iterator().next());
        } catch (IllegalAccessException e) {
            throw new RuntimeException("TODO", e);
        }
    }
}
