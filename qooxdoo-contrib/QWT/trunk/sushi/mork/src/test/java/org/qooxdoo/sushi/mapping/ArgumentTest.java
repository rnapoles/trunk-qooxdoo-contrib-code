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

import org.qooxdoo.sushi.grammar.Grammar;
import org.qooxdoo.sushi.semantics.Attribute;
import org.qooxdoo.sushi.semantics.CopyBuffer;
import java.util.ArrayList;
import java.util.List;

public class ArgumentTest extends CompareBase {
    private Grammar grm;
    private List args;
    private List expected;

    @Override
    protected void setUp() throws Exception {
        super.setUp();

        args = new ArrayList();
        expected = new ArrayList();
    }

    public void testEmpty() {
        sort();
    }

    public void testOne() {
        grammar(new String[] {
                    "X A"
                });
        arg("a", "XA", 0);
        sort();
    }

    public void testAlt() {
        grammar(new String[] {
                    "X A",
                        "X B",
                });
        arg("a", "XA", 0);
        arg("b", "XB", 0);
        sort();
    }

    public void testEmptyAlt() {
        grammar(new String[] {
            "X A",
            "X B",
            "X",
        });
        arg("a", "XA", 0);
        arg("b", "XB", 0);
        sort();
    }

    public void testIndirectAlt() {
        grammar(new String[] {
            "X I",
            "X A",
            "I B",
        });
        arg("a", "XA", 0);
        arg("b", "XIB", 0);
        sort();
    }

    public void testLT2() {
        grammar(new String[] {
                    "X A B",
                });
        arg("a", "XA", 0);
        arg("b", "XB", 1);
        sort();
    }

    public void testLTIndirect() {
        grammar(new String[] {
                    "X I B",
                    "I A",
                });
        arg("a", "XIA", 0);
        arg("b", "XB", 1);
        sort();
    }

    public void testLT3() {
        grammar(new String[] {
                    "X A B C",
                });
        arg("a", "XA", 0);
        arg("b", "XB", 1);
        arg("c", "XC", 2);
        sort();
    }

    public void testGT2() {
        grammar(new String[] {
                    "X B A",
                });
        arg("a", "XA", 1);
        arg("b", "XB", 0);
        sort();
    }

    public void testGT3() {
        grammar(new String[] {
                    "X C B A",
                });
        arg("a", "XA", 2);
        arg("b", "XB", 1);
        arg("c", "XC", 0);
        sort();
    }

    // optional argument problem
    public void testGToptional() {
        grammar(new String[] {
                    "X I J",
                    "X J",
                    "I A",
                    "J B"
                });
        arg("a", "XIA", 0);
        arg("b", "XJB", 1);
        sort();
    }

    public void testAltLT() {
        grammar(new String[] {
                    "X I C",
                    "I A",
                    "I B"
                });
        arg("a", "XIA", 0);
        arg("b", "XIB", 0);
        arg("c", "XC", 1);
        sort();
    }

    public void testAltLTAlt() {
        grammar(new String[] {
                    "X I J",
                        "I A",
                        "I B",
                        "J C",
                        "J D",
                });
        arg("a", "XIA", 0);
        arg("b", "XIB", 0);
        arg("c", "XJC", 1);
        arg("D", "XJD", 1);
        sort();
    }

    public void testUsedTwice() {
        grammar(new String[] {
                "S X P X",
                "X A",
                "X M B N",
                });
        arg("a", "SXA", 0);
        arg("b", "SXB", 0);
        sort();
    }

    public void testRecursed() {
        grammar(new String[] {
                "S X P",
                "X X",
                "X A",
                "X B",
                });
        arg("a", "SXA", 0);
        arg("b", "SXB", 0);
        sort();
    }

    public void testThirdBeforeFirstAndSecond() {
        grammar(new String[] {
                "S T X",
                "X A",
                "X B",
                "T C",
                });
        arg("a", "SXA", 1);
        arg("b", "SXB", 1);
        arg("c", "STC", 0);
        sort();
    }

    private void grammar(String[] prods) {
        grm = Grammar.forProductions(prods);
    }

