// §{header}:
// 
// This is file src/de/mlhartme/mork/classfile/FieldDef.java,
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

public class FieldDef {
    public char accessFlags;
    public String name;
    public ClassRef type;
    public Attribute[] attributes;

    public FieldDef(char accessFlagsInit, String nameInit, ClassRef typeInit)
    {
        accessFlags = accessFlagsInit;
        name = nameInit;
        type = typeInit;
        attributes = new Attribute[0];

    }
    public FieldDef(Input src) throws IOException {
        int i;
        String descriptor;

        accessFlags = src.readU2();
        name = src.readUtf8();
        descriptor = src.readUtf8();
        type = ClassRef.forFieldDescriptor(descriptor);
        attributes = new Attribute[src.readU2()];
        for (i = 0; i < attributes.length; i++) {
            attributes[i] = Attribute.create(src);
        }
    }

    public void write(Output dest) throws IOException {
        int i;

        dest.writeU2(accessFlags);
        dest.writeUtf8(name);
        dest.writeUtf8(type.toFieldDescriptor());
        dest.writeU2(attributes.length);
        for (i = 0; i < attributes.length; i++) {
            attributes[i].write(dest);
        }
    }

    public String toString() {
        return type + " " + name;
    }
}
