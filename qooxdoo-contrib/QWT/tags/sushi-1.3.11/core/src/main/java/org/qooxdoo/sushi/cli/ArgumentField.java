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

package org.qooxdoo.sushi.cli;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;

import org.qooxdoo.sushi.metadata.Schema;
import org.qooxdoo.sushi.metadata.SimpleType;
import org.qooxdoo.sushi.metadata.Type;

public class ArgumentField extends Argument {
    public static ArgumentField create(String name, Schema metadata, Field field) {
        Type type;
        
        if (Modifier.isStatic(field.getModifiers())) {
            throw new IllegalArgumentException(field + ": static not allowed");
        }
        type = metadata.type(field.getType());
        if (type instanceof SimpleType) {
            return new ArgumentField(name, (SimpleType) type, field);
        } else {
            throw new IllegalArgumentException("argument type not supported: " + field.getType());
        }
    }
    
    //--

    private final Field field;
    
    public ArgumentField(String name, SimpleType simple, Field field) {
        super(name, simple);
        this.field = field;
    }

    @Override
    public void set(Object obj, Object value) {
        field.setAccessible(true);
        try {
            field.set(obj, value);
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    }
}
