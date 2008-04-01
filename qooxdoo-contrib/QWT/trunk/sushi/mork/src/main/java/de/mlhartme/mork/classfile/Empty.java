// §{header}:
// 
// This is file src/de/mlhartme/mork/classfile/Empty.java,
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

public abstract class Empty extends Attribute {
    public Empty(String name, Input src) throws IOException {
        super(name);

        int len;

        len = src.readU4();
        if (len != 0) {
            throw new RuntimeException("non-emptry attribute " + name);
        }
    }

    public Empty(String name) {
        super(name);
    }


    public void write(Output dest) throws IOException {
        dest.writeUtf8(name);
        dest.writeU4(0);
    }
    public String toString() {
        return name + " attribute";
    }
}
