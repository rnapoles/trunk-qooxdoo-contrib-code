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

import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Iterator;

import org.qooxdoo.sushi.metadata.Cardinality;
import org.qooxdoo.sushi.metadata.Item;
import org.qooxdoo.sushi.metadata.Type;

public class ArrayItem<T> extends Item<T> {
    private final Field field;
    
    public ArrayItem(Field field, Type componentType) {
        super(field.getName(), Cardinality.SEQUENCE, componentType, field);

        this.field = field;
    }

    @Override
    public Collection<T> get(Object src) {
        T[] array;
        
        try {
            array = (T[]) field.get(src);
        } catch (IllegalAccessException e) {
            throw new RuntimeException("TODO", e);
        }
        return new ArrayList<T>(Arrays.asList(array));
    }
    
    @Override
    public void set(Object dest, Collection<T> values) {
        int max;
        Object arg;
        Iterator<T> iter;
        
        max = values.size();
        arg = Array.newInstance(field.getType().getComponentType(), max);
        iter = values.iterator();
        for (int i = 0; i < max; i++) {
            Array.set(arg, i, iter.next());
        }
        try {
            field.set(dest, arg);
        } catch (IllegalAccessException e) {
            throw new RuntimeException("TODO", e);
        }
    }
}
