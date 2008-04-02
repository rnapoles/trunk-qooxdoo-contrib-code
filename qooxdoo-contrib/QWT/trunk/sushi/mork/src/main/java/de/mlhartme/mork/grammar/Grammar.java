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

package de.mlhartme.mork.grammar;

import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.util.IntArrayList;
import org.qooxdoo.sushi.util.IntBitSet;

import de.mlhartme.mork.util.GenericException;
import de.mlhartme.mork.util.IntBitRelation;
import de.mlhartme.mork.util.StringArrayList;
import de.mlhartme.mork.util.Util;

/**
 * Context free grammar. Symbols are coded as ints. Preferred variable name for symbols is sym.
 * Productions are coded as ints. Preferred variable name for productions is prod.
 */
public class Grammar extends GrammarCore {
    // TODO: support helper symbols here?

    /** start symbol, -1 if undefined */
    private int start;

    private final StringArrayList symbolTable;

    public static final String NOT_PRODUCTIVE = "symbol(s) not productive: ";
    public static final String NOT_REACHABLE = "symbol(s) not reachable: ";

    //-----------------------------------------------------------------------
    // construction

    // start symbol is set to the subject of the first production.
    public static Grammar forProductions(String[] prods) {
        String[][] symbols;
        int i;

        symbols = new String[prods.length][];
        for (i = 0; i < symbols.length; i++) {
            symbols[i] = Util.split(prods[i], ' ');
        }
        return forSymbols(symbols);
    }


    public static Grammar forSymbols(String[][] symbols) {
        Grammar grm;
        int i, j;
        String s;
        int[] prod;

        grm = new Grammar();
        if (symbols.length > 0) {
            for (i = 0; i < symbols.length; i++) {
                if (symbols[i].length == 0) {
                    throw new IllegalArgumentException();
                }
                prod = new int[symbols[i].length - 1];
                for (j = 0; j <= prod.length; j++) {
                    s = symbols[i][j];
                    if (grm.symbolTable.indexOf(s) == -1) {
                        grm.symbolTable.add(s);
                    }
                    if (j > 0) {
                        prod[j - 1] = grm.symbolTable.indexOf(s);
                    }
                }
                grm.add(grm.symbolTable.indexOf(symbols[i][0]), prod);
            }
            grm.start = grm.symbolTable.indexOf(symbols[0][0]);
        }
        return grm;
    }

    public Grammar() {
        this(-1);
    }

    public Grammar(int start) {
        this(start, new StringArrayList());
    }

    public Grammar(int start, StringArrayList symbolTable) {
        super();
        this.start = start;
        this.symbolTable = symbolTable;
    }

    /**
     * @param usedSymbols are always considered reachable
     */
    public void check(int startSym, IntBitSet usedSymbols, List<String> symbolTable)
        throws GenericException
    {
        IntBitSet all, tmp;

        // check for unproductive symbols
        tmp = new IntBitSet();
        all = new IntBitSet();
        getTerminals(tmp);
        addTerminable(tmp);
        all.addAll(tmp);
        getNonterminals(all);
        all.removeAll(tmp);
        if (!all.isEmpty()) {
            throw new GenericException(NOT_PRODUCTIVE + all.toString(symbolTable));
        }

        // check for unreachable symbols
        tmp = new IntBitSet();
        addReachable(startSym, tmp, null);
        all = new IntBitSet();
        getTerminals(all);
        getNonterminals(all);
        all.removeAll(tmp);
        all.removeAll(usedSymbols);
        if (!all.isEmpty()) {
            throw new GenericException(NOT_REACHABLE + all.toString(symbolTable));
        }
    }

    //-------------------------------------------------------------------

    public int getStart() {
        return start;
    }

    public StringArrayList getSymbolTable() {
        return symbolTable;
    }

    /**
     * @return  number of symbols on right-hand-side
     */
    public int getLength(int prod) {
        return getProduction(prod).length - 1;
    }

    public int getSymbol(int prod, int ofs) {
        return getProduction(prod)[ofs];
    }

    public int getLeft(int prod) {
        return getSymbol(prod, 0);
    }

    public int getRight(int prod, int ofs) {
        return getSymbol(prod, ofs + 1);
    }

    private void getRight(int prod, IntBitSet result) {
        int i;
        int[] production;

        production = getProduction(prod);
        for (i = 1; i < production.length; i++) {
            result.add(production[i]);
        }
    }

    public int getAlternativeCount(int sym) {
        return getSymbol(sym).alternatives.length;
    }

    /**
     * @return a production
     */
    public int getAlternative(int sym, int no) {
        return getSymbol(sym).alternatives[no];
    }

    public int getUserCount(int sym) {
        return getSymbol(sym).users.length;
    }

