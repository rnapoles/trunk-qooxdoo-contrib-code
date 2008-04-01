// §{{header}}:
//
// This is file tests/junit/de/mlhartme/mork/mapping/ConversionTest.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.mapping;

import de.mlhartme.mork.reflect.Method;
import de.mlhartme.mork.reflect.Selection;
import de.mlhartme.mork.semantics.Type;
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
