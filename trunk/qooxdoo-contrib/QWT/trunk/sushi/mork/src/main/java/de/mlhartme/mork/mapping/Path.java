// §{{header}}:
//
// This is file src/de/mlhartme/mork/mapping/Path.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.mapping;

import de.mlhartme.mork.compiler.Syntax;
import de.mlhartme.mork.grammar.Grammar;
import de.mlhartme.mork.semantics.Attribute;
import de.mlhartme.mork.semantics.CopyBuffer;
import de.mlhartme.mork.semantics.Occurrence;
import de.mlhartme.mork.semantics.Pusher;
import de.mlhartme.mork.semantics.Type;
import de.mlhartme.mork.util.GenericException;
import de.mlhartme.mork.util.IntBitSet;
import java.util.ArrayList;
import java.util.List;

/**
 * Visibility of some Definition, kind of an Argument builder.
 */
public class Path {
    public static final int DOWN = 0;
    public static final int DOWNS = 1;
    public static final int UP = 2;
    public static final int UPS = 3;

    /** stopper: yes; children: yes. */
    public static final int ISOLATED = 0;

    /** alternatives get merged. */
    public static final int MERGEABLE = 1;

    /**
     * @param targets   list of Definitions
     */
    public static void translate(Syntax syntax,
              Definition source, int move, IntBitSet stopper, List targets, int modifier)
        throws GenericException
    {
        translate(syntax, modifier, source, targets,
                  new int[] { move }, new IntBitSet[] { new IntBitSet(stopper) });
    }

    /**
     * Creates a path with no steps
     */
    public static void translate(Syntax syntax, Definition source, Definition target)
        throws GenericException
    {
        List targets;
        IntBitSet stopper;

        targets = new ArrayList();
        targets.add(target);
        stopper = new IntBitSet();
        stopper.add(target.getAttribute().symbol);
        translate(syntax, ISOLATED, source, targets, new int[] {}, new IntBitSet[] { stopper });
    }

    /**
     * Creates a path with 1+ steps
     */
    public static void translate(Syntax syntax,
            Definition source, int[] moves, int[] symbols, Definition target, int modifier)
        throws GenericException
    {
        IntBitSet[] stoppers;
        List targets;
        int i;

        if (moves.length - 1 != symbols.length) {
            throw new IllegalArgumentException();
        }

        stoppers = new IntBitSet[moves.length];
        targets = new ArrayList();
        targets.add(target);
        for (i = 0; i < symbols.length; i++) {
            stoppers[i] = new IntBitSet();
            stoppers[i].add(symbols[i]);
        }
        stoppers[i] = new IntBitSet();
        stoppers[i].add(target.getAttribute().symbol);

        translate(syntax, modifier, source, targets, moves, stoppers);
    }

    /**
     * The method actually doing the work
     */
    private static void translate(Syntax syntax,
            int modifier, Definition source, List targets, int[] moves, IntBitSet[] stoppers)
        throws GenericException
    {
        Path path;
        int count;

        path = new Path(syntax.getGrammar(), modifier, source, targets, moves, stoppers);
        count = path.translate();
        if (count == 0 && source.getAttribute().symbol != syntax.getGrammar().getStart()) {
            // TODO: improved error message
            throw new GenericException("dead-end path for attribute " + source.getName());
        }
    }


    //--

    private final Grammar grammar;

    private final Definition source;

    /** List of Definitions (in last stopper). */
    private final List targets;

    // moves.length == stoppers.length == copyBuffers.length
    private final int[] moves;
    private final IntBitSet[] stoppers;
    private final int modifier;

    private final List[] copyBuffers;

    /**
     * @param targets   list of Definitions
     */
    private Path(Grammar grammar,
                 int modifier, Definition source, List targets, int[] moves, IntBitSet[] stoppers)
    {
        this.grammar = grammar;
        this.modifier = modifier;
        this.source = source;
        this.targets = targets;
        this.moves = moves;
        this.stoppers = stoppers;
        this.copyBuffers = new List[moves.length];
    }

    private int translate() throws GenericException {
        int step;
        int max;
        List buffers;
        Definition target;
        Argument arg;
        List attributeSources;

        buffers = new ArrayList();
        buffers.add(new CopyBuffer(source.getAttribute()));
        for (step = 0; step < moves.length; step++) {
            translateStep(step, buffers);
            buffers = copyBuffers[step];
        }
        max = buffers.size();
        for (step = 0; step < max; step++) {
            attributeSources = new ArrayList();
            attributeSources.add(source);
            arg = new Argument(modifier, (CopyBuffer) buffers.get(step), attributeSources);
            target = lookupTarget(arg.getAttribute().symbol);
            target.addArgument(arg, source);
        }
        return max;
    }

