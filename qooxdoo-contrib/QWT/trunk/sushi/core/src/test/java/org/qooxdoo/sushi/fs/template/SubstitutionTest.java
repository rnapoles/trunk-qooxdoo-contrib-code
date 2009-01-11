package org.qooxdoo.sushi.fs.template;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.junit.Test;

public class SubstitutionTest {
    private Map<String, String> props;

    public SubstitutionTest() throws IOException {
        props = new HashMap<String, String>();
        props.put("1", "one");
        props.put("2", "two");
	}

	@Test
	public void underline() throws TemplateException {
	    Substitution underline;
	    
		underline = new Substitution("_", "_", '/');
		assertEquals("", underline.apply("", props));
        assertEquals("1", underline.apply("1", props));
        assertEquals("one", underline.apply("_1_", props));
        assertEquals(" one xyz", underline.apply(" _1_ xyz", props));
        assertEquals("onetwo", underline.apply("_1__2_", props));
        assertEquals("_", underline.apply("/_", props));
        assertEquals("__", underline.apply("/_/_", props));
        assertEquals("abc_def", underline.apply("abc/_def", props));

        try {
            underline.apply("_3_", props);
            fail();
        } catch (TemplateException e) {
            // ok
        }
        try {
            underline.apply("_", props);
            fail();
        } catch (TemplateException e) {
            // ok
        }
	}

    @Test
    public void ant() throws TemplateException {
        Substitution ant;
        
        ant = new Substitution("${", "}", '\\');
        assertEquals("", ant.apply("", props));
        assertEquals("1", ant.apply("1", props));
        assertEquals("one", ant.apply("${1}", props));
        assertEquals(" one xyz", ant.apply(" ${1} xyz", props));
        assertEquals("onetwo", ant.apply("${1}${2}", props));
        assertEquals("${", ant.apply("\\${", props));
        assertEquals("${${", ant.apply("\\${\\${", props));
        assertEquals("123${456", ant.apply("123\\${456", props));
        try {
            ant.apply("${3}", props);
            fail();
        } catch (TemplateException e) {
            // ok
        }
        try {
            ant.apply("${", props);
            fail();
        } catch (TemplateException e) {
            // ok
        }
	}
}
