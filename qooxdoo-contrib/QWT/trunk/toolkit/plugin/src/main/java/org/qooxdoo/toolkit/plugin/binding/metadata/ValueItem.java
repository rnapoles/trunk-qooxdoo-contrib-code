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

package org.qooxdoo.toolkit.plugin.binding.metadata;

import java.lang.reflect.Field;
import java.util.Collection;
import java.util.Collections;

import org.qooxdoo.sushi.metadata.Cardinality;
import org.qooxdoo.sushi.metadata.Item;
import org.qooxdoo.sushi.metadata.Type;

public class ValueItem<T> extends Item<T> {
    private final Field field;
    
    public ValueItem(Field field, Type type) {
        super(field.getName(), Cardinality.OPTION, type, field);

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
        if (result == null) {
            return Collections.<T>emptyList(); 
        } else {
            return Collections.singletonList(result);
        }
    }
    
    @Override
    public void set(Object dest, Collection<T> values) {
        T value;
        
        switch (values.size()) {
        case 0:
            return; // TODO
        case 1:
            value = values.iterator().next();
            break;
        default:
            throw new IllegalArgumentException(this.getName() + ": " + values.size());
        }
        try {
            field.set(dest, value);
        } catch (IllegalAccessException e) {
            throw new RuntimeException("TODO", e);
        }
    }
}
