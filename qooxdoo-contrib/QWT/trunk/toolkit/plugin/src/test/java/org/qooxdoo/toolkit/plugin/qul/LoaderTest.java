package org.qooxdoo.toolkit.plugin.qul;

import java.io.IOException;

import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.toolkit.plugin.binding.java.Clazz;
import org.qooxdoo.toolkit.plugin.binding.java.ClazzType;
import org.qooxdoo.toolkit.plugin.binding.java.Set;

public class LoaderTest {
    private IO io;
    private Set doctree;
    
    @Before
    public void setUp() {
        io = new IO();
        doctree = new Set();
        doctree.add(new Clazz(ClazzType.CLASS, "foo.Bar", null, null));
    }
    
    @Test
    public void one() throws IOException {
        run("        foo.Bar v0 = new foo.Bar();\n", "<Bar/>");
    }
    
    //--
    
    private static final String HEAD = 
        "public class tmp {\n" + 
        "    public static foo.Bar create() {\n";
    
    private static final String TAIL =
        "        return v0;\n" +
        "    }\n" + 
        "}\n";

    private void run(String java, String xml) throws IOException {
        Loader loader;
        Node result;
        
        loader = Loader.create(io, doctree);
        result = io.stringNode("");
        loader.run(io.stringNode(xml), result, null);
        assertEquals(HEAD + java + TAIL, result.readString());
    }
}
