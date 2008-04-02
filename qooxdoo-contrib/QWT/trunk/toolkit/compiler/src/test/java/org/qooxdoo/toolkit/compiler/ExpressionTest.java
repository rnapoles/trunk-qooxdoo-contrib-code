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


public class ExpressionTest extends Base {
    //-- literals
    
    @Test
    public void nullLiteral() {
        expr("null", "null", null);
    }

    @Test
    public void stringLiteral() {
        expr("\"a\"", "\"a\"", ANY);
    }
    
    @Test
    public void numberLiteral() {
        expr("0", "0", 0.0);
        expr("0xffff", "65535", 65535);
        expr("-1", "-1", -1.0);
        expr("1L", "1", 1.0);
        expr("1.23D", "1.23", 1.23);
        expr("0.0F", "0.0", 0.0);
        expr("2.9f", "2.9", 2.9);
        expr("-3042686055658047285L", "-3042686055658047285", -3042686055658047285.0);
    }
    
    // testStringLiteral(): see StringTest

    @Test
    public void charLiteral() {
        expr("'a'", "97", 97);
    }

    @Test
    public void typeLiteral() {
        expr("Object.class", "java.lang.Object.metadata", ANY, "x == 'java.lang.Object'");
    }
    
    //--
    
    @Test
    public void incExpression() {
        stmt("int i = 0;" +
             "i++;" +
             "assertTrue(i == 1);" +
             "i++;" +
             "assertTrue(i == 2);" +
             "assertTrue(i++ == 2);" +
             "assertTrue(i == 3);" +
             "assertTrue(++i == 4);" +
             "assertTrue(i == 4);", 
             ANY, "new Foo().code(); true");
    }

    @Test
    public void decExpression() {
        stmt("int i = 5;" +
             "i--;" +
             "assertTrue(i == 4);" +
             "i--;" +
             "assertTrue(i == 3);" +
             "assertTrue(i-- == 3);" +
             "assertTrue(i == 2);" +
             "assertTrue(--i == 1);" +
             "assertTrue(i == 1);", 
             ANY, "new Foo().code(); true");
    }

    @Test
    public void innerAssign() {
        stmt("int a;" +
             "assertTrue((a = 1) == 1);", 
             ANY, "new Foo().code(); true");
    }
    
    @Test
    public void conditionalExpression() {
        expr("1 < 2 ? 1 : 2", "1 < 2 ? 1 : 2", 1.0);
    }
    
    @Test
    public void classInstanceCreationNormal() {
        expr("new Object()", "new java.lang.Object()", ANY, "x instanceof java.lang.Object");
    }
    
    @Test
    public void classInstanceCreationAugmented() {
        expr("new MyDate(1)", "new MyDate(1)", ANY, "x instanceof MyDate");
    }

    @Test
    public void arrayCreation() {
        expr("new Object[1]", "newEmptyArray(1)", ANY, NN);
        expr("new Object[2][3]", "newEmptyArray(2, 3)", ANY, NN);
        expr("new Object[] { 1, 2 }", "newInitializedArray(1, 2)", ANY, NN);
        expr("new Object[] { 1, 2 }[1]", ANY, ANY, "x == 2.0");
        expr("new int[][] { { 1, 2 }, { 2, 3, 4 } }", 
                "newInitializedArray(newInitializedArray(1, 2), newInitializedArray(2, 3, 4))", ANY, NN);
    }

    @Test
    public void arrayAccess() {
        expr("(new Object[3])[2]", "(newEmptyArray(3))[2]", ANY, "x === null");
    }
    @Test
    public void arrayAssign() {
        expr("(new Object[3])[0] = 1", "(newEmptyArray(3))[0] = 1", ANY);
    }
    @Test
    public void arrayLength() {
        expr("(new Object[3]).length", "(newEmptyArray(3)).length", 3.0);
    }
    @Test
    public void methodNormal() {
        expr("this.normalMethod()", "this.normalMethod()", 4);
    }
    @Test
    public void methodNormalNoThis() {
        expr("normalMethod()", "this.normalMethod()", 4);
    }
    @Test
    public void methodStatic() {
        expr("Foo.staticMethod()", "Foo.staticMethod()", 3);
    }
    @Test
    public void methodStaticOnObject() {
        expr("this.staticMethod()", "Foo.staticMethod()", 3);
    }
    @Test
    public void methodStaticNoClass() {
        expr("staticMethod()", "Foo.staticMethod()", 3);
    }

    @Test
    public void fieldNormalAccess() {
        expr("this.normalField", "this.normalField", 1.0);
    }
    @Test
    public void fieldNormalAccessNoThis() {
        expr("normalField", "this.normalField", 1.0);
    }
    @Test
    public void fieldStaticAccess() {
        expr("Foo.staticField", "Foo.staticField", 2);
    }
    @Test
    public void fieldStaticAccessNoClass() {
        expr("staticField", "Foo.staticField", 2);
    }
    @Test
    public void fieldStaticAccessOnObject() {
        expr("this.staticField", "Foo.staticField", 2);
    }
    @Test
    public void cast() {
        expr("(int) 5", "5", 5);
        expr("(char) 5", "5", 5);
    }
    @Test
    public void thiS() {
        expr("this", "this", ANY, "x instanceof Foo");
    }

    @Test
    public void instanceOf() {
        expr("this instanceof Foo", "this instanceof Foo", true);
        expr("this instanceof Object", "true", true);
    }
    @Test
    public void instanceOfString() {
        expr("\"a\" instanceof Object", ANY, true);
        expr("\"a\" instanceof String", ANY, true);
    }
    
    @Test
    public void infixExpression() {
        expr("1+2", "1 + 2", 3);
        expr("1+2+3", "1 + 2 + 3", 6);
        expr("1+2-3", "1 + 2 - 3", 0.0);
        expr("'A'-5", "65 - 5", 60);
        expr("\"A\"+\"B\"", "stringConcat(\"A\",\"B\")", "AB");
    }

    @Test
    public void infixSame() {
        expr("1 == 2", "1 === 2", false);
    }
    
    @Test
    public void infixNotSame() {
        expr("1 != 2", "1 !== 2", true);
    }

    @Test
    public void infixDiv() {
        expr("5 / 2", "Math.floor(5 / 2)", 2.0);
    }

    @Test
    public void paranthesizedExpression() {
        expr("(1)", "(1)", 1.0);
        expr("2*(3+4)", "2 * (3 + 4)", 14);
    }
}