    /**
     * @return a production
     */
    public int getUser(int sym, int no) {
        return getSymbol(sym).users[no];
    }

    public int getUserOfsCount(int sym, int no) {
        return getSymbol(sym).userOfs[no].length;
    }

    public int getUserOfs(int sym, int no, int idx) {
        return getSymbol(sym).userOfs[no][idx];
    }

    //-----------------------------------------------------------------------
    // grammar sets

    /**
     * Every index less than getSymbolCount() is a valid symbol -- it's considered an unused
     * terminal if does not occur in any production.
     */
    public int getSymbolCount() {
        return getSymbols().length;
    }

    public void getTerminals(IntBitSet result) {
        int i;
        int max;

        max = getSymbolCount();
        for (i = 0; i < max; i++) {
            if (isTerminal(i)) {
                result.add(i);
            }
        }
    }
    public void getUsedTerminals(IntBitSet result) {
        int i;
        int max;

        max = getSymbolCount();
        for (i = 0; i < max; i++) {
            if (isUsedTerminal(i)) {
                result.add(i);
            }
        }
    }

    public void getNonterminals(IntBitSet result) {
        int i;
        int max;

        max = getSymbolCount();
        for (i = 0; i < max; i++) {
            if (isNonterminal(i)) {
                result.add(i);
            }
        }
    }

    public void getSymbols(IntBitSet result) {
        result.addRange(0, getSymbolCount() - 1);
    }

    public boolean isTerminal(int sym) {
        return getSymbol(sym).alternatives.length == 0;
    }

    public boolean isUsedTerminal(int sym) {
        Symbol s;

        s = getSymbol(sym);
        return s.alternatives.length == 0 && s.users.length > 0;
    }

    public boolean isNonterminal(int sym) {
        return getSymbol(sym).alternatives.length > 0;
    }

    /**
     * @param result  normally the set of terminals.
     */
    public void addTerminable(IntBitSet result) {
        int max;
        int i,p;
        IntBitSet finished;  // processed Productions
        IntBitSet[] rightSet;
        boolean progress;

        max = getProductionCount();
        finished = new IntBitSet();
        rightSet = new IntBitSet[max];
        getTerminals(result);
        do {
            progress = false;
            for (p = 0; p < max; p++) {
                if (!finished.contains(p)) {
                    if (rightSet[p] == null) {
                        rightSet[p] = new IntBitSet();
                        getRight(p, rightSet[p]);
                    }
                    rightSet[p].removeAll(result);
                    if (rightSet[p].isEmpty()) {
                        finished.add(p);
                        if (!result.contains(getLeft(p))) {
                            progress = true;
                            result.add(getLeft(p));
                        }
                    }
                }
            }
        } while (progress);
    }

    /**
     * @param  result   symbols already reached - recursion must stop there.
     * @param  recurse  all symbols to recurse. null: all
     * @return is added to the parameter result
     */
    public void addReachable(int sym, IntBitSet result, IntBitSet recurse) {
        int prod;
        int alt, maxAlt;
        int ofs, maxOfs;

        if (!result.contains(sym)) {
            // symbol is reached for the first time
            result.add(sym);

            if (recurse == null || recurse.contains(sym)) {
                maxAlt = getAlternativeCount(sym);
                for (alt = 0; alt < maxAlt; alt++) {
                    prod = getAlternative(sym, alt);
                    maxOfs = getLength(prod);
                    for (ofs = 0; ofs < maxOfs; ofs++) {
                        addReachable(getRight(prod, ofs), result, recurse);
                    }
                }
            }
        }
    }

    public void add(int left, int[] right) {
        int[] prod;

        prod = new int[right.length + 1];
        prod[0] = left;
        System.arraycopy(right, 0,  prod, 1,  right.length);
        addProduction(prod);
    }

    public void add(int left) {
        addProduction(new int[] { left });
    }

    public void add(int left, int right0) {
        addProduction(new int[] { left, right0 });
    }

    public void add(int left, int right0, int right1) {
        addProduction(new int[] { left, right0, right1 });
    }

    public void addProductions(Grammar right) {
        int i;
        int max;
        int[] orig;
        int[] copy;

        max = right.getProductionCount();
        for (i = 0; i < max; i++) {
            orig = right.getProduction(i);
            copy = new int[orig.length];
            System.arraycopy(orig, 0, copy, 0, orig.length);
            addProduction(copy);
        }
    }

    //----------------------------------------------------------------

