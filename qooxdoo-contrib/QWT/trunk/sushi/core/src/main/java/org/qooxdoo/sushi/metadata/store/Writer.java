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

package org.qooxdoo.sushi.metadata.store;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.qooxdoo.sushi.metadata.Cardinality;
import org.qooxdoo.sushi.metadata.ComplexType;
import org.qooxdoo.sushi.metadata.Item;
import org.qooxdoo.sushi.metadata.SimpleType;
import org.qooxdoo.sushi.metadata.Type;

/**
 * Helper class to read and write properties. You'll usually not use this class directly,
 * use Type.loadProperties and Data.toProperties instead. 
 */
public class Writer {
    public static void write(Type type, Object obj, String name, final Store dest) {
        new Writer(dest).write(new ArrayList<Item<?>>(), type, obj, name);
    }

    private final Store dest;
    
    public Writer(Store dest) {
        this.dest = dest;
    }

    public Type write(List<Item<?>> parents, Type type, Object obj, String path) {
        if (obj != null) {
            type = type.getSchema().type(obj.getClass());
        }
        writeThis(parents, type, obj, path);
        if (type instanceof ComplexType) {
            ComplexType complex;
            String childName;
            Collection<?> children;
            int idx;

            complex = (ComplexType) type;
            for (Item item : complex.items()) {
                children = item.get(obj);
                parents.add(item);
                idx = 0;
                for (Object child : children) {
                    childName = join(path, item.getName());
                    if (item.getCardinality() == Cardinality.SEQUENCE) {
                        childName = childName + "[" + Integer.toString(idx++) + "]";
                    }
                    write(parents, item.getType(), child, childName);
                }
                parents.remove(parents.size() - 1);
            }
        }
        return type;
    }

    protected void writeThis(List<Item<?>> parents, Type type, Object obj, String path) {
        String value;
        
        if (type instanceof SimpleType) {
            value = ((SimpleType) type).valueToString(obj);
        } else if (obj == null) {
            value = type.getType().getName();
        } else {
            value = obj.getClass().getName(); 
        }
        try {
            dest.write(parents, path, value);
        } catch (RuntimeException e) {
            throw e;
        } catch (Exception e) {
            throw new StoreException(path + ": write failed: " + e.getMessage(), e);
        }
    }

    private String join(String first, String second) {
        return first.length() == 0 ? second : first + "/" + second;
    }
}
