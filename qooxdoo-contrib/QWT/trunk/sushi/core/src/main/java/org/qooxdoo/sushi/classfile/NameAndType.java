/* Copyright (c) 1&1. All Rights Reserved. */

package org.qooxdoo.sushi.classfile;

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

    @Override
    public boolean equals(Object obj) {
        NameAndType nt;

        if (!(obj instanceof NameAndType)) {
            return false;
        }
        nt = (NameAndType) obj;
        return name.equals(nt.name) && descriptor.equals(nt.descriptor);
    }
}
