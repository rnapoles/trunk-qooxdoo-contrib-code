/* Copyright (c) 1&1. All Rights Reserved. */

package org.qooxdoo.sushi.classfile;

import java.io.IOException;

public class ExceptionInfo {
    public int start;  // a pc
    public int end;    // a pc or code.size
    public int handler; // a pc
    public ClassRef type;

    public static final int size = 8;

    public ExceptionInfo(int start, int end, int handler, ClassRef type) {
        this.start = start;
        this.end = end;
        this.handler = handler;
        this.type = type;
    }

    public ExceptionInfo(Input src) throws IOException {
        src.requireCode();
        start = src.readIdx();
        end = src.readIdxOrLast();
        handler = src.readIdx();
        try {
            type = src.readClassRef();
        } catch (NullPointerException e) {
            type = null;  // default handler, called for any exception
        }
    }

    public void write(Output dest) throws IOException {
        int tmp;

        dest.requireCode();
        dest.writeIdx(start);
        dest.writeIdxOrLast(end);
        dest.writeIdx(handler);
        try {
            dest.writeClassRef(type);
        } catch (NullPointerException e) {
            dest.writeU2(0);
        }
    }

    @Override
    public String toString() {
        return "start=" + start + " end=" + end +
            " handler=" + handler + " type=" + type;
    }
}
