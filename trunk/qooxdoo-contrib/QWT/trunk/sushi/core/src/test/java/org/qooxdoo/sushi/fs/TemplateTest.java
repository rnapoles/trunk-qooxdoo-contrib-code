package org.qooxdoo.sushi.fs;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;

public class TemplateTest {
    public static class Foo extends Template {
    	public boolean called = false;
    	
        public List<Map<String, String>> contextN(Map<String, String> parent) {
            return ctx(parent, "n");
        }

        public List<Map<String, String>> contextMoreNumbers(Map<String, String> parent) {
            return ctx(parent, "m");
        }

        public void callTest(Node node, Map<String, String> context) {
        	called = true;
        }
        
        private List<Map<String, String>> ctx(Map<String, String> parent, String name) {
            List<Map<String, String>> result;
            
            result = new ArrayList<Map<String, String>>();
            result.add(map(parent, name, 1));
            result.add(map(parent, name, 2));
            return result;
        }

        private static Map<String, String> map(Map<String, String> parent, String name, int n) {
            Map<String, String> result;
            
            result = new HashMap<String, String>(parent);
            result.put(name, Integer.toString(n));
            return result;
        }
    }
    
    @Test
    public void empty() throws Exception {
    	Foo foo;
        IO io;
        Node src;
        Node dest;
        Map<String, String> context;
        
        io = new IO();
        src = io.guessProjectHome(getClass()).join("src/test/template");
        dest = io.getTemp().createTempDirectory();
        context = new HashMap<String, String>();
        context.put("var", "value");
        context.put("name", "foo");
        foo = new Foo();
        foo.applyDirectory(src, dest, context);
        assertTrue(foo.called);
        assertEquals("", dest.join("a").readString());
        assertEquals("value\n", dest.join("b").readString());
        assertEquals("bar", dest.join("foo").readString());
        assertEquals("bar", dest.join("foo").readString());
        assertEquals("1", dest.join("file1").readString());
        assertEquals("2", dest.join("file2").readString());
        assertEquals("11", dest.join("file11").readString());
        assertEquals("12", dest.join("file12").readString());
        assertEquals("21", dest.join("file21").readString());
        assertEquals("22", dest.join("file22").readString());
        assertEquals("1", dest.join("dir1/file").readString());
        assertEquals("2", dest.join("dir2/file").readString());
    }
}
