/* Copyright (c) 1&1. All Rights Reserved. */

package org.qooxdoo.sushi.classfile.attribute;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.classfile.InnerClassesInfo;
import org.qooxdoo.sushi.classfile.Input;
import org.qooxdoo.sushi.classfile.Output;

public class InnerClasses extends Attribute {
    public static final String NAME = "InnerClasses";

    public final List infos;

    public InnerClasses() {
        super(NAME);

        infos = new ArrayList();
    }

    public InnerClasses(Input src) throws IOException {
        this();

        int i;
        int len;
        int count;

        len = src.readU4();
        count = src.readU2();
        if (2 + count * InnerClassesInfo.size != len) {
            throw new RuntimeException(NAME + ": illegal length: " +
                                       "count=" + count + " len=" + len);
        }
        for (i = 0; i < count; i++) {
            infos.add(new InnerClassesInfo(src));
        }
    }

    @Override
    public void write(Output dest) throws IOException {
        int i;
        int len;
        InnerClassesInfo info;
        int start;

        dest.writeUtf8(name);
        start = dest.writeSpace(4);
        len = infos.size();
        dest.writeU2(infos.size());
        for (i = 0; i < len; i++) {
            info = (InnerClassesInfo) infos.get(i);
            info.write(dest);
        }
        dest.writeFixup(start, dest.getGlobalOfs() - (start + 4));
    }
}
