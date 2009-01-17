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

import junit.framework.TestCase;

import org.qooxdoo.sushi.util.IntBitSet;

import org.qooxdoo.sushi.grammar.Grammar;
import org.qooxdoo.sushi.semantics.Ag;
import org.qooxdoo.sushi.semantics.Attribute;
import org.qooxdoo.sushi.semantics.AgBuffer;
import org.qooxdoo.sushi.semantics.Oag;
import org.qooxdoo.sushi.semantics.Occurrence;
import org.qooxdoo.sushi.semantics.Pusher;

public class CopyBufferPushUpTest extends TestCase {
    private Attribute seed;
    private AgBuffer sems;
    private Grammar grm;

    public void testDirect() {
        create(new String[] {
            "A a",
        });
        assertValid(1);
    }

    public void testDirectOfs() {
        create(new String[] {
            "A X Y a",
        });
        assertValid(1);
    }

    public void testIndirect() {
        create(new String[] {
            "B A",
            "A a",
        });
        assertValid(1);
    }

    public void testMult() {
        create(new String[] {
            "B A A",
            "A a",
        });
        assertValid(2);
    }

    public void testMultMult() {
        create(new String[] {
            "C B B",
            "B A A",
            "A a",
        });
        assertValid(4);
    }

    public void testHiddenMult() {
        create(new String[] {
            "C A B",
            "B A",
            "A a",
        });
        assertValid(2);
    }

    public void testRightRecursion() {
        create(new String[] {
            "L I L",
            "L",
            "I a",
        });
        assertValid(1);
    }

    public void testLeftRecursion() {
        create(new String[] {
            "L L I",
            "L",
            "I a",
        });
        assertValid(1);
    }

    public void testPlusRecursion() {
        create(new String[] {
            "L L I",
            "L I",
            "I a",
        });
        assertValid(1);
    }

    public void testMultRecursionA() {
        create(new String[] {
            "L L I",
            "L",
            "I A A",
            "A a",
        });
        assertValid(1);
    }

    public void testMultRecursionB() {
        create(new String[] {
            "L L I I",
            "L",
            "I a",
        });
        assertValid(1);
    }
    //---------------------------------

    private void assertValid(int size) {
        Occurrence occ;
        Oag ag;
        Ag trueSems;

        sems = Pusher.run(false, seed, new IntBitSet(), grm);
        System.out.println("sems raw");
        System.out.println(sems.toString());

        /* TODO: doesn't work since attribute card is wrong:
        trueSems = new SemanticsBuffer();
        sems.createSemanticsBuffer(trueSems, new Transport(g));

        System.out.println("sems");
        ag = trueSems.createSemantics(g, new ArrayList());
         System.out.println(ag.toString(grm.getSymbolTable(), g)); */
    }

    /**
     * All symbols name have to be single characters.
     */
    private void create(String[] prods) {
        int sym;

        grm = Grammar.forProductions(prods);
        sym = grm.getSymbolTable().indexOf("a");
        if (sym == -1) {
            throw new IllegalArgumentException("missing seed symbol: a");
        }
        seed = new Attribute(sym, "a");
    }
}
