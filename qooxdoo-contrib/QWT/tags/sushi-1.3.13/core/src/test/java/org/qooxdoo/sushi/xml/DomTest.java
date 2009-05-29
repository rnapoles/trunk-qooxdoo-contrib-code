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

package org.qooxdoo.sushi.xml;

import java.util.List;

import org.junit.Test;
import static org.junit.Assert.*;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.xml.sax.SAXException;

public class DomTest {
    private static final Builder BUILDER = new Builder();
    
    @Test
    public void getElements() throws XmlException {
        Document doc;
        List<Element> lst;
        
        doc = BUILDER.literal("<root><a><b/><b/></a><A><b/></A></root>");        
        lst = Dom.getChildElements(doc.getDocumentElement());
        assertEquals(1, lst.size());
        assertSame(doc.getDocumentElement(), lst.get(0));

        lst = Dom.getChildElements(doc.getDocumentElement(), "a");
        assertEquals(1, lst.size());
        assertSame("a", lst.get(0).getTagName());

        lst = Dom.getAllChildElements(doc.getDocumentElement());
        assertEquals(2, lst.size());
        assertSame("a", lst.get(0).getTagName());
        assertSame("A", lst.get(1).getTagName());

        lst = Dom.getChildElements(doc.getDocumentElement(), "a", "b");
        assertEquals(2, lst.size());
        assertSame("b", lst.get(0).getTagName());
        assertSame("b", lst.get(1).getTagName());
    }

    //-- getText

    @Test
    public void empty() {
        assertEquals("", getString("<empty></empty>"));
        assertEquals("", getString("<empty/>"));
    }

    @Test
    public void normal() {
        assertEquals("tanjev", getString("<doc>tanjev</doc>"));
    }

    @Test
    public void whitespace() {
        assertEquals("\n tanjev ", getString("<doc>\n tanjev </doc>"));
    }
    
    @Test
    public void noElement() {
        try {
            getString("<doc><notanelement/></doc>");
            fail();
        } catch (IllegalArgumentException e) {
            //ok
        }
    }

    @Test
    public void mixContent() {
        try {
            getString("<doc>foo<notanelement/>bar</doc>");
            fail();
        } catch (IllegalArgumentException e) {
            //ok
        }
    }

    private String getString(String docString) {
        Document doc;
        
        try {
            doc = BUILDER.parseString(docString);        
        } catch (SAXException e) {
            throw new RuntimeException(docString, e);
        }
        return Dom.getString(doc.getDocumentElement());
    }
    
}
