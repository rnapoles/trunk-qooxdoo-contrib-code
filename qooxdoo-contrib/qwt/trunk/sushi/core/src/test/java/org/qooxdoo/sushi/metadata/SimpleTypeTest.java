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

package org.qooxdoo.sushi.metadata;

import static org.junit.Assert.*;

import org.junit.Test;

import org.qooxdoo.sushi.metadata.model.Kind;
import org.qooxdoo.sushi.metadata.model.ModelBase;

public class SimpleTypeTest extends ModelBase {
    @Test
    public void string() {
        SimpleType type; 
        
        type = (SimpleType) METADATA.type(String.class);
        assertEquals("a", type.valueToString("a"));
    }

    @Test
    public void integer() throws SimpleTypeException {
        SimpleType type; 
        
        type = (SimpleType) METADATA.type(Integer.TYPE);
        assertEquals("2", type.valueToString(2));
        assertEquals(2, type.stringToValue("2"));
    }
    
    @Test
    public void booleaan() throws SimpleTypeException {
        SimpleType type; 
        
        type = (SimpleType) METADATA.type(Boolean.TYPE);
        assertEquals("true", type.valueToString(true));
        assertEquals("false", type.valueToString(false));
        assertEquals(true, type.stringToValue("true"));
        assertEquals(false, type.stringToValue("false"));
    }
    
    @Test
    public void integerObject() throws SimpleTypeException {
        SimpleType type; 
        
        type = (SimpleType) METADATA.type(Integer.class);
        assertEquals("22", type.valueToString(22));
        assertEquals(22, type.stringToValue("22"));
        try {
            type.stringToValue("22a");
            fail();
        } catch (SimpleTypeException e) {
            // ok;
        }
    }

    @Test
    public void enm() throws SimpleTypeException {
        SimpleType type; 
        
        type = (SimpleType) METADATA.type(Kind.class);
        assertEquals("van", type.valueToString(Kind.VAN));
        assertEquals(Kind.PICKUP, type.stringToValue("pickup"));
        try {
            type.stringToValue("nosuchcar");
            fail();
        } catch (SimpleTypeException e) {
            // ok
        }
    }
}
