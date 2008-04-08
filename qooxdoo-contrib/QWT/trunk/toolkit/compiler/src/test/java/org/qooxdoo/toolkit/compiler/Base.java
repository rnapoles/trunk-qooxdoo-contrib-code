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

package org.qooxdoo.toolkit.compiler;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.junit.Before;

import org.qooxdoo.toolkit.repository.Compressor;
import org.qooxdoo.toolkit.repository.JavaScriptEngine;
import org.qooxdoo.toolkit.repository.Module;
import org.qooxdoo.toolkit.repository.Repository;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Node;

public abstract class Base {
    protected static final IO IO_OBJ = new IO();
    protected static final Node HOME = IO_OBJ.getWorking(); // TODO: project home ...

    //--

    protected Node classes;
    protected List<Node> sourcepath;
    protected List<Node> classpath;
    
    @Before
    public void setUp() {
        classes = IO_OBJ.locateClasspathItem(String.class);
        sourcepath = new ArrayList<Node>();
        sourcepath.add(HOME.join("src/test/java-rt"));
        classpath = new ArrayList<Node>();
    }
    
    protected static final String ANY = new String("any");
    protected static final String NN = "x != null";

    public void expr(String java, String js, Object result, String ... assertions) {
        String fullJava;
        String fullJs;
        
        fullJava = 
            "/** @augment Date */ class MyDate { MyDate(int a) {}; }; " + 
            "class Foo { " +
            "Object normalField = 1;" +
            "static Object staticField = 2; " +
            "static Object staticMethod() { return 3; } " +
            "Object normalMethod() { return 4; }\n" +
            "Object expr() throws Exception { return " + java + "; } }";
        fullJs = js == ANY ? ANY : 
            "MyDate=Date;\n" +
            "defineClass(MyDate, 'MyDate', null);\n" + 
            "Foo = function() {}\n" +
            "defineClass(Foo, 'Foo', java.lang.Object);\n" + 
            "Foo.prototype.normalField = null;\n" +
            "Foo.staticField = null;\n" + 
            "Foo.staticMethod = function() {\n" +
            "    return 3;\n" +
            "}\n" +
            "Foo.prototype.normalMethod = function() {\n" +
            "    return 4;\n" +
            "}\n" +
            "Foo.prototype.expr = function() {\n    return " + js + ";\n}\n" +
            "Foo.cinit=function() {" +
            "  Foo.prototype.normalField=1;" +
            "  Foo.staticField=2;" +
            "}\n";
        unit(fullJava, fullJs, "var x = new Foo().expr()", result, assertions);
    }
    
    public void stmt(String javaAndJs) {
        stmt(javaAndJs, javaAndJs);
    }

    public void stmt(String java, String js, String ... assertions) {
        unit("class Foo { " +
             "  static Object x; Object normalX; static Object[] array; Object[] normalArray; " +
             "  private void assertTrue(boolean b) throws Throwable {" +
             "    if (!b) {" +
             "      throw new Throwable(\"assertion failed\");" +
             "    }" +
             "  }" +
             "  void code() throws Throwable { " + java + " } }",
            js == ANY ? ANY : 
            "Foo = function() {}\n" +
            "defineClass(Foo, 'Foo', java.lang.Object);" +
            "Foo.x = null;" +
            "Foo.prototype.normalX = null;" +
            "Foo.array = null;" +
            "Foo.prototype.normalArray = null;" +
            "Foo.prototype.assertTrue = function(b) {" +
            "  if (!b) {" +
            "    throw new java.lang.Throwable(\"assertion failed\");" +
            "  }\n" +
            "}\n" +
            "Foo.prototype.code = function() {\n" + js + "\n}\n",
            "", ANY, assertions);
    }

    public Repository unit(String java, String js) {
        return unit(java, js, "", ANY);
    }

    public Repository unit(String java, String js, String test, Object result, String ... assertions) {
        JavaScriptEngine engine;
        Repository compiled;
        
        compiled = compile(java, js);
        try {
            engine = new JavaScriptEngine(lastCompileRepository);
            engine.load(compiled.modules());
            engine.eval(test);
            if (result != ANY) {
                assertEquals(result, engine.eval("x"));
            }
            for (String condition : assertions) {
                assertEquals(condition, true, engine.eval(condition));
            }
        } catch (Exception e) {
            throw new RuntimeException(test, e);
        }
        return compiled;
    }
    
    protected void unitFailure(String msgContains, String java) {
        String msg;
        
        try {
            unit(java, ANY);
            fail();
        } catch (CompilerException e) {
            assertEquals(1, e.problems().size());
            msg = e.first().toString();
            assertTrue(msg, msg.contains(msgContains));
        }
    }

    // TODO:
    protected Repository lastCompileRepository = null;
    
    private Repository compile(String java, String js) {
        Repository repository;
        Repository compiled;
        StringBuilder buffer;
        Task compileTask;
        Task task;
        
        task = new Task(IO_OBJ);
        try {
            task.sourcepath(sourcepath);
            task.classpath(classpath);
            task.invoke();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        repository = task.repository;
        compileTask = new Task(IO_OBJ, repository);
        try {
            // no task.classpath(CLASSPATH) because it's already in the repository:
            compileTask.classpath.add(classes);
            compileTask.sourcepath(HOME.getIO().stringNode(java));
            compiled = compileTask.invoke();
        } catch (IOException e) {
            throw new RuntimeException("unexpected", e);
        }
        lastCompileRepository = repository;
        if (js != ANY) {
            buffer = new StringBuilder();
            for (Module module : compiled) {
                buffer.append(module.getCode());
            }
            assertEquals(Compressor.run(js), Compressor.run(buffer.toString()));
        }
        return compiled;
    }
}