    private void arg(String attrName, String attrs, int expectedPos) {
        Argument arg;
        CopyBuffer sems;

        sems = new CopyBuffer((Attribute) null);
        attr = CopyBufferCompareTest.addTransport(sems, attrName, attrs, grm);
        sems.setStart(attr);
        arg = new Argument(Path.MERGEABLE, sems, new ArrayList()); // TODO: no sources
        args.add(arg);
        while (expected.size() <= expectedPos) {
            expected.add(new ArrayList());
        }
        ((List) expected.get(expectedPos)).add(arg);
    }

    private void sort() {
        List reversed;
        int i;

        doSortAndMerge(args, expected, grm);
        reversed = new ArrayList();
        for (i = args.size() - 1; i >= 0; i--) {
            reversed.add(args.get(i));
        }
        doSortAndMerge(reversed, expected, grm);
    }

    /** @param arguments   list of Arguments */
    private static void doSortAndMerge(List arguments, List expected, Grammar grm) {
        List sorted;
        List merged;
        int i;
        int max;
        Argument arg;
        List expectedMerged;
        List tmp;

        sorted = doSort(arguments, expected);
        max = sorted.size();
        merged = new ArrayList();
        expectedMerged = new ArrayList();
        for (i = 0; i < max; i++) {
            arg = Argument.merge(grm.getStart(), null, (List) sorted.get(i));
            merged.add(arg);
            assertIncludes(arg, (List) sorted.get(i));
            tmp = new ArrayList();
            tmp.add(arg);
            expectedMerged.add(tmp);
        }
        doSort(merged, expectedMerged);
    }


    private static List doSort(List arguments, List expected) {
        List sorted;

        sorted = RelatedArgument.sort(arguments);
        assertSorted(sorted, expected);
        return sorted;
    }

    private static void assertSorted(List sorted, List expected) {
        List merge;
        int i;
        int max;

        max = sorted.size();
        for (i = 0; i < max; i++) {
            merge = (List) sorted.get(i);
            assertIdentical((List) expected.get(i), merge);
            assertNE(merge);
            if (i + 1 < max) {
                assertLT(merge, (List) sorted.get(i + 1));
            }
        }
    }

    private static void assertIdentical(List exp, List computed) {
        int i;
        int max;

        max = exp.size();
        assertEquals(max, computed.size());
        for (i = 0; i < max; i++) {
            assertContained((Argument) exp.get(i), computed);
        }
    }
    private static void assertContained(Argument arg, List args) {
        int i;
        int max;

        max = args.size();
        for (i = 0; i < max; i++) {
            if (arg == args.get(i)) {
                return;
            }
        }
        assertTrue(false);
    }

    private static void assertNE(List args) {
        int i;
        int max;
        int j;
        Argument a;
        Argument b;

        max = args.size();
        for (i = 0; i < max; i++) {
            a = (Argument) args.get(i);
            for (j = i + 1; j < max; j++) {
                b = (Argument) args.get(j);
                assertNE(a, b);
            }
        }
    }
    private static void assertLT(List as, List bs) {
        int i;
        int max;

        max = as.size();
        for (i = 0; i < max; i++) {
            assertLT((Argument) as.get(i), bs);
        }
    }
    private static void assertLT(Argument a, List bs) {
        int i;
        int max;

        max = bs.size();
        for (i = 0; i < max; i++) {
            assertLT(a, (Argument) bs.get(i));
        }
    }
    private static void assertNE(Argument a, Argument b) {
        assertEquals(NE, a.compare(b));
        assertEquals(NE, b.compare(a));
        assertEquals(NE, a.compare(a));
        assertEquals(NE, b.compare(b));
    }
    private static void assertLT(Argument a, Argument b) {
        assertEquals(LT, a.compare(b));
        assertEquals(GT, b.compare(a));
        assertEquals(NE, a.compare(a));
        assertEquals(NE, b.compare(b));
    }

    private static void assertIncludes(Argument left, List rights) {
        int i;
        int max;
        Argument right;

        max = rights.size();
        for (i = 0; i < max; i++) {
            right = (Argument) rights.get(i);
            assertIncludes(left, right);
        }
    }

    private static void assertIncludes(Argument left, Argument right) {
        // TODO
    }
}
