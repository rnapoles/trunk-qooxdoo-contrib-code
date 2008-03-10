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

package org.qooxdoo.toolkit.qooxdoo;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;

import qx.core.Target;
import qx.ui.basic.Atom;
import qx.ui.basic.Image;
import qx.ui.basic.Inline;
import qx.ui.basic.Label;
import qx.ui.core.Parent;
import qx.ui.core.Widget;
import qx.ui.form.Button;
import qx.ui.form.ComboBox;
import qx.ui.form.List;
import qx.ui.form.TextField;
import qx.ui.layout.BoxLayout;
import qx.ui.layout.CanvasLayout;
import qx.ui.layout.HorizontalBoxLayout;
import qx.ui.layout.VerticalBoxLayout;
import qx.ui.tree.AbstractTreeElement;
import qx.ui.tree.Tree;
import qx.ui.tree.TreeFile;
import qx.ui.tree.TreeFolder;
import org.qooxdoo.toolkit.repository.JavaScriptException;
import org.qooxdoo.toolkit.rhino.QooxdooEngine;
import org.qooxdoo.sushi.io.IO;

public class QooxdooTest {
    private static final IO io = new IO();
    private QooxdooEngine engine;

    @Before
    public void setUp() {
        engine = new QooxdooEngine(io);
    }

    @Test
    public void global() throws Exception {
        assertNull(engine.eval("window.qx"));
        engine.eval("window.qx = 2");
        assertEquals(2.0, engine.eval("window.qx"));
        assertEquals(true, engine.eval("qx === window.qx"));
    }
    
    @Test
    public void bootstrap() throws Exception {
        assertNull(engine.eval("window.qx"));
        engine.eval(engine.getRepository().get("toolkit.root").getCode());
        engine.eval(engine.getRepository().get("qx.core.Bootstrap").getCode());
        assertNotNull(engine.eval("window.qx"));
        assertEquals("function", engine.eval("typeof qx.Class.createNamespace"));
        engine.eval("qx.Class.createNamespace('qx.Foo', 1)");
        assertEquals(1.0, engine.eval("window.qx.Foo"));
        assertEquals(true, engine.eval("window.qx.Foo === qx.Foo"));
    }

    @Test
    public void version() throws Exception {
        engine.load("qx.core.Version");
        assertEquals("0.0", engine.eval("qx.core.Version.toString()"));
    }

    @Ignore
    public void objectLogger() throws Exception {
        engine.load("qx.log.Logger");
        engine.load("qx.core.Object");
        engine.eval("obj = new qx.core.Object()");
        engine.eval("obj.info('foo');");
        assertTrue(engine.console.last().endsWith(": foo"));
    }

    @Test
    public void settingDefault() throws Exception {
        engine.eval("window.qxsettings = new Object();");
        engine.load("qx.core.Setting");
        engine.eval("qx.core.Setting.define('qx.foo', 'default')");
        assertEquals("default", engine.eval("qx.core.Setting.get('qx.foo')"));
    }

    @Test
    public void settingOverride() throws Exception {
        engine.eval("window.qxsettings = new Object();");
        engine.eval("window.qxsettings['qx.foo'] = 'override'");
        engine.load("qx.core.Setting");
        engine.eval("qx.core.Setting.define('qx.foo', 'default')");
        assertEquals("override", engine.eval("qx.core.Setting.get('qx.foo')"));
        
        engine.eval("qx.core.Setting.define('foo', 'bar')");
        assertEquals("bar", engine.eval("qx.core.Setting.get('foo')"));
    }

    @Test
    public void variant() throws Exception {
        engine.load("qx.core.Variant");
        assertEquals("gecko", engine.eval("qx.core.Variant.get('qx.client')"));
        assertEquals("on", engine.eval("qx.core.Variant.get('qx.debug')"));
    }

    @Test
    public void client() throws Exception {
        engine.load("qx.core.Client");
        // false, because Class definition is not processed by qx.Class:
        assertEquals(false, engine.eval("qx.core.Client.getInstance() instanceof qx.core.Client"));
        assertEquals(true, engine.eval("qx.core.Client.getInstance() instanceof Object"));
        assertEquals("gecko", engine.eval("qx.core.Client.getInstance().getEngine()"));
        assertEquals(1.0, engine.eval("qx.core.Client.getInstance().getVersion()"));
        assertEquals("other gecko", engine.eval("qx.core.Client.getInstance().getBrowser()"));
        assertEquals(true, engine.eval("qx.core.Client.getInstance().isFireBugActive() != null"));
    }

    @Test
    public void localeManager() throws Exception {
        checkSingleton(qx.locale.Manager.class);
    }

    @Test
    public void aliasManager() throws Exception {
        checkSingleton(qx.io.Alias.class);
    }
    
    @Test
    public void meta() throws Exception {
        checkSingleton(qx.theme.manager.Meta.class);
    }
    
    @Test
    public void imageManager() throws Exception {
        checkSingleton(qx.io.image.Manager.class);
    }
    
