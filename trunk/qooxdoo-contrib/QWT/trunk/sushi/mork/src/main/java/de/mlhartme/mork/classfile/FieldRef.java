// §{header}:
// 
// This is file src/de/mlhartme/mork/classfile/FieldRef.java,
// Mork version 0.5  Copyright © 1998-2002  Michael Hartmeier
// 
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
// 
// §.

package de.mlhartme.mork.classfile;

import java.lang.reflect.Field;

public class FieldRef {
    public final ClassRef owner;
    public final String name;
    public final ClassRef type;

    public FieldRef(
        ClassRef ownerInit, String nameInit, ClassRef typeInit)
    {
        owner = ownerInit;
        name = nameInit;
        type = typeInit;
    }

    public FieldRef(Field field) {
        owner = new ClassRef(field.getDeclaringClass());
        name = field.getName();
        type = new ClassRef(field.getType());
    }

    public boolean equals(Object obj) {
        FieldRef ref;

        if (!(obj instanceof FieldRef)) {
            return false;
        }
        ref = (FieldRef) obj;
        return owner.equals(ref.owner)
            && name.equals(ref.name)
            && type.equals(ref.type);
    }

    public String toString() {
        return type + " " + owner + "." + name;
    }
}
