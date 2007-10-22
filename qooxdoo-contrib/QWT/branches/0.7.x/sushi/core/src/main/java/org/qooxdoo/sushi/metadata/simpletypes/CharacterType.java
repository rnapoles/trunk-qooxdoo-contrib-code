/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2007 1&1 Internet AG, Germany, http://www.1and1.org
   
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

public class CharacterType extends SimpleType {
    public CharacterType(Schema schema) {
        super(schema, Character.class, "char");
    }
    
    @Override
    public Object newInstance() {
        return 0;
    }

    @Override
    public String valueToString(Object obj) {
        return ((Character) obj).toString();
    }
    
    @Override
    public Object stringToValue(String str) {
        return str.charAt(0); // TODO
    }
}
