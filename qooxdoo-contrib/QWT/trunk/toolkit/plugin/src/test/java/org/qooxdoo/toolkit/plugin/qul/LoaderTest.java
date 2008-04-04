package org.qooxdoo.toolkit.plugin.qul;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Before;
import org.junit.Test;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.toolkit.plugin.binding.java.Clazz;
import org.qooxdoo.toolkit.plugin.binding.java.ClazzType;
import org.qooxdoo.toolkit.plugin.binding.java.Method;
import org.qooxdoo.toolkit.plugin.binding.java.Modifier;
import org.qooxdoo.toolkit.plugin.binding.java.Parameter;
import org.qooxdoo.toolkit.plugin.binding.java.Set;
import org.qooxdoo.toolkit.plugin.binding.java.SimpleType;

public class LoaderTest {
    private IO io;
    private Set doctree;
    
    @Before
    public void setUp() {
        Clazz c;
        Method m;
        
        io = new IO();
        doctree = new Set();
        c = new Clazz(ClazzType.CLASS, "foo.Bar", null, null);
        m = new Method(Modifier.PUBLIC, false, false, false, false, 
                SimpleType.VOID, "setXx", null, null, null, null);
        m.add(new Parameter(SimpleType.STRING, "foo"));
        c.add(m);
        doctree.add(new Clazz(ClazzType.CLASS, "foo.Baz", null, null));
        doctree.add(c);
    }
    
    @Test
    public void one() throws IOException {
        run("        foo.Bar v0 = new foo.Bar();\n", "<Bar/>");
    }
    
    @Test
    public void property() throws IOException {
        run("        foo.Bar v0 = new foo.Bar();\n" +
        		"        v0.setXx(\"abc\");\n", 
        		"<Bar xx='abc'/>");
    }
    
    @Test
    public void nested() throws IOException {
        run("        foo.Bar v0 = new foo.Bar();\n" + 
                "        foo.Baz v1 = new foo.Baz();\n" +
                "        v0.add(v1);\n" +
                "        foo.Baz v2 = new foo.Baz();\n" +
                "        v0.add(v2);\n",
                "<Bar><Baz/><Baz/></Bar>");
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
        loader.run(io.stringNode(xml), result, null, null);
        assertEquals(HEAD + java + TAIL, result.readString());
    }
}
