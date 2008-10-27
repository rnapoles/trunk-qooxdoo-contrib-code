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

import org.qooxdoo.sushi.misc.GenericException;
import org.qooxdoo.sushi.semantics.Attribute;
import org.qooxdoo.sushi.semantics.Compare;
import org.qooxdoo.sushi.semantics.CopyBuffer;
import org.qooxdoo.sushi.semantics.Ag;
import org.qooxdoo.sushi.semantics.Type;
import java.util.ArrayList;
import java.util.List;

/**
 * A translated path.
 */
public class Argument implements Compare {
    /**
     * The attribute actually passed to the function -- this attribute is the result of
     * the transport (or: the root of the transport tree)
     */
    private final Attribute attr;

    /** how to combine this argument with others */
    private final int modifier;

    /** attribution to copy source attributes into attr to be passed to attr. */
    private final CopyBuffer copyBuffer;

    /** list of definitions */
    private final List<Definition> sources;

    /** non-local argument */
    public Argument(int modifier, CopyBuffer buffer, List<Definition> sources) {
        this.modifier = modifier;
        this.attr = buffer.getStart();
        this.copyBuffer = buffer;
        this.sources = sources;
    }

    public void createTransport(Ag dest, Transport transport) {
        // adding scanner attributes is not requires since Arguments have not scanner attributes
        copyBuffer.createSemanticsBuffer(dest, transport);
    }

    public int getModifier() {
        return modifier;
    }

    public Attribute getAttribute() {
        return attr;
    }

    public int compare(Argument right) {
        return copyBuffer.compare(right.copyBuffer);
    }

    /**
     * Merge list of arguments.
     * pre: list.size() > 0  && all arguments have to start with the same attribute
     */
    public static Argument merge(int symbol, Definition target, List<Argument> arguments) {
        CopyBuffer buffer;
        List<CopyBuffer> argBuffers; // List of CopyBuffers
        int i;
        int max;
        Attribute start;
        Argument arg;
        Type mergedType;
        int card;
        List<Definition> resultingSources;

        max = arguments.size();
        if (max == 0) {
            throw new IllegalArgumentException();
        }
        argBuffers = new ArrayList<CopyBuffer>();
        mergedType = null;
        resultingSources = new ArrayList<Definition>();
        for (i = 0; i < max; i++) {
            arg = (Argument) arguments.get(i);
            resultingSources.addAll(arg.sources);
            if (arg == null) {
                throw new IllegalStateException();
            }
            argBuffers.add(arg.copyBuffer);
            if (mergedType == null) {
                mergedType = arg.attr.type;
            } else {
                mergedType = mergedType.alternate(arg.attr.type);
            }
        }
        if (mergedType == null) {
            throw new IllegalStateException();
        }
        // compute with card SEQUENCE. TODO: very expensive
        buffer = new CopyBuffer((Attribute) null);
        start = buffer.merge(argBuffers, symbol, new Type(mergedType.type, Type.SEQUENCE));
        card = buffer.calcCard(start);
        buffer = new CopyBuffer((Attribute) null);
        // TODO: duplicate computation ...
        start = buffer.merge(argBuffers, symbol, new Type(mergedType.type, card));
        buffer.setStart(start);
        return new Argument(Path.ISOLATED, buffer, resultingSources);
    }

    //--

    /**
     * @param args  List of Arguments
     */
    public static List<Argument> sortAndMergeArgs(Definition target, List<Argument> args) throws GenericException {
        List<Argument> seq;
        int i;
        int max;
        Argument arg;
        List<Argument> sort;

        max = args.size();
        seq = new ArrayList<Argument>();
        sort = new ArrayList<Argument>();
        for (i = 0; i < max; i++) {
            arg = args.get(i);
            if (arg.modifier == Path.MERGEABLE) {
                sort.add(arg);
            } else {
                seq.add(arg);
            }
        }
        sort = RelatedArgument.sort(sort);
        max = sort.size();
        for (i = 0; i < max; i++) {
            arg = merge(target.getAttribute().symbol, target, (List<Argument>) sort.get(i));
            seq.add(arg);
        }
        return seq;
    }

    @Override
    public String toString() {
        return "{{arg start=" + attr + "\n" + copyBuffer.toString() + "}}";
    }

    public String getSourcesString() {
        StringBuilder result;
        int i;
        int max;
        Definition def;

        result = new StringBuilder("(source attributes:");
        max = sources.size();
        for (i = 0; i < max; i++) {
            result.append(' ');
            def = (Definition) sources.get(i);
            result.append(def.getName());
            result.append(" (type=");
            result.append(def.getAttribute().type.toString());
            result.append(')');
        }
        result.append(')');
        return result.toString();
    }
}
