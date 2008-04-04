/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2008 1&1 Internet AG, Germany, http://www.1and1.org
   
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
   
   Authors:
     * Michael Hartmeier (mlhartme)
   
 ************************************************************************ */

package org.qooxdoo.toolkit.engine;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import java.io.ByteArrayOutputStream;

import org.junit.Before;
import org.junit.Test;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.file.FileNode;
import org.qooxdoo.sushi.io.Buffer;

public class ResourceManagerTest {
    private ResourceManager rm;

    @Before
    public void setUp() {
        IO io;
        FileNode home;
        
        io = new IO();
        home = io.guessProjectHome(ResourceManager.class);
        io.setWorking(home);
        rm = new ResourceManager(io);
        rm.addResourcePrefix("resource/");
        rm.addFilePrefix("src/");
        rm.addPrefix("", home);
    }

    @Test
    public void statiC() throws Exception {
        read("pom.xml");
        assertNull(rm.lookup("notfound.xml"));
    }

    @Test
    public void resource() throws Exception {
        read("resource/widget/Windows/arrows/down.gif");
        assertNull(rm.lookup("resource/widget/Windows/arrows/nosuchfile.png"));
    }

    @Test
    public void file() throws Exception {
        read("src/test/resources/resource.xml");
        assertNull(rm.lookup("src/nosuchfile.xml"));
    }

    private void read(String path) throws Exception {
        Resource res;
        ByteArrayOutputStream dest;
        
        res = rm.lookup(path);
        assertNotNull(path, res);
        dest = new ByteArrayOutputStream();
        res.copy(new Buffer(), dest);
    }
}
