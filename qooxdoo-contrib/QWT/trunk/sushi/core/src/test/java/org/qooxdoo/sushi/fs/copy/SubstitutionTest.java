package org.qooxdoo.sushi.fs.copy;

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
	public void underline() throws SubstitutionException {
	    Substitution underline;
	    
		underline = new Substitution("_", "_", '/', props);
		assertEquals("", underline.apply(""));
        assertEquals("1", underline.apply("1"));
        assertEquals("one", underline.apply("_1_"));
        assertEquals(" one xyz", underline.apply(" _1_ xyz"));
        assertEquals("onetwo", underline.apply("_1__2_"));
        assertEquals("_", underline.apply("/_"));
        assertEquals("__", underline.apply("/_/_"));
        assertEquals("abc_def", underline.apply("abc/_def"));

        try {
            underline.apply("_3_");
            fail();
        } catch (SubstitutionException e) {
            // ok
        }
        try {
            underline.apply("_");
            fail();
        } catch (SubstitutionException e) {
            // ok
        }
	}

    @Test
    public void ant() throws SubstitutionException {
        Substitution ant;
        
        ant = Substitution.ant(props);
        assertEquals("", ant.apply(""));
        assertEquals("1", ant.apply("1"));
        assertEquals("one", ant.apply("${1}"));
        assertEquals(" one xyz", ant.apply(" ${1} xyz"));
        assertEquals("onetwo", ant.apply("${1}${2}"));
        assertEquals("${", ant.apply("\\${"));
        assertEquals("${${", ant.apply("\\${\\${"));
        assertEquals("123${456", ant.apply("123\\${456"));
        try {
            ant.apply("${3}");
            fail();
        } catch (SubstitutionException e) {
            // ok
        }
        try {
            ant.apply("${");
            fail();
        } catch (SubstitutionException e) {
            // ok
        }
	}
}
