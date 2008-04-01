// §{{header}}:
//
// This is file tests/junit/de/mlhartme/mork/mapping/CopyBufferOccurrenceTest.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.mapping;

import de.mlhartme.mork.grammar.Grammar;
import de.mlhartme.mork.semantics.Attribute;
import de.mlhartme.mork.semantics.AttributionBuffer;
import de.mlhartme.mork.semantics.Occurrence;
import de.mlhartme.mork.semantics.Type;
import de.mlhartme.mork.semantics.Oag;
import de.mlhartme.mork.semantics.CopyBuffer;
import de.mlhartme.mork.util.IntArrayList;
import de.mlhartme.mork.util.StringArrayList;
import java.util.ArrayList;
import java.util.List;
import junit.framework.TestCase;

public class CopyBufferOccurrenceTest extends TestCase {
    private Attribute start;
    private CopyBuffer sems;

    public void testDirect() {
        create(new String[] {
            "A B",
        }, "AB");
        assertOccurrence(1, 1);
    }

    public void testIndirect() {
        create(new String[] {
            "A B",
            "B C",
        }, "ABC");
        assertOccurrence(1, 1);
    }

    public void testAlt() {
        create(new String[] {
            "A i B",
            "A j j B",
        }, "AB");
        assertOccurrence(1, 1);
    }

    public void testZeroOne() {
        create(new String[] {
            "A B",
            "A",
        }, "AB");
        assertOccurrence(0, 1);
    }

    public void testOneTwo() {
        create(new String[] {
            "A B",
            "A B B",
        }, "AB");
        assertOccurrence(1, 2);
    }

    public void testTwoFour() {
        create(new String[] {
            "A B B",
            "A B B B B",
        }, "AB");
        assertOccurrence(2, 4);
    }

    public void testZeroThree() {
        create(new String[] {
            "A",
            "A B B B",
        }, "AB");
        assertOccurrence(0, 3);
    }
    public void testZeroOneFour() {
        create(new String[] {
            "A B",
            "A",
            "A B B B B",
        }, "AB");
        assertOccurrence(0, 4);
    }

    public void testMultTwo() {
        create(new String[] {
            "A B B",
            "B C C",
        }, "ABC");
        assertOccurrence(4, 4);
    }

    public void testMultOpt() {
        create(new String[] {
            "A B B",
            "B C C",
            "C D",
            "C",
        }, "ABCD");
        assertOccurrence(0, 4);
    }

    public void testLeftRecursion() {
        create(new String[] {
            "A A B",
            "A"
        }, "AB");
        assertOccurrence(0, Occurrence.UNBOUNDED);
    }
    public void testRightRecursion() {
        create(new String[] {
            "A B A",
            "A"
        }, "AB");
        assertOccurrence(0, Occurrence.UNBOUNDED);
    }

    public void testPlus() {
        create(new String[] {
            "A A B",
            "A B"
        }, "AB");
        assertOccurrence(1, Occurrence.UNBOUNDED);
    }

    public void testPlusTwo() {
        create(new String[] {
            "A A B",
            "A B B"
        }, "AB");
        assertOccurrence(1, Occurrence.UNBOUNDED);  // TODO: min 2 ...
    }

    public void testPlusTwo2() {
        create(new String[] {
            "A A B B",
            "A B B"
        }, "AB");
        assertOccurrence(2, Occurrence.UNBOUNDED);
    }

    public void testInderectRecursion() {
        create(new String[] {
            "A B C",
            "A",
            "B A"
        }, "ABC");
        assertOccurrence(0, Occurrence.UNBOUNDED);
    }

    public void testBracketRecursion() {
        create(new String[] {
            "A a A b",
            "A B",
        }, "AB");
        assertOccurrence(1, 1);
    }

    //---------------------------------

    private void assertOccurrence(int min, int max) {
        Occurrence occ;

        occ = sems.calcOccurrence(start);
        assertEquals("min", min, occ.min);
        assertEquals("max", max, occ.max);
    }

    /**
     * All symbols name have to be single characters.
     */
    private void create(String[] prods, String as) {
        Grammar grm;

        grm = Grammar.forProductions(prods);
        sems = new CopyBuffer((Attribute) null);
        start = CopyBufferCompareTest.addTransport(sems, "a", as, grm);
    }
}