    // TODO: duplicate user-supplied rules are removed silently!
    public void removeDuplicateRules() {
        int prod1, prod2;
        int[] tmp1, tmp2;

        for (prod1 = getProductionCount() - 1; prod1 >= 0; prod1--) {
            tmp1 = getProduction(prod1);
            for (prod2 = prod1 - 1; prod2 >= 0; prod2--) {
                tmp2 = getProduction(prod2);
                if (tmp1[0] == tmp2[0]) {
                    if (equivalent(tmp1, tmp2)) {
                        removeProduction(prod1);
                        break;
                    }
                }
            }
        }
    }

    public void removeDuplicateSymbols(int first, int last) {
        List lst, all;
        int sym1, sym2;
        int prod, max;
        int[] tmp;

        all = new ArrayList();
        for (sym1 = first; sym1 <= last; sym1++) {
            all.add(new ArrayList());
        }
        max = getProductionCount();
        for (prod = 0; prod < max; prod++) {
            tmp = getProduction(prod);
            sym1 = tmp[0];
            if ((sym1 >= first) && (sym1 <= last)) {
                lst = (List) all.get(sym1 - first);
                lst.add(tmp);
            }
        }

        // TODO: is it possible, that productions become equivalent
        // by the use of renameSymbol?

        for (sym1 = first; sym1 <= last; sym1++) {
            lst = (List) all.get(sym1 - first);
            if (lst.size() > 0) {
                for (sym2 = sym1 + 1; sym2 <= last; sym2++) {
                    if (equivalent(lst, (List) all.get(sym2 - first))) {
                        removeProductions(sym1);
                        renameSymbol(sym1, sym2);
                        break;
                    }
                }
            }
        }
    }

    private static boolean equivalent(List lst1, List lst2) {
        int i, j, max;
        IntBitSet rest;
        int[] prod1, prod2;

        max = lst1.size();
        if (lst2.size() != max) {
            return false;
        }
        rest = new IntBitSet();
        rest.addRange(0, max - 1);
        for (i = 0; i < max; i++) {
            prod1 = (int[]) lst1.get(i);
            for (j = rest.first(); j != -1; j = rest.next(j)) {
                prod2 = (int[]) lst2.get(j);
                if (equivalent(prod1, prod2)) {
                    break;
                }
            }
            if (j == -1) {
                return false;
            } else {
                // don't match j again
                rest.remove(j);
            }
        }
        return true;
    }

