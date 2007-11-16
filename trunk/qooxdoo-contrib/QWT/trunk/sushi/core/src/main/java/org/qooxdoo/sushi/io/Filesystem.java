package org.qooxdoo.sushi.io;

public class Filesystem {
    public final String root;
    public final char separatorChar;
    public final String separator;
    
    public Filesystem(String root, char separatorChar) {
        this.root = root;
        this.separatorChar = separatorChar;
        this.separator = "" + separatorChar;
    }
}
