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

import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.util.HashMap;
import java.util.logging.Logger;

import javax.servlet.ServletException;

import org.junit.Test;

import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.toolkit.engine.Unit;

public class UnitTest {
    @Test
    public void normal() throws IOException, ServletException {
        IO io;
        Node src;
        FileNode dest;
        Unit app;
        FileNode idx;
        
        io = new IO();
        src = io.guessProjectHome(getClass()).join("src/test/java");
        dest = io.createTempDirectory();
        app = new Unit(Logger.getLogger("foo"), 
        		src, new String[] { "**/application/*.java"} , new String[] {},
                "id", "name", "org.qooxdoo.toolkit.server.application.Main", 
                new HashMap<String, Class<?>>(), dest);
        idx = app.getIndex();
        assertTrue(idx.isFile());
    }
}