    private void translateStep(int step, List initialBuffers) {
        int symbol;
        List lst;
        int i;
        int max;
        CopyBuffer buffer;
        int move;
        IntBitSet targetSymbols;

        move = moves[step];
        if (step == moves.length - 1) {
            targetSymbols = getTargetSymbols(targets);
        } else {
            targetSymbols = stoppers[step];
        }

        copyBuffers[step] = new ArrayList();
        max = initialBuffers.size();
        for (i = 0; i < max; i++) {
            buffer = (CopyBuffer) initialBuffers.get(i);
            prefixedTransport(step, buffer, stoppers[step], targetSymbols);
        }
    }

    private void prefixedTransport(
        int step, CopyBuffer prefixBuffer, IntBitSet border, IntBitSet targetSymbols)
    {
        int ofs;
        int max;
        int i;
        Attribute oldAttr;
        Attribute newAttr;
        CopyBuffer buffer;
        CopyBuffer tmp;
        List resultBuffers;

        Attribute attr = prefixBuffer.getStart();
        resultBuffers = copyBuffers[step];
        ofs = resultBuffers.size();
        transport(grammar, attr, moves[step], border, targetSymbols, resultBuffers);
        max = resultBuffers.size();
        for (i = ofs; i < max; i++) {
            oldAttr = ((CopyBuffer) resultBuffers.get(i)).getStart();
            tmp = new CopyBuffer((Attribute) null);
            tmp.append(prefixBuffer);
            tmp.append((CopyBuffer) resultBuffers.get(i));
            buffer = new CopyBuffer((Attribute) null);
            newAttr = buffer.cloneAttributes(tmp, oldAttr.type, oldAttr);
            buffer.setStart(newAttr);
            resultBuffers.set(i, buffer);
        }
    }

    private static IntBitSet getTargetSymbols(List defs) {
        int i;
        int max;
        IntBitSet result;
        Definition def;

        result = new IntBitSet();
        max = defs.size();
        for (i = 0; i < max; i++) {
            def = (Definition) defs.get(i);
            result.add(def.getAttribute().symbol);
        }
        return result;
    }

    private Definition lookupTarget(int symbol) {
        int i;
        int max;
        Definition def;

        max = targets.size();
        for (i = 0; i < max; i++) {
            def = (Definition) targets.get(i);
            if (def.getAttribute().symbol == symbol) {
                return def;
            }
        }
        return null;
    }

    //----------------------------

    private static void transport(Grammar grammar, Attribute seed, int move, IntBitSet rawBorder,
                                  IntBitSet targetSymbols, List resultBuffers)
    {
        CopyBuffer commulated;
        IntBitSet border;
        boolean down;
        List attrs;
        int i;
        int max;
        Attribute dest;
        CopyBuffer tmp;
        int card;
        CopyBuffer buffer;
        Attribute attr;
        Occurrence occ;

        if (move == Path.DOWN || move == Path.UP) {
            border = new IntBitSet();
            grammar.getSymbols(border);
        } else {
            border = rawBorder;
        }
        down = (move == Path.DOWN || move == Path.DOWNS);
        if (down && !border.contains(seed.symbol)) {
            // TODO: needed for \Block//VariableReference in compiler examples
            border.add(seed.symbol);
        }
        commulated = Pusher.run(down, seed, border, grammar);
        attrs = commulated.getTransportAttributes();
        max = attrs.size();
        for (i = 0; i < max; i++) {
            dest = (Attribute) attrs.get(i);
            if (dest != seed && targetSymbols.contains(dest.symbol)) {
                tmp = commulated.createReduced(dest);
                occ = null;
                if (down) {
                    card = tmp.isDownOptional()? Type.OPTION : Type.VALUE;
                    card = Type.cardCard(card, seed.type.card);
                } else {
                    occ = tmp.calcOccurrence(dest);
                    card = Type.cardCard(occ.card(), seed.type.card);
                    if (seed.type.card == Type.SEQUENCE || occ.max == Occurrence.UNBOUNDED) {
                        occ = null;  // don't split
                    }
                }
                if (occ == null) {
                    buffer = new CopyBuffer((Attribute) null);
                    attr = buffer.cloneAttributes(tmp, new Type(seed.type.type, card), dest);
                    buffer.setStart(attr);
                    resultBuffers.add(buffer);
                } else {
                    createSplitted(tmp, seed.type.type, occ, dest, resultBuffers);
                }
            }
        }
    }

    private static void createSplitted(CopyBuffer orig, Class cls, Occurrence occ,
                                       Attribute origDest, List resultBuffers)
    {
        int seq;
        CopyBuffer tmp;
        int max;
        CopyBuffer buffer;
        Attribute attr;
        Type type;
        Attribute dest;

        orig.calcOccurrences();
        for (seq = 0; seq < occ.max; seq++) {
            tmp = new CopyBuffer((Attribute) null);
            dest = orig.createSequence(origDest, seq, tmp);

            if (seq < occ.min) {
                type = new Type(cls, Type.VALUE);
            } else {
                type = new Type(cls, Type.OPTION);
            }
            buffer = new CopyBuffer((Attribute) null);
            attr = buffer.cloneAttributes(tmp, type, dest);
            buffer.setStart(attr);
            resultBuffers.add(buffer);
        }
    }
}
