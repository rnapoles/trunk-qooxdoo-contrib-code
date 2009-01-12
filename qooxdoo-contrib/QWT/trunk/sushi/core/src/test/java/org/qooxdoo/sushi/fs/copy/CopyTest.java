package org.qooxdoo.sushi.fs.copy;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Ignore;
import org.junit.Test;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Node;

@Ignore
public class CopyTest {
	private IO io;
	private Copy copy;
	
	public CopyTest() throws IOException {
		io = new IO();
        copy = new Copy(io.getTemp().createTempDirectory());
	}


	@Test
    public void copy() throws IOException {
        Node destdir;
        
        destdir = copy.getSourceDir().getIO().getTemp().createTempDirectory();
        copy.variables().put("home", "mhm");
        copy.variables().put("machine", "walter");
        
        assertEquals("", status(destdir));
        assertEquals("", diff(destdir));

        copy.getSourceDir().join("file").writeLines("home: ${home}", "machine: ${machine}");
        assertEquals("A file\n", status(destdir));
        assertEquals("### file\n" +
        		"+ home: mhm\n" +
                "+ machine: walter\n", diff(destdir));
        copy.copy(destdir);
        assertEquals("", status(destdir));
        
        copy.getSourceDir().join("folder").mkdir();
        assertEquals("A folder\n", status(destdir));
        copy.copy(destdir);
        assertEquals("", status(destdir));
        
        copy.getSourceDir().join("superdir/subdir").mkdirs();
        assertEquals("A superdir\nA superdir/subdir\n", status(destdir));
        copy.copy(destdir);
        assertEquals("", status(destdir));

        copy.getSourceDir().join("folder/file").writeLines("home: ${home}", "machine: ${machine}");
        assertEquals("A folder/file\n", status(destdir));
        copy.copy(destdir);
        assertEquals("", status(destdir));
        
        copy.variables().put("machine", "fritz");
        assertEquals("M file\nM folder/file\n", status(destdir));
        assertEquals("### file\n" +
                "- machine: walter\n" +
                "+ machine: fritz\n" +
                "### folder/file\n" + 
                "- machine: walter\n" +
                "+ machine: fritz\n", diff(destdir));
        copy.copy(destdir);
        assertEquals("", status(destdir));
        assertEquals("", diff(destdir));
    }
	
    @Test
    public void mode() throws IOException {
        Node destdir;
        Node file;
        
        destdir = copy.getSourceDir().getIO().getTemp().createTempDirectory();

        file = copy.getSourceDir().join("file");
        file.writeLines("foo");
        file.setMode(0700);
        copy.copy(destdir);
        assertEquals(0700, destdir.join("file").getMode());

        file.setMode(0655);
        assertEquals("m file\n", status(destdir));
        copy.copy(destdir);
        assertEquals(0655, destdir.join("file").getMode());
    }
    
    private String status(Node destdir) throws IOException {
    	Node tmp = io.getTemp().createTempDirectory();
    	copy.copy(tmp);
    	return tmp.status(destdir);
    }
    
    private String diff(Node destdir) throws IOException {
    	Node tmp = io.getTemp().createTempDirectory();
    	copy.copy(tmp);
    	return tmp.status(destdir);
    }
}
