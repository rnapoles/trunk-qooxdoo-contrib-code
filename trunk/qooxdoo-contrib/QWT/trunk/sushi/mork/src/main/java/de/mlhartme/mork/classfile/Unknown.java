// §{header}:
// 
// This is file src/de/mlhartme/mork/classfile/Unknown.java,
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

public class Unknown extends Attribute {
    public final byte[] info;

    public Unknown(String nameInit, Input src) throws IOException {
        super(nameInit);

        int len;

        len = src.readU4();
        if ((len & 0xffff0000) != 0) {
            throw new RuntimeException("attribute to long: " + len);
        }
        info = new byte[len];
        src.read(info);
    }

    public void write(Output dest) throws IOException {
        dest.writeUtf8(name);
        dest.writeU4(info.length);
        dest.write(info);
    }
    public String toString() {
        return name + " attribute, len=" + info.length;
    }
}
