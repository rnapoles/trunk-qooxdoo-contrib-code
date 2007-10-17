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

package org.qooxdoo.toolkit.plugin.binding.java;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.qooxdoo.sushi.io.IO;

public class MethodTest {
    private static final IO IO_OBJ = new IO();
    
    @Test
    public void normal() throws Exception {
        Method method;
        
        method = run(
                "<method access='private' name='bla'>\n" + 
                "  <params>\n" + 
                "    <param name='x'>\n" + 
                "      <types>\n" +
                "        <entry type='Number'/>\n" + 
                "      </types>\n" + 
                "    </param>" + 
                "    <param name='y'>\n" + 
                "      <types>\n" +
                "        <entry type='String'/>\n" + 
                "      </types>\n" + 
                "    </param>" + 
                "    <param name='z'>" +
                "      <types>\n" +
                "        <entry type='boolean'/>\n" + 
                "      </types>\n" + 
                "    </param>" + 
                "  </params>\n" +
                "</method>\n"
                );

        assertEquals("bla", method.getName());
        assertEquals(null, method.getDescription());
        assertEquals(Modifier.PRIVATE, method.getAccess());
        assertEquals(3, method.params().size());
        assertEquals("x", method.params().get(0).getName());
        assertEquals(SimpleType.NUMBER, method.params().get(0).getType());
        assertEquals("y", method.params().get(1).getName());
        assertEquals(SimpleType.STRING, method.params().get(1).getType());
        assertEquals("z", method.params().get(2).getName());
        assertEquals(SimpleType.BOOLEAN, method.params().get(2).getType());
    }

    private Method run(String str) throws Exception {
        org.qooxdoo.sushi.metadata.ComplexType type;
        
        type = org.qooxdoo.toolkit.plugin.binding.qx.Doctree.SCHEMA.complex(org.qooxdoo.toolkit.plugin.binding.qx.Method.class);
        return ((org.qooxdoo.toolkit.plugin.binding.qx.Method) org.qooxdoo.toolkit.plugin.binding.qx.Doctree.load(type, IO_OBJ.stringNode(str))).createJava("name", false);
    }
}
