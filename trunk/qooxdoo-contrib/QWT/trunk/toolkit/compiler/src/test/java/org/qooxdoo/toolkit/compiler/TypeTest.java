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

import java.io.IOException;

import org.junit.Test;

import org.qooxdoo.sushi.fs.Node;

public class TypeTest extends Base {
    private static final Node RESOURCES = HOME.join("src/test/resources");
    
    @Test
    public void empty() {
        unit("", "");
    }

    @Test
    public void syntaxError() {
        unitFailure("Syntax error", "public {");
    }

    @Test
    public void emptyClass() {
        unit("class Foo {}", 
             "Foo=function() {}\n" +
             "defineClass(Foo, 'Foo', java.lang.Object);\n",
             "var x = new Foo()", ANY, 
             "x instanceof Foo",
             "getBase(Foo) === java.lang.Object",
             "getBase(java.lang.Object) === null",
             "Foo.prototype.constructor === Foo", 
             "Foo.$$implements.length == 0", 
             "x.__proto__ === Foo.prototype");
    }
    
    public void todoMissingBaseConstructorCall() {
        unit("class Base { Base() { if (true) { return ; } } }" +
             "class Ext extends Base {" +
             "}",
             ""
             );
    }

    @Test
    public void method() {
        unit("class Foo { void hello(int a, long b) { } }", 
                "Foo=function() {}\n" +
                "defineClass(Foo, 'Foo', java.lang.Object);\n" + 
                "Foo.prototype.hello = function(a, b) {}\n");        
    }

    @Test
    public void field() {
        unit("class Foo { int a = 2; Foo() { } }",
                "Foo=function() {}\n" +
                "defineClass(Foo, 'Foo', java.lang.Object);\n" + 
                "Foo.prototype.a = 0;\n" +
                "Foo.init = function() {\n" +
                "}\n" + 
                "Foo.cinit = function() {\n" +
                "Foo.prototype.a = 2;\n" +
                "}\n"
                );        
    }

    @Test
    public void reservedClassName() {
        unit("class var { static var create() { return new var(); } }", 
                "var1=function() {}\n" +
                "defineClass(var1, 'var1', java.lang.Object);\n" +  
                "var1.create = function() {\n" +
                "    return new var1();\n" +
                "}\n");        
    }

    @Test
    public void reservedMethodName() {
        unit("class Foo { void function() { function(); } }", 
                "Foo=function() {}\n" +
                "defineClass(Foo, 'Foo', java.lang.Object);\n" +  
                "Foo.prototype.function1 = function() {\n" +
                "    this.function1();\n" +
                "}\n");        
    }

    @Test
    public void reservedFieldName() {
        unit("class Foo { int with; int bar() { return with; } }", 
                "Foo=function() {}\n" +
                "defineClass(Foo, 'Foo', java.lang.Object);\n" +  
                "Foo.prototype.with1 = 0;\n" +
                "Foo.prototype.bar = function() {\n" +
                "    return this.with1;\n" +
                "}\n"
                );        
    }

    @Test
    public void reservedParameterName() {
        unit("class Foo { int bar(int delete) { return delete; } }", 
                "Foo=function() {}\n" +
                "defineClass(Foo, 'Foo', java.lang.Object);\n" +  
                "Foo.prototype.bar = function(delete1) {\n" +
                "    return delete1;\n" +
                "}\n");        
    }

    @Test
    public void reservedVariableName() {
        unit("class Foo { int bar() { int delete = 0; return delete; } }", 
                "Foo=function() {}\n" +
                "defineClass(Foo, 'Foo', java.lang.Object);\n" +  
                "Foo.prototype.bar = function() {\n" +
                "    var delete1 = 0;\n" +
                "    return delete1;\n" +
                "}\n");        
    }

    @Test
    public void nativeMethod() {
        unit("class Foo { /** @native bla */ static native void hello(int a, String b); }", 
              "Foo=function() {\n" +
                  "}\n" +
                  "defineClass(Foo, 'Foo', java.lang.Object);\n" + 
                  "Foo.hello = function(a, b) {\n" +
                  "     bla " + 
                  "}\n");        
    }

    @Test
    public void alias() {
        unit("class Foo { /** @alias */ int foo; /** @alias */ native void hello(int a, String b); }", 
                "Foo=function() {}\n" +
                "defineClass(Foo, 'Foo', java.lang.Object);\n");        
    }

    @Test
    public void aliasConstructors() {
        unitFailure("constructor cannot alias", "class Foo { /** @alias */ Foo() {} }");
    }
    
    @Test
    public void aliasWithInitializer() {
        unitFailure("initializer", "class Foo { /** @alias */ int foo = 0; }");
    }

