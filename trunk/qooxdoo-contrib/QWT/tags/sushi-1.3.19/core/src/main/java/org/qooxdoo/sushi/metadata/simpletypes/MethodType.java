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

package org.qooxdoo.sushi.metadata.simpletypes;

import java.lang.reflect.Method;

import org.qooxdoo.sushi.metadata.Schema;
import org.qooxdoo.sushi.metadata.SimpleType;

public class MethodType extends SimpleType {
    public MethodType(Schema schema) {
        super(schema, Method.class, "method");
    }
    
    @Override
    public Object newInstance() {
        try {
            return Object.class.getDeclaredMethod("toString", new Class[0]);
        } catch (SecurityException e) {
            throw new RuntimeException(e);
        } catch (NoSuchMethodException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String valueToString(Object obj) {
        return obj.toString();
    }
    
    @Override
    public Object stringToValue(String str) {
        throw new UnsupportedOperationException("TODO");
    }
}
