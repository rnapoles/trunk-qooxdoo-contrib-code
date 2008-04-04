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

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;

import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Node;

public class BuilderTest {
    private static final IO IO_OBJ = new IO();
    
    private Builder builder;

    @Test
    public void reader() throws Exception {
        StringReader src;
        Document doc;
        final List<String> closed;

        closed = new ArrayList<String>();
        src = new StringReader("<xml/>") {
            @Override
            public void close() {
                closed.add("str");
                super.close();
            }
        };
        builder = new Builder();
        doc = builder.parse(src);
        assertEquals("xml", doc.getDocumentElement().getNodeName());
        assertEquals(1, closed.size());
    }

    @Test
    public void inputStream() throws Exception {
        ByteArrayInputStream src;
        Document doc;
        final List<String> closed;

        closed = new ArrayList<String>();
        src = new ByteArrayInputStream("<xml/>".getBytes()) {
            @Override
            public void close() throws IOException {
                closed.add("str");
                super.close();
            }
        };
        builder = new Builder();
        doc = builder.parse(src);
        assertEquals("xml", doc.getDocumentElement().getNodeName());
        assertEquals(1, closed.size());
    }

    //--

    private static final String SCHEMA =
        "<?xml version='1.0' encoding='UTF-8'?>\n" +
        "<xs:schema xmlns:xs='http://www.w3.org/2001/XMLSchema'>\n" +
        "  <xs:element name='a'>\n" +
        "    <xs:complexType>\n" +
        "      <xs:sequence>\n" +
        "        <xs:element name='num' type='xs:int'/>\n" +
        "        <xs:element name='string' type='xs:string' minOccurs='0' maxOccurs='unbounded'/>\n" +
        "      </xs:sequence>\n" +
        "    </xs:complexType>\n"+
        "  </xs:element>\n" +
        "</xs:schema>";

    @Test
    public void validate() throws IOException, SAXException {
        Node file;
        Builder builder;

        file = IO_OBJ.stringNode(SCHEMA);
        builder = new Builder(file);
        builder.parseString("<a><num>1</num><string/><string/></a>");
        try {
            builder.parseString("<a><num></num></a>");
            fail();
        } catch (SAXParseException e) {
            assertTrue(e.getMessage(), e.getMessage().contains("cvc-datatype-valid.1.2.1"));
        }
        try {
            builder.parseString("<a></a>");
            fail();
        } catch (SAXParseException e) {
            assertTrue(e.getMessage(), e.getMessage().contains("cvc-complex-type.2.4.b"));
        }
    }

    @Test(expected=SAXParseException.class)
    public void invalidSchema() throws IOException, SAXException {
        new Builder(IO_OBJ.stringNode("xxx" + SCHEMA));
    }
}
