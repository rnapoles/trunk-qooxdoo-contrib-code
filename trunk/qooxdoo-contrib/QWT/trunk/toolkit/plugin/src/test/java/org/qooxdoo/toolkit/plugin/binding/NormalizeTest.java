package org.qooxdoo.toolkit.plugin.binding;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;
import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.toolkit.plugin.binding.Normalize;
import org.xml.sax.SAXException;

public class NormalizeTest {
    private static final IO IO_OBJ = new IO();

    @Test
    public void empty() throws IOException, SAXException {
        check("<root></root>", "<root/>");
    }
    
    @Test
    public void text() throws IOException, SAXException {
        check("<root>abc</root>", "<root>abc</root>");
    }

    @Test
    public void whitespace() throws IOException, SAXException {
        check("<root> \n\t </root>", "<root> \n\t </root>");
    }


    @Test
    public void attribute() throws IOException, SAXException {
        check("<x><a>1</a></x>", "<x a='1' />");
    }

    @Test
    public void attributes() throws IOException, SAXException {
        check("<x><X></X><Y>y</Y></x>", "<x X='' Y='y' />");
    }

    @Test
    public void rename() throws IOException, SAXException {
        check("<a><out></out><out><x></x></out></a>", "<a><in/><in><x/></in></a>");
    }

    @Test
    public void remove() throws IOException, SAXException {
        check("<a><ele></ele></a>", "<a><eles><ele/></eles></a>");
    }
    //--
    
    private void check(String expected, String doc) throws IOException, SAXException {
        Node src;
        Node dest;
        Normalize style;
     
        style = new Normalize();
        style.removes("eles");
        style.rename("in", "out");
        src = IO_OBJ.stringNode(doc);
        dest = IO_OBJ.stringNode("");
        style.run(src, dest);
        assertEquals(expected, dest.readString());
    }
}
