package org.qooxdoo.sushi.fs;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.junit.Test;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.util.Substitution;

public class CopyDiffTest {
	private IO io;
	private Map<String, String> variables;
	private Copy copy;
	
	public CopyDiffTest() throws IOException {
		io = new IO();
		variables = new HashMap<String, String>();
        copy = new Copy(io.getTemp().createTempDirectory(),
                io.filter().includeAll(), true,
                Substitution.path(variables), Substitution.ant(variables));
	}

	@Test
	public void diff() throws Exception {
		Node left;
		Node right;
		
		left = io.getTemp().createTempDirectory();
		right = io.getTemp().createTempDirectory();
		left.join("left").writeString("1");
		right.join("right").writeString("2");
		assertEquals("R left\nA right\n", left.diffDirectory(right, true));
		assertEquals("A right\n", new Diff(true).directory(left, right, "right"));
	}

	@Test
    public void template() throws Exception {
        Node destdir;
        
        destdir = copy.getSourceDir().getIO().getTemp().createTempDirectory();
        variables.put("home", "mhm");
        variables.put("machine", "walter");
        
        assertEquals("", brief(destdir));
        assertEquals("", diff(destdir));

        copy.getSourceDir().join("file").writeLines("home: ${home}", "machine: ${machine}");
        assertEquals("A file\n", brief(destdir));
        assertEquals("### file\n" +
        		"+ home: mhm\n" +
                "+ machine: walter\n", diff(destdir));
        copy.directory(destdir);
        assertEquals("", brief(destdir));
        
        copy.getSourceDir().join("folder").mkdir();
        assertEquals("A folder\n", brief(destdir));
        copy.directory(destdir);
        assertEquals("", brief(destdir));
        
        copy.getSourceDir().join("superdir/subdir").mkdirs();
        assertEquals("A superdir\nA superdir/subdir\n", brief(destdir));
        copy.directory(destdir);
        assertEquals("", brief(destdir));

        copy.getSourceDir().join("folder/file").writeLines("home: ${home}", "machine: ${machine}");
        assertEquals("A folder/file\n", brief(destdir));
        copy.directory(destdir);
        assertEquals("", brief(destdir));
        
        variables.put("machine", "fritz");
        assertEquals("M file\nM folder/file\n", brief(destdir));
        assertEquals("### file\n" +
                "-machine: walter\n" +
                "+machine: fritz\n" +
                "### folder/file\n" + 
                "-machine: walter\n" +
                "+machine: fritz\n", diff(destdir));
        copy.directory(destdir);
        assertEquals("", brief(destdir));
        assertEquals("", diff(destdir));
    }
	
    @Test
    public void mode() throws Exception {
        Node destdir;
        Node file;
        
        destdir = copy.getSourceDir().getIO().getTemp().createTempDirectory();

        file = copy.getSourceDir().join("file");
        file.writeLines("foo");
        file.setMode(0700);
        copy.directory(destdir);
        assertEquals(0700, destdir.join("file").getMode());

        file.setMode(0655);
        assertEquals("m file\n", brief(destdir));
        copy.directory(destdir);
        assertEquals(0655, destdir.join("file").getMode());
    }
    
    private String diff(Node destdir) throws IOException {
        return doDiff(destdir, false);
    }

    private String brief(Node destdir) throws IOException {
        return doDiff(destdir, true);
    }
    
    private String doDiff(Node destdir, boolean brief) throws IOException {
        Node tmp = io.getTemp().createTempDirectory();
        copy.directory(tmp);
        return destdir.diffDirectory(tmp, brief);
    }
}
