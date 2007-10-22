/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2007 1&1 Internet AG, Germany, http://www.1and1.org
   
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
   
   Authors:
     * Michael Hartmeier (mlhartme)
   
 ************************************************************************ */

package org.qooxdoo.toolkit.server;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.toolkit.engine.MimeTypes;
import org.qooxdoo.toolkit.engine.Resource;
import org.qooxdoo.toolkit.engine.ResourceManager;

public class ResourceManagerTest {
    private ResourceManager rm;

    @Before
    public void setUp() {
        MimeTypes mt;
        IO io;
        FileNode home;
        
        mt = MimeTypes.create();
        mt.add("class", "application/java");
        io = new IO();
        home = io.guessProjectHome(ResourceManager.class);
        io.setWorking(home);
        rm = new ResourceManager(io, mt);
        rm.addResourcePrefix("resource/");
        rm.addFilePrefix("src/");
        rm.addStatic("pom.xml", home.join("pom.xml"), null);
    }

    @Test
    public void statiC() throws Exception {
        read("pom.xml");
        assertNull(rm.lookup("notfound"));
    }

    @Test
    public void resource() throws Exception {
        read("resource/widget/Windows/arrows/down.gif");
        try {
            read("resource/widget/Windows/arrows/nosuchfile.png");
            fail();
        } catch (IOException e) {
            // ok
        }
    }

    @Test
    public void file() throws Exception {
        read("src/test/resources/resource.xml");
        try {
            read("src/nosuchfile.xml");
            fail();
        } catch (IOException e) {
            // ok
        }
    }

    private void read(String path) throws Exception {
        Resource res;
        ByteArrayOutputStream dest;
        
        dest = new ByteArrayOutputStream();
        res = rm.lookup(path);
        assertNotNull(res);
        res.copy(dest);
    }
}
