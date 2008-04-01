// §{header}:
// 
// This is file src/de/mlhartme/mork/classfile/LineNumberTable.java,
// Mork version 0.5  Copyright © 1998-2002  Michael Hartmeier
// 
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
// 
// §.

package de.mlhartme.mork.classfile;

import java.io.IOException;
import java.util.List;
import java.util.ArrayList;

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

    public String toString() {
        StringBuffer result;
        int i, len;

        result = new StringBuffer();
        result.append(NAME);
        result.append(" attribute\n");
        len = pcs.size();
        for (i = 0; i < len; i++) {
            result.append("  " + pcs.get(i) + " " + lines.get(i));
        }
        return result.toString();
    }
}