    @Test
    public void staticMethod() {
        unit("class Foo { static void hello(int a, long b) { } }", 
                "Foo=function() {}\n" +
                "defineClass(Foo, 'Foo', java.lang.Object);\n" + 
                "Foo.hello = function(a, b) {}\n");        
    }

    @Test
    public void staticField() {
        unit("class Foo { static int a = 7; }", 
                "Foo=function() {}\n" +
                "defineClass(Foo, 'Foo', java.lang.Object);\n" + 
                "Foo.a = 0;\n" +
                "Foo.cinit = function() {\n" +
                "  Foo.a = 7;\n" +
                "}\n");        
    }

    @Test
    public void annotation() throws Exception {
        unit("package type;" +
             "@interface ann { }", 
             "");
    }
    
    @Test
    public void nativeAnnotation() throws IOException {
        unit("/** @native x=0; */ class Foo { }",
                "x=0;" +
                "Foo=function() {\n" +
                "}\n" +
                "defineClass(Foo, 'Foo', java.lang.Object);\n");
    }

    @Test
    public void augment() {
        unit("/** @augment String */ class Foo { Foo() {} Foo(int a) {} }", 
                "Foo = String;\n" +
                "defineClass(Foo, 'Foo', null);\n");        
    }
    
    @Test
    public void augmentDefaultConstructor() {
        unit("/** @augment String */ class Foo { }", 
                "Foo = String;\n" +
                "defineClass(Foo, 'Foo', null);\n");        
    }

    @Test
    public void augmentConstructorWithLogic() {
        unitFailure("logic", "/** @augment String */ class Foo { Foo() { return; } }");
    }

    // TODO: merge with non-embedded Overload test
    @Test
    public void overloadFieldAndMethod() {
        unit("class Foo { int a; int a() { return a; } void b() { a(); } }", 
                "Foo=function() {}\n" +
                "defineClass(Foo, 'Foo', java.lang.Object);\n" + 
                "Foo.prototype.a = 0;\n" +
                "Foo.prototype.a1 = function() {\n" +
                "    return this.a;\n" +
                "}\n" +
                "Foo.prototype.b = function() {\n" +
                "    this.a1();\n" +
                "}\n"
                );
    }

    // TODO
    public void contructor() {
        unit("class Base { int a; int b=2; Base() { a=1; } }\n" +
             "class Ext extends Base { }", 
             "Base=function() {}\n" +
             "defineClass(Base, 'Base', java.lang.Object);\n" +
             "Base.init=function() { this.a=2; }\n" +
             "Ext=function() {}\n" +
             "defineClass(Ext, 'Ext', Base);"
                );
    }

    //--
    
    @Test
    public void java() throws IOException {
        String js;
        String java;
        String name;
        
        for (Node file : RESOURCES.find("*/*.java")) {
            try {
                java = file.readString();
                name = file.getName();
                name = name.substring(0, name.length() - 4) + "js";
                js = file.getParent().join(name).readString();
                unit(java, js);
            } catch (Exception e) {
                throw new RuntimeException("testJava failed: " + file, e);
            }
        }
    }

    @Test
    public void subsignatureNaming() throws Exception {
        unit("abstract class AbstractList<T> { public abstract T iterator(); }" +
             "class ArrayList<T> extends AbstractList<T>{ public T iterator() { return null;} }",
             "AbstractList=function() {}\n" +
             "defineClass(AbstractList, 'AbstractList', java.lang.Object);\n" +
             "AbstractList.prototype.iterator = ABSTRACT;\n" +
             "ArrayList=function() {}\n" +
             "defineClass(ArrayList, 'ArrayList', AbstractList);\n" +
             "ArrayList.prototype.iterator=function() {\n" +
             "  return null;" +
             "}\n");
    }

    //--
    
    @Test
    public void extendS() throws Exception {
        load("type/extends.java", "type.Ext", 
          "type.Ext.create() instanceof type.Ext",
          "type.Ext.create() instanceof type.Base",
          "getBase(type.Ext) === type.Base");
    }

    @Test
    public void interfaces() throws Exception {
        load("type/ifc.java", "type.user", 
           "new type.user() instanceof java.lang.Object",
           "instanceofInterface(null, type.ifc) == false",
           "!isQwtInterface(type.user)",
           "isQwtInterface(type.ifc)",
           "getBase(type.ifc) == null",
           "new type.user().instanceOf()", 
           "type.user.$$implements.length == 1",
           "type.user.$$implements[0] === type.ifc");
    }

    @Test
    public void enm() throws Exception {
        load("type/enum.java", "type.enm",
            "type.enm.A instanceof type.enm");
    }
    
    private void load(String javaFile, String unit, String ... assertions) throws Exception {
        unit(RESOURCES.join(javaFile).readString(), ANY, "", ANY, assertions);
    }
}
