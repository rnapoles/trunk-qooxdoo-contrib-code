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

package org.qooxdoo.sushi.metadata;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

public class Variable<T> {
    public final Object parent;
    public final Item<T> item;
    
    public Variable(Object parent, Item<T> item) {
        this.parent = parent;
        this.item = item;
    }
    
    public Collection<T> get() {
        return item.get(parent);
    }

    public T getOne() {
        Collection<T> all;
        
        all = get();
        if (all.size() != 1) {
            throw new IllegalStateException("" + all.size());
        }
        return all.iterator().next(); 
    }
    
    public List<String> getStrings() {
        Collection<T> values;
        List<String> result;
        SimpleType simple;
        
        values = get();
        simple = simple();
        result = new ArrayList<String>(values.size());
        for (T value : values) {
            result.add(simple.valueToString(value));
        }
        return result;
    }

    public void set(T values) {
        set(Arrays.asList(values));
    }

    public void set(List<T> values) {
        item.set(parent, values);
    }

    public void setStrings(String ...strings) throws SimpleTypeException {
        setStrings(Arrays.asList(strings));
    }
    
    public void setStrings(List<String> strings) throws SimpleTypeException {
        List<T> values;
        SimpleType simple;
        
        simple = simple();
        values = new ArrayList<T>(strings.size());
        for (String str : strings) {
            values.add((T) simple.stringToValue(str));
        }
        set(values);
    }
    
    private SimpleType simple() {
        Type type;
        
        type = item.getType();
        if (!(type instanceof SimpleType)) {
            throw new IllegalArgumentException("not a simple type: " + type.getName());
        }
        return (SimpleType) type;
    }
}
