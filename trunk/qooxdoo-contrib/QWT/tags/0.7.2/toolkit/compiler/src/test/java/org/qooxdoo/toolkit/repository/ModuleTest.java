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

package org.qooxdoo.toolkit.repository;

import java.util.Arrays;

import org.junit.Test;
import static org.junit.Assert.*;

public class ModuleTest {
    @Test
    public void resolve() {
        Repository repository;
        Module a = new Module("1.a");
        Module b = new Module("2.b");
        Module src;
        Chunk chunk;
        
        repository = new Repository();
        repository.add(a);
        repository.add(b);

        src = new Module("pkg.name");
        chunk = src.head();
        chunk.deps.add("1.a");
        src.add(chunk);
        chunk = new Chunk(src.getName(), "");
        chunk.deps.add("2.b");
        src.add(chunk);
        assertEquals(Arrays.asList(a.getName()), src.head().deps.names());
        assertEquals(Arrays.asList(b.getName()), chunk.deps.names());
    }

    //-- to/from string
    
    @Test
    public void string() {
        final String str = 
            "@//++ foo.b.y [a,b]\n" +
            "//++ foo.b.y [foo,bar]\n" +
            "abc\n" +
            "xy";
        Module module;
        
        module = Module.fromString(str);
        assertEquals("foo.b.y", module.getName());
        assertTrue(module.getDirect());
        assertTrue(module.head().deps.contains("a"));
        assertTrue(module.head().deps.contains("b"));
        assertEquals(str, module.toString());
        assertEquals("abc\nxy", module.getCode());
    }
}
