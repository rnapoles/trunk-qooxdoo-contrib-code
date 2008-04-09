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

package org.qooxdoo.toolkit.engine.common;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertSame;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.junit.Test;

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
            Parser.run(new Registry(), null, "nul");
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
    public void listWithTwoItems() {
        List<Site> lst;
        
        lst = new ArrayList<Site>();
        lst.add(new Site("a", "b", "c", null, null));
        lst.add(new Site("x", "y", "z", null, null));
        check(null, lst);
    }

    public static class Site {
        public final String id;

        // null if not yet available
        public final String name;

        public final String svnurl;
        
        // null if not yet available
        public final String path;
        
        // null if not available
        public final String lastUpdate;
        
        public Site() { // TODO: needed for serialize
            this("TODO", "name", "svurl", null, null);
        }
        
        public Site(String id, String name, String svnurl, String path, String lastUpdate) {
            this.id = id;
            this.name = name;
            this.svnurl = svnurl;
            this.path = path;
            this.lastUpdate = lastUpdate;
        }
        
        @Override
        public String toString() {
            return name == null ? id : name;
        }
        
        @Override
        public int hashCode() {
            return id.hashCode();
        }
        
        @Override
        public boolean equals(Object obj) {
            Site site;
            
            if (obj instanceof Site) {
                site = (Site) obj;
                return id.equals(site.id) && eq(name, site.name) && eq(svnurl, site.svnurl) && eq(path, site.path)
                  && eq(lastUpdate, site.lastUpdate);
            }
            return false;
        }
        
        private static boolean eq(String a, String b) {
            return a == null ? (b == null) : a.equals(b);
        }
    }
    @Test
    public void serviceToProxy() {
        Foo service;
        Registry r;
        String str;
        Object proxy;
        
        service = new Foo();
        r = new Registry();
        str = Serializer.run(r, service);
        assertEquals(1, r.size());
        assertEquals("/0,'org%2eqooxdoo%2etoolkit%2eengine%2ecommon%2eSerializationTest%24FooService'/", str);
        proxy = Parser.run(r, null, str);
        assertNotNull(proxy);
        assertTrue(java.lang.reflect.Proxy.isProxyClass(proxy.getClass()));
    }

    @Test
    public void proxyToService() {
        Foo foo;
        Registry r;
        String str;
        Proxy proxy;
        
        foo = new Foo();
        proxy = new Proxy(null, 0, FooService.class, null);
        r = new Registry();
        r.add(foo);
        str = Serializer.run(r, proxy);
        assertEquals(1, r.size());
        assertEquals("\\0,'org%2eqooxdoo%2etoolkit%2eengine%2ecommon%2eSerializationTest%24FooService'\\", str);
        assertSame(foo, Parser.run(r, null, str));
    }

    @Test
    public void map() {
        Map<String, String> map;
        
        map = new HashMap<String, String>();
        check("()", map);
        map.put("a", "b");
        check("('a':'b')", map);
    }

    @Test
    public void mapRecursive() {
        Map<String, Map<?, ?>> map;
        String str;
        Map<String, Map<?, ?>> reloaded;
        Registry r;
        
        r = new Registry();
        map = new HashMap<String, Map<?, ?>>();
        map.put("self", map);
        
        str = Serializer.run(r, map);
        assertEquals("('self':@0)", str);
        reloaded = (Map) Parser.run(r, null, str);
        assertEquals(1, reloaded.size());
        assertSame(reloaded, reloaded.get("self"));
    }

    @Test
    public void object() {
        check(null, new Data("A", null));
    }

    @Test
    public void objectRecursive() {
        Registry r;
        Data obj;
        String str;
        Data reloaded;
        
        r = new Registry();
        obj = new Data("A", null);
        obj.b = obj;
        str = Serializer.run(r, obj);
        reloaded = (Data) Parser.run(r, null, str);
        assertEquals(obj.a, reloaded.a);
        assertSame(reloaded, reloaded.b);
    }
    
    private void check(String expected, Object obj) {
        Registry r;
        String str;
        
        r = new Registry();
        str = Serializer.run(r, obj);
        if (expected != null) {
            assertEquals(expected, str);
        }
        assertEquals(obj, Parser.run(r, null, str));
    }
    
    //--
    
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
 
    private static interface FooService {
        void hello();
    }
    
    private static class Foo implements FooService {
        public void hello() { }
    }
}
