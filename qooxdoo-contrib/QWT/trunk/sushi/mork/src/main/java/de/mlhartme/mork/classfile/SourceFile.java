// §{header}:
// 
// This is file src/de/mlhartme/mork/classfile/SourceFile.java,
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

public class SourceFile extends Attribute {
    public static final String NAME = "SourceFile";

    public final String file;

    public SourceFile(String fileInit) {
        super(NAME);

        file = fileInit;
    }

    public SourceFile(Input src) throws IOException {
        super(NAME);

        int len;

        len = src.readU4();
        if (len != 2) {
            throw new RuntimeException("SourceFile attribute of length "
                                       + len);
        }
        file = src.readUtf8();
    }

    public void write(Output dest) throws IOException {
        dest.writeUtf8(name);
        dest.writeU4(2);
        dest.writeUtf8(file);
    }

    public String toString() {
        return name + " attribute " + file;
    }
}
