// §{{header}}:
//
// This is file src/de/mlhartme/mork/semantics/Pusher.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.semantics;

import de.mlhartme.mork.grammar.Grammar;
import de.mlhartme.mork.util.IntBitSet;
import java.util.ArrayList;
import java.util.List;

/**
 * Attribute grammar, supports >=0 synthesized and inherited attributes.
 * Uses lazy evaluation to calculate attributes. There are no pre-calculated
 * computation sequence and no checks for cyclic dependencies are done at
 * run-time.
 */
public class Pusher {
    /** states to be pushed */
    private final List states;

    private final IntBitSet border;
    private final Grammar grm;

    public static CopyBuffer run(boolean down, Attribute seed, IntBitSet border, Grammar grm) {
        Pusher pusher;

        pusher = new Pusher(seed, border, grm);
        if (down) {
            pusher.pushDown();
        } else {
            pusher.pushUp();
        }
        // drop the seed
        pusher.states.remove(0);
        return new CopyBuffer(pusher.states);
    }

    private Pusher(Attribute seed, IntBitSet border, Grammar grm) {
        this.states = new ArrayList();
        this.states.add(new State(seed));
        this.border = border;
        this.grm = grm;
    }

    private void pushUp() {
        int i;
        int user;
        int max;
        State state;
        Attribute attr;

        // states.size() grows
        for (i = 0; i < states.size(); i++) {
            state = (State) states.get(i);
            attr = state.getAttribute();
            if (i == 0 || !border.contains(attr.symbol)) {
                max = grm.getUserCount(attr.symbol);
                for (user = 0; user < max; user++) {
                    pushUp(user, i);
                }
            }
        }
    }

    private void pushUp(int user, int attrIdx) {
        State child;
        Attribute childAttr;
        int prod;
        int symbol;
        State parent;
        int max;
        int idx;
        int ofs;
        State state;

        child = (State) states.get(attrIdx);
        childAttr = child.getAttribute();
        prod = grm.getUser(childAttr.symbol, user);
        symbol = grm.getLeft(prod);
        max = grm.getUserOfsCount(childAttr.symbol, user);
        for (idx = 0; idx < max; idx++) {
            parent = findState(1, symbol);
            if (parent == null) {
                parent = new State(true, new Attribute(symbol, "transport"), grm);
                states.add(parent);
            }
            ofs = grm.getUserOfs(childAttr.symbol, user, idx);
            parent.addUpTransport(prod, ofs, childAttr);
        }
    }

    private void pushDown() {
        Attribute attr;
        int i;
        int max;
        int alt;

        // states.size() grows
        for (i = 0; i < states.size(); i++) {
            attr = ((State) states.get(i)).getAttribute();
            if (i == 0 || !border.contains(attr.symbol)) {
                max = grm.getAlternativeCount(attr.symbol);
                for (alt = 0; alt < max; alt++) {
                    pushDown(alt, i);
                }
            }
        }
    }

    private void pushDown(int alt, int attrIdx) {
        State child;
        int prod;
        int symbol;
        State parent;
        Attribute parentAttr;
        int max;
        int ofs;

        parent = (State) states.get(attrIdx);
        parentAttr = parent.getAttribute();
        prod = grm.getAlternative(parentAttr.symbol, alt);
        max = grm.getLength(prod);
        for (ofs = 0; ofs < max; ofs++) {
            symbol = grm.getRight(prod, ofs);
            child = findState(1, symbol);
            if (child == null) {
                child = new State(false, new Attribute(symbol, "transport"), grm);
                states.add(child);
            }
            child.addDownTransport(prod, ofs, parentAttr);
        }
    }

    private State findState(int ofs, int symbol) {
        int i;
        int max;
        State state;

        max = states.size();
        for (i = ofs; i < max; i++) {
            state = (State) states.get(i);
            if (state.getAttribute().symbol == symbol) {
                return state;
            }
        }
        return null;
    }
}
