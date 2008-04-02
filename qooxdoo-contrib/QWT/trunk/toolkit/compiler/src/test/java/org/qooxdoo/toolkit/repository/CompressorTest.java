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

import org.junit.Test;
import static org.junit.Assert.*;

import org.qooxdoo.toolkit.repository.Compressor;

public class CompressorTest {
    @Test
    public void empty() {
        check("", "");
    }

    @Test
    public void stringSingle() {
        check("A''B");
        check("A'abc'B");
        check("A'a\\'c'B");
        check("A'ab\"'B");
    }

    @Test
    public void stringDouble() {
        check("A\"\"B");
        check("A\"123\"B");
        check("A\"/*moin*/\"B");
        check("A\"ab'\"B");
    }
    
    @Test
    public void number() {
        check("0");
        check("2");
        check("1234567890");
        check("1234 ", " 1234\t");
    }
    
    @Test
    public void regex() {
        check("1/2"); // make sure / is recognized
        check("A/x/B");
        check("A/\\//B");
        check("A/'/B");
    }

    @Test
    public void simple() {
        check("a=9;", "a  =\t\t9;\n\n");
    }

    @Test
    public void lineComment() {
        check("1\n9", "1// aaa\n9");
    }

    @Test
    public void blockComment() {
        check("", "/**/");
        check("a=2;", "a=/*xyz*/2;");
        check("a=2;", "a=\t/**/ 2;");
        check("a=\n2;", "a= // \n/*1234*/ 2;");
    }
    
    @Test
    public void spaceRemoval() {
        check("", " \t \t");
        check("", " \t\n \t\n");
        check("= =", "= =");
        check("a=a", "a = a");
        check("1=a", "1 = a");
        check("a=1", "a = 1");
        check("a\nb", "\n\na\n\nb");
    }


    private void check(String script) {
        check(script, script);
    }
    private void check(String expected, String script) {
        assertEquals(expected, Compressor.run(script));
    }
}
