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

package org.qooxdoo.sushi.mapping;

import org.qooxdoo.sushi.reflect.Method;
import org.qooxdoo.sushi.reflect.Selection;
import org.qooxdoo.sushi.semantics.Type;
import java.util.List;

public class ConversionTest extends CompareBase {
    public void testAssignableFromValue() {
        assertAssignableFrom(String.class, new Type(String.class, Type.VALUE));
        assertAssignableFrom(List.class, new Type(List.class, Type.VALUE));
        assertAssignableFrom(String[].class, new Type(String[].class, Type.VALUE));
        assertAssignableFrom(Integer.class, new Type(Integer.class, Type.VALUE));
        assertAssignableFrom(Integer.TYPE, new Type(Integer.class, Type.VALUE));
    }

    public void testAssignableFromOption() {
        assertAssignableFrom(String.class, new Type(String.class, Type.OPTION));
        assertAssignableFrom(List.class, new Type(List.class, Type.OPTION));
        assertAssignableFrom(String[].class, new Type(String[].class, Type.OPTION));
        assertAssignableFrom(Integer.class, new Type(Integer.class, Type.OPTION));
        assertAssignableFrom(Integer.TYPE, new Type(Integer.class, Type.OPTION));
    }

    public void testAssignableFromSequence() {
        assertAssignableFrom(String[].class, new Type(String.class, Type.SEQUENCE));
        assertAssignableFrom(List.class, new Type(String.class, Type.SEQUENCE));
        assertAssignableFrom(Integer[].class, new Type(Integer.class, Type.SEQUENCE));
        assertAssignableFrom(List.class, new Type(Integer.class, Type.SEQUENCE));
        assertAssignableFrom(List[].class, new Type(List.class, Type.SEQUENCE));
        assertAssignableFrom(List.class, new Type(List.class, Type.SEQUENCE));
    }

    public void testNotAssignable() {
        assertTrue(!Conversion.isAssignableFrom(String.class, new Type(Integer.class, Type.VALUE)));
    }

    public void testHasFormalArgument() {
        Selection sel;

        sel = Method.forName(ConversionTest.class, "arg");
        assertTrue(!Conversion.hasFormalArgument(sel, new Type(String.class)));
        assertTrue(Conversion.hasFormalArgument(sel, new Type(Integer.class)));
        assertTrue(Conversion.hasFormalArgument(sel, new Type(Character.class)));
    }

    public static void arg(int a) {
    }

    public static void arg(int a, char c) {
    }


    private void assertAssignableFrom(Class formal, Type actual) {
        assertTrue(Conversion.isAssignableFrom(formal, actual));
    }
}
