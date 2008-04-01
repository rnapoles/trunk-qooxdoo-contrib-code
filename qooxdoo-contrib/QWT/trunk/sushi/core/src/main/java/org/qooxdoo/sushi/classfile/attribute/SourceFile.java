/* Copyright (c) 1&1. All Rights Reserved. */

package org.qooxdoo.sushi.classfile.attribute;

import java.io.IOException;

import org.qooxdoo.sushi.classfile.Input;
import org.qooxdoo.sushi.classfile.Output;

public class SourceFile extends Attribute {
    public static final String NAME = "SourceFile";

    public final String file;

    public SourceFile(String fileInit) {
        super(NAME);

        file = fileInit;
    }

    public SourceFile(Input src) throws IOException {
        super(NAME);

        int len;

        len = src.readU4();
        if (len != 2) {
            throw new RuntimeException("SourceFile attribute of length "
                                       + len);
        }
        file = src.readUtf8();
    }

    @Override
    public void write(Output dest) throws IOException {
        dest.writeUtf8(name);
        dest.writeU4(2);
        dest.writeUtf8(file);
    }

    @Override
    public String toString() {
        return name + " attribute " + file;
    }
}
