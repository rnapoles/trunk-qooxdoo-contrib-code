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
import static org.junit.Assert.assertSame;
import static org.junit.Assert.fail;

import java.io.IOException;
import java.io.OutputStream;

import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.junit.Test;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.file.FileNode;
import org.qooxdoo.sushi.io.OS;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.xml.sax.SAXException;

public class SerializerTest {
    private static final String LF = OS.CURRENT.lineSeparator;

    private static final Builder BUILDER = new Builder();
    private static final Selector SELECTOR = new Selector();
    private static final Serializer SERIALIZER = new Serializer();

    @Test
    public void escape() throws SAXException {
        Document doc;
        String str;
        
        assertEquals("", Serializer.escapeEntities(""));
        assertEquals(" \t\r\n", Serializer.escapeEntities(" \t\r\n"));
        assertEquals("abc", Serializer.escapeEntities("abc"));
        assertEquals("&lt;", Serializer.escapeEntities("<"));
        assertEquals("abc&lt;&gt;&amp;&apos;&quot;xyz", Serializer.escapeEntities("abc<>&'\"xyz"));
        for (char c = ' '; c < 128; c++) {
            str = "<doc attr='" 
                + Serializer.escapeEntities("" + c) + "'>" 
                + Serializer.escapeEntities("" + c) + "</doc>";
            doc = BUILDER.parseString(str);
            assertEquals("" + c, Dom.getString(SELECTOR.node(doc, "/doc")));
            assertEquals("" + c, Dom.getString(SELECTOR.node(doc, "/doc/@attr")));
        }
    }

    @Test
    public void serialize() throws Exception {
        checkSerialize("<root/>" + LF, "<root/>", "/");
        checkSerialize("<root>" + LF + "<a/>" + LF + "</root>" + LF, "<root><a/></root>", "/");
        checkSerialize("<root/>" + LF, "<root/>", "/root");
        checkSerialize("<a/>" + LF, "<root><a/></root>", "/root/a");
        checkSerialize("mhm", "<root>mhm</root>", "/root/text()");
        checkSerialize("<root>white space</root>" + LF, "<root>white space</root>", "/");
        checkSerialize("<root>white  space</root>" + LF, "<root>white  space</root>", "/");
        checkSerialize("<root>white space </root>" + LF, "<root>white space </root>", "/");
    }

    @Test
    public void exceptn() throws Exception {
        OutputStream stream;
        final IOException e;
        
        e = new IOException();
        stream = new OutputStream() {
            @Override
            public void write(int b) throws IOException {
                throw e;
            }
            
        };
        try {
            SERIALIZER.serialize(new DOMSource(BUILDER.parseString("<foo/>")), new StreamResult(stream));
            fail();
        } catch (IOException ex) {
            assertSame(e, ex);
        }
    }
    @Test
    public void serializeWithEncoding() throws Exception {
        Document doc;
        FileNode file;
        
        doc = BUILDER.parseString("<a><b/></a>");        
        file = new IO().getTemp().createTempFile();
        SERIALIZER.serialize(doc, file);        
        assertEquals("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<a>\n<b/>\n</a>\n", file.readString());
    }

    @Test
    public void serializeChildren() throws Exception {
        checkSerializeChildren("", "<root/>", "/root");
        checkSerializeChildren("<a/>", "<root><a/></root>", "/root");
        checkSerializeChildren("<p>1</p>" + LF +"<p>2</p>", "<root><a><p>1</p><p>2</p></a></root>", "/root/a");
        checkSerializeChildren("<p>1<inner/>2</p>", "<root><p>1<inner/>2</p></root>", "/root");
        checkSerializeChildren("<p>1<inner>I</inner>2</p>", "<root><p>1<inner>I</inner>2</p></root>", "/root");
    }

    @Test
    public void serializeDocChildren() throws Exception {
        checkSerializeDocChildren("", "<root/>");
        checkSerializeDocChildren("<a/>", "<root><a/></root>");
        checkSerializeDocChildren("text", "<root>text</root>");
        checkSerializeDocChildren("abc<x>text</x>ABC", "<root>abc<x>text</x>ABC</root>");
    }

    //--
    
    private void checkSerialize(String expected, String doc, String path) throws Exception {
        Node node = SELECTOR.node(BUILDER.parseString(doc), path);        
        assertEquals(expected, SERIALIZER.serialize(node));
    }
    
    private void checkSerializeChildren(String expected, String doc, String path) throws Exception {
        Element element = SELECTOR.element(BUILDER.parseString(doc), path);        
        assertEquals(expected, SERIALIZER.serializeChildren(element));
    }

    private void checkSerializeDocChildren(String expected, String doc) throws Exception {
        assertEquals(expected, SERIALIZER.serializeChildren(BUILDER.parseString(doc)));
    }
}
