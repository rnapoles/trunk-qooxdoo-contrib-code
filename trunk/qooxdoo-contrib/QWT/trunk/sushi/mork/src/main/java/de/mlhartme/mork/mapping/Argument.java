// §{{header}}:
//
// This is file src/de/mlhartme/mork/mapping/Argument.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.mapping;

import de.mlhartme.mork.semantics.Attribute;
import de.mlhartme.mork.semantics.Compare;
import de.mlhartme.mork.semantics.CopyBuffer;
import de.mlhartme.mork.semantics.Ag;
import de.mlhartme.mork.semantics.Type;
import de.mlhartme.mork.util.GenericException;
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
    private final List sources;

    /** non-local argument */
    public Argument(int modifier, CopyBuffer buffer, List sources) {
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
    public static Argument merge(int symbol, Definition target, List arguments) {
        CopyBuffer buffer;
        List argBuffers; // List of CopyBuffers
        int i;
        int max;
        Attribute start;
        Argument arg;
        Type mergedType;
        int card;
        List resultingSources;

        max = arguments.size();
        if (max == 0) {
            throw new IllegalArgumentException();
        }
        argBuffers = new ArrayList();
        mergedType = null;
        resultingSources = new ArrayList();
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

    //----------------------------------------------------------

    /**
     * @param args  List of Arguments
     */
    public static List sortAndMergeArgs(Definition target, List args) throws GenericException {
        List seq; // list of args;
        int i;
        int max;
        Argument arg;
        List sort;

        max = args.size();
        seq = new ArrayList();
        sort = new ArrayList();
        for (i = 0; i < max; i++) {
            arg = (Argument) args.get(i);
            if (arg.modifier == Path.MERGEABLE) {
                sort.add(arg);
            } else {
                seq.add(arg);
            }
        }
        sort = RelatedArgument.sort(sort);
        max = sort.size();
        for (i = 0; i < max; i++) {
            arg = merge(target.getAttribute().symbol, target, (List) sort.get(i));
            seq.add(arg);
        }
        return seq;
    }

    public String toString() {
        return "{{arg start=" + attr + "\n" + copyBuffer.toString() + "}}";
    }

    public String getSourcesString() {
        StringBuffer result;
        int i;
        int max;
        Definition def;

        result = new StringBuffer("(source attributes:");
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
