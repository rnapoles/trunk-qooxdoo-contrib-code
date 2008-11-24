package org.qooxdoo.sushi.template;

import java.io.IOException;

import org.qooxdoo.sushi.fs.Node;

public abstract class Action {
    public abstract void directory(Node dir) throws IOException;
    /**
     * @prev null if file does not yet exist
     * @next null if content is not changed, only the mode 
     */
    public abstract void file(Node file, String prev, String next, int mode) throws IOException;
}
