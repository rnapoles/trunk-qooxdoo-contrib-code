// §{header}:
// 
// This is file src/de/mlhartme/mork/classfile/Attribute.java,
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

public abstract class Attribute {
    public final String name;

    protected Attribute(String nameInit) {
        name = nameInit;
    }

    public static Attribute create(Input src) throws IOException {
        String name;

        name = src.readUtf8();
        if (name.equals("Code")) {
            return new Code(src);
        } else if (name.equals("ConstantValue")) {
            return new ConstantValue(src);
        } else if (name.equals("Exceptions")) {
            return new Exceptions(src);
        } else if (name.equals("InnerClasses")) {
            return new InnerClasses(src);
        } else if (name.equals("Synthetic")) {
            return new Synthetic(src);
        } else if (name.equals("SourceFile")) {
            return new SourceFile(src);
        } else if (name.equals("LineNumberTable")) {
            return new LineNumberTable(src);
        } else if (name.equals("LocalVariableTable")) {
            return new LocalVariableTable(src);
        } else if (name.equals("Deprecated")) {
            return new Deprecated(src);
        } else if (name.equals("Signature")) {
            // I've first seen this attribute for inner classes
            // in Sun JDK 1.3
            System.out.println("unkown Signature attribute");
            return new Unknown("Signature", src);
        } else {
            throw new RuntimeException("unkown attribute: " + name);
        }
    }

    public abstract void write(Output dest) throws IOException;
}
