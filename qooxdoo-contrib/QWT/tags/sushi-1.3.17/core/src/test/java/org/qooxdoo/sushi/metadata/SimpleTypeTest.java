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

import static org.junit.Assert.*;

import org.junit.Test;

import org.qooxdoo.sushi.metadata.model.Kind;
import org.qooxdoo.sushi.metadata.model.ModelBase;

public class SimpleTypeTest extends ModelBase {
    @Test
    public void string() {
        SimpleType type; 
        
        type = (SimpleType) MODEL.type(String.class);
        assertEquals("a", type.valueToString("a"));
    }

    @Test
    public void integer() throws SimpleTypeException {
        SimpleType type; 
        
        type = (SimpleType) MODEL.type(Integer.TYPE);
        assertEquals("2", type.valueToString(2));
        assertEquals(2, type.stringToValue("2"));
    }

    @Test
    public void longX() throws SimpleTypeException {
        check(Long.TYPE, "2", new Long(2));
    }
    
    @Test
    public void floatX() throws SimpleTypeException {
        check(Float.class, "2", new Float(2), "2.0");
        check(Float.TYPE, "2.0", new Float(2));
    }

    @Test
    public void doubleX() throws SimpleTypeException {
        check(Double.TYPE, "4.9", new Double(4.9), "4.9");
        check(Double.class, "2.0", new Double(2));
    }
    
    @Test
    public void booleanX() throws SimpleTypeException {
        SimpleType type; 
        
        type = (SimpleType) MODEL.type(Boolean.TYPE);
        assertEquals("true", type.valueToString(true));
        assertEquals("false", type.valueToString(false));
        assertEquals(true, type.stringToValue("true"));
        assertEquals(false, type.stringToValue("false"));
    }
    
    @Test
    public void integerObject() throws SimpleTypeException {
        SimpleType type; 
        
        type = (SimpleType) MODEL.type(Integer.class);
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
        
        type = (SimpleType) MODEL.type(Kind.class);
        assertEquals("van", type.valueToString(Kind.VAN));
        assertEquals(Kind.PICKUP, type.stringToValue("pickup"));
        try {
            type.stringToValue("nosuchcar");
            fail();
        } catch (SimpleTypeException e) {
            // ok
        }
    }
    
    private void check(Class<?> clazz, String str, Object value) throws SimpleTypeException {
        check(clazz, str, value, str);
    }
    
    private void check(Class<?> clazz, String str, Object value, String out) throws SimpleTypeException {
        SimpleType type;
        
        type = (SimpleType) MODEL.type(clazz);
        assertEquals(value, type.stringToValue(str));
        assertEquals(out, type.valueToString(value));
    }
}
