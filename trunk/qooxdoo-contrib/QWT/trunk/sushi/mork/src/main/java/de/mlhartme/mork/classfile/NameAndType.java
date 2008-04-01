// §{header}:
// 
// This is file src/de/mlhartme/mork/classfile/NameAndType.java,
// Mork version 0.5  Copyright © 1998-2002  Michael Hartmeier
// 
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
// 
// §.

package de.mlhartme.mork.classfile;

// not public
class NameAndType {
    /** field or method name */
    public final String name;

    /** field or method descriptor */
    public final String descriptor;

    public NameAndType(String name, String descriptor) {
        this.name = name;
        this.descriptor = descriptor;
    }

    public NameAndType(String name, FieldRef ref) {
        this(name, ref.type.toFieldDescriptor());
    }

    public NameAndType(String name, MethodRef ref) {
        this(name, ref.toDescriptor());
    }

    public boolean equals(Object obj) {
        NameAndType nt;

        if (!(obj instanceof NameAndType)) {
            return false;
        }
        nt = (NameAndType) obj;
        return name.equals(nt.name) && descriptor.equals(nt.descriptor);
    }
}
