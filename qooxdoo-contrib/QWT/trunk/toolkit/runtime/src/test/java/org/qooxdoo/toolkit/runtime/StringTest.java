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

package org.qooxdoo.toolkit.runtime;

import org.junit.Test;


public class StringTest extends Base2 {
    @Test
    public void typeofLiteral() {
        expr("\"a\"", ANY, ANY,
             "typeof x === 'string'"
             );
    }

    @Test
    public void typeofObject() {
        expr("new String(\"a\")", ANY, ANY,
             "typeof x === 'string'"
             );
    }

    @Test
    public void getClasS() {
        expr("\"a\".getClass().getName()", ANY, "java.lang.String");
    }

    @Test
    public void instanceOf() {
        expr("\"a\" instanceof String", ANY, true);
        expr("\"a\" instanceof Object", ANY, true);
    }

    // JavaScripts toString method is used to obtain a String value.
    @Test
    public void toStrinG() {
        expr("\"hello\".toString()", ANY, "hello", "typeof x === 'string'");
    }
    
    @Test
    public void length() {
        expr("\"a\".length()", ANY, 1);
    }

    @Test
    public void charCodeAt() {
        expr("\"abc\".charCodeAt(1)", ANY, 98);
    }

    @Test
    public void startsWith() {
        expr("\"abc\".startsWith(\"\")", ANY, true);
        expr("\"abc\".startsWith(\"ab\")", ANY, true);
        expr("\"abc\".startsWith(\"xy\")", ANY, false);
    }

    @Test
    public void endsWith() {
        expr("\"abc\".endsWith(\"\")", ANY, true);
        expr("\"abc\".endsWith(\"bc\")", ANY, true);
        expr("\"abc\".endsWith(\"ab\")", ANY, false);
    }

    @Test
    public void equals() {
        expr("\"a\".equals(\"a\")", ANY, true);
        expr("\"a\".equals(new String(\"a\"))", ANY, true);
        expr("\"a\".equals(\"b\")", ANY, false);
    }

    @Test
    public void hashCodE() {
        expr("\"a\".hashCode()", ANY, 2);
    }

    @Test
    public void lengthMethod() {
        expr("\"ab\".length()", ANY, 2);
    }

    @Test
    public void indexOf() {
        expr("\"hello\".indexOf(\"ll\")", ANY, 2);
    }

    @Test
    public void lastIndexOf() {
        expr("\"hellollo\".lastIndexOf(\"ll\")", ANY, 5);
    }

    @Test
    public void concatStringString() {
        expr("\"a\" + \"b\"", ANY, ANY,
             "typeof x == 'string'", 
             "x == 'ab'");
    }

    @Test
    public void concatStringStringString() {
        expr("\"\" + \"1\" + \"23\"", ANY, ANY, 
                "x == '123'");
    }

    @Test
    public void concatStringChar() {
        expr("\"12\" + '3'", ANY, ANY,
             "typeof x == 'string'", 
             "x == '123'");
    }

    @Test
    public void substring() {
        expr("\"123456\".substring(2, 4)", ANY, ANY,
             "x.toString() == '34'");
    }
    
}
