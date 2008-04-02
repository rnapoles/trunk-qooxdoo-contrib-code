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

package org.qooxdoo.toolkit.repository;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.List;

import org.junit.Before;
import org.junit.Test;

public class JavaScriptEngineTest {
    private JavaScriptEngine engine;

    @Before
    public void setUp() {
        engine = new JavaScriptEngine(new Repository());
    }

    private Object run(String script) throws Exception {
        return engine.eval(script);
    }

    @Test
    public void normal() throws Exception {
        assertEquals("1", run("\"1\""));
    }

    @Test
    public void thiS() throws Exception {
        assertEquals(1.0, run("this[\"a\"] = 1; a"));
    }

    @Test
    public void obj() throws Exception {
        assertEquals(2, run("obj=new Object(); obj[\"a\"] = 2; obj.a"));
    }

    @Test
    public void pkg() throws Exception {
        assertEquals(true, run("this[\"java\"]=new Object(); java[\"lang\"]=new Object(); java.lang.Object=function() {}; java.lang.Object instanceof Function"));
    }

    @Test
    public void constructorfn() throws Exception {
        assertEquals(true, run("function a() { return 1; }; a.constructor instanceof Function"));
        assertEquals(true, run("b = function() { return 2; }; b.constructor instanceof Function"));
    }

    @Test
    public void fnprototype() throws Exception {
        assertEquals(true, run("function a() { return 1; }; a.prototype instanceof Object"));
        assertEquals(true, run("b = function() { return 2; }; b.prototype instanceof Object"));
    }

    @Test
    public void typeoffn() throws Exception {
        assertEquals("function", run("function a() { return 1; }; typeof a"));
        assertEquals("function", run("a = function() { return 2; }; typeof a"));
    }

    @Test
    public void stringHasPredefinedEquals() throws Exception {
        // TODO: Rhino has a predefined equals method - firefox doesnt!
        assertNotNull(run("new String('a').equals"));
    }

    @Test
    public void logger() throws Exception {
        assertEquals(0, engine.console.messages.size());
        run("console.info('foo');");
        assertEquals(1, engine.console.messages.size());
        assertEquals("foo", engine.console.messages.get(0));
    }
    
    @Test
    public void consoleDebug() throws Exception {
        int oldSize;
        List<String> messages;

        messages = engine.console.messages;
        oldSize = engine.console.messages.size();
        engine.eval("console.debug('moin')");
        assertEquals(oldSize + 1, messages.size());
        assertEquals("moin", messages.get(oldSize));
    }

    @Test
    public void consoleError() throws Exception {
        engine.eval("console.error('msg');");
        engine.console.last().contains("msg");
    }

    
    @Test
    public void error() throws Exception {
        try {
            run("\nmhm + jvm");
            fail();
        } catch (JavaScriptException e) {
            assertEquals(2, e.line);
            assertEquals("noname", e.file);
        }
    }

    @Test
    public void throwError() throws Exception {
        try {
            run("throw new Error('mymsg');");
            fail();
        } catch (JavaScriptException e) {
            assertTrue(e.getMessage(), e.getMessage().contains("mymsg"));
        }
    }

    @Test
    public void evalScopeVariable() throws Exception {
        assertEquals("foo", run("eval('var abc = \"foo\";')\n" +
                                "abc"));
    }

    @Test
    public void evalScopeImplicitVariable() throws Exception {
        assertEquals(9.0, run("eval('n = 9');\n" +
                              "n"));
    }

    @Test
    public void evalScopeFunction() throws Exception {
        assertEquals(7.0, run("eval('function x() { return 7 }');\n" +
                              "x()"));
    }

    @Test
    public void variableBugSimple() throws Exception {
        assertEquals("foo",
            run("var a = 'foo';\n" +
                "getA = new Function('return a;');\n" +
                "getA();\n"));
    }

    @Test
    public void variableBug() throws Exception {
        run("var a;\n" +
            "function cl() { this.x = 0; };\n" +
            "cl.init = function() {\n" +
            "  cl.prototype.getA = new Function('return a');\n" +
            "}\n" +
            "cl.init();\n" +
            "obj = new cl();\n" +
            "obj.getA();\n");
    }

    @Test
    public void compression() throws Exception {
        String script;

        script = "function a() {\n" +
                "};" +
                "function b() {\n" +
                "}";
        // Compressor.run(script =);
        run(script);
    }
    
    @Test
    public void constructor() throws Exception {
        assertEquals(true, run("function one() { }; new one().constructor === one "));
    }

    @Test
    public void twice() throws Exception {
        run("function one() { return \"1\"; }");
        assertEquals("1", run("one()"));
    }
}
