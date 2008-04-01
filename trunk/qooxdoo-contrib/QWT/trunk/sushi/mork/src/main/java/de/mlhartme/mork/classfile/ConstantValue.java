// §{header}:
// 
// This is file src/de/mlhartme/mork/classfile/ConstantValue.java,
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

public class ConstantValue extends Attribute {
    public static final String NAME = "ConstantValue";

    public final Object value;

    public ConstantValue(Object valueInit) {
        super(NAME);

        value = valueInit;
    }

    public ConstantValue(Input src) throws IOException {
        super(NAME);

        int len;

        len = src.readU4();
        if (len != 2) {
            throw new RuntimeException("ConstantValue attribute of length "
                                       + len);
        }
        value = src.readConstant();
    }

    public void write(Output dest) throws IOException {
        dest.writeUtf8(name);
        dest.writeU4(2);
        dest.writeConstant(value);
    }

    public String toString() {
        return name + " attribute " + value;
    }
}
