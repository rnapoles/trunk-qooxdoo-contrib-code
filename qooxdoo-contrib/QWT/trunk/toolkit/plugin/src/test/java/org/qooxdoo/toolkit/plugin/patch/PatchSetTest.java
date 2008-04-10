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

package org.qooxdoo.toolkit.plugin.patch;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.toolkit.plugin.binding.patch.PatchSet;

public class PatchSetTest {
    private final IO IO_OBJ = new IO();

    @Test
    public void empty() {
        assertEquals(0, load("").size());
        assertEquals(0, load("### somefile").size());
    }

    @Test
    public void normalAdd() throws IOException {
        PatchSet set;
        
        set = load("### a\n" +
                "+++\n" +
                "a\n" +
                "+++\n");
        assertEquals(1, set.size());
    }

    @Test
    public void normalModify() throws IOException {
        PatchSet set;
        
        set = load("### a\n" +
                "***\n" +
                "a\n" +
                "b");
        assertEquals(1, set.size());
    }

    @Test(expected=IllegalArgumentException.class)
    public void unused() throws IOException {
        PatchSet set;
        Node dir;
        
        set = load("### mhm\n+++\nfoo");
        dir = IO_OBJ.getMemoryFilesystem().root().node("");
        dir.join("mhm").writeBytes();
        set.apply(dir);
    }
    
    private PatchSet load(String str) {
        try {
            return PatchSet.load(IO_OBJ.stringNode(str));
        } catch (IOException e) {
            throw new RuntimeException("unexpected", e);
        }
    }
}
