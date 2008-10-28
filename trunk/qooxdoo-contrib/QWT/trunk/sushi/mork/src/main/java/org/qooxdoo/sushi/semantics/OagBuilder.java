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

package org.qooxdoo.sushi.semantics;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.qooxdoo.sushi.util.IntBitSet;

import org.qooxdoo.sushi.grammar.Grammar;
import org.qooxdoo.sushi.misc.GenericException;
import org.qooxdoo.sushi.misc.StringArrayList;
import org.qooxdoo.sushi.util.Relation;
import org.qooxdoo.sushi.util.RelationIterator;

/**
 * Build visit sequence for ordered attribute grammar. Based on the paper
 * Uwe Kastens: "Ordered Attribute Grammars", Acta Informatics, 1980.
 */
public class OagBuilder {
    private final Ag semantics;
    private final Layout layout;
    private final Grammar grammar; // TODO: use grammarBuffer instead
    private final IntBitSet symbols;

    public OagBuilder(Ag semantics, Layout layout) {
        this.semantics = semantics;
        this.layout = layout;
        this.grammar = semantics.getGrammar();
        this.symbols = new IntBitSet();
        grammar.getSymbols(symbols);
    }

    //--------

    public static Visits[] run(Ag ag, Layout layout, boolean verbose) throws GenericException {
        OagBuilder builder;
        Relation[] dp;
        Relation[] idp;
        Relation[] ids;
        int i;
        List[][] as;
        StringArrayList symbolTable;
        Relation[] ds;
        Relation[] edp;
        Visits[] visits;

        builder = new OagBuilder(ag, layout);
        dp = builder.createDP();
        idp = builder.createIDP(dp);
        ids = builder.createIDS(idp);
        as = builder.createA(ids);
        ds = builder.createDS(ids, as);
        edp = builder.createEDP(dp, ds);
        visits = builder.createVisits(edp, as);
        if (verbose) {
            symbolTable = ag.getGrammar().getSymbolTable();
            for (i = 0; i < dp.length; i++) {
                System.out.println("prod=" + i);
                System.out.println("  dp\t" + aos(symbolTable, dp[i]));
                System.out.println("  idp\t" + aos(symbolTable, idp[i]));
                System.out.println("  edp\t" + aos(symbolTable, edp[i]));
            }
            for (i = 0; i < ids.length; i++) {
                System.out.println(symbolTable.get(i) + ":");
                System.out.println(" ids\t" + as(symbolTable, ids[i]));
                System.out.println(" as\t");
                print(symbolTable, as[i]);
                System.out.println(" ds\t" + as(symbolTable, ds[i]));
            }
        }
        return visits;
    }

    private static void print(StringArrayList symbolTable, List[] as) {
        int i;
        int j;
        int max;

        for (i = 0; i < as.length; i++) {
            System.out.print("\t\t" + i + ":");
            max = as[i].size();
            for (j = 0; j < max; j++) {
                System.out.print(' ');
                System.out.print(((Attribute) as[i].get(j)).name);
            }
            System.out.println();
        }
    }

    private static String as(StringArrayList symbolTable, Relation relation) {
        StringBuilder buffer;
        RelationIterator iter;
        Attribute a;

        buffer = new StringBuilder();
        buffer.append('{');
        iter = relation.iterate();
        while (iter.step()) {
            buffer.append(" (");
            a = (Attribute) iter.left();
            buffer.append(a.toString(symbolTable));
            buffer.append(", ");
            a = (Attribute) iter.right();
            buffer.append(a.toString(symbolTable));
            buffer.append(") ");
        }
        buffer.append('}');
        return buffer.toString();
    }

    private static String aos(StringArrayList symbolTable, Relation relation) {
        StringBuilder buffer;
        RelationIterator iter;
        AttributeOccurrence ao;

        buffer = new StringBuilder();
        buffer.append('{');
        iter = relation.iterate();
        while (iter.step()) {
            buffer.append(" (");
            ao = (AttributeOccurrence) iter.left();
            buffer.append(ao.toString(symbolTable));
            buffer.append(", ");
            ao = (AttributeOccurrence) iter.right();
            buffer.append(ao.toString(symbolTable));
            buffer.append(") ");
        }
        buffer.append('}');
        return buffer.toString();
    }


    /**
     * Computes "dependency" relation DP (definition 1).
     *
     * @return array indexed by productions where each Relation contains pairs of
     *         AttributeOccurrences.
     */
    public Relation[] createDP() {
        Relation[] dp;
        int i;
        int max;
        AttributionBuffer ab;

        dp = new Relation[semantics.getGrammar().getProductionCount()];
        for (i = 0; i < dp.length; i++) {
            dp[i] = new Relation();
        }
        max = semantics.getSize();
        for (i = 0; i < max; i++) {
            ab = (AttributionBuffer) semantics.get(i);
            addDP(dp[ab.production], ab);
        }
        return dp;
    }

    private void addDP(Relation dp, AttributionBuffer ab) {
        int i;
        int max;

        max = ab.getArgCount();
        for (i = 0; i < max; i++) {
            dp.add(ab.getArg(i), ab.result);
        }
    }

