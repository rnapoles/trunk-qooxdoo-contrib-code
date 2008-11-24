package org.qooxdoo.sushi.template;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertSame;
import static org.junit.Assert.fail;

import java.io.IOException;

import org.junit.Test;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.template.Template;
import org.qooxdoo.sushi.template.TemplateException;

public class TemplateTest {
	private Template template;
	
	public TemplateTest() throws IOException {
        template = new Template(new IO().getTemp().createTempDirectory());
	}

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

	@Test
    public void copy() throws IOException {
        Node destdir;
        
        destdir = template.getSourceDir().getIO().getTemp().createTempDirectory();
        template.variables().put("home", "mhm");
        template.variables().put("machine", "walter");
        
        template.getSourceDir().join("file").writeLines("home: ${home}", "machine: ${machine}");
        template.getSourceDir().join("dir").mkdir();
        template.getSourceDir().join("dir/file").writeLines("home: ${home}", "machine: ${machine}");
        template.copy(destdir);
    }
}
