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

import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.compiler.Syntax;
import org.qooxdoo.sushi.grammar.Grammar;
import org.qooxdoo.sushi.misc.GenericException;
import org.qooxdoo.sushi.semantics.Attribute;
import org.qooxdoo.sushi.semantics.CopyBuffer;
import org.qooxdoo.sushi.semantics.Occurrence;
import org.qooxdoo.sushi.semantics.Pusher;
import org.qooxdoo.sushi.semantics.Type;
import org.qooxdoo.sushi.util.IntBitSet;

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
              Definition source, int move, IntBitSet stopper, List<Definition> targets, int modifier) throws GenericException {
        translate(syntax, modifier, source, targets,
                  new int[] { move }, new IntBitSet[] { new IntBitSet(stopper) });
    }

    /**
     * Creates a path with no steps
     */
    public static void translate(Syntax syntax, Definition source, Definition target) throws GenericException {
        List<Definition> targets;
        IntBitSet stopper;

        targets = new ArrayList<Definition>();
        targets.add(target);
        stopper = new IntBitSet();
        stopper.add(target.getAttribute().symbol);
        translate(syntax, ISOLATED, source, targets, new int[] {}, new IntBitSet[] { stopper });
    }

    /**
     * Creates a path with 1+ steps
     */
    public static void translate(Syntax syntax,
            Definition source, int[] moves, int[] symbols, Definition target, int modifier) throws GenericException {
        IntBitSet[] stoppers;
        List<Definition> targets;
        int i;

        if (moves.length - 1 != symbols.length) {
            throw new IllegalArgumentException();
        }

        stoppers = new IntBitSet[moves.length];
        targets = new ArrayList<Definition>();
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
            int modifier, Definition source, List<Definition> targets, int[] moves, IntBitSet[] stoppers) throws GenericException {
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
    private final List<Definition> targets;

    // moves.length == stoppers.length == copyBuffers.length
    private final int[] moves;
    private final IntBitSet[] stoppers;
    private final int modifier;

    private final List<CopyBuffer>[] copyBuffers;

    private Path(Grammar grammar,
                 int modifier, Definition source, List<Definition> targets, int[] moves, IntBitSet[] stoppers)
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
        List<CopyBuffer> buffers;
        Definition target;
        Argument arg;
        List<Definition> sources;

        buffers = new ArrayList<CopyBuffer>();
        buffers.add(new CopyBuffer(source.getAttribute()));
        for (step = 0; step < moves.length; step++) {
            translateStep(step, buffers);
            buffers = copyBuffers[step];
        }
        max = buffers.size();
        for (step = 0; step < max; step++) {
            sources = new ArrayList<Definition>();
            sources.add(source);
            arg = new Argument(modifier, buffers.get(step), sources);
            target = lookupTarget(arg.getAttribute().symbol);
            target.addArgument(arg, source);
        }
        return max;
    }

    private void translateStep(int step, List<CopyBuffer> initialBuffers) {
        int i;
        int max;
        CopyBuffer buffer;
        IntBitSet targetSymbols;

        if (step == moves.length - 1) {
            targetSymbols = getTargetSymbols(targets);
        } else {
            targetSymbols = stoppers[step];
        }

        copyBuffers[step] = new ArrayList<CopyBuffer>();
        max = initialBuffers.size();
        for (i = 0; i < max; i++) {
            buffer = initialBuffers.get(i);
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
        List<CopyBuffer> resultBuffers;

        Attribute attr = prefixBuffer.getStart();
        resultBuffers = copyBuffers[step];
        ofs = resultBuffers.size();
        transport(grammar, attr, moves[step], border, targetSymbols, resultBuffers);
        max = resultBuffers.size();
        for (i = ofs; i < max; i++) {
            oldAttr = resultBuffers.get(i).getStart();
            tmp = new CopyBuffer((Attribute) null);
            tmp.append(prefixBuffer);
            tmp.append(resultBuffers.get(i));
            buffer = new CopyBuffer((Attribute) null);
            newAttr = buffer.cloneAttributes(tmp, oldAttr.type, oldAttr);
            buffer.setStart(newAttr);
            resultBuffers.set(i, buffer);
        }
    }

    private static IntBitSet getTargetSymbols(List<Definition> defs) {
        IntBitSet result;

        result = new IntBitSet();
        for (Definition def : defs) {
            result.add(def.getAttribute().symbol);
        }
        return result;
    }

    private Definition lookupTarget(int symbol) {
        for (Definition def : targets) {
            if (def.getAttribute().symbol == symbol) {
                return def;
            }
        }
        return null;
    }

    //----------------------------

    private static void transport(Grammar grammar, Attribute seed, int move, IntBitSet rawBorder,
                                  IntBitSet targetSymbols, List<CopyBuffer> resultBuffers) {
        CopyBuffer commulated;
        IntBitSet border;
        boolean down;
        List<Attribute> attrs;
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
            dest = attrs.get(i);
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

    private static void createSplitted(CopyBuffer orig, Class<?> cls, Occurrence occ,
                                       Attribute origDest, List<CopyBuffer> resultBuffers) {
        int seq;
        CopyBuffer tmp;
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