    /**
     * Computes "induced dependency" releation IDP (definition 2).
     * The relation contains pairs of AttributeOcurrences.
     *
     * @param dp dependency relation
     */
    public Relation[] createIDP(Relation[] dp) {
        Relation[] idp;
        Relation[] idpClosure;
        boolean[] touched;
        int p;
        int q;
        AttributeOccurrence left;
        AttributeOccurrence right;
        int symbol;
        int ofs;
        boolean modified;
        AttributeOccurrence newLeft;
        AttributeOccurrence newRight;
        RelationIterator iter;

        idp = new Relation[dp.length];
        idpClosure = new Relation[dp.length];
        touched = new boolean[dp.length];
        for (p = 0; p < idp.length; p++) {
            idp[p] = new Relation();
            idp[p].addAll(dp[p]);
            idpClosure[p] = new Relation();
            idpClosure[p].addAll(dp[p]);
            idpClosure[p].closure();
            touched[p] = true;
        }

        do {
            modified = false;
            for (q = 0; q < idp.length; q++) {
                if (touched[q]) {
                    touched[q] = false;
                    iter = idpClosure[q].iterate();
                    while (iter.step()) {
                        left = (AttributeOccurrence) iter.left();
                        right = (AttributeOccurrence) iter.right();
                        if (left.sameSymbolOccurrence(right)) {
                            for (p = 0; p < idp.length; p++) {
                                for (ofs = 0; ofs <= grammar.getLength(p); ofs++) {
                                    symbol = semantics.getGrammar().getSymbol(p, ofs);
                                    if (symbol == left.attr.symbol) {
                                        newLeft = new AttributeOccurrence(left.attr, ofs - 1);
                                        newRight = new AttributeOccurrence(right.attr, ofs - 1);
                                        if (idp[p].add(newLeft, newRight)) {
                                            idpClosure[p].add(newLeft, newRight);
                                            idpClosure[p].closure();
                                            touched[p] = true;
                                            modified = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } while (modified);
        return idp;
    }

    /**
     * Computes "induced dependencies between attributes of symbols" IDS (Definition 3).
     *
     * @return Array indexed by symbols; relation with pairs of attributes.
     */
    public Relation[] createIDS(Relation[] idp) {
        int p;
        int i;
        Relation[] ids;
        AttributeOccurrence left;
        AttributeOccurrence right;
        RelationIterator iter;

        ids = new Relation[symbols.last() + 1];
        for (i = 0; i < ids.length; i++) {
            ids[i] = new Relation();
        }
        for (p = 0; p < idp.length; p++) {
            iter = idp[p].iterate();
            while (iter.step()) {
                left = (AttributeOccurrence) iter.left();
                right = (AttributeOccurrence) iter.right();
                if (left.sameSymbolOccurrence(right)) {
                    ids[left.attr.symbol].add(left.attr, right.attr);
                }
            }
        }
        return ids;
    }

    /**
     * Computes Axy. (Definition 4).
     */
    public List[][] createA(Relation[] ids) throws GenericException {
        Set<Attribute> internal;
        Set<Attribute> synthesized;
        Set<Attribute> inherited;
        int i;
        List[][] result;

        internal = new HashSet<Attribute>();
        inherited = new HashSet<Attribute>();
        synthesized = new HashSet<Attribute>();
        result = new List[ids.length][];
        for (i = 0; i < ids.length; i++) {
            internal.clear();
            inherited.clear();
            synthesized.clear();
            semantics.getAttributes(i, internal, synthesized, inherited);
            synthesized.addAll(internal);
            result[i] = Partition.createA(synthesized, inherited, ids[i]);
        }
        return result;
    }

    /**
     * Computes DS, the completion of IDS using A. (Definition 5).
     */
    public Relation[] createDS(Relation[] ids, List[][] a) {
        int i;
        Relation[] ds;

        ds = new Relation[ids.length];
        for (i = 0; i < ds.length; i++) {
            ds[i] = createDSx(ids[i], a[i]);
        }
        return ds;
    }

    private Relation createDSx(Relation ids, List[] a) {
        Relation ds;
        int i;
        List leftList;
        int leftSize;
        List rightList;
        int rightSize;
        int left;
        int right;

        ds = new Relation();
        ds.addAll(ids);
        for (i = 1; i < a.length; i++) {
            leftList = a[i];
            leftSize = leftList.size();
            rightList = a[i - 1];
            rightSize = rightList.size();
            for (left = 0; left < leftSize; left++) {
                for (right = 0; right < rightSize; right++) {
                    ds.add(leftList.get(left), rightList.get(right));
                }
            }
        }
        return ds;
    }

    public Relation[] createEDP(Relation[] dp, Relation[] ds) {
        int i;
        Relation[] eds;

        eds = new Relation[dp.length];
        for (i = 0; i < eds.length; i++) {
            eds[i] = createEDPx(i, dp[i], ds);
        }
        return eds;
    }

    private Relation createEDPx(int p, Relation dp, Relation[] ds) {
        Relation edsP;
        int ofs;
        int maxOfs;
        int symbol;
        RelationIterator iter;

        edsP = new Relation();
        edsP.addAll(dp);
        maxOfs = semantics.getGrammar().getLength(p);
        for (ofs = 0; ofs <= maxOfs; ofs++) {
            symbol = semantics.getGrammar().getSymbol(p, ofs);
            iter = ds[symbol].iterate();
            while (iter.step()) {
                edsP.add(new AttributeOccurrence((Attribute) iter.left(), ofs - 1),
                          new AttributeOccurrence((Attribute) iter.right(), ofs - 1));
            }
        }
        return edsP;
    }

    public Visits[] createVisits(Relation[] edp, List[][] as) throws GenericException {
        int p;
        Visits[] visits;

        visits = new Visits[edp.length];
        for (p = 0; p < edp.length; p++) {
            visits[p] = Visits.forEDP(p, edp[p], semantics, as, layout);
        }
        return visits;
    }
}
