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
    public void escape() throws TemplateException {
        template.variables().put("1", "one");
        template.variables().put("2", "two");
        
        assertEquals("a1b", template.replace("a", "b", "\\a1b"));
        assertEquals("a1bab", template.replace("a", "b", "\\a1b\\ab"));
    }

	@Test
    public void copy() throws IOException {
        Node destdir;
        
        destdir = template.getSourceDir().getIO().getTemp().createTempDirectory();
        template.variables().put("home", "mhm");
        template.variables().put("machine", "walter");
        
        assertEquals("", template.status(destdir));
        assertEquals("", template.diff(destdir));

        template.getSourceDir().join("file").writeLines("home: ${home}", "machine: ${machine}");
        assertEquals("A file\n", template.status(destdir));
        template.copy(destdir);
        assertEquals("", template.status(destdir));
        
        template.getSourceDir().join("folder").mkdir();
        assertEquals("A folder\n", template.status(destdir));
        template.copy(destdir);
        assertEquals("", template.status(destdir));
        
        template.getSourceDir().join("superdir/subdir").mkdirs();
        assertEquals("A superdir\nA superdir/subdir\n", template.status(destdir));
        template.copy(destdir);
        assertEquals("", template.status(destdir));

        template.getSourceDir().join("folder/file").writeLines("home: ${home}", "machine: ${machine}");
        assertEquals("A folder/file\n", template.status(destdir));
        template.copy(destdir);
        assertEquals("", template.status(destdir));
        
        template.variables().put("machine", "fritz");
        assertEquals("M file\nM folder/file\n", template.status(destdir));
        assertEquals("[[[file]]]\n" +
                "- machine: walter\n" +
                "+ machine: fritz\n" +
                "[[[folder/file]]]\n" + 
                "- machine: walter\n" +
                "+ machine: fritz\n", template.diff(destdir));
        template.copy(destdir);
        assertEquals("", template.status(destdir));
        assertEquals("", template.diff(destdir));
    }
	
    @Test
    public void mode() throws IOException {
        Node destdir;
        Node file;
        
        destdir = template.getSourceDir().getIO().getTemp().createTempDirectory();

        file = template.getSourceDir().join("file");
        file.writeLines("foo");
        file.setMode(0700);
        template.copy(destdir);
        assertEquals(0700, destdir.join("file").getMode());

        file.setMode(0655);
        assertEquals("m file\n", template.status(destdir));
        template.copy(destdir);
        assertEquals(0655, destdir.join("file").getMode());
    }
}
