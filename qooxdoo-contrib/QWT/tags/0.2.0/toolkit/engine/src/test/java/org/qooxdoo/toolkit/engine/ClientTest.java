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

package org.qooxdoo.toolkit.engine;

import static org.junit.Assert.assertTrue;

import java.io.IOException;

import javax.servlet.ServletException;

import org.junit.Ignore;
import org.junit.Test;
import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.io.Node;

@Ignore // TODO
public class ClientTest {
    @Test
    public void normal() throws IOException, ServletException {
        IO io;
        Node src;
        FileNode dest;
        Client app;
        FileNode idx;
        
        io = new IO();
        src = io.guessProjectHome(getClass()).join("src/test/java");
        dest = io.createTempDirectory();
        app = new Client(null, 
        		src, new String[] { "**/client/*.java"} , new String[] {},
                "id", "org.qooxdoo.toolkit.engine.client.Main", dest);
        idx = app.getIndex();
        assertTrue(idx.isFile());
    }
}
