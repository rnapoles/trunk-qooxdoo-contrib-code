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

package org.qooxdoo.sushi.util;

import org.junit.Test;

import org.qooxdoo.sushi.metadata.model.Car;
import org.qooxdoo.sushi.metadata.model.Engine;
import org.qooxdoo.sushi.metadata.model.Vendor;
import static org.junit.Assert.*;

public class DumpTest {
    @Test
    public void nll() {
        check("null\n", null);
    }
    @Test
    public void string() {
        check("\"str\"\n", "str");
    }
    @Test
    public void object() {
        check("engine\n" +
              "  turbo: false\n" +
              "  ps: 0\n", new Engine());
    }
    @Test
    public void emptyList() {
        check("vendor\n  id: 0\n", new Vendor());
    }
    @Test
    public void list() {
        Vendor v;
        
        v = new Vendor();
        v.cars().add(new Car());
        v.cars().add(new Car());
        check("vendor\n" +
              "  id: 0\n" +
              "  cars[0]: car\n" + 
              "    name: \"\"\n" + 
              "    kind: normal\n" +  
              "    seats: 0\n" +
              "    engine: engine [...]\n" +
              "    radio: null\n" +
              "  cars[1]: car\n" + 
              "    name: \"\"\n" + 
              "    kind: normal\n" +  
              "    seats: 0\n" +
              "    engine: engine [...]\n" +
              "    radio: null\n"
              , 
              v);
    }

    @Test
    public void integer() {
        check("1\n", 1);
    }
    @Test
    public void lng() {
        check("2\n", 2L);
    }
    @Test
    public void character() {
        check("'c'\n", 'c');
    }
    
    @Test
    public void array() {
        check("1\n" +
              "  data[0]: \"2\"\n" +
              "  data[1]: 2\n", 
              new Object() {
                public Object[] data = { "2", 2 };
        });
    }
    
    @Test
    public void clazz() throws Exception {
        check("org.qooxdoo.sushi.util.DumpTest\n", getClass());
    }

    @Test
    public void method() throws Exception {
        check("public void org.qooxdoo.sushi.util.DumpTest.method() throws java.lang.Exception\n", 
                getClass().getDeclaredMethod("method", new Class[] {}));
    }

    private void check(String expected, Object obj) {
        assertEquals(expected, Dump.dump(obj));
    }
}
