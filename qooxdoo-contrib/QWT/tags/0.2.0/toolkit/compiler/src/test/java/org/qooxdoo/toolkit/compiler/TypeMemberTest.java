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

package org.qooxdoo.toolkit.compiler;

import org.junit.Test;

public class TypeMemberTest extends Base {
    @Test
    public void normal() {
        unit("package type; " +
             "class Parent {" +
             "  static class Child {" +
             "  }" +
             "}",
             "touchPackage(\"type\");\n" + 
             "type.Parent=function() {}\n" +
             "defineClass(type.Parent, 'type.Parent', java.lang.Object);" +
             "touchPackage(\"type\");\n" + 
             "type.Parent$Child=function() {}\n" +
             "defineClass(type.Parent$Child, 'type.Parent$Child', java.lang.Object);");
    }

    @Test
    public void memberClassStatic() {
        unit("class Wrapper { " +
             "  static class Foo { public void meth() { new Foo(); } } " +
             "  public Foo create() {" +
             "    return new Foo();" +
             "  }" +
             "}", 
             "Wrapper=function() {}\n" +
             "defineClass(Wrapper, 'Wrapper', java.lang.Object);\n" + 
             "Wrapper.prototype.create = function() {" +
             "  return new Wrapper$Foo();\n" +
             "}\n" +
             "Wrapper$Foo=function() {}\n" +
             "defineClass(Wrapper$Foo, 'Wrapper$Foo', java.lang.Object);\n" +
             "Wrapper$Foo.prototype.meth=function() { new Wrapper$Foo(); }\n", 
             "", ANY
             );
    }

    @Test
    public void memberClassNoneStaticDirect() {
        unit("class Wrapper { " +
             "  class Foo { public void meth() { new Foo(); } } " +
             "  public Foo create() {" +
             "    return new Foo();" +
             "  }" +
             "}", 
             "Wrapper=function() {}\n" +
             "defineClass(Wrapper, 'Wrapper', java.lang.Object);\n" + 
             "Wrapper.prototype.create = function() {" +
             "  return new Wrapper$Foo(this);\n" +
             "}\n" +
             "Wrapper$Foo=function(__parent_this) { this.__parent_this = __parent_this; }\n" +
             "defineClass(Wrapper$Foo, 'Wrapper$Foo', java.lang.Object);\n" +
             "Wrapper$Foo.prototype.meth=function() { new Wrapper$Foo(this); }\n", // TODO: this.__parent_this
             "", ANY
             );
    }
    
    @Test
    public void memberClassNoneStaticIndirect() {
        unit("class Wrapper { " +
             "  class Foo { Foo() {} Foo(int x) {} } " +
             "  public Foo create() {" +
             "    return new Foo();" +
             "  }" +
             "}", 
             "Wrapper=function() {}\n" +
             "defineClass(Wrapper, 'Wrapper', java.lang.Object);\n" + 
             "Wrapper.prototype.create = function() {" +
             "  return newObject(Wrapper$Foo, Wrapper$Foo.init, []);\n" +
             "}\n" +
             "Wrapper$Foo=function(__parent_this) { this.__parent_this = __parent_this; }\n" +
             "defineClass(Wrapper$Foo, 'Wrapper$Foo', java.lang.Object);\n" +
             "Wrapper$Foo.init=function() {}\n" + 
             "Wrapper$Foo.init1=function(x) {}\n", 
             "", ANY
             );
    }

    @Test
    public void memberClassNoneStaticReferences() {
        unit("class Wrapper { " +
             "  int field;" +
             "  int method() { return 0; }" +
             "  class Foo { " +
             "    int getMethod() { return method(); } " +
             "    int getField() { return field; } " +
             "  } " +
             "}", 
             "Wrapper=function() {}\n" +
             "defineClass(Wrapper, 'Wrapper', java.lang.Object);\n" + 
             "Wrapper.prototype.field = 0;" +
             "Wrapper.prototype.method = function() {" +
             "  return 0;\n" +
             "}\n" +
             "Wrapper$Foo=function(__parent_this) { this.__parent_this = __parent_this; }\n" +
             "defineClass(Wrapper$Foo, 'Wrapper$Foo', java.lang.Object);\n" +
             "Wrapper$Foo.prototype.getMethod=function() { return this.__parent_this.method(); }\n" + 
             "Wrapper$Foo.prototype.getField=function() { return this.__parent_this.field; }\n", 
             "", ANY
             );
    }
    
    @Test
    public void referenceInGenericTypeBug() {
        unit("class Foo<T> {" +
             "  int name;" +
             "  int getName() {" +
             "    return name;" +
             "  }" +
             "}", 
             "Foo=function(){}\n" +
             "defineClass(Foo,'Foo',java.lang.Object);" +
             "Foo.prototype.name=0;" +
             "Foo.prototype.getName=function(){" +
             "  return this.name;" +
             "}\n");
    }
    
    @Test
    public void referenceBaseMethodBug() {
        unit("class Base<T> {" +
             "  int get() {" +
             "    return 0;" +
             "  }" +
             "}" +
             "class Ext<T> extends Base<T> {" +
             "  void code() { get(); } " +
             "}", 
             "Base=function(){}\n" +
             "defineClass(Base,'Base',java.lang.Object);Base.prototype.get=function(){return 0;}\n" +
             "Ext=function(){}\n" +
             "defineClass(Ext,'Ext',Base);Ext.prototype.code=function(){this.get();}\n");
    }
    
    @Test
    public void referToBaseParent() {
        unit("class Base<T> {" +
             "  int get() {" +
             "    return 0;" +
             "  }" +
             "}" +
             "class Ext<T> extends Base<T> {" +
             "  class Child {" +
             "    void code() { get(); } " +
             "  }" +
             "}",
             "Base=function(){}\n" +
             "defineClass(Base,'Base',java.lang.Object);Base.prototype.get=function(){return 0;}\n" +
             "Ext=function(){}\n" +
             "defineClass(Ext,'Ext',Base);Ext$Child=function(__parent_this){this.__parent_this=__parent_this;}\n" +
             "defineClass(Ext$Child,'Ext$Child',java.lang.Object);Ext$Child.prototype.code=function(){this.__parent_this.get();}\n");
    }

    @Test(expected=CompilerException.class)
    public void anonymousClass() {
        unit("package type;" +
             "class Foo {" +
             "  public static int foo() {" +
             "    return new Object() {" +
             "      public int hashCode() {" +
             "        return 7;" +
             "      }" +
             "    }.hashCode();" +
             "  }" +
             "}",
             "touchPackage(\"type\");\n" + 
             "type.Foo=function() {}\n" +
             "defineClass(type.Foo, 'type.Foo', java.lang.Object);" +
             "type.Foo.foo=function() {" +
             "  return new java.lang.Object().hashCode();" +
             "}\n");
    }

}
