package org.qooxdoo.sushi.util;

import org.junit.Test;
import static org.junit.Assert.*;

import org.qooxdoo.sushi.fs.IO;

public class TemplateTest {
	private Template template = new Template(new IO());

	@Test
	public void replace() throws TemplateException {
		String str;
		
		template.variables().put("1", "one");
		template.variables().put("2", "two");
		
		assertEquals("", template.replace("a", "b", ""));
		str = "xy";
		assertSame(str, template.replace("a", "b", str));
		assertEquals("one", template.replace("a", "b", "a1b"));
		assertEquals("onetwo", template.replace("(", ")", "(1)(2)"));
		assertEquals("aonebtwoc", template.replace("(", ")", "a(1)b(2)c"));
		assertEquals("onetwo", template.replace("_", "_", "_1__2_"));
		try {
			template.replace("_", "_", "_3_");
			fail();
		} catch (TemplateException e) {
			// ok
		}
		try {
			template.replace("_", "_", "_");
			fail();
		} catch (TemplateException e) {
			// ok
		}
	}
}
