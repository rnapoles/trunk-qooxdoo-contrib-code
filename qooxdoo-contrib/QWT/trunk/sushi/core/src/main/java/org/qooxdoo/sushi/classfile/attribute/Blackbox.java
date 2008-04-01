/* Copyright (c) 1&1. All Rights Reserved. */

package org.qooxdoo.sushi.classfile.attribute;

import java.io.IOException;

import org.qooxdoo.sushi.classfile.Input;
import org.qooxdoo.sushi.classfile.Output;

/** TODO: Replace these attribute with a proper representation */
public class Blackbox extends Attribute {
    public final byte[] info;

    public Blackbox(String nameInit, Input src) throws IOException {
        super(nameInit);

        int len;

        len = src.readU4();
        if ((len & 0xffff0000) != 0) {
            throw new RuntimeException("attribute to long: " + len);
        }
        info = new byte[len];
        src.read(info);
    }

    @Override
    public void write(Output dest) throws IOException {
        dest.writeUtf8(name);
        dest.writeU4(info.length);
        dest.write(info);
    }
    
    @Override
    public String toString() {
        return name + " attribute, len=" + info.length;
    }
}
