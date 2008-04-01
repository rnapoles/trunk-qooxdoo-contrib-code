// §{header}:
// 
// This is file src/de/mlhartme/mork/classfile/MethodDef.java,
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

public class MethodDef {
    public char accessFlags;
    public String name;
    public ClassRef[] argumentTypes;
    public ClassRef returnType;
    public List attributes;

    public MethodDef() {
        attributes = new ArrayList();
    }

    public MethodDef(Input src) throws IOException {
        this();

        int i, max;
        String descriptor;

        accessFlags = src.readU2();
        name = src.readUtf8();
        descriptor = src.readUtf8();
        argumentTypes = MethodRef.forArgumentTypes(descriptor);
        returnType = MethodRef.forReturnType(descriptor);
        max = src.readU2();
        for (i = 0; i < max; i++) {
            attributes.add(Attribute.create(src));
        }
    }

    public void write(Output dest) throws IOException {
        int i, max;

        dest.writeU2(accessFlags);
        dest.writeUtf8(name);
        dest.writeUtf8(MethodRef.toDescriptor(argumentTypes, returnType));
        max = attributes.size();
        dest.writeU2(max);
        for (i = 0; i < max; i++) {
            ((Attribute) attributes.get(i)).write(dest);
        }
    }

    public String toString() {
        StringBuffer buffer;
        int i, max;

        buffer = new StringBuffer();
        buffer.append(returnType + " " + name + "(");
        for (i = 0; i < argumentTypes.length; i++) {
            buffer.append(argumentTypes[i]);
            if (i > 0) {
                buffer.append(',');
            }
        }
        buffer.append(")\n");
        max = attributes.size();
        for (i = 0; i < max; i++) {
            buffer.append(attributes.get(i).toString());
            buffer.append('\n');
        }
        return buffer.toString();
    }

}