    // a ::= a item   is equivalent to  b ::= b item
    // TODO: is A ::= a A   equivalent to B ::= a B?
    private static boolean equivalent(int[] prod1, int[] prod2) {
        int ofs;

        if (prod1.length != prod2.length) {
            return false;
        }
        for (ofs = 0; ofs < prod1.length; ofs++) {
            if (prod1[ofs] != prod2[ofs]) {
                if (!((prod1[ofs] == prod1[0])
                          && (prod2[ofs] == prod2[0])))
                {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * pack helper symbols
     * @param end = last + 1
     */
    public void packSymbols(int first, int end) {
        int src;
        int dest;
        boolean touched;

        dest = first;
        for (src = first; src < end; src++) {
            touched = renameSymbol(src, dest);
            if (touched) {
                dest++;
            } else {
                // src not found; dest stays unused
            }
        }
    }

    public boolean renameSymbol(int prev, int next) {
        int prod, maxProd;
        int[] ar;
        int ofs;
        boolean touched;

        touched = false;
        maxProd = getProductionCount();
        for (prod = 0; prod < maxProd; prod++) {
            ar = getProduction(prod);
            for (ofs = 0; ofs < ar.length; ofs++) {
                if (ar[ofs] == prev) {
                    ar[ofs] = next;
                    touched = true;
                }
            }
        }
        return touched;
    }

    //----------------------------------------------------------------

    public void removeProductions(int symbol) {
        int prod;

        for (prod = getProductionCount() - 1; prod >= 0; prod--) {
            if (getLeft(prod) == symbol) {
                removeProduction(prod);
            }
        }
    }

    /** expansion is not performed recurively */
    public void expandSymbol(int symbol) {
        int prod, maxProd;
        int ofs, maxOfs;
        int ofs2, maxOfs2;
        int i, j;
        boolean found;
        int count, nextCount;
        IntArrayList next;
        int[][] expand;
        List expandLst;
        int right;

        maxProd = getProductionCount();

        // make an array of the expand prods to easily index them;
        // storing the indexes instead is difficult because the indexes
        // max change
        expandLst = new ArrayList();
        for (prod = 0; prod < maxProd; prod++) {
            if (getLeft(prod) == symbol) {
                expandLst.add(getProduction(prod));
            }
        }
        expand = new int[expandLst.size()][];
        expandLst.toArray(expand);

        for (prod = maxProd - 1; prod >= 0; prod--) {
            maxOfs = getLength(prod);
            found = false;
            nextCount = 1;
            for (ofs = 0; ofs < maxOfs; ofs++) {
                if (getRight(prod, ofs) == symbol) {
                    found = true;
                    nextCount *= expand.length;
                }
            }
            if (found) {
                // testing found is an optimization
                for (i = 0; i < nextCount; i++) {
                    count = i;
                    next = new IntArrayList();
                    next.add(getLeft(prod));
                    for (ofs = 0; ofs < maxOfs; ofs++) {
                        right = getRight(prod, ofs);
                        if (right == symbol) {
                            j = count % expand.length;
                            maxOfs2 = expand[j].length;
                            for (ofs2 = 1; ofs2 < maxOfs2; ofs2++) {
                                next.add(expand[j][ofs2]);
                            }
                            count /= expand.length;
                        } else {
                            next.add(right);
                        }
                    }
                    if (count != 0) {
                        throw new RuntimeException();
                    }
                    addProduction(prod + 1, next.toArray());
                }
                removeProduction(prod);
            }
        }
    }

    @Override
    public String toString() {
        StringBuilder buffer;
        int p;
        int max;

        buffer = new StringBuilder();
        max = getProductionCount();
        for (p = 0; p < max; p++) {
            prodToString(buffer, p);
            buffer.append('\n');
        }
        return buffer.toString();
    }

    public void prodToString(StringBuilder buffer, int prod) {
        int i, max;

        buffer.append(symbolTable.getOrIndex(getLeft(prod)));
        buffer.append("\t::=");
        max = getLength(prod);
        for (i = 0; i < max; i++) {
            buffer.append(' ');
            buffer.append(symbolTable.getOrIndex(getRight(prod, i)));
        }
    }

    /** compute the relation "left can directly end with right" */
    public void addEndsRelation(IntBitSet removeable, IntBitRelation result) {
        int count;
        int left,right;
        int i,j,max;

        count = getProductionCount();
        for (i = 0; i < count; i++) {
            left = getLeft(i);
            max = getLength(i);
            for (j = max - 1; j >= 0; j--) {
                right = getRight(i, j);
                result.add(left,right);
                if (!removeable.contains(right)) break;
            }
        }
    }

    /** compute the relation "left can stay directly before right" */
    public void addNextRelation(IntBitSet removeable, IntBitRelation result) {
        int max;
        int p;
        int i;
        int j;
        int length;
        int left;
        int right;

        max = getProductionCount();
        for (p = 0; p < max; p++) {
            length = getLength(p);
            for (i = 0; i < length; i++) {
                left = getRight(p, i);
                for (j = i + 1; j < length; j++) {
                    right = getRight(p, j);
                    result.add(left,right);
                    if (!removeable.contains(right)) {
                        break;
                    }
                }
            }
        }
    }

    /** compute the relation "left can directly start with right" */
    public void addStartsRelation(IntBitSet removeable, IntBitRelation result)
    {
        int max;
        int i;
        int j;
        int left;
        int right;
        int length;

        max = getProductionCount();
        for (i = 0; i < max; i++) {
            left = getLeft(i);
            length = getLength(i);
            for (j = 0; j < length; j++) {
                right = getRight(i, j);
                result.add(left, right);
                if (!removeable.contains(right)) {
                    break;
                }
            }
        }
    }

    /** add all symbols to result, that are reachable from the initial
        result */
    public void closure(boolean down, IntBitSet result) {
        int max;
        int p;
        int i;
        int old;
        int length;

        max = getProductionCount();
        do {
            old = result.size();
            for (p = 0; p < max; p++) {
                length = getLength(p);
                if (down) {
                    if (result.contains(getLeft(p))) {
                        for (i = 0; i < length; i++) {
                            result.add(getRight(p, i));
                        }
                    }
                } else {
                    for (i = 0; i < length; i++) {
                        if (result.contains(getRight(p, i))) {
                            result.add(getLeft(p));
                            break;
                        }
                    }
                }
            }
        } while (result.size() > old);
    }

    public void addRemoveable(IntBitSet result) {
        IntBitSet remaining;  // indexes of productions
        boolean modified;
        int i;
        int prod;
        int max;

        remaining = new IntBitSet();
        remaining.addRange(0, getProductionCount() - 1);
        do {
            modified = false;
            for (prod = remaining.first(); prod != -1; prod = remaining.next(prod)) {
                if (result.contains(getLeft(prod))) {
                    remaining.remove(prod);
                } else {
                    max = getLength(prod);
                    for (i = 0; i < max; i++) {
                        if (!result.contains(getRight(prod, i))) {
                            break;
                        }
                    }
                    if (i == max) {
                        result.add(getLeft(prod));
                        modified = true;
                    }
                }
            }
        } while (modified);
    }
}
