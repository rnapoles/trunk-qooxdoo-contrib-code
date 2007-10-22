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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.Test;
import static org.junit.Assert.*;

import org.qooxdoo.toolkit.repository.ImportException;
import org.qooxdoo.toolkit.repository.Importer;

public class ImporterTest {
    @Test
    public void parse() {
        parse("", "foo");
        parse("#a()", "#a", "");
        parse("1( )", "1", " ");
        parse("#b(1) #b( 2)", "#b", "1", " 2");
        parse("#cd(1) #cde(2)#cde \t\n(2) cde(3)", "#cde", "2", "2");
        parse("#cd", "#cd");
        parse("#cd tailingContentUsedToCauseInfiniteLoop", "#cd");
        try {
            parse("#cd(", "#cd");
            fail();
        } catch (ImportException e) {
            assertTrue(e.getMessage(), e.getMessage().contains("missing ')'"));
        }
    }
 
    @Test
    public void require() {
        List<String> result;
        
        result = new ArrayList<String>();
        new Importer("#require(abc)").require(result);
        assertEquals(Arrays.asList(new String[] { "abc" }), result);
    }

    @Test
    public void post() {
        List<String> result;
        
        result = new ArrayList<String>();
        new Importer("#post(xyz)").post(result);
        assertEquals(Arrays.asList(new String[] { "xyz" }), result);
    }

    @Test
    public void base() {
        assertNull(new Importer("#require(abc)").base());
        assertEquals("QxTarget", new Importer("QxApplication.extend(QxTarget, \"QxApplication\");").base());
        try {
            new Importer("QxApplication.extend(QxTarget, \"QxApplication\");  QxApplication.extend(QxTarget, \"QxApplication\");").base();
            fail();
        } catch (ImportException e) {
            assertTrue(e.getMessage(), e.getMessage().contains("extend ambiguous"));
        }
    }
    
    @Test
    public void normal() {
        Importer qooxdoo;
        List<String> lst;
        
        qooxdoo = new Importer("/*\n" +
                "  #require(QxIconTheme)\n" +
                "  #require(QxWidgetTheme)\n" +
                "  */\n");
        lst = new ArrayList<String>();
        qooxdoo.require(lst);
        assertEquals(2, lst.size());
        assertEquals("QxIconTheme", lst.get(0));
        assertEquals("QxWidgetTheme", lst.get(1));
    }

    private void parse(String str, String key, String ... expected) {
        List<String> result;
        
        result = new ArrayList<String>();
        new Importer(str).parse(key, result);
        assertEquals(Arrays.asList(expected), result);
    }
}
