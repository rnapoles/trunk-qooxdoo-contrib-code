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

import java.util.List;

import org.junit.Test;

import static org.junit.Assert.*;

import org.qooxdoo.sushi.metadata.Path.Step;
import org.qooxdoo.sushi.metadata.model.Car;
import org.qooxdoo.sushi.metadata.model.ModelBase;

public class PathTest extends ModelBase {
    @Test
    public void parse() {
        List<Step> steps;
        
        steps = new Path("foo/bar[2]").steps();
        assertEquals(2, steps.size());
        assertEquals("foo", steps.get(0).name);
        assertEquals(-1, steps.get(0).idx);
        assertEquals("bar", steps.get(1).name);
        assertEquals(2, steps.get(1).idx);
    }

    @Test
    public void empty() {
        one(audi, audi, "");
    }

    @Test
    public void selectOne() {
        one("audi", audi, "name");
        one(4, audi, "seats");
        one(false, audi, "engine/turbo");
        one(90, audi, "engine/ps");
        one(audi.getRadio(), audi, "radio");
    }

    @Test
    public void selectAll() {
        all(vendor, "car", audi, bmw);
        all(vendor, "car/engine/ps", 90, 200);
        all(vendor, "car/radio", audi.getRadio());
    }

    @Test
    public void selectIndex() {
        all(vendor, "car[0]", audi);
        all(vendor, "car[1]", bmw);
        all(vendor, "car[1]/engine", bmw.getEngine());
    }

    @Test
    public void accessFalse() {
        Variable<Integer> v;
        
        assertTrue(null, access(bmw, "radio", false).get().isEmpty());
        assertSame(audi.getRadio(), access(audi, "radio", false).getOne());

        v = (Variable) access(audi, "engine/ps", false);
        assertEquals((Object) 90, v.getOne());
        v.set(91);
        assertEquals((Object) 91, v.getOne());
    }

    @Test
    public void accessAmbiguous() {
        try {
            access(vendor, "car/engine", false);
            fail();
        } catch (PathException e) {
            // ok
        }
    }

    @Test
    public void accessTrue() {
        Variable<Boolean> v;
        
        assertNull(bmw.getRadio());
        v = (Variable) access(bmw, "radio/cd", true);
        assertNotNull(bmw.getRadio());
        assertFalse(v.getOne());
        v.set(true);
        assertTrue(bmw.getRadio().getCd());
    }

    @Test
    public void accessIndex() {
        Variable<?> v;
        
        assertEquals(2, vendor.cars().size());
        v = access(vendor, "car[3]/engine", true);
        assertEquals(4, vendor.cars().size());
        assertSame(((Car) vendor.cars().get(3)).getEngine(), v.getOne());
    }

    @Test
    public void accessLastIndex() {
        try {
            access(vendor, "car[3]", true);
            fail();
        } catch (PathException e) {
            // ok
        }
    }


    //--
    
    private void one(Object expected, Object obj, String path) {
        Path p;
        
        p = new Path(path);
        assertEquals(expected, p.selectOne(MODEL.instance(obj)).get());
    }

    private void all(Object obj, String path, Object ... expected) {
        Path p;
        List<Instance<?>> result;

        p = new Path(path);
        result = p.select(MODEL.instance(obj));
        assertEquals(expected.length, result.size());
        for (int i = 0; i < expected.length; i++) {
            assertEquals(expected[i], result.get(i).get());
        }
    }

    private Variable<?> access(Object obj, String path, boolean create) {
        return new Path(path).access(MODEL.instance(obj), create);
    }
}
