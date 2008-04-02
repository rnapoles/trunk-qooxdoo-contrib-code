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

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

import org.qooxdoo.sushi.metadata.annotation.AnnotationSchema;
import org.qooxdoo.sushi.metadata.model.Car;
import org.qooxdoo.sushi.metadata.model.Engine;
import org.qooxdoo.sushi.metadata.model.Kind;
import org.qooxdoo.sushi.metadata.model.Radio;
import org.qooxdoo.sushi.metadata.model.Vendor;

public class ComplexTypeTest {
    private static final Schema METADATA = new AnnotationSchema();

    @Test
    public void normal() {
        ComplexType type; 
        Item item;
        Car demo; 
        
        type = (ComplexType) METADATA.type(Car.class);
        assertEquals("car", type.getName());

        demo = (Car) type.newInstance();

        item = type.lookup("name");
        assertEquals("name", item.getName());
        assertEquals(String.class, item.getType().getType());
        assertEquals("", item.getOne(demo));
        item.setOne(demo, "foo");
        assertEquals("foo", item.getOne(demo));
        assertEquals(1, item.get(demo).size());
        
        item = type.lookup("seats");
        assertEquals("seats", item.getName());
        assertEquals(Integer.class, item.getType().getType());
        item.setOne(demo, 7);
        assertEquals(7, item.getOne(demo));
    }

    @Test
    public void sequence() {
        ComplexType type; 
        Item item;
        Vendor demo; 
        
        type = (ComplexType) METADATA.type(Vendor.class);
        assertEquals("vendor", type.getName());

        demo = (Vendor) type.newInstance();

        item = type.lookup("car");
        assertEquals("car", item.getName());
        assertEquals(METADATA.type(Car.class), item.getType());

        assertEquals(0, item.get(demo).size());
    }

    @Test
    public void clon() {
        Car orig; 
        Car clone;
        
        orig = new Car("foo", Kind.SPORTS, 3, new Engine(true, 11), new Radio());
        clone = METADATA.instance(orig).clone().get();
        assertTrue(orig != clone);
        assertEquals(3, clone.getSeats());
        assertEquals("foo", clone.getName());
        assertEquals(true, clone.getEngine().getTurbo());
        assertEquals(11, clone.getEngine().getPs());
        assertNotNull(clone.getRadio());
    }
}

