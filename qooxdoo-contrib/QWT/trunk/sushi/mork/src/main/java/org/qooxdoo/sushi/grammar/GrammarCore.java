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

package org.qooxdoo.sushi.grammar;

import java.util.ArrayList;
import java.util.List;

/**
 * Helper class for Grammar. Make sure that data derived from productions (aka symbols) is
 * recomputed if the productions change.
 */
public class GrammarCore {
    /** List of int[] */
    private final List<int[]> productions;

    private Symbol[] symbols;

    public GrammarCore() {
        this.productions = new ArrayList<int[]>();
        this.symbols = null;
    }

    /**
     * @return number of productions.
     */
    public int getProductionCount() {
        return productions.size();
    }

    protected int[] getProduction(int prod) {
        return (int[]) productions.get(prod);
    }

    protected void addProduction(int[] prod) {
        productions.add(prod);
        symbols = null;
    }

    protected void addProduction(int ofs, int[] prod) {
        productions.add(ofs, prod);
        symbols = null;
    }

    protected void removeProduction(int idx) {
        productions.remove(idx);
        symbols = null;
    }

    protected Symbol[] getSymbols() {
        if (symbols == null) {
            calcSymbols();
        }
        return symbols;
    }

    protected Symbol getSymbol(int sym) {
        return getSymbols()[sym];
    }

    private void calcSymbols() {
        List<PreSymbol> pre;  // list of PreSymbols
        int prod, maxProd, ofs, sym;
        PreSymbol ps;
        int[] current;

        maxProd = productions.size();
        pre = new ArrayList<PreSymbol>();
        for (prod = 0; prod < maxProd; prod++) {
            current = getProduction(prod);
            for (ofs = 0; ofs < current.length; ofs++) {
                sym = current[ofs];
                while (pre.size() <= sym) {
                    pre.add(new PreSymbol());
                }
                ps = (PreSymbol) pre.get(sym);
                if (ofs == 0) {
                    ps.addAlternative(prod);
                } else {
                    ps.addUser(prod, ofs - 1);
                }
            }
        }
        symbols = new Symbol[pre.size()];
        for (sym = 0; sym < symbols.length; sym++) {
            symbols[sym] = ((PreSymbol) pre.get(sym)).createSymbol();
        }
    }
}
