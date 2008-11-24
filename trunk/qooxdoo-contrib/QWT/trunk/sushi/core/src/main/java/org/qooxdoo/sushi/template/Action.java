package org.qooxdoo.sushi.template;

import java.io.IOException;

import org.qooxdoo.sushi.fs.Node;

public abstract class Action {
    public abstract void directory(Node dir) throws IOException;
    public abstract void file(Node file, String prev, String next) throws IOException;
}
