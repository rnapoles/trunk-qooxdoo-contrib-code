/* Copyright (c) 1&1. All Rights Reserved. */

package org.qooxdoo.sushi.classfile;

import java.io.IOException;

public class LocalVariableInfo {
    public int start;  // code idx
    public int end;    // code idx
    public String name;
    public String descriptor;  // a field descriptor
    public int index;

    public static final int size = 10;

    public LocalVariableInfo(Input src) throws IOException {
        start = src.readIdx();
        end = src.readEndIdxOrLast(start);
        name = src.readUtf8();
        descriptor = src.readUtf8();
        index = src.readU2();
    }

    public void write(Output dest) throws IOException {
        dest.writeIdx(start);
        dest.writeEndIdxOrLast(start, end);
        dest.writeUtf8(name);
        dest.writeUtf8(descriptor);
        dest.writeU2(index);
    }

    @Override
    public String toString() {
        return name + " " + descriptor + " " + start + " " + end;
    }
}
