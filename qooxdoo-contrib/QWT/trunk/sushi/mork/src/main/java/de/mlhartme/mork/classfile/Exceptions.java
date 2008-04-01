// §{header}:
// 
// This is file src/de/mlhartme/mork/classfile/Exceptions.java,
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

public class Exceptions extends Attribute {
    public static final String NAME = "Exceptions";
    public final List exceptions;

    public Exceptions() {
        super(NAME);

        exceptions = new ArrayList();
    }

    public Exceptions(Input src) throws IOException {
        this();

        int i;
        int len;
        int count;

        len = src.readU4();
        count = src.readU2();
        if (2 + count * 2 != len) {
            throw new RuntimeException("illegal exceptions attribute");
        }
        for (i = 0; i < count; i++) {
            exceptions.add(src.readClassRef());
        }
    }

    public void write(Output dest) throws IOException {
        int i;
        int count;
        int start;

        dest.writeUtf8(name);
        start = dest.writeSpace(4);
        count = exceptions.size();
        dest.writeU2(count);
        for (i = 0; i < count; i++) {
            dest.writeClassRef((ClassRef) exceptions.get(i));
        }
        dest.writeFixup(start, dest.getGlobalOfs() - (start + 4));
    }

    public String toString() {
        StringBuffer result;
        int i, len;

        result = new StringBuffer();
        result.append(NAME);
        result.append(" attrib\n");
        len = exceptions.size();
        for (i = 0; i < len; i++) {
            result.append('\t');
            result.append(exceptions.get(i).toString());
            result.append('\t');
        }
        return result.toString();
    }
}
