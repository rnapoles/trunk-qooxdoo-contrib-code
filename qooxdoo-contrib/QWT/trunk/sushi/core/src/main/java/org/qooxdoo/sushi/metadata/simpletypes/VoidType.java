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

public class VoidType extends SimpleType {
    public VoidType(Schema schema) {
        super(schema, Void.class, "void");
    }
    
    @Override
    public Object newInstance() {
        return null;
    }

    private static final String REPR = "null";
    
    @Override
    public String valueToString(Object obj) {
        return REPR;
    }
    
    @Override
    public Object stringToValue(String str) throws SimpleTypeException {
        if (!REPR.equals(str)) {
            throw new SimpleTypeException("expected " + REPR + ", got " + str);
        }
        return null;
    }
}
