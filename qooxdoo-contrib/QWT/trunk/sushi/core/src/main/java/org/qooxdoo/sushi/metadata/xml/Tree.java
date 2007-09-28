package org.qooxdoo.sushi.metadata.xml;

import java.io.IOException;

public abstract class Tree {
    public abstract Object done() throws IOException;
    
    public abstract void begin(String name, int children) throws IOException;
    public abstract void end(String name) throws IOException;
    public abstract void text(String name, String text) throws IOException;
}
