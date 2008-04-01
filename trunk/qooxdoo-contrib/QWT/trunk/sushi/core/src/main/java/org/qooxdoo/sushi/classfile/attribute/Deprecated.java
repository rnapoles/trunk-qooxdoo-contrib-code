/* Copyright (c) 1&1. All Rights Reserved. */

package org.qooxdoo.sushi.classfile.attribute;

import java.io.IOException;

import org.qooxdoo.sushi.classfile.Input;

public class Deprecated extends Empty {
    public static final String NAME = "Deprecated";

    public Deprecated(Input src) throws IOException {
        super(NAME, src);
    }
    public Deprecated() {
        super(NAME);
    }
}
