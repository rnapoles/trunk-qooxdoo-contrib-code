package org.qooxdoo.sushi.fs.copy;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Node;

public class TemplateTest {
	private IO io;
	private Template template;
	
	public TemplateTest() throws IOException {
		io = new IO();
        template = new Template(io.getTemp().createTempDirectory());
	}


	@Test
    public void copy() throws IOException {
        Node destdir;
        
        destdir = template.getSourceDir().getIO().getTemp().createTempDirectory();
        template.variables().put("home", "mhm");
        template.variables().put("machine", "walter");
        
        assertEquals("", status(destdir));
        assertEquals("", diff(destdir));

        template.getSourceDir().join("file").writeLines("home: ${home}", "machine: ${machine}");
        assertEquals("A file\n", status(destdir));
        assertEquals("### file\n" +
        		"+ home: mhm\n" +
                "+ machine: walter\n", diff(destdir));
        template.copy(destdir);
        assertEquals("", status(destdir));
        
        template.getSourceDir().join("folder").mkdir();
        assertEquals("A folder\n", status(destdir));
        template.copy(destdir);
        assertEquals("", status(destdir));
        
        template.getSourceDir().join("superdir/subdir").mkdirs();
        assertEquals("A superdir\nA superdir/subdir\n", status(destdir));
        template.copy(destdir);
        assertEquals("", status(destdir));

        template.getSourceDir().join("folder/file").writeLines("home: ${home}", "machine: ${machine}");
        assertEquals("A folder/file\n", status(destdir));
        template.copy(destdir);
        assertEquals("", status(destdir));
        
        template.variables().put("machine", "fritz");
        assertEquals("M file\nM folder/file\n", status(destdir));
        assertEquals("### file\n" +
                "- machine: walter\n" +
                "+ machine: fritz\n" +
                "### folder/file\n" + 
                "- machine: walter\n" +
                "+ machine: fritz\n", diff(destdir));
        template.copy(destdir);
        assertEquals("", status(destdir));
        assertEquals("", diff(destdir));
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
        assertEquals("m file\n", status(destdir));
        template.copy(destdir);
        assertEquals(0655, destdir.join("file").getMode());
    }
    
    private String status(Node destdir) throws IOException {
    	Node tmp = io.getTemp().createTempDirectory();
    	template.copy(tmp);
    	return tmp.status(destdir);
    }
    
    private String diff(Node destdir) throws IOException {
    	Node tmp = io.getTemp().createTempDirectory();
    	template.copy(tmp);
    	return tmp.status(destdir);
    }
}
