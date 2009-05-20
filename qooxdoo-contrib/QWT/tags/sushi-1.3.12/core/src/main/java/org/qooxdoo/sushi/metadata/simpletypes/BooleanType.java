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

import org.qooxdoo.sushi.metadata.Schema;
import org.qooxdoo.sushi.metadata.SimpleType;
import org.qooxdoo.sushi.metadata.SimpleTypeException;

public class BooleanType extends SimpleType {
    public BooleanType(Schema schema) {
        super(schema, Boolean.class, "boolean");
    }
    
    @Override
    public Object newInstance() {
        return Boolean.FALSE;
    }
    
    @Override
    public String valueToString(Object obj) {
        return ((Boolean) obj).toString();
    }
    
    @Override
    public Object stringToValue(String str) throws SimpleTypeException {
        // TODO: because oocalc turns them to upper case
        str = str.toLowerCase();
        if ("true".equals(str)) {
            return Boolean.TRUE;
        } else if ("false".equals(str)) {
            return Boolean.FALSE;
        } else {
            throw new SimpleTypeException("expected true or false, got " + str + ".");
        }
    }
}
