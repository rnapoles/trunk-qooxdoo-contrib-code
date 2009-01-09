package org.qooxdoo.sushi.template;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Node;

public class TemplateTest {
	private Template template;
	
	public TemplateTest() throws IOException {
        template = new Template(new IO().getTemp().createTempDirectory());
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
        assertEquals("### file\n" +
        		"+ home: mhm\n" +
                "+ machine: walter\n", template.diff(destdir));
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
        assertEquals("### file\n" +
                "- machine: walter\n" +
                "+ machine: fritz\n" +
                "### folder/file\n" + 
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
