package org.qooxdoo.toolkit.plugin.binding;

import java.io.IOException;

import org.junit.Test;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.metadata.xml.LoaderException;
import org.qooxdoo.toolkit.plugin.binding.qx.Doctree;
import org.xml.sax.SAXException;

public class DoctreeTest {
    @Test
    public void normal() throws IOException, SAXException, LoaderException {
        IO io;
        
        io = new IO();
        Doctree.load(io.node("resource:doctree.xml"));
    }
}
