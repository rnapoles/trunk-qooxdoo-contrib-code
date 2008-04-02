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

import org.junit.Test;


public class StatementTest extends Base {
    @Test
    public void block() {
        stmt("{}");
    }

    @Test
    public void asserT() {
        stmt("assert true;", "");        
    }

    @Test
    public void labeled() {
        stmt("foo: return;", "return;");        
    }

    @Test
    public void breaK() {
        stmt("while (true) { break; }");
    }

    @Test
    public void continuE() {
        stmt("while (true) { continue; }");
    }

    @Test
    public void dO() {
        stmt("do ; while (true);");
    }

    @Test
    public void empty() {
        stmt(";");
    }

    @Test
    public void expression() {
        stmt("code();",
             "this.code();");
    }
    @Test
    public void forNormal() {
        stmt("int a; for (a = 0; a < 10; a++);", 
             "var a;\n" +
                 "for (a = 0; a < 10; a++) ;");
    }
    @Test
    public void forNormalWithDecl() {
        stmt("for (int a = 0; a < 10; a++);", 
             "for (var a = 0; a < 10; a++) ;");
    }
    @Test
    public void forEnhancedIterable() {
        stmt("Iterable<Object> iterable = null; for (Object obj : iterable);",
             "var iterable = null;\n" +
                 "for (var iter_obj = iterable.iterator(); iter_obj.hasNext(); ) {\n" +
                 "    var obj = iter_obj.next();\n" +
                 "    ;\n" +
                 "}");
    }
    @Test
    public void forEnhancedArray() {
        stmt("Object[] array = null; for (Object o : array);",
             "var array = null;\n" +
                 "for (var iter_o = 0; iter_o < array.length; iter_o++) {\n" +
                 "    var o = array[iter_o];\n" +
                 "    ;\n" +
                 "}");
    }

    @Test
    public void returN() {
        stmt("return;");
    }

    @Test
    public void switcH() {
        stmt("int a = 0;" +
         "switch (a) {" +
         "case 0:" +
         "    break;" +
         "case 1:" +
         "    break;" +
         "default:" +
         "    break;" +
         "}",
         "    var a = 0;\n" +
         "    switch (a) {\n" +
         "    case 0:\n" +
         "        break;\n" +
         "    case 1:\n" +
         "        break;\n" +
         "    default:\n" +
         "        break;\n" +
         "    }");
    }
    @Test
    public void synchronizeD() {
        stmt("synchronized (Foo.class) { }",
             "Foo.metadata;\n" +
                 "{\n" +
                 "}");
        
    }

    @Test
    public void throW() {
        stmt("throw new Throwable();", 
             "throw new java.lang.Throwable();");
    }
    
    @Test
    public void trY() {
        stmt("try { } catch (RuntimeException e) { } catch (Error e) { } finally { }",
        "    try {\n" +
             "    }\n" + 
             "     catch (ex) {\n" +
             "        if (ex instanceof java.lang.RuntimeException) {\n" +
             "            var e = ex;\n" +
             "            {\n" +
             "            }\n" +
             "        }\n" +
             "        else if (ex instanceof java.lang.Error) {\n" +
             "            var e = ex;\n" +
             "            {\n" + 
             "            }\n" +
             "        }\n" +
             "        else {\n" +
             "            throw ex;\n" + 
             "        }\n" +
             "    }\n" +
             "    finally {\n" +
             "    }");
        
    }
    
    @Test
    public void whilE() {
        stmt("while (true);");
    }

    @Test
    public void variableDeclaration() {
        stmt("int a = 2; long b = 3;",
             "var a = 2; var b = 3;");
    }

    @Test
    public void variableDeclarationWithFields() {
        stmt("Object a0 = x;" +
             "Object a1 = normalX;",
             "var a0 = Foo.x;" +
             "var a1 = this.normalX;");
    }

    @Test
    public void variableDeclarationWithQualifiedFields() {
        stmt("Object a0 = array.length;" +
             "Object a1 = normalArray.length;",
             "var a0 = Foo.array.length;" +
             "var a1 = this.normalArray.length;");
    }
}
