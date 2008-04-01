// §{header}:
// 
// This is file src/de/mlhartme/mork/classfile/LocalVariableInfo.java,
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

public class LocalVariableInfo {
    public int start;  // code idx
    public int end;    // code idx
    public String name;
    public String descriptor;  // a field descriptor
    public int index;

    public static final int size = 10;

    public LocalVariableInfo(Input src) throws IOException {
        start = src.readIdx();
        end = src.readEndIdxOrLast(start);
        name = src.readUtf8();
        descriptor = src.readUtf8();
        index = src.readU2();
    }

    public void write(Output dest) throws IOException {
        dest.writeIdx(start);
        dest.writeEndIdxOrLast(start, end);
        dest.writeUtf8(name);
        dest.writeUtf8(descriptor);
        dest.writeU2(index);
    }

    public String toString() {
        return name + " " + descriptor + " " + start + " " + end;
    }
}
