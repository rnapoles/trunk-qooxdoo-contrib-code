package org.qooxdoo.sushi.util;

import java.io.IOException;

import org.qooxdoo.sushi.fs.Node;

public abstract class TemplateAction {
    public abstract void directory(Node dest) throws IOException;
    public abstract void file(Node src, Node dest) throws IOException;
}
