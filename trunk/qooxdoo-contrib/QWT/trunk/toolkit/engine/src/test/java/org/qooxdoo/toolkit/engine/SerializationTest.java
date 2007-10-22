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

package org.qooxdoo.toolkit.engine;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.junit.Test;
import org.qooxdoo.toolkit.engine.Parser;
import org.qooxdoo.toolkit.engine.Serializer;

import static org.junit.Assert.*;

public class SerializationTest {
    @Test
    public void nulL() {
        check("null", null);
    }

    @Test
    public void truE() {
        check("true", Boolean.TRUE);
    } 

    @Test
    public void falsE() {
        check("false", Boolean.FALSE);
    }

    @Test
    public void integer() {
        check("#1", new Integer(1));
    }

    @Test
    public void lonG() {
        check("&-1", new Long(-1));
    }

    @Test
    public void parseError() {
        try {
            Parser.run("nul");
            fail();
        } catch (IllegalArgumentException e) {
            // ok
        }
    }

    @Test
    public void string() {
        check("''", "");
        check("'%00'", "\u0000");
        check("'+0100'", "\u0100");
        check("'+20ac'", "\u20ac"); // euro sign
        check("'+ffff'", "\uffff");
        check("'foo'", "foo");
        check("'%27'", "'");
        check("'%2f%2e'", "/.");
        check("'a%20b'", "a b");
        check("'1%261'", "1&1");
    }

    @Test
    public void list() {
        List<String> lst;
        
        lst = new ArrayList<String>();
        check("[]", lst);
        lst.add("abc");
        lst.add("123");
        check("['abc','123']", lst);
    }
    @Test
    public void list2() {
        List<String> lst;
        
        lst = new ArrayList<String>();
        lst.add("null");
        lst.add(null);
        check("['null',null]", lst);
    }

    @Test
    public void set() {
        Set<String> lst;
        
        lst = new HashSet<String>();
        lst.add("xyz");
        check("{'xyz'}", lst);
    }
    
    
    @Test
    public void listReferTwice() {
        final String a = "eq";
        List<String> lst;
        
        lst = new ArrayList<String>();
        lst.add(a);
        lst.add(a);
        check("['eq',@1]", lst);
    }

    @Test
    public void map() {
        Map<String, String> map;
        
        map = new HashMap<String, String>();
        check("()", map);
        map.put("a", "b");
        check("('a':'b')", map);
        map.put("1", "2");
        check("('1':'2','a':'b')", map);
    }

    @Test
    public void mapRecursive() {
        Map<String, Map<?, ?>> map;
        String str;
        Map<String, Map<?, ?>> reloaded;
        
        map = new HashMap<String, Map<?, ?>>();
        map.put("self", map);
        
        str = Serializer.run(map);
        assertEquals("('self':@0)", str);
        reloaded = (Map) Parser.run(str);
        assertEquals(1, reloaded.size());
        assertSame(reloaded, reloaded.get("self"));
    }

    @Test
    public void object() {
        Object obj;
        
        obj = new Data("A", null);
        check("<'org%2eqooxdoo%2etoolkit%2eengine%2eSerializationTest%24Data',('b':null,'a':'A')>", obj);
    }

    @Test
    public void objectRecursive() {
        Data obj;
        String str;
        Data reloaded;
        
        obj = new Data("A", null);
        obj.b = obj;
        str = Serializer.run(obj);
        assertEquals("<'org%2eqooxdoo%2etoolkit%2eengine%2eSerializationTest%24Data',('b':@0,'a':'A')>", str);
        reloaded = (Data) Parser.run(str);
        assertEquals(obj.a, reloaded.a);
        assertSame(reloaded, reloaded.b);
    }
    
    private void check(String expected, Object obj) {
        String str;
        
        str = Serializer.run(obj);
        assertEquals(expected, str);
        assertEquals(obj, Parser.run(str));
    }
    
    public static class Data {
        private final String a;
        private Data b;
        
        public Data() {
            this(null, null);
        }
        
        public Data(String a, Data b) {
            this.a = a;
            this.b = b;
        }
        
        @Override
        public boolean equals(Object obj) {
            Data data;
            
            if (obj instanceof Data) {
                data = (Data) obj;
                return same(a, data.a) && same(b, data.b);
            }
            return false;
        }
        
        @Override
        public int hashCode() {
            return 0;
        }
        
        private static boolean same(Object left, Object right) {
            return left == null ? right == null : left.equals(right);
        }
    }
}
