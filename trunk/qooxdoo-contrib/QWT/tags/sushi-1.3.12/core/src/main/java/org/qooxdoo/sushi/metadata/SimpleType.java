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

import java.util.Set;


public abstract class SimpleType extends Type {
    public SimpleType(Schema schema, Class<?> type, String name) {
        super(schema, type, name);
    }

    public abstract String valueToString(Object value);
    
    /** throws an SimpleTypeException to indicate a parsing problem */
    public abstract Object stringToValue(String str) throws SimpleTypeException;

    @Override
    public String getSchemaTypeName() {
        return "xs:" + getName();
    }

    @Override
    public void addSchemaType(Set<Type> done, StringBuilder dest) {
        // type is pre-defined by w3c, nothing to do
    }
}
