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

public class LongType extends SimpleType {
    public LongType(Schema schema) {
        super(schema, Long.class, "long");
    }
    
    @Override
    public Object newInstance() {
        return 0;
    }

    @Override
    public String valueToString(Object obj) {
        return ((Long) obj).toString();
    }
    
    @Override
    public Object stringToValue(String str) throws SimpleTypeException {
        try {
            return Long.parseLong(str);
        } catch (NumberFormatException e) {
            throw new SimpleTypeException("number expected, got '" + str + "'");
        }            
    }
}
