/* Copyright (c) 1&1. All Rights Reserved. */

package org.qooxdoo.sushi.classfile.attribute;

import java.io.IOException;

import org.qooxdoo.sushi.classfile.Input;

public class Synthetic extends Empty {
    public static final String NAME = "Synthetic";

    public Synthetic(Input src) throws IOException {
        super(NAME, src);
    }
}
