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

import org.qooxdoo.sushi.util.IntBitSet;

import org.qooxdoo.sushi.grammar.Grammar;
import org.qooxdoo.sushi.misc.StringArrayList;
import org.qooxdoo.sushi.semantics.Attribute;
import org.qooxdoo.sushi.semantics.AgBuffer;
import org.qooxdoo.sushi.semantics.State;
import org.qooxdoo.sushi.semantics.Type;

public class CopyBufferCompareTest extends CompareBase {
    private Attribute a;
    private Attribute b;
    private AgBuffer sa;
    private AgBuffer sb;

    public void testEmpty() {
        create(new String[] {
                    "X M",
                        "X N",
                        "X O"
                }, "X", "X");
        assertNE();
    }

    public void testLocalAlt() {
        create(new String[] {
                    "X A",
                        "X B",
                }, "XA", "XB");
        assertNE();
    }

    public void testLocalNE() {
        create(new String[] {
                    "X A B",
                        "X B A",
                }, "XA", "XB");
        assertNE();
    }

    public void testNonLocalNE() {
        create(new String[] {
                    "X Y",
                        "Y A B",
                        "Y B A",
                }, "XYA", "XYB");
        assertNE();
    }

    public void testSimpleLocalLT() {
        create(new String[] {
                    "X A B",
                }, "XA", "XB");
        assertLT();
    }

    public void testComplexLocalLT() {
        create(new String[] {
                    "X A B",
                        "X Y A Z B",
                        "X B",
                        "X A",
                }, "XA", "XB");
        assertLT();
    }

    public void testNonLocalLT() {
        create(new String[] {
                    "X M M Y N N",
                        "Y A B",
                }, "XYA", "XYB");
        assertLT();
    }

    public void testOptionalProblem() {
        create(new String[] {
                    "X A B",
                        "X B"
                }, "XA", "XB");
        assertLT();
    }

    public void testGT() {
        create(new String[] {
                    "X B A"
                }, "XA", "XB");
        assertGT();
    }

    public void testNELists() {
        create(new String[] {
                    "L A B L",
                        "L",
                }, "LA", "LB");
        assertNE();
    }

    public void testAltLists() {
        create(new String[] {
                    "L I L",
                        "L",
                        "I A",
                        "I B"
                }, "LIA", "LIB");
        assertNE();
    }

    public void testMergedMult() {
        create(new String[] {
                    "X Y Y",
                        "Y A B"
                }, "XYA", "XYB");
        assertNE();
    }

    public void testListLE() {
        create(new String[] {
                    "X L R",
                        "L L A",
                        "L A",
                        "R B R",
                        "R"
                }, "XLA", "XRB");
        assertLT();
    }

    //-------------------

    private void assertLT() {
        assertEquals(LT, sa.compare(sb));
        assertEquals(GT, sb.compare(sa));

        // every SemanticsBuffer is NE to itself
        assertEquals(NE, sa.compare(sa));
        assertEquals(NE, sb.compare(sb));
    }

    private void assertGT() {
        assertEquals(GT, sa.compare(sb));
        assertEquals(LT, sb.compare(sa));

        // every SemanticsBuffer is NE to itself
        assertEquals(NE, sa.compare(sa));
        assertEquals(NE, sb.compare(sb));
    }

    private void assertNE()  {
        assertEquals(NE, sa.compare(sb));
        assertEquals(NE, sb.compare(sa));

        // every SemanticsBuffer is NE to itself
        assertEquals(NE, sa.compare(sa));
        assertEquals(NE, sb.compare(sb));
    }

    //---------------------------------

    /**
     * All symbols name have to be single characters.
     *
     * @param as  symbols with attribute a
     * @param as  symbols with attribute b
     */
    private void create(String[] prods, String as, String bs) {
        Grammar grm;

        grm = Grammar.forProductions(prods);
        sa = new AgBuffer((Attribute) null);
        a = addTransport(sa, "a", as, grm);
        sa.setStart(a);
        sb = new AgBuffer((Attribute) null);
        b = addTransport(sb, "b", bs, grm);
        sb.setStart(b);
    }

    public static Attribute addTransport(AgBuffer sems, String attrName, String as, Grammar grammar) {
        Attribute[] attrs;
        StringArrayList symbolTable;
        IntBitSet symbols;
        int sym;
        Attribute attr;
        State state;
        int alt;
        int altCount;
        Attribute arg;
        int prod;
        int ofs;
        int maxOfs;

        symbolTable = grammar.getSymbolTable();
        attrs = createAttributes(attrName, as, symbolTable);
        symbols = new IntBitSet();
        grammar.getNonterminals(symbols);
        for (sym = symbols.first(); sym != -1; sym = symbols.next(sym)) {
            attr = getAttribute(attrs, sym, attrName);
            if (attr != null) {
                state = new State(true, attr, grammar);
                altCount = grammar.getAlternativeCount(sym);
                for (alt = 0; alt < altCount; alt++) {
                    prod = grammar.getAlternative(sym, alt);
                    maxOfs = grammar.getLength(prod);
                    for (ofs = 0; ofs < maxOfs; ofs++) {
                        arg = getAttribute(attrs, grammar.getRight(prod, ofs), attrName);
                        if (arg != null) {
                            state.addUpTransport(prod, ofs, arg);
                        }
                    }
                }
                sems.add(state);
            }
        }
        return attrs[0];
    }

    private static Attribute getAttribute(Attribute[] attrs, int symbol, String name) {
        int i;
        Attribute attr;

        for (i = 0; i < attrs.length; i++) {
            attr = attrs[i];
            if (attr.symbol == symbol && name.equals(attr.name)) {
                return attr;
            }
        }
        return null;
    }

    /** every character is a symbol name */
    private static Attribute[] createAttributes(String attrName, String symbols, StringArrayList symbolTable) {
        Attribute[] attrs;
        String name;
        int i;
        int sym;

        attrs = new Attribute[symbols.length()];
        for (i = 0; i < attrs.length; i++) {
            name = new String(new char[] { symbols.charAt(i) });
            sym = symbolTable.indexOf(name);
            if (sym == -1) {
                throw new IllegalArgumentException("undefined symbol: " + name);
            }
            attrs[i] = new Attribute(sym, attrName, new Type(Object.class, Type.SEQUENCE));
        }
        return attrs;
    }
}
