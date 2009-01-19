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

package org.qooxdoo.sushi.classfile.attribute;

import java.io.IOException;
import java.util.List;
import java.util.ArrayList;

import org.qooxdoo.sushi.classfile.Input;
import org.qooxdoo.sushi.classfile.Output;

public class LineNumberTable extends Attribute {
    public static final String NAME = "LineNumberTable";

    public final List pcs;
    public final List lines;

    public LineNumberTable() {
        super(NAME);

        pcs = new ArrayList();
        lines = new ArrayList();
    }

    public LineNumberTable(Input src) throws IOException {
        this();

        int i;
        int len;
        int count;

        src.requireCode();
        len = src.readU4();
        count = src.readU2();
        if (2 + count * 4 != len) {
            throw new RuntimeException("illegal LineNumberTable attribute");
        }
        for (i = 0; i < count; i++) {
            pcs.add(new Integer(src.readIdx()));
            lines.add(new Integer(src.readU2()));
        }
    }

    @Override
    public void write(Output dest) throws IOException {
        int i;
        int len;
        int start;

        dest.requireCode();
        dest.writeUtf8(name);
        start = dest.writeSpace(4);
        len = pcs.size();
        dest.writeU2(len);
        for (i = 0; i < len; i++) {
            dest.writeIdx(((Integer) pcs.get(i)).intValue());
            dest.writeU2(((Integer) lines.get(i)).intValue());
        }
        dest.writeFixup(start, dest.getGlobalOfs() - (start + 4));
    }

    @Override
    public String toString() {
        StringBuilder result;
        int i, len;

        result = new StringBuilder();
        result.append(NAME);
        result.append(" attribute\n");
        len = pcs.size();
        for (i = 0; i < len; i++) {
            result.append("  " + pcs.get(i) + " " + lines.get(i));
        }
        return result.toString();
    }
}