    @Ignore
    public void init() throws Exception {
        engine.load("qx.log.Logger");  // TODO: missing dependency?
        engine.load("qx.core.Init");
        assertEquals(true, engine.eval("qx.core.Init.getInstance() instanceof qx.core.Init"));
        engine.eval("qx.core.Init.getInstance().info('hi');");
        assertTrue(engine.console.last().endsWith("hi"));
    }

    @Ignore
    public void application() throws Exception {
        engine.load("qx.application.Gui");
        engine.load("qx.theme.ClassicRoyale");
        engine.load("qx.ui.form.Button");
        assertEquals("[object qx.core.Init]", engine.eval("qx.core.Init.getInstance().toString()"));
        engine.eval("qx.Class.define('Application', {" +
        "  extend : qx.application.Gui,\n" +
        "  members : {\n" +
        "    main : function(e) {\n" +
        "      this.base(arguments); \n" + 
        "      var b = new qx.ui.form.Button('First Button');\n" +
        "      b.setTop(50);\n" + 
        "      b.setLeft(50);\n" + 
        "      b.addToDocument();\n" + 
        "    }\n" + 
        "  }\n" +
        "});\n");
        engine.eval("qx.core.Init.getInstance()._onload()");
        assertEquals("[object qx.core.Init]", engine.eval("qx.core.Init.getInstance().getApplication()"));
    }

    //-- widgets

    @Test
    public void inheritance() throws Exception {
        engine.load("java.lang.Class");
        engine.load("qx.ui.basic.Label");
        assertEquals("qx.ui.basic.Label", engine.eval("java.lang.Class.forName('qx.ui.basic.Label').getName()"));
        // TODO: assertEquals("qx.ui.basic.Label", engine.eval("java.lang.Class.forName('qx.ui.basic.Label').getSuperclass()"));
    }
    
    @Test
    public void label() throws Exception {
        checkCreate(Label.class);
    }
    
    @Test
    public void atom() throws Exception {
        checkCreate(Atom.class);
    }
    @Test
    public void image() throws Exception {
        checkCreate(Image.class);
    }
    @Test
    public void textField() throws Exception {
        checkCreate(TextField.class);
    }
    
    @Test
    public void list() throws Exception {
        checkCreate(List.class);
    }
    @Ignore
    public void comboBox() throws Exception {
        checkCreate(ComboBox.class);
    }
    @Test
    public void canvasLayout() throws Exception {
        checkCreate(CanvasLayout.class);
    }
    @Test
    public void horizontalBoxLayout() throws Exception {
        checkCreate(HorizontalBoxLayout.class);
    }
    @Test
    public void verticalBoxLayout() throws Exception {
        checkCreate(VerticalBoxLayout.class);
    }
    @Test
    public void boxLayout() throws Exception {
        checkCreate(BoxLayout.class);
    }

    @Test
    public void inline() throws Exception {
        checkCreate(Inline.class);
    }

    @Test
    public void treeElement() throws Exception {
        checkAbstract(AbstractTreeElement.class);
    }
    @Ignore
    public void treeFolder() throws Exception {
        checkCreate(TreeFolder.class);
    }
    @Ignore
    public void treeFile() throws Exception {
        checkCreate(TreeFile.class);
    }
    @Ignore
    public void tree() throws Exception {
        checkCreate(Tree.class);
    }
    @Test
    public void object() throws Exception {
        checkCreate(qx.core.Object.class);
    }

    @Test
    public void target() throws Exception {
        checkCreate(Target.class);
    }
    @Test
    public void parent() throws Exception {
        checkAbstract(Parent.class);
    }
    @Test
    public void widget() throws Exception {
        checkAbstract(Widget.class);
    }
    
    @Test
    public void terminator() throws Exception {
        checkCreate(qx.ui.basic.Terminator.class);
    }

    @Test
    public void gridLayout() throws Exception {
        engine.load("qx.ui.basic.Label");
        engine.load("qx.ui.layout.GridLayout");
        engine.eval("new qx.ui.layout.GridLayout().add(new qx.ui.basic.Label(\"hi\"), 1, 2);");
    }
    
    @Test
    public void button() throws Exception {
        checkCreate(Button.class);
    }

    private void checkAbstract(Class<?> type) throws Exception {
        checkError(type, "is abstract! It is not");
    }

    private void checkError(Class<?> type, String msg) throws Exception {
        try {
            checkCreate(type);
            fail();
        } catch (JavaScriptException e) {
            assertTrue(e.toString(), e.toString().contains(msg));
        }
    }

    private void checkCreate(Class<?> type) throws Exception {
        checkCreate(type, "new " + type.getName() + "();");
    }

    private void checkCreate(Class<?> type, String expr) throws Exception {
        engine.load(type.getName());
        assertNotNull(engine.eval(expr));
    }

    private void checkSingleton(Class<?> c) throws Exception {
        String name;
        
        name = c.getName();
        engine.load(name);
        assertEquals(true, engine.eval(name + ".getInstance() instanceof " + name));
    }
}
