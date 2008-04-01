// §{{header}}:
//
// This is file src/de/mlhartme/mork/semantics/AttributionBuffer.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.semantics;

import de.mlhartme.mork.reflect.Function;
import de.mlhartme.mork.util.StringArrayList;
import java.util.ArrayList;
import java.util.List;

/**
 * Attribution function call buffer. Having the buffer simplifies creation
 * and optimization of AGs because things are not hard-wired and I don't
 * need a context to create an AttributionBuffer instance.
 */

// TODO: public final
public class AttributionBuffer {
    public final int production;

    // TODO: final
    public Function function;

    public final AttributeOccurrence result;
    private final List args;

    public AttributionBuffer(AttributionBuffer orig) {
        this(orig.production, orig.function, orig.result);
        addAll(orig.args);
    }

    public AttributionBuffer(int production, Function function, AttributeOccurrence resultAttr) {
        this.production = production;
        this.function = function;
        this.result = resultAttr;
        this.args = new ArrayList();
    }

    public void add(AttributeOccurrence attr) {
        int i;
        int max;

        max = args.size();
        for (i = 0; i < max; i++) {
            if (attr.ofs < ((AttributeOccurrence) args.get(i)).ofs) {
                break;
            }
        }
        args.add(i, attr);
    }

    /**
     * @param args list of AttributeOccurrence objects
     */
    public void addAll(List args) {
        int i;
        int max;

        max = args.size();
        for (i = 0; i < max; i++) {
            add((AttributeOccurrence) args.get(i));
        }
    }

    public int getArgCount() {
        return args.size();
    }

    public AttributeOccurrence getArg(int i) {
        return (AttributeOccurrence) args.get(i);
    }

    public String toString() {
        int a;
        StringBuilder buf;
        int max;
        int i;

        buf = new StringBuilder();
        buf.append("prod ");
        buf.append(production);
        buf.append(':');
        buf.append(result);
        buf.append("  <==  (");
        max = args.size();
        for (i = 0; i < max; i++) {
            if (i > 0) {
                buf.append(", ");
            }
            buf.append(args.get(i).toString());
        }
        buf.append(')');
        if (function != null) {
            buf.append("  [");
            buf.append(function.toString());
            buf.append(']');
        }
        return buf.toString();
    }

    public void attrsToString(StringBuilder buffer, StringArrayList symbolTable) {
        int max;
        int i;

        buffer.append(result.toString(symbolTable));
        buffer.append("  <==  (");
        max = args.size();
        for (i = 0; i < max; i++) {
            if (i > 0) {
                buffer.append(", ");
            }
            buffer.append(((AttributeOccurrence) args.get(i)).toString(symbolTable));
        }
        buffer.append(')');
    }
}
