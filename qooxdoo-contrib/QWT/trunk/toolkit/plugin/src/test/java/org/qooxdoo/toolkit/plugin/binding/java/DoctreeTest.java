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

import java.util.List;

import org.junit.Test;
import org.xml.sax.SAXParseException;

import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.io.ResourceNode;
import org.qooxdoo.toolkit.plugin.binding.java.Clazz;
import org.qooxdoo.toolkit.plugin.binding.java.Set;
import org.qooxdoo.toolkit.plugin.binding.java.Field;
import org.qooxdoo.toolkit.plugin.binding.java.SimpleType;

public class DoctreeTest {
    private static final IO IO_OBJ = new IO();
    
    @Test
    public void empty() throws Exception {
        assertEquals(0, run("<doctree/>").size());
    }

    @Test
    public void normal() throws Exception {
        List<Clazz> lst;
        Clazz clazz;
        Field field;
        
        lst = run(
                "<doctree>" +
                "<packages>" +
                "<package fullName='p1' name='p1' packageName=''>" +
                "<classes>" +
                "<class type='class' packageName='p1' name='base' fullName='p.q.base'>" +
                "  <desc><text>&lt;p>ab&lt;/p></text></desc>" +
                "</class>" +
                "<class type='class' packageName='p1' name='foo' fullName='p1.Foo' superClass='p.q.base'>\n" + 
                "  <properties>\n" + 
                "    <property defaultValue='dflt' name='f' check='Number' />\n" + 
                "  </properties>\n" + 
                "  <methods>\n" + 
                "    <method access='private' name='bla'>\n" + 
                "      <params>\n" + 
                "      </params>\n" + 
                "    </method>\n" + 
                "  </methods>" +
                "</class>" +
                "</classes>" +
                "</package>" +
                "</packages>" +
                "</doctree>\n"                
                );
        assertEquals(2, lst.size());
        clazz = lst.get(0);
        assertEquals("base", clazz.getName());
        assertEquals("<p>ab</p>", clazz.getDescription());
        
        clazz = lst.get(1);
        assertEquals("Foo", clazz.getName());
        assertEquals(lst.get(0), clazz.getSuperClass());
        assertEquals(1, clazz.methods().size());
        assertEquals(1, clazz.fields().size());
        field = clazz.fields().get(0);
        assertEquals("f", field.getName());
        assertEquals(SimpleType.NUMBER, field.getType());
    }

    @Test 
    public void doctree() throws Exception {
        try {
            Set.loadRaw(new ResourceNode(IO_OBJ, "doctree.xml"));
        } catch (SAXParseException e) {
            throw new RuntimeException(e.getLineNumber() + ":" + e.getMessage(), e);
        }
    }

    
    private List<Clazz> run(String str) throws Exception {
        return Set.loadRaw(IO_OBJ.stringNode(str)).clazzes();
    }
    
    //--

    @Test
    public void cut() {
        assertEquals("bc", Set.cutPattern("abcd", "a(bc)d"));
        assertEquals("bc", Set.cutPattern("abcd", "(bc)"));
    }
    
    @Test(expected=IllegalArgumentException.class)
    public void cutNotFound() {
        assertEquals("bc", Set.cutPattern("abc", "a(bc)d"));
    }
    
    @Test(expected=IllegalArgumentException.class)
    public void cutAmbiguou() {
        assertEquals("bc", Set.cutPattern("123123", "(12)"));
    }
}
