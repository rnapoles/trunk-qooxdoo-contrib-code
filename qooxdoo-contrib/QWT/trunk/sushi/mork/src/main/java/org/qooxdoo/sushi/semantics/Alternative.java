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

import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.util.IntArrayList;

public class Alternative implements Compare {
    public int production;

    /** ofs -1: left hand side */
    public int resultOfs;

    private IntArrayList argsOfs;
    private ArrayList<Attribute> argsCopy;

    public Alternative(Alternative orig) {
        this(orig.production, orig.resultOfs);
        addAll(orig.argsOfs, orig.argsCopy);
    }

    public Alternative(int production, int resultOfs) {
        this.production = production;
        this.resultOfs = resultOfs;
        this.argsOfs = new IntArrayList();
        this.argsCopy = new ArrayList<Attribute>();
    }

    public void add(int ofs, Attribute copy) {
        int i;
        int max;

        max = argsOfs.size();
        for (i = 0; i < max; i++) {
            if (ofs < argsOfs.get(i)) {
                break;
            }
        }
        argsOfs.add(i, ofs);
        argsCopy.add(i, copy);
    }

    public void addAll(IntArrayList argsOfs, List<Attribute> argsCopy) {
        int i;
        int max;

        max = argsOfs.size();
        for (i = 0; i < max; i++) {
            add(argsOfs.get(i), (Attribute) argsCopy.get(i));
        }
    }

    /**
     * Compares functions.
     * @return NE: neither LT nor GT. EQ: maybe.  ALT: equal, but don't add follow states
     */
    public int compare(Alternative ab) {
        if (production != ab.production) {
            throw new IllegalArgumentException();
        }
        // TODO: compare two ups
        if (resultOfs != -1 || ab.resultOfs != -1) {
            return NE;
        }
        if (argsOfs.size() == 0 && ab.argsOfs.size() == 0) {
            return EQ;
        }
        if (argsOfs.size() == 0 || ab.argsOfs.size() == 0) {
            return ALT;
        }
        if (max(argsOfs) < min(ab.argsOfs)) {
            return LT;
        }
        if (min(argsOfs) > max(ab.argsOfs)) {
            return GT;
        }
        if (argsOfs.size() != 1 || ab.argsOfs.size() != 1) {
            return NE;
        } else {
            if (argsOfs.get(0) != ab.argsOfs.get(0)) {
                throw new IllegalStateException();
            }
            return EQ;
        }
    }

    private static int min(IntArrayList ofs) {
        int result;
        int i;
        int max;

        result = Integer.MAX_VALUE;
        max = ofs.size();
        for (i = 0; i < max; i++) {
            result = Math.min(result, ofs.get(i));
        }
        return result;
    }

    private static int max(IntArrayList ofs) {
        int result;
        int i;
        int max;

        result = Integer.MIN_VALUE;
        max = ofs.size();
        for (i = 0; i < max; i++) {
            result = Math.max(result, ofs.get(i));
        }
        return result;
    }

    public int getArgCount() {
        return argsCopy.size();
    }

    public Attribute getArgAttribute(int i) {
        return (Attribute) argsCopy.get(i);
    }
    public int getArgOfs(int i) {
        return argsOfs.get(i);
    }

    /** Add all argument attributes to next (if not already contained in next) */
    public void addArgAttrs(List<Attribute> next) {
        int i;
        int max;
        Attribute attr;

        max = getArgCount();
        for (i = 0; i < max; i++) {
            attr = getArgAttribute(i);
            if (next.indexOf(attr) == -1) {
                next.add(attr);
            }
        }
    }

    public boolean contains(int ofs, Attribute attr) {
        int i;
        int max;

        max = argsOfs.size();
        for (i = 0; i < max; i++) {
            if (argsOfs.get(i) == ofs && getArgAttribute(i) == attr) {
                return true;
            }
        }
        return false;
    }

    public String toRawString() {
        StringBuilder buf;
        int i;
        int max;
        int idx;
        int prevIdx;

        buf = new StringBuilder();
        buf.append("prod " + production + "$" + resultOfs);
        buf.append("\n\t");
        max = argsOfs.size();
        prevIdx = -1;
        for (i = 0; i < max; i++) {
            idx = argsOfs.get(i);
            while (prevIdx < idx) {
                buf.append('\t');
                prevIdx++;
            }
            buf.append(getArgAttribute(i).toString());
            buf.append('$');
            buf.append(idx);
            buf.append(' ');
        }
        return buf.toString();
    }

    @Override
    public String toString() {
        StringBuilder buf;
        int max;
        int i;

        buf = new StringBuilder();
        buf.append("prod " + production + "$" + resultOfs);
        buf.append("  <==  (");
        max = argsOfs.size();
        for (i = 0; i < max; i++) {
            if (i > 0) {
                buf.append(", ");
            }
            buf.append(getArgAttribute(i).toString());
            buf.append('$');
            buf.append(argsOfs.get(i));
        }
        buf.append(')');
        return buf.toString();
    }
    
    @Override
    public int hashCode() {
        return production;
    }
    
    @Override
    public boolean equals(Object obj) {
        return this == obj;
    }
}
