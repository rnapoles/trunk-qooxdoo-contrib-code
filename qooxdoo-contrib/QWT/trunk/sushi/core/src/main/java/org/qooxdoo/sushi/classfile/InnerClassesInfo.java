/* Copyright (c) 1&1. All Rights Reserved. */

package org.qooxdoo.sushi.classfile;

import java.io.IOException;

public class InnerClassesInfo {
    public ClassRef inner;
    public ClassRef outer;
    public String name;
    public int flags;

    public static final int size = 8;

    public InnerClassesInfo(Input src) throws IOException {
        try {
            inner = src.readClassRef();
        } catch (NullPointerException e) {
            inner = null;
        }
        try {
            outer = src.readClassRef();
        } catch (NullPointerException e) {
            outer = null;
        }
        try {
            name = src.readUtf8();
        } catch (NullPointerException e) {
            name = null;
        }
        flags = src.readU2();
    }

    public void write(Output dest) throws IOException {
        try {
            dest.writeClassRef(inner);
        } catch (NullPointerException e) {
            dest.writeU2(0);
        }
        try {
            dest.writeClassRef(outer);
        } catch (NullPointerException e) {
            dest.writeU2(0);
        }
        try {
            dest.writeUtf8(name);
        } catch (NullPointerException e) {
            dest.writeU2(0);
        }
        dest.writeU2(flags);
    }

}
