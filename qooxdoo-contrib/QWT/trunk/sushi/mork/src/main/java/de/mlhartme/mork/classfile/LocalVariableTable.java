// §{header}:
// 
// This is file src/de/mlhartme/mork/classfile/LocalVariableTable.java,
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
import java.util.ArrayList;
import java.util.List;

public class LocalVariableTable extends Attribute {
    public static final String NAME = "LocalVariableTable";

    public final List infos;

    public LocalVariableTable() {
        super(NAME);

        infos = new ArrayList();
    }

    public LocalVariableTable(Input src) throws IOException {
        this();

        int i;
        int len;
        int count;

        src.requireCode();
        len = src.readU4();
        count = src.readU2();
        if (2 + count * LocalVariableInfo.size != len) {
            throw new RuntimeException(NAME + ": illegal length: " +
                                       "count=" + count + " len=" + len);
        }
        for (i = 0; i < count; i++) {
            infos.add(new LocalVariableInfo(src));
        }
    }

    public void write(Output dest) throws IOException {
        int i;
        int max;
        LocalVariableInfo info;
        int start;

        dest.requireCode();
        dest.writeUtf8(name);
        start = dest.writeSpace(4);
        max = infos.size();
        dest.writeU2(infos.size());
        for (i = 0; i < max; i++) {
            info = (LocalVariableInfo) infos.get(i);
            info.write(dest);
        }
        dest.writeFixup(start, dest.getGlobalOfs() - (start + 4));
    }

    public String toString() {
        StringBuffer result;
        int i, max;

        result = new StringBuffer();
        result.append("LocalTableTable\n");
        max = infos.size();
        for (i = 0; i < max; i++) {
            result.append('\t');
            result.append(infos.get(i).toString());
            result.append('\n');
        }
        return result.toString();
    }
}
