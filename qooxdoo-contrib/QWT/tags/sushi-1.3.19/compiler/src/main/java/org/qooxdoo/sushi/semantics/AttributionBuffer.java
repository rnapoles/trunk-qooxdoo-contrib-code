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

import org.qooxdoo.sushi.misc.StringArrayList;
import org.qooxdoo.sushi.reflect.Function;
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
    private final List<AttributeOccurrence> args;

    public AttributionBuffer(AttributionBuffer orig) {
        this(orig.production, orig.function, orig.result);
        addAll(orig.args);
    }

    public AttributionBuffer(int production, Function function, AttributeOccurrence result) {
        if (function == null) {
            throw new IllegalArgumentException();
        }
        this.production = production;
        this.function = function;
        this.result = result;
        this.args = new ArrayList<AttributeOccurrence>();
    }

    public void add(AttributeOccurrence attr) {
        args.add(attr);
    }

    /**
     * @param args list of AttributeOccurrence objects
     */
    public void addAll(List<AttributeOccurrence> args) {
        for (AttributeOccurrence arg : args) {
            add(arg);
        }
    }

    public int getArgCount() {
        return args.size();
    }

    public AttributeOccurrence getArg(int i) {
        return args.get(i);
    }

    @Override
    public int hashCode() {
        return production;
    }
    
    @Override
    public String toString() {
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

        buffer.append(function.getReturnType().getName());
        buffer.append(' ');
        buffer.append(result.toString(symbolTable));
        buffer.append(" = ");
        buffer.append(function.getName());
        buffer.append('(');
        max = args.size();
        for (i = 0; i < max; i++) {
            if (i > 0) {
                buffer.append(", ");
            }
            buffer.append(function.getParameterTypes()[i].getName());
            buffer.append(' ');
            buffer.append(args.get(i).toString(symbolTable));
        }
        buffer.append(')');
    }
}
