// §{header}:
// 
// This is file src/de/mlhartme/mork/classfile/InnerClassesInfo.java,
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

public class InnerClassesInfo {
    public ClassRef inner;
    public ClassRef outer;
    public String name;
    public int flags;

    public static final int size = 8;

    public InnerClassesInfo(Input src) throws IOException {
        try {
            inner = src.readClassRef();
        } catch (NullPointerException e) {
            inner = null;
        }
        try {
            outer = src.readClassRef();
        } catch (NullPointerException e) {
            outer = null;
        }
        try {
            name = src.readUtf8();
        } catch (NullPointerException e) {
            name = null;
        }
        flags = src.readU2();
    }

    public void write(Output dest) throws IOException {
        try {
            dest.writeClassRef(inner);
        } catch (NullPointerException e) {
            dest.writeU2(0);
        }
        try {
            dest.writeClassRef(outer);
        } catch (NullPointerException e) {
            dest.writeU2(0);
        }
        try {
            dest.writeUtf8(name);
        } catch (NullPointerException e) {
            dest.writeU2(0);
        }
        dest.writeU2(flags);
    }

}
