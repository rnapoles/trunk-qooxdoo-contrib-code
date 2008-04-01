/* Copyright (c) 1&1. All Rights Reserved. */

package org.qooxdoo.sushi.classfile.attribute;

import java.io.IOException;

import org.qooxdoo.sushi.classfile.Input;
import org.qooxdoo.sushi.classfile.Output;

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

    @Override
    public void write(Output dest) throws IOException {
        dest.writeUtf8(name);
        dest.writeU4(2);
        dest.writeConstant(value);
    }

    @Override
    public String toString() {
        return name + " attribute " + value;
    }
}
