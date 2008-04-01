/* Copyright (c) 1&1. All Rights Reserved. */

package org.qooxdoo.sushi.classfile;

import java.lang.reflect.Field;

public class FieldRef extends Reference {
    public final ClassRef owner;
    public final String name;
    public final ClassRef type;

    public FieldRef(ClassRef owner, String name, ClassRef type) {
        this.owner = owner;
        this.name = name;
        this.type = type;
    }

    public FieldRef(Field field) {
        owner = new ClassRef(field.getDeclaringClass());
        name = field.getName();
        type = new ClassRef(field.getType());
    }

    @Override
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

    @Override
    public String toString() {
        return type + " " + owner + "." + name;
    }
}
