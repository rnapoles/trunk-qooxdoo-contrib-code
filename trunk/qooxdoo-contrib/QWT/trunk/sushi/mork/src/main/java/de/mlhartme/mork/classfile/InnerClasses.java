// §{header}:
// 
// This is file src/de/mlhartme/mork/classfile/InnerClasses.java,
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

public class InnerClasses extends Attribute {
    public static final String NAME = "InnerClasses";

    public final List infos;

    public InnerClasses() {
        super(NAME);

        infos = new ArrayList();
    }

    public InnerClasses(Input src) throws IOException {
        this();

        int i;
        int len;
        int count;

        len = src.readU4();
        count = src.readU2();
        if (2 + count * InnerClassesInfo.size != len) {
            throw new RuntimeException(NAME + ": illegal length: " +
                                       "count=" + count + " len=" + len);
        }
        for (i = 0; i < count; i++) {
            infos.add(new InnerClassesInfo(src));
        }
    }

    public void write(Output dest) throws IOException {
        int i;
        int len;
        InnerClassesInfo info;
        int start;

        dest.writeUtf8(name);
        start = dest.writeSpace(4);
        len = infos.size();
        dest.writeU2(infos.size());
        for (i = 0; i < len; i++) {
            info = (InnerClassesInfo) infos.get(i);
            info.write(dest);
        }
        dest.writeFixup(start, dest.getGlobalOfs() - (start + 4));
    }
}
